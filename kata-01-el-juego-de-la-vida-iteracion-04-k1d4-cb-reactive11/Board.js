module.exports = class Board {
  constructor(rows, columns, cicles, alive) {
    this.rows = rows;
    this.columns = columns;
    this.cicles = cicles;
    this.alive = alive;
    this.cells = [];
    this.tempCells = [];
  }

  start() {
    this.InitializeArray();
    this.InitializeCells();
    this.addAliveCells();
    
  }

  InitializeArray() {
    this.cells = new Array(this.columns);
    for (var i = 0; i < this.cells.length; i++) {
        this.cells[i] = new Array(this.rows);
    }
  }

  InitializeCells() {
    //Dead
    for (var i = 0; i < this.columns; i++){
      for (var j = 0; j < this.rows; j++){
        this.cells[j][i] = 0;
      }
    }
  }

  addAliveCells() {
    for (var i = 0; i < this.alive; i++){
      var x = Math.floor((Math.random() * (this.rows - 2)) + 1)
      var y = Math.floor((Math.random() * (this.columns - 2)) + 1)
      if (this.cells[x][y] == 0 && (x>0 && x<this.rows) && (y>0 && y<this.rows)) {
        this.cells[x][y] = 1;
      } else i--;
    }
  }

  // Cicles ------------------

  Cicles() {
    for (var i = 0; i < this.cicles; i++){
      this.tableCheck();
    }
  }

  tableCheck() {
    let result = [];
    let res = [];
    var contador = 0;

    for (let i = 0; i < this.columns; i++) {
      for (let j = 0; j < this.rows; j++) { 
        contador = this.neighbourCounter(i, j);
        res.push(this.Rules(i, j, contador))
      }
      result.push(res);
      res = [];
    }
    console.table(result);
    this.cells = result;
    return this.cells;
  }

  neighbourCounter(x, y) {
    var neighbours = 0;
    
    for (var i = -1; i <= 1; i++)
      for (var j = -1; j <= 1; j++){
        var horizontal = x + j;
        var vertical = y + i;
        if ((horizontal >= 0 && horizontal <= this.rows-1) && (vertical >= 0 && vertical <= this.columns-1))
          if(this.cells[horizontal][vertical] == 1 && !(x==horizontal && y==vertical))
            neighbours++;
      }
    //console.table(this.cells)
    return neighbours;
  }
  
  Rules(x, y, n) {
    if (this.cells[x][y] == 1) { // Is Alive
      if (n == 2 || n == 3)
        // n == 3 > Lives
        return 1;
      else if (n < 2 || n > 3)
        // n > 3 || n < 2 > Dies
        return 0 ;
      }
    else if (this.cells[x][y] == 0 ) { // Is Dead
      if(n == 3)
      // n == 3 > Alive if Dead
        return 1;
      else return 0; 
    }
    
  }
};
