// board size: 10 x 24 using a 2D array to represent the space available
// Whenever this is updated, it rerenders (using state) and updtes the visuals onscreen
import React from "react";
import styled from "styled-components";

const Cell = styled.div`
  height: 1.5rem;
  width: 1.5rem;
  background-color: ${({ isFilled }) => (isFilled ? "green" : "grey")};
  border: 1px solid white;
  border-radius: 0.25rem;
`;

const Row = styled.div`
  display: flex;
`;

const BoardWrapper = styled.div`
  display: inline-block;
  justify-content: center;
`;

const Board = ({ boardState }) => {
  return (
    <BoardWrapper>
      {boardState.map((row, rowIndex) => (
        <Row key={`Row-${rowIndex}`}>
          {row.map((cell, colIndex) => (
            <Cell key={`Cell-${colIndex}`} isFilled={cell && true} />
          ))}
        </Row>
      ))}
    </BoardWrapper>
  );
};

export default Board;
