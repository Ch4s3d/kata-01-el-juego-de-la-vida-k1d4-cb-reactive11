import { Board } from './Board.js';

Main();

function Main() {
  const board = new Board(6, 6, 3, 6);
  console.table(board.cells);

  board.Cicles()
}