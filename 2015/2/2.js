const input = require("fs")
  .readFileSync("./2.txt", { encoding: "utf-8" })
  .split("\n");

const result = {
  part1: input.reduce((acc, curr) => {
    const [l, w, h] = curr.split("x").map(Number);
    return acc + calcArea(l, w, h);
  }, 0),
  part2: input.reduce((acc, curr) => {
    const [l, w, h] = curr.split("x").map(Number);
    return acc + calcRibbon(l, w, h);
  }, 0),
};

function calcRibbon(l, w, h) {
  const base = l * w * h;
  const twoSmallest = [l, w, h]
    .sort((a, b) => a - b)
    .slice(0, 2)
    .reduce((a, b) => a + b * 2, 0);

  return base + twoSmallest;
}

function calcArea(l, w, h) {
  const sides = [l * w, w * h, h * l];
  const smallestArea = Math.min(...sides);

  return sides.reduce((a, b) => a + b * 2, 0) + smallestArea;
}

console.log(result);
