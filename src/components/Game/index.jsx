import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import React, { useState, useEffect } from "react";
import { Button, Card, FormControl } from "react-bootstrap";
import Dialog from "react-bootstrap-dialog";
import { Statistic } from "antd";
import Board from "./components/Board";
import Status from "./components/Status";
import Config from "@/constants/configs";
import useSocket from "@/hooks/useSocket";
import useEvent from "@/hooks/useEvent";
//actions
import actionClick from "@/actions/actionClick";
import actionJoinRoom from "@/actions/actionJoinRoom";
import actionChat from "@/actions/actionChat";
import actionChatRoom from "@/actions/actionChatRoom";
import actionRefresh from "@/actions/actionRefresh";
import actionRefreshGame from "@/actions/actionRefreshGame";
import actionSaveGame from "@/actions/actionSaveGame";
import actionRequest from "@/actions/actionRequest";
import {setTime} from "@/actions/room";

import "./styles.scss";
import { useHistory } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";

const Game = (props) => {
  const { user } = useAuth0();

  const { actions } = props;
  const { history } = props;
  const { stepNumber } = props;
  const { nextMove } = props;
  const { winCells } = props;
  const { roomInfo } = props;
  const { message } = props;
  const { isSaveGame } = props;
  const { isFetching } = props;
  const { countDownTimer } = props;
  const { chatHistory } = props;
  const { chatHistoryAll } = props;

  const socket = useSocket();

  const { Countdown } = Statistic;

  const [isEndGame, setIsEndGame] = useState(false);
  const [isOverTime, setIsOverTime] = useState(false);
  const [isSurrender, setIsSurrender] = useState(false);
  const [isDraw, setIsDraw] = useState(false);
  const [winner, setWinner] = useState(null);
  const [dialog, setDialog] = useState("");

  useEvent.removeAllListeners();

  useEvent.on("add-new-move", (data) => {
	console.log("Event add move");
	handleClick(data.row, data.col);
    useEvent.removeAllListeners();
  });

  const setupSocket = () => {
    socket.off("refresh-game-request");
    socket.off("refresh-game-result");
    socket.off("draw-request");
    socket.off("draw-result");
    // socket.off("surrender-request");
    // socket.off("surrender-result");

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
          setIsSurrender(false);
          setIsDraw(false);
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
        setIsSurrender(false);
        setIsDraw(false);
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
      setWinner(winner);
      setIsSurrender(true);
    });

    socket.on("surrender-result", () => {
      actions.actionRequest(true, `Bạn đã đầu hàng !`);
      const winner = isPlayerX ? Config.oPlayer : Config.xPlayer;
      setWinner(winner);
      setIsSurrender(true);
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
          setWinner(winner);
          setIsDraw(true);
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
        setWinner(winner);
        setIsDraw(true);
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

  const rivalName = isPlayerX
    ? (roomInfo.players.O || {}).name
    : (roomInfo.players.X || {}).name || "DISCONNECTED";
  const rivalImage = isPlayerX
    ? (roomInfo.players.O || {}).picture
    : (roomInfo.players.X || {}).picture;

  const [chatMessage, setChatMessage] = useState("");
  const listChat = [];
  for (let i = 0; i < chatHistoryAll.length; i++) {
    const color = chatHistoryAll[i].sender === user.sub ? "blue" : "red";
    const style = { color: color };
    listChat.push(
      <b style={style} key={i}>
        {chatHistoryAll[i].sender === user.sub ? user.name : rivalName}
      </b>
    );
    listChat.push(": " + chatHistoryAll[i].message);
    listChat.push(<br key={i + chatHistoryAll.length}></br>);
  }

  useEffect(() => {
    let calculateWinner = null;

    const isOnePlayerDisconnected =
      roomInfo.players.O === null || roomInfo.players.X === null;

    const isEndGame =
      isOnePlayerDisconnected ||
      isOverTime ||
      winCells ||
      isSurrender ||
      isDraw;

    setIsEndGame(isEndGame);

    const saveGame = () => {
      console.log("save game" + calculateWinner);
      let isWinner = false;

      if (
        (calculateWinner === Config.xPlayer && isPlayerX) ||
        (calculateWinner === Config.oPlayer && !isPlayerX)
      ) {
        isWinner = true;
      }
      if (isWinner) {
        let winnerName;
        if (isWinner) {
          winnerName = user.name;
        } else winnerName = rivalName;

        console.log(history);
        console.log(chatHistory);
        console.log(winCells);
        if (!isDraw) console.log(winnerName);
        else console.log("DRAW");
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
      } else if (isSurrender && winner) {
        calculateWinner = winner;
      } else if (isDraw && winner) {
        calculateWinner = winner;
      }

      if (!isSaveGame && calculateWinner) {
        saveGame();
      }
    }

    setWinner(calculateWinner);
  }, [
    roomInfo,
    isOverTime,
    winCells,
    nextMove,
    history,
    chatHistory,
    isPlayerX,
    isSaveGame,
    actions,
    user,
    rivalName,
    isDraw,
    isSurrender,
    winner,
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
	console.log("handle click" + row + " "+ col);
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
	  actions.setTime(countDownTimer);

      return true;
    }
    return false;
  };

  const handleChat = (e) => {
    e.preventDefault();
    socket.emit("chat", chatMessage);
    setChatMessage("");
  };

  const handleOverTime = (e) => {
    setIsOverTime(true);
  };

  return (
    <div className="Game">
      <Status
        nextMove={nextMove}
        winCells={winCells}
        rivalName={rivalName}
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
            {isEndGame && rivalName !== "DISCONNECTED" && (
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
                <b>{rivalName}</b>
              </Card.Text>
              <img
                src={rivalImage}
                className="avatar-small"
                alt="rivalAvatar"
              />
              <br></br>
            </Card.Body>
            {!isEndGame && rivalName !== "DISCONNECTED" && (
              <Button
                className="logout-button"
                variant="danger"
                onClick={() => requestDraw()}
              >
                Cầu hoà
              </Button>
            )}
            {!isEndGame && rivalName !== "DISCONNECTED" && (
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
          {!isEndGame && (
            <Countdown
              value={Date.now() + countDownTimer*1000}
              format="ss"
              onFinish={handleOverTime}
            />
          )}
          <Card className="card-chat">
            <Card.Body className="card-body">
              <Card.Title className="card-title">Chat</Card.Title>
              <div className="scroll-view-chat">{listChat}</div>
              <form onSubmit={(e) => handleChat(e)}>
                <FormControl
                  type="chatMessage"
                  className="input-message"
                  placeholder="Nội dung"
                  value={chatMessage}
                  onChange={(e) => setChatMessage(e.target.value)}
                ></FormControl>
              </form>
            </Card.Body>
          </Card>
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
    chatHistory: state.game.data.chatHistory,
    isSaveGame: state.game.data.isSaveGame,
    isFetching: state.game.isFetching,
    countDownTimer: state.room.roomInfo.time || 0,
    chatHistoryAll: state.roomReducers.chatHistoryAll,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    actions: bindActionCreators(
      {
        actionClick,
        actionJoinRoom,
        actionChat,
        actionChatRoom,
        actionRefresh,
        actionRefreshGame,
        actionSaveGame,
		actionRequest,
		setTime,
      },
      dispatch
    ),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Game);
