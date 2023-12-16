#include <fstream>
#include <iostream>
#include <numeric>
#include <string>
#include <unordered_map>
#include <vector>

int main() {
  const std::unordered_map<std::string, int> wordMap({
      {"one", 1},
      {"1", 1},
      {"two", 2},
      {"2", 2},
      {"three", 3},
      {"3", 3},
      {"four", 4},
      {"4", 4},
      {"five", 5},
      {"5", 5},
      {"six", 6},
      {"6", 6},
      {"seven", 7},
      {"7", 7},
      {"eight", 8},
      {"8", 8},
      {"nine", 9},
      {"9", 9},
  });

  std::string line;
  std::ifstream file("day1/input.txt");

  if (!file.is_open()) {
    printf("Unable to open file");
  }

  std::vector<int> v;
  while (getline(file, line)) {
    std::unordered_map<int, char> map;

    char left = '\0';
    char right = '\0';

    for (const auto &kv : wordMap) {
      int ptr = 0;
      while (line.find(kv.first, ptr) != std::string::npos) {
        map[line.find(kv.first, ptr)] = kv.second;
        ptr += kv.first.size();
      }
    }

    int l = std::numeric_limits<int>::max();
    int h = std::numeric_limits<int>::min();
    // push to result first and last
    for (const auto &kv : map) {
      l = std::min(kv.first, l);
      h = std::max(kv.first, h);
    }

    std::string leftright = std::to_string(map[l]) + std::to_string(map[h]);

    v.push_back(stoi(leftright));
  }

  int result = std::reduce(v.begin(), v.end());

  printf("\n:: %d ::", result);
  file.close();

  return 0;
}