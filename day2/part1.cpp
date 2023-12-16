#include <fstream>
#include <iostream>
#include <numeric>
#include <sstream>
#include <string>
#include <unordered_map>
#include <vector>

int main() {
  const std::unordered_map<std::string, int> bag(
      {{"blue", 14}, {"green", 13}, {"red", 12}});

  std::string line;
  std::ifstream file("day2/input.txt");

  if (!file.is_open()) {
    printf("Unable to open file");
  }

  int index = 0;
  std::vector<int> validGameIndices;

  while (getline(file, line)) {
    index += 1;
    // used to split string based on delimeter
    std::stringstream ssmatch(line);
    std::vector<std::string> match;
    bool isGamePossible = true;

    while (getline(ssmatch, match.emplace_back(), ':'))
      ;

    std::stringstream ssets(match.at(1));
    std::vector<std::string> sets;

    while (getline(ssets, sets.emplace_back(), ';'))
      ;

    for (auto &set : sets) {
      std::stringstream ssgames(set);
      std::vector<std::string> games;

      while (getline(ssgames, games.emplace_back(), ','))
        ;

      for (auto &game : games) {
        std::istringstream iss(game);
        int count;
        std::string color;

        // Extracting values from the string
        if (iss >> count >> color) {
          if (bag.at(color) < count) {
            isGamePossible = false;
            break;
          }
        }
      }
    }

    // creates a vector of possible games
    if (isGamePossible) {
      validGameIndices.emplace_back(index);
    }
  }
  int result = reduce(validGameIndices.begin(), validGameIndices.end());
  printf("result: %d", result);
  file.close();

  return 0;
}