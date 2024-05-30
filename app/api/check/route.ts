import { WIN_LINES } from "@/app/game/server-action/config";

export async function POST(request: Request) {
  const res = await request.json();
  const squares = res.squares;
  if (!squares) {
    return Response.json({ error: "Missing squares" }, { status: 400 });
  }

  for (let i = 0; i < WIN_LINES.length; i++) {
    const [a, b, c] = WIN_LINES[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return Response.json({ winner: squares[a], line: WIN_LINES[i] });
    }
  }
  return Response.json({ winner: null, line: [] });
}
