#include <algorithm>
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
  const int minUsed = std::numeric_limits<int>::min();

  std::string line;
  std::ifstream file("day2/input.txt");

  if (!file.is_open()) {
    printf("Unable to open file");
  };

  int index = 0;
  std::vector<int> rv;

  while (getline(file, line)) {
    index += 1;

    std::stringstream ssmatch(line);
    std::vector<std::string> match;

    while (getline(ssmatch, match.emplace_back(), ':'))
      ;

    std::stringstream ssets(match.at(1));
    std::vector<std::string> sets;

    while (getline(ssets, sets.emplace_back(), ';'))
      ;

    std::unordered_map<std::string, int> used(
        {{"red", minUsed}, {"blue", minUsed}, {"green", minUsed}});

    for (auto &set : sets) {
      std::stringstream ssgame(set);
      std::vector<std::string> games;

      while (getline(ssgame, games.emplace_back(), ','))
        ;

      for (auto &game : games) {
        std::istringstream iss(game);
        int count;
        std::string color;

        if (iss >> count >> color) {
          used.at(color) = std::max(used.at(color), count);
        }
      }
    }

    // multiply powers of cubes
    int cm = 1;
    for (const auto &pair : used) {
      cm *= pair.second;
    }
    // create vector from result
    rv.emplace_back(cm);
  }

  int result = reduce(rv.begin(), rv.end());
  printf("result: %d", result);
  file.close();

  return 0;
}