const { MD5 } = require("./md5");
const input = "ckczppom";

const result = { part1: null, part2: null };
let i = 0;

function checkLeadingZeroes(i, noOfZeroes) {
  return (
    [...MD5(input + i)].splice(0, noOfZeroes).join("") ===
    "0".repeat(noOfZeroes)
  );
}

while (!result.part1 || !result.part2) {
  const part1 = checkLeadingZeroes(i, 5);
  const part2 = checkLeadingZeroes(i, 6);

  if (part1 && !result.part1) {
    result.part1 = i;
  }

  if (part2 && !result.part2) {
    result.part2 = i;
  }

  i++;
}

console.log(result);
