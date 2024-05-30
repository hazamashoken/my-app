"use server";

import { WIN_LINES } from "../config";

export async function checkWinnerAction(squares: string[]) {
  for (let i = 0; i < WIN_LINES.length; i++) {
    const [a, b, c] = WIN_LINES[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return { winner: squares[a], line: WIN_LINES[i] };
    }
  }
  return null;
}
