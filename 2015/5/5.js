const input = require("fs")
  .readFileSync("./5.txt", { encoding: "utf-8" })
  .split("\n");

const part1 = {
  isNice: function (str) {
    if (
      !this.rules.notContainsNotAllowedSubstrings(str) ||
      !this.rules.hasAtLeast3Vowels(str) ||
      !this.rules.isLetterDoubled(str)
    ) {
      return false;
    }

    return true;
  },

  rules: {
    hasAtLeast3Vowels: function (str) {
      const vowels = ["a", "e", "i", "o", "u"]; // at least 3 of these
      let vowelCount = 0;

      for (let i = 0; i < str.length; i++) {
        const letter = str[i];
        if (vowels.includes(letter)) {
          vowelCount++;
        }
        if (vowelCount >= 3) {
          return true;
        }
      }

      return false;
    },
    isLetterDoubled: function (str) {
      for (let i = 1; i < str.length; i++) {
        const [letter, prevLetter] = [str[i], str[i - 1]];

        if (letter === prevLetter) {
          return true;
        }
      }
    },
    notContainsNotAllowedSubstrings: function (str) {
      const notAllowedSubstrings = ["ab", "cd", "pq", "xy"];

      return !notAllowedSubstrings.reduce(
        (acc, curr) => acc || str.includes(curr),
        false
      );
    },
  },

  tests: function () {
    console.log("--- tests part 1 ---");
    console.assert(this.isNice("ugknbfddgicrmopn"), 1);
    console.assert(this.isNice("aaa"), 2);
    console.assert(!this.isNice("jchzalrnumimnmhp"), 3);
    console.assert(!this.isNice("haegwjzuvuyypxyu"), 4);
  },
};

const part2 = {
  isNice: function (str) {
    if (!this.rules.clutch(str) || !this.rules.hasSamePair(str)) {
      return false;
    }

    return true;
  },
  rules: {
    clutch: function (str) {
      for (let i = 2; i < str.length; i++) {
        const [start, end] = [str[i - 2], str[i]];

        if (start === end) {
          return true;
        }
      }
    },
    hasSamePair: function (str) {
      for (let i = 2; i < str.length; i++) {
        let [prev, curr] = [str[i - 2], str[i - 1]];
        const pair = prev + curr;

        if (str.substring(i).includes(pair)) {
          return true;
        }
      }

      return false;
    },
  },
  tests: function () {
    console.log("--- tests part 2 ---");
    console.assert(this.isNice("qjhvhtzxzqqjkmpb"), 1);
    console.assert(this.isNice("xxyxx"), 2);
    console.assert(!this.isNice("uurcxstgmygtbstg"), 3);
    console.assert(!this.isNice("ieodom"), 4);
  },
};

part1.tests();
part2.tests();

const result = {
  part1: input.reduce((acc, curr) => (part1.isNice(curr) ? acc + 1 : acc), 0),
  part2: input.reduce((acc, curr) => (part2.isNice(curr) ? acc + 1 : acc), 0),
};

console.log(result);
