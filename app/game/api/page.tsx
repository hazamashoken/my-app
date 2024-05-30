"use client";

import React from "react";

type TSquare = {
  value: string;
  onClick: () => void;
  winning?: boolean;
};

function Square(props: TSquare) {
  const { value, onClick, winning } = props;

  return (
    <button
      className={`border-2 border-white size-12 text-center ${
        !!winning ? "bg-green-400" : null
      }`}
      onClick={onClick}
    >
      {value}
    </button>
  );
}

export default function Page() {
  const [squares, setSquares] = React.useState(Array(9).fill(null));
  const [xIsNext, setXIsNext] = React.useState(true);
  const [status, setStatus] = React.useState("Next player: X");
  const [inPlay, setInPlay] = React.useState(true);
  const [winningLine, setWinningLine] = React.useState([] as number[]);

  async function checkWinner() {
    setInPlay(false);
    const result = await fetch("/api/check", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ squares }),
    }).then((res) => res.json());
    console.log(result);
    if (result.winner) {
      setStatus(`Winner: ${result.winner}`);
      setWinningLine(result.line ?? []);
      setInPlay(false);
    } else if (!squares.includes(null)) {
      setStatus("It's a draw!");
      setInPlay(false);
    } else {
      setInPlay(true);
    }
  }

  React.useEffect(() => {
    checkWinner();
  }, [squares]);

  function handleClick(i: number) {
    if (!inPlay || squares[i]) {
      return;
    }
    const newSquares = squares.slice();
    newSquares[i] = xIsNext ? "X" : "O";
    setStatus(`Next player: ${xIsNext ? "O" : "X"}`);
    setSquares(newSquares);
    setXIsNext(!xIsNext);
  }

  function handleReset() {
    setSquares(Array(9).fill(null));
    setXIsNext(true);
    setStatus("Next player: X");
    setWinningLine([]);
    setInPlay(true);
  }

  return (
    <div className="space-y-2">
      <div>{status}</div>
      <div>
        <div className="flex">
          <Square
            value={squares[0]}
            onClick={() => handleClick(0)}
            winning={winningLine.includes(0)}
          />
          <Square
            value={squares[1]}
            onClick={() => handleClick(1)}
            winning={winningLine.includes(1)}
          />
          <Square
            value={squares[2]}
            onClick={() => handleClick(2)}
            winning={winningLine.includes(2)}
          />
        </div>
        <div className="flex">
          <Square
            value={squares[3]}
            onClick={() => handleClick(3)}
            winning={winningLine.includes(3)}
          />
          <Square
            value={squares[4]}
            onClick={() => handleClick(4)}
            winning={winningLine.includes(4)}
          />
          <Square
            value={squares[5]}
            onClick={() => handleClick(5)}
            winning={winningLine.includes(5)}
          />
        </div>
        <div className="flex">
          <Square
            value={squares[6]}
            onClick={() => handleClick(6)}
            winning={winningLine.includes(6)}
          />
          <Square
            value={squares[7]}
            onClick={() => handleClick(7)}
            winning={winningLine.includes(7)}
          />
          <Square
            value={squares[8]}
            onClick={() => handleClick(8)}
            winning={winningLine.includes(8)}
          />
        </div>
      </div>
      <button className="border-white border-2 p-2" onClick={handleReset}>
        Reset
      </button>
    </div>
  );
}
