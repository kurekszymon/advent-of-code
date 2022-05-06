const input = require("fs")
  .readFileSync("./1.txt", { encoding: "utf-8" })
  .split("");

const result = {
  part1: input.reduce((acc, curr) => (curr === "(" ? acc + 1 : acc - 1), 0),
  part2: input.reduce((acc, curr, index, arr) => {
    if (acc === -1) {
      arr.splice(1); // hack to break out of reduce
      return index;
    }
    return curr === "(" ? acc + 1 : acc - 1;
  }, 0),
};

console.log(result);
