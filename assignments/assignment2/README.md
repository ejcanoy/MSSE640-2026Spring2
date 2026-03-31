# Assignment 2: Triangle Full-Stack Application

This assignment extends the triangle program into a full-stack application with a Maven Spring Boot backend API and a React Tailwind frontend.

## Introduction
This project is a full-stack triangle classifier. The backend exposes an API endpoint that validates and classifies triangles. The frontend provides a user-friendly form with three side inputs, inline validation, and result/error panels.

Error handling is implemented in two layers:
- Frontend validation catches missing, non-numeric, and non-positive values before calling the API.
- Backend validation and triangle logic enforce correctness for server-side safety, including invalid triangle inequality cases.

Testing strategy includes backend unit and API tests plus frontend component tests for validation behavior.

## Details of the Program
- Backend language and framework: Java 17 with Spring Boot
- Backend build tool: Maven
- Frontend framework: React (Vite)
- Frontend styling: Tailwind CSS
- Backend tests: JUnit 5, Spring Boot Test, MockMvc
- Frontend tests: Vitest, Testing Library
- IDE used: Visual Studio Code

How data is entered:
- User enters sideA, sideB, and sideC in the frontend form.
- Frontend posts JSON payload to backend endpoint.

How output is produced:
- Frontend displays validity, triangle type, and message from API response.
- No file output is generated.

Main files:
- backend/src/main/java/edu/msse640/triangleapi/web/TriangleController.java
- backend/src/main/java/edu/msse640/triangleapi/service/TriangleService.java
- backend/src/test/java/edu/msse640/triangleapi/web/TriangleControllerTest.java
- frontend/src/App.jsx
- frontend/src/api.js
- frontend/src/App.test.jsx

## Table with Example Test Data
| Input Sides | Expected Valid? | Expected Type | Purpose |
| --- | --- | --- | --- |
| 3, 4, 5 | Yes | SCALENE | Normal valid scalene case |
| 5, 5, 5 | Yes | EQUILATERAL | All equal sides |
| 5, 5, 3 | Yes | ISOSCELES | Two equal sides |
| 1, 2, 3 | No | INVALID | Triangle inequality violation |
| 0, 4, 4 | No | INVALID or validation error | Rainy day: zero side |
| -1, 4, 4 | No | INVALID or validation error | Rainy day: negative side |

## Unit Tests
Backend tests:
- TriangleServiceTest:
  - shouldClassifyEquilateralTriangle
  - shouldClassifyIsoscelesTriangle
  - shouldClassifyScaleneTriangleInAllOrders
  - shouldReturnInvalidForZeroOrNegativeInput
  - shouldReturnInvalidWhenTriangleInequalityFails
- TriangleControllerTest:
  - shouldClassifyScaleneTriangle
  - shouldReturnInvalidForTriangleInequalityFailure
  - shouldReturnBadRequestForZeroLengthSide

Frontend tests:
- App.test.jsx:
  - shows validation messages when fields are missing

Why these tests were chosen:
- They verify required triangle classification behavior.
- They cover rainy day input handling.
- They verify API endpoint behavior and client-side validation UX.

## Bugs Encountered During Testing
- Frontend test initially failed because the submit button was disabled when fields were empty.
- Fix: submit now remains enabled unless loading, so validation can run and show inline errors.

## Problems
- First backend test run required many dependency downloads, which made logs very long.
- Keeping frontend and backend validation messages consistent required careful handling.

## Three Inputs You Can Try Now
1. sideA=3, sideB=4, sideC=5 expected valid, SCALENE
2. sideA=5, sideB=5, sideC=5 expected valid, EQUILATERAL
3. sideA=1, sideB=2, sideC=3 expected invalid triangle

## Screenshots
Add your screenshots in this folder and reference them below:
- images/backend-tests.png
- images/frontend-run.png

## What Is Included
- Spring Boot backend API in backend
- React Tailwind frontend in frontend
- Automated backend tests
- Automated frontend test
- Rubric-aligned writeup in this README

## Project Structure
- backend/pom.xml
- backend/src/main/java/edu/msse640/triangleapi
- backend/src/test/java/edu/msse640/triangleapi
- frontend/package.json
- frontend/src/App.jsx
- frontend/src/App.test.jsx
- images

## Build and Test
Backend:

cd backend
mvn test
mvn package

Frontend:

cd frontend
npm install
npm test
npm run build

## Run the Program
Start backend:

cd backend
mvn spring-boot:run

Start frontend (new terminal):

cd frontend
npm install
npm run dev

Frontend URL:
- http://localhost:5173

Backend API URL:
- http://localhost:8080/api/triangles/classify

## Notes for Submission
- Merge your final work into main before submitting.
- Submit your GitHub repository link in WorldClass based on your instructor instructions.
- If group submission, add all group member names below.

## Group Information
- Member 1:
- Member 2:
- Member 3:
