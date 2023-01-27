import React, { useState, useEffect } from "react";
import Board from "./components/Board";
import "./App.css";

const MAX_ROW = 3;
const MAX_COL = 10;

const matrix = (rows, columns) => {
  return Array.from({ length: rows }, () => new Array(columns).fill(""));
};

const App = () => {
  const [boardState, setBoardState] = useState(matrix(MAX_ROW, MAX_COL));

  const [shapePosition, setShapePosition] = useState([0, 0]);

  const fillCell = (row, col, val) => {
    boardState[row][col] = val;
  };

  //fillCell(0, 0, "X");

  useEffect(() => {
    const intervalId = setInterval(() => {
      setBoardState(() => {
        const newBoardState = boardState;
        console.log(shapePosition);

        if (newBoardState[0] - 1) {
          newBoardState[shapePosition[0] - 1][shapePosition[1]] = "";
        }

        // draw current cell
        newBoardState[shapePosition[0]][shapePosition[1]] = "X";

        // paint next cell position
        if (shapePosition[0] + 1 !== MAX_ROW) {
          //newBoardState[shapePosition[0] + 1][shapePosition[1]] = "X";
        }

        return newBoardState;
      });

      // check that new position is valid

      if (shapePosition[0] + 1 === MAX_ROW) {
        setShapePosition([0, shapePosition[1]]);
      } else {
        setShapePosition([shapePosition[0] + 1, shapePosition[1]]);
      }
    }, 1000);
    return () => clearInterval(intervalId);
  }, [boardState, shapePosition]);

  return (
    <div className="App">
      <h1>TETRIS DUCKS 🦆🦆🦆</h1>
      <Board boardState={boardState} />
    </div>
  );
};

export default App;
