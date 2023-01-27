import React, { useState, useEffect } from "react";
import Board from "./components/Board";
import "./App.css";
import Sound from "react-sound";
//import Drake from "./drake-quackline-bling.mp3";

const mp3_url = "./components/drake-quackline-bling.mp3";

const MAX_ROW = 24;
const MAX_COL = 10;

const matrix = (rows, columns) => {
  return Array.from({ length: rows }, () => new Array(columns).fill(""));
};

const withinFrame = ([row, col]) =>
  row >= 0 && row < MAX_ROW && col >= 0 && col < MAX_COL;

const App = () => {
  const [boardState, setBoardState] = useState(matrix(MAX_ROW, MAX_COL));
  let shapePosition = [0, 0];

  const updateBoard = (oldPos, newPos) => {
    const newBoardState = boardState;
    if (withinFrame(oldPos)) newBoardState[oldPos[0]][oldPos[1]] = "";
    if (withinFrame(newPos)) newBoardState[newPos[0]][newPos[1]] = "X";
    return newBoardState;
  };

  useEffect(() => {
    window.addEventListener("keydown", (e) => {
      if (e.key === "Enter") {
        console.log("You pressed Enter");
      }
      if (e.key === "ArrowLeft") {
        updateBoard(shapePosition, [shapePosition[0], shapePosition[1] - 1]);
      }
      if (e.key === "ArrowRight") {
        updateBoard(shapePosition, [shapePosition[0], shapePosition[1] + 1]);
      }
    });
  });

  useEffect(() => {
    const intervalId = setInterval(() => {
      setBoardState(updateBoard());

      // check that new position is valid
      if (
        shapePosition[0] + 1 === MAX_ROW ||
        boardState[shapePosition[0] + 1][shapePosition[1]] === "X"
      ) {
        shapePosition.curent = [0, shapePosition[1]];
      } else {
        shapePosition.current = [shapePosition[0] + 1, shapePosition[1]];
      }
    }, 1000);
    return () => clearInterval(intervalId);
  }, [boardState, shapePosition, updateBoard]);

  return (
    <div className="App">
      <Sound url={mp3_url} playStatus={Sound.status.PLAYING} loop={true} />
      <h1>TETRIS DUCKS 🦆🦆🦆</h1>
      <Board boardState={boardState} />
    </div>
  );
};

export default App;
