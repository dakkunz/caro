import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import React, { useState, useEffect } from "react";
import { Button, Card } from "react-bootstrap";
import Dialog from "react-bootstrap-dialog";
import Board from "./components/Board";
import Status from "./components/Status";
import Chat from "./components/Chat";
import Timer from "./components/Timer";
import Config from "@/constants/configs";
import useSocket from "@/hooks/useSocket";
import useAxios from "@/hooks/useAxios";
import { useEventClick } from "@/hooks/useEvent";
import { useEventTime } from "@/hooks/useEvent";
//actions
import actionRefresh from "@/actions/actionRefresh";

import {
  actionClick,
  actionRefreshGame,
  actionSaveGame,
  actionRequest,
  actionSetSurrender,
  actionSetDraw,
  actionSetWinner,
} from "@/actions/gameActions";

import { setTime } from "@/actions/room";

import "./styles.scss";
import { useHistory } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";

const Game = (props) => {
  const { user } = useAuth0();
  const axios = useAxios();

  const { actions } = props;
  const { history } = props;
  const { stepNumber } = props;
  const { nextMove } = props;
  const { winCells } = props;
  const { roomInfo } = props;
  const { message } = props;
  const { isSaveGame } = props;
  const { isFetching } = props;
  const { chatHistory } = props;
  const { isSurrender } = props;
  const { isDraw } = props;
  const { winner } = props;

  const socket = useSocket();

  const [isEndGame, setIsEndGame] = useState(false);
  const [isOverTime, setIsOverTime] = useState(false);
  const [dialog, setDialog] = useState("");

  useEventClick.removeAllListeners();

  useEventClick.on("add-new-move", (data) => {
    handleClick(data.row, data.col);
    useEventClick.removeAllListeners();
  });

  const setupSocket = () => {
    socket.off("refresh-game-request");
    socket.off("refresh-game-result");
    socket.off("draw-request");
    socket.off("draw-result");
    socket.off("surrender-request");
    socket.off("surrender-result");

    // Play again
    socket.on("refresh-game-request", (data) => {
      doConfirm(
        "Đối thủ muốn chơi lại !",
        () => {
          socket.emit("refresh-game-result", {
            message: "yes",
            nextMove: data,
          });
          actions.actionRefreshGame(data);
          useEventTime.emit("set-time");
        },
        () => {
          socket.emit("refresh-game-result", {
            message: "no",
          });
        }
      );
    });

    socket.on("refresh-game-result", (data) => {
      if (data.message === "yes") {
        actions.actionRefreshGame(data.nextMove);
        useEventTime.emit("set-time");
        dialog.showAlert(`Đối thủ đã đồng ý!`);
      } else {
        dialog.showAlert(`Đối thủ không đồng ý!`);
      }
    });

    // Surrender
    socket.on("surrender-request", () => {
      socket.emit("surrender-result");
      actions.actionRequest(true, `Đối thủ đầu hàng, bạn đã thắng !`);
      const winner = isPlayerX ? Config.xPlayer : Config.oPlayer;
      actions.actionSetWinner(winner);
      actions.actionSetSurrender(true);
    });

    socket.on("surrender-result", () => {
      actions.actionRequest(true, `Bạn đã đầu hàng !`);
      const winner = isPlayerX ? Config.oPlayer : Config.xPlayer;
      actions.actionSetWinner(winner);
      actions.actionSetSurrender(true);
    });

    //Draw
    socket.on("draw-request", () => {
      doConfirm(
        "Đối thủ xin hoà trận đấu !",
        () => {
          socket.emit("draw-result", {
            message: "yes",
          });
          actions.actionRequest(true, `Chấp nhận hoà !`);
          const winner = isPlayerX ? Config.oPlayer : Config.xPlayer;
          actions.actionSetWinner(winner);
          actions.actionSetDraw(true);
        },
        () => {
          socket.emit("draw-result", {
            message: "no",
          });
          actions.actionRequest(false, null);
        }
      );
    });

    socket.on("draw-result", (data) => {
      if (data.message === "yes") {
        actions.actionRequest(true, `Đối thủ đã chấp nhận hoà !`);
        dialog.showAlert(`Đối thủ đã chấp nhận hoà!`);
        const winner = isPlayerX ? Config.xPlayer : Config.oPlayer;
        actions.actionSetWinner(winner);
        actions.actionSetDraw(true);
      } else {
        actions.actionRequest(false, null);
        dialog.showAlert(`Đối thủ đã từ chối hoà!`);
      }
    });
  };

  const doConfirm = (message, callbackYes, callbackNo) => {
    dialog.show({
      title: "Xác nhận",
      body: message,
      actions: [
        Dialog.CancelAction(() => callbackNo()),
        Dialog.OKAction(() => callbackYes()),
      ],
      bsSize: "sm",
      onHide: (dialog) => {},
    });
  };

  const requestSurrender = () => {
    doConfirm(
      "Bạn muốn đầu hàng ván này ?",
      () => {
        socket.emit("surrender-request");
      },
      () => {}
    );
  };

  const requestDraw = () => {
    doConfirm(
      "Bạn muốn xin hoà trận đấu ?",
      () => {
        socket.emit("draw-request");
        actions.actionRequest(true, `Đang xin hoà...!`);
      },
      () => {}
    );
  };

  const requestRefreshGame = () => {
    const nextMove =
      winner === Config.xPlayer ? Config.oPlayer : Config.xPlayer;
    doConfirm(
      "Bạn muốn chơi lại ?",
      () => {
        socket.emit("refresh-game-request", nextMove);
        actions.actionRequest(true, `Đang xin chơi lại...!`);
      },
      () => {}
    );
  };

  setupSocket();

  const current = history[stepNumber];

  var isPlayerX = roomInfo.players.X && user.sub === roomInfo.players.X.sub;

  const rival = isPlayerX ? roomInfo.players.O : roomInfo.players.X;

  useEffect(() => {
    let calculateWinner = null;

    const isOnePlayerDisconnected =
      roomInfo.players.O.name === "DISCONNECTED" ||
      roomInfo.players.X === "DISCONNECTED";

    const isEndGame =
      isOnePlayerDisconnected ||
      isOverTime ||
      winCells ||
      isSurrender ||
      isDraw;

    setIsEndGame(isEndGame);

    const saveGame = () => {
      console.log("save game: " + calculateWinner);
      let isWinner = false;

      if (
        (calculateWinner === Config.xPlayer && isPlayerX) ||
        (calculateWinner === Config.oPlayer && !isPlayerX)
      ) {
        isWinner = true;
      }
      if (isWinner) {
        console.log(history);
        console.log(chatHistory);
        console.log(winCells);
        if (!isDraw) console.log("winner sub: " + user.sub);
        else console.log("DRAW");

        axios
          .post("/games/save", {
            xPlayer: isPlayerX ? user.sub : rival.sub,
            oPlayer: !isPlayerX ? user.sub : rival.sub,
            history,
            chatHistory,
            winCells,
            isDraw,
            winner: isDraw ? null : user.sub,
            date: new Date(),
          })
          .then((res) => {
            console.log(res);
          });
      }
      actions.actionSaveGame();
    };

    if (isEndGame) {
      console.log("end game");
      if (winCells || isOverTime) {
        calculateWinner =
          nextMove === Config.xPlayer ? Config.oPlayer : Config.xPlayer;
      } else if (isOnePlayerDisconnected) {
        calculateWinner =
          roomInfo.players.X === null ? Config.oPlayer : Config.xPlayer;
      } else if (isSurrender) {
        calculateWinner = winner;
      } else if (isDraw && winner) {
        calculateWinner = winner;
      }

      if (!isSaveGame && calculateWinner) {
        saveGame();
      }
    }
  }, [
    roomInfo,
    isOverTime,
    winCells,
    nextMove,
    history,
    isPlayerX,
    isSaveGame,
    actions,
    user,
    rival,
    isDraw,
    isSurrender,
    winner,
    chatHistory,
    axios,
  ]);

  const { push } = useHistory();
  const exitGame = () => {
    actions.actionRefresh();
    push("/");
    socket.emit("out-game");
  };

  const checkWin = (row, col, user, stepNumber) => {
    if (stepNumber === 0) {
      return null;
    }

    const { history } = props;
    const current = history[stepNumber];
    const squares = current.squares.slice();

    let coorX = row;
    let coorY = col;

    let countCol = 1;
    let countRow = 1;
    let countMainDiagonal = 1;
    let countSkewDiagonal = 1;
    let isBlock;
    const rival = user === Config.xPlayer ? Config.oPlayer : Config.xPlayer;

    isBlock = true;
    let winCells = [];
    coorX -= 1;
    while (coorX >= 0 && squares[coorX][coorY] === user) {
      countCol += 1;
      winCells.push([coorX, coorY]);
      coorX -= 1;
    }
    if (coorX >= 0 && squares[coorX][coorY] !== rival) {
      isBlock = false;
    }
    coorX = row;
    winCells.push([coorX, coorY]);
    coorX += 1;
    while (coorX <= Config.brdSize - 1 && squares[coorX][coorY] === user) {
      countCol += 1;
      winCells.push([coorX, coorY]);
      coorX += 1;
    }
    if (coorX <= Config.brdSize - 1 && squares[coorX][coorY] !== rival) {
      isBlock = false;
    }
    coorX = row;
    if (isBlock === false && countCol >= 5) return winCells;

    isBlock = true;
    winCells = [];
    coorY -= 1;
    while (coorY >= 0 && squares[coorX][coorY] === user) {
      countRow += 1;
      winCells.push([coorX, coorY]);
      coorY -= 1;
    }
    if (coorY >= 0 && squares[coorX][coorY] !== rival) {
      isBlock = false;
    }
    coorY = col;
    winCells.push([coorX, coorY]);
    coorY += 1;
    while (coorY <= Config.brdSize - 1 && squares[coorX][coorY] === user) {
      countRow += 1;
      winCells.push([coorX, coorY]);
      coorY += 1;
    }
    if (coorY <= Config.brdSize - 1 && squares[coorX][coorY] !== rival) {
      isBlock = false;
    }
    coorY = col;
    if (isBlock === false && countRow >= 5) return winCells;

    isBlock = true;
    winCells = [];
    coorX -= 1;
    coorY -= 1;
    while (coorX >= 0 && coorY >= 0 && squares[coorX][coorY] === user) {
      countMainDiagonal += 1;
      winCells.push([coorX, coorY]);
      coorX -= 1;
      coorY -= 1;
    }
    if (coorX >= 0 && coorY >= 0 && squares[coorX][coorY] !== rival) {
      isBlock = false;
    }
    coorX = row;
    coorY = col;
    winCells.push([coorX, coorY]);
    coorX += 1;
    coorY += 1;
    while (
      coorX <= Config.brdSize - 1 &&
      coorY <= Config.brdSize - 1 &&
      squares[coorX][coorY] === user
    ) {
      countMainDiagonal += 1;
      winCells.push([coorX, coorY]);
      coorX += 1;
      coorY += 1;
    }
    if (
      coorX <= Config.brdSize - 1 &&
      coorY <= Config.brdSize - 1 &&
      squares[coorX][coorY] !== rival
    ) {
      isBlock = false;
    }
    coorX = row;
    coorY = col;
    if (isBlock === false && countMainDiagonal >= 5) return winCells;

    isBlock = true;
    winCells = [];
    coorX -= 1;
    coorY += 1;
    while (coorX >= 0 && coorY >= 0 && squares[coorX][coorY] === user) {
      countSkewDiagonal += 1;
      winCells.push([coorX, coorY]);
      coorX -= 1;
      coorY += 1;
    }
    if (coorX >= 0 && coorY >= 0 && squares[coorX][coorY] !== rival) {
      isBlock = false;
    }
    coorX = row;
    coorY = col;
    winCells.push([coorX, coorY]);
    coorX += 1;
    coorY -= 1;
    while (
      coorX <= Config.brdSize - 1 &&
      coorY <= Config.brdSize - 1 &&
      squares[coorX][coorY] === user
    ) {
      countSkewDiagonal += 1;
      winCells.push([coorX, coorY]);
      coorX += 1;
      coorY -= 1;
    }
    if (
      coorX <= Config.brdSize - 1 &&
      coorY <= Config.brdSize - 1 &&
      squares[coorX][coorY] !== rival
    ) {
      isBlock = false;
    }
    if (isBlock === false && countSkewDiagonal >= 5) return winCells;

    return null;
  };

  const userClick = (row, col) => {
    const { nextMove } = props;

    if (isEndGame || isFetching) {
      return;
    }

    if (
      (isPlayerX && nextMove === Config.oPlayer) ||
      (!isPlayerX && nextMove === Config.xPlayer)
    ) {
      return;
    }

    if (handleClick(row, col)) {
      socket.emit("move", { row: row, col: col });
    }
  };

  const handleClick = (row, col) => {
    const { actions } = props;
    const { stepNumber } = props;
    const { history } = props;
    const { nextMove } = props;
    const { winCells } = props;

    const curMove = nextMove;
    const newHistory = history.slice(0, stepNumber + 1);
    const current = newHistory[newHistory.length - 1];

    const squares = JSON.parse(JSON.stringify(current.squares));

    if (winCells == null && squares[row][col] == null) {
      squares[row][col] = curMove;
      const _nextMove =
        curMove === Config.xPlayer ? Config.oPlayer : Config.xPlayer;
      const _winCells = checkWin(row, col, curMove, newHistory.length - 1);
      const _history = newHistory.concat([
        {
          x: row,
          y: col,
          squares,
        },
      ]);

      actions.actionClick(_history, _nextMove, _winCells);
      useEventTime.emit("set-time");

      return true;
    }
    return false;
  };

  return (
    <div className="Game">
      <Status
        nextMove={nextMove}
        winCells={winCells}
        rivalName={rival.name}
        messages={message}
        isPlayerX={isPlayerX}
        isOverTime={isOverTime}
        winner={winner}
      />
      <Dialog ref={(el) => setDialog(el)} />
      <div className="board-game">
        <div>
          <Card className="card">
            <Card.Body className="card-body">
              <Card.Title className="card-title">
                Bạn là {isPlayerX ? `X` : `O`}
              </Card.Title>
              <Card.Text className="card-text-bold">
                <b>{user.name}</b>
              </Card.Text>
              <img src={user.picture} className="avatar-small" alt="avatar" />
              <br></br>
            </Card.Body>
            <Button
              className="logout-button"
              variant="danger"
              onClick={() => exitGame()}
            >
              Thoát game
            </Button>
            {isEndGame && rival && (
              <Button
                className="logout-button"
                variant="danger"
                onClick={() => requestRefreshGame()}
              >
                Đấu lại
              </Button>
            )}
          </Card>
          <br></br>
          <Card className="card">
            <Card.Body className="card-body">
              <Card.Title className="card-title">
                Đối thủ là {!isPlayerX ? `X` : `O`}
              </Card.Title>
              <Card.Text className="card-text-bold">
                <b>{rival.name}</b>
              </Card.Text>
              <img
                src={
                  rival.name !== "DISCONNECTED"
                    ? rival.picture
                    : Config.defaultAvatar
                }
                className="avatar-small"
                alt="rivalAvatar"
              />
              <br></br>
            </Card.Body>
            {!isEndGame && rival.name !== "DISCONNECTED" && (
              <Button
                className="logout-button"
                variant="danger"
                onClick={() => requestDraw()}
              >
                Cầu hoà
              </Button>
            )}
            {!isEndGame && rival.name !== "DISCONNECTED" && (
              <Button
                className="logout-button"
                variant="danger"
                onClick={() => requestSurrender()}
              >
                Xin thua
              </Button>
            )}
          </Card>
        </div>
        <div>
          <Board
            winCells={winCells}
            squares={current.squares}
            currentCell={[current.x, current.y]}
            handleClick={(i, j) => userClick(i, j)}
          />
        </div>
        <div>
          {!isEndGame && <Timer setIsOverTime={setIsOverTime} />}
          <Chat socket={socket} rivalName={rival.name} />
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    history: state.game.data.history,
    nextMove: state.game.data.nextMove,
    stepNumber: state.game.data.stepNumber,
    winCells: state.game.data.winCells,
    message: state.game.message,
    roomInfo: state.room.roomInfo,
    isSaveGame: state.game.data.isSaveGame,
    isSurrender: state.game.data.isSurrender,
    isDraw: state.game.data.isDraw,
    winner: state.game.data.winner,
    isFetching: state.game.isFetching,
    chatHistory: state.game.data.chatHistory,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    actions: bindActionCreators(
      {
        actionClick,
        actionRefresh,
        actionRefreshGame,
        actionSaveGame,
        actionRequest,
        setTime,
        actionSetSurrender,
        actionSetDraw,
        actionSetWinner,
      },
      dispatch
    ),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Game);
