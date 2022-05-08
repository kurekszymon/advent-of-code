const input = require("fs")
  .readFileSync("./3.txt", { encoding: "utf-8" })
  .split("");

const vars = {
  grid: {},
  row: 0,
  column: 0,
  roboRow: 0,
  roboColumn: 0,
  get XY() {
    return `${this.row}:${this.column}`;
  },
  get roboXY() {
    return `${this.roboRow}:${this.roboColumn}`;
  },
};

const resetVariables = () => {
  vars.row = 0;
  vars.column = 0;
  vars.roboRow = 0;
  vars.roboColumn = 0;
  vars.grid = {};
};

const parseDirection = (dir, isRobo = false) => {
  switch (dir) {
    case "^":
      return isRobo ? vars.roboRow++ : vars.row++;
    case "v":
      return isRobo ? vars.roboRow-- : vars.row--;
    case ">":
      return isRobo ? vars.roboColumn++ : vars.column++;
    case "<":
      return isRobo ? vars.roboColumn-- : vars.column--;
    default:
      return;
  }
};

const result = {
  part1: function () {
    resetVariables();

    input.forEach((x) => {
      parseDirection(x);
      vars.grid[vars.XY] = true;
    });

    return Object.keys(vars.grid).length + 1; // +1 for initial move
  },

  part2: function () {
    resetVariables();

    input.forEach((x, idx) => {
      parseDirection(x, idx % 2 !== 0);

      vars.grid[vars.XY] = true;
      vars.grid[vars.roboXY] = true;
    });

    return Object.keys(vars.grid).length;
  },
};

console.log(
  // format accordingly
  ...Object.entries(result).map(([key, value]) => ({ [key]: value() }))
);
