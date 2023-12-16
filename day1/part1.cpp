#include <fstream>
#include <iostream>
#include <numeric>
#include <string>
#include <vector>

using namespace std;

int main() {
  string line;
  ifstream file("day1/input.txt");

  if (!file.is_open()) {
    printf("Unable to open file");
  }
  vector<int> v;

  while (getline(file, line)) {
    char left = '\0';
    char right = '\0';

    for (int i = 0; i < line.size(); i++) {
      char c = line[i];

      if (!isdigit(c)) {
        continue;
      }

      if (left == 0) {
        left = c;
      }

      right = c;
    }

    string leftright = std::string(1, left) + right;

    v.push_back(stoi(leftright));
  }

  int result = std::reduce(v.begin(), v.end());
  printf("%d", result);

  file.close();

  return 0;
}