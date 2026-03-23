# Triangle Application (Java + JUnit)

This project reads 3 triangle side lengths from user input and classifies the triangle.

## Features
- Reads side lengths from console input
- Validates if the sides form a valid triangle
- Classifies as:
  - `EQUILATERAL`
  - `ISOSCELES`
  - `SCALENE`
  - `INVALID`
- Includes JUnit 5 tests for classification logic

## Run Tests
```bash
mvn test
```

## Run Application
```bash
mvn exec:java
```

## Example Input
```text
Enter side 1: 3
Enter side 2: 4
Enter side 3: 5
Triangle type: SCALENE
```
