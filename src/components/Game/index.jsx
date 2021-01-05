import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import React, { useState, useEffect } from "react";
import { Button, Card, FormControl } from "react-bootstrap";
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
import actionRefresh from "@/actions/actionRefresh";

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

  const socket = useSocket();

  const { Countdown } = Statistic;

  const [isEndGame, setIsEndGame] = useState(false);
  const [isOverTime, setIsOverTime] = useState(false);
  const [winner, setWinner] = useState(null);
  const [countDownTimer, setCountDownTimer] = useState(Date.now() + 20000);

  useEffect(() => {
    let winner = null;

    const isOnePlayerDisconnected =
      roomInfo.playerO === "DISCONNECTED" ||
      roomInfo.playerX === "DISCONNECTED";

    const isEndGame = isOnePlayerDisconnected || isOverTime || winCells;

    setIsEndGame(isEndGame);

    if (isEndGame) {
      if (winCells || isOverTime) {
        winner = nextMove === Config.xPlayer ? Config.oPlayer : Config.xPlayer;
      } else if (isOnePlayerDisconnected) {
        winner =
          roomInfo.playerX === "DISCONNECTED" ? Config.oPlayer : Config.xPlayer;
      }
      //save game
    } else {
      winner = null;
    }

    setWinner(winner);
  }, [roomInfo, isOverTime, winCells, nextMove]);

  useEvent.removeAllListeners();

  useEvent.on("add-new-move", (data) => {
    console.log("Doi thu da danh");
    handleClick(data.row, data.col);
    useEvent.removeAllListeners();
  });

  const { chatHistory } = props;
  const [chatMessage, setChatMessage] = useState("");
  const listChat = [];
  for (let i = 0; i < chatHistory.length; i++) {
    const color = chatHistory[i].sender === user.name ? "blue" : "red";
    const style = { color: color };
    listChat.push(
      <b style={style} key={i}>
        {chatHistory[i].sender}
      </b>
    );
    listChat.push(": " + chatHistory[i].message);
    listChat.push(<br key={i + chatHistory.length}></br>);
  }

  const current = history[stepNumber];

  var isPlayerX = user.name === roomInfo.playerX;
  if (user.name !== roomInfo.playerX) {
    isPlayerX = user.name !== roomInfo.playerO;
  }
  const rivalName = isPlayerX ? roomInfo.playerO : roomInfo.playerX;
  const rivalImage = isPlayerX ? roomInfo.pictureO : roomInfo.pictureX;

  const { push } = useHistory();
  const exitGame = () => {
    actions.actionRefresh();
    push("/");
    socket.disconnect();
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

    if (isEndGame) {
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

      setCountDownTimer(Date.now() + 20000);

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
              <Button className="logout-button" variant="danger">
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
              value={countDownTimer}
              format="ss:SS"
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
    roomInfo: state.roomReducers.roomInfo,
    chatHistory: state.roomReducers.chatHistory,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    actions: bindActionCreators(
      {
        actionClick,
        actionJoinRoom,
        actionChat,
        actionRefresh,
      },
      dispatch
    ),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Game);
