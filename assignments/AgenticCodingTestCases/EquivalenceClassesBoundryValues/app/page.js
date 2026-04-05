"use client";

import { useMemo, useState } from "react";

const boundaryValues = [0, 1, 2, 99, 100, 101];

const sunnyDayScenarios = [
  { value: 1, expected: "Valid", note: "Lower valid boundary" },
  { value: 50, expected: "Valid", note: "Typical valid input" },
  { value: 100, expected: "Valid", note: "Upper valid boundary" }
];

const rainyDayScenarios = [
  { value: 0, expected: "Invalid", note: "Just below lower boundary" },
  { value: 101, expected: "Invalid", note: "Just above upper boundary" },
  { value: "abc", expected: "Invalid", note: "Non-numeric input" }
];

function classifyInput(rawValue) {
  if (rawValue.trim() === "") {
    return { status: "Invalid", reason: "Input is empty.", equivalenceClass: "Invalid Class I0" };
  }

  const parsed = Number(rawValue);
  if (!Number.isFinite(parsed) || !Number.isInteger(parsed)) {
    return { status: "Invalid", reason: "Input must be an integer.", equivalenceClass: "Invalid Class I1" };
  }

  if (parsed < 1) {
    return { status: "Invalid", reason: "Input is below 1.", equivalenceClass: "Invalid Class I2" };
  }

  if (parsed > 100) {
    return { status: "Invalid", reason: "Input is above 100.", equivalenceClass: "Invalid Class I3" };
  }

  if (parsed === 1 || parsed === 100) {
    return { status: "Valid", reason: "Input hits an exact boundary value.", equivalenceClass: "Valid Boundary Class V1" };
  }

  return { status: "Valid", reason: "Input is inside the valid range.", equivalenceClass: "Valid Interior Class V2" };
}

export default function HomePage() {
  const [input, setInput] = useState("50");
  const [chaosMode, setChaosMode] = useState(false);

  const result = useMemo(() => classifyInput(input), [input]);
  const numericValue = Number(input);
  const isNumeric = Number.isFinite(numericValue);
  const meterPercent = isNumeric ? Math.max(0, Math.min(100, numericValue)) : 0;

  return (
    <main className={`page ${chaosMode ? "chaos" : ""}`}>
      <div className="aurora" aria-hidden="true">
        <span className="blob blobA" />
        <span className="blob blobB" />
        <span className="blob blobC" />
      </div>

      <section className="hero card">
        <p className="badge">Interactive Test Design Playground</p>
        <h1 className="titleGlitch">Equivalence Classes + Boundary Value Analysis</h1>
        <p>
          This mini app checks an integer input in the range 1 to 100. It highlights equivalence classes
          and boundary behavior for sunny day and rainy day testing.
        </p>
        <button className="chaosToggle" onClick={() => setChaosMode((previous) => !previous)}>
          {chaosMode ? "Disable Chaos Mode" : "Enable Chaos Mode"}
        </button>
      </section>

      <section className="card">
        <h2>Interactive Classifier</h2>
        <label htmlFor="candidateInput">Enter an integer:</label>
        <div className="inputRow">
          <input
            id="candidateInput"
            value={input}
            onChange={(event) => setInput(event.target.value)}
            placeholder="Try values like 0, 1, 50, 100, 101"
          />
        </div>

        <div className="meterWrap" style={{ "--meter": `${meterPercent}%` }}>
          <div className="meter" />
          <p>Input position in range 1-100: {isNumeric ? meterPercent : "N/A"}</p>
        </div>

        <div className={`result ${result.status === "Valid" ? "valid" : "invalid"}`}>
          <p><strong>Status:</strong> {result.status}</p>
          <p><strong>Class:</strong> {result.equivalenceClass}</p>
          <p><strong>Reason:</strong> {result.reason}</p>
        </div>
      </section>

      <section className="card">
        <h2>Boundary Values</h2>
        <p>Key boundaries tested around the valid range [1, 100]:</p>
        <div className="chips">
          {boundaryValues.map((value) => (
            <span
              key={value}
              className={`chip ${value < 1 || value > 100 ? "outside" : "inside"}`}
            >
              {value}
            </span>
          ))}
        </div>
      </section>

      <section className="grid">
        <article className="card">
          <h2>Sunny Day Scenarios (Expected Valid)</h2>
          <ul>
            {sunnyDayScenarios.map((item) => (
              <li key={`${item.value}-${item.expected}`}>
                <strong>Input {String(item.value)}:</strong> {item.expected} ({item.note})
              </li>
            ))}
          </ul>
        </article>

        <article className="card">
          <h2>Rainy Day Scenarios (Expected Invalid)</h2>
          <ul>
            {rainyDayScenarios.map((item) => (
              <li key={`${item.value}-${item.expected}`}>
                <strong>Input {String(item.value)}:</strong> {item.expected} ({item.note})
              </li>
            ))}
          </ul>
        </article>
      </section>
    </main>
  );
}
