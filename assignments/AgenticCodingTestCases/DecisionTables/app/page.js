"use client";

import { useMemo, useState } from "react";

const decisionRules = [
  {
    id: "R1",
    conditions: { creditScoreHigh: true, incomeStable: true, ageAdult: true },
    action: "Approved",
    risk: "Low"
  },
  {
    id: "R2",
    conditions: { creditScoreHigh: true, incomeStable: false, ageAdult: true },
    action: "Manual Review",
    risk: "Medium"
  },
  {
    id: "R3",
    conditions: { creditScoreHigh: false, incomeStable: true, ageAdult: true },
    action: "Manual Review",
    risk: "Medium"
  },
  {
    id: "R4",
    conditions: { creditScoreHigh: false, incomeStable: false, ageAdult: true },
    action: "Rejected",
    risk: "High"
  },
  {
    id: "R5",
    conditions: { ageAdult: false },
    action: "Rejected",
    risk: "High"
  }
];

const sunnyDayScenarios = [
  "credit >= 700, income stable, age >= 18 => Approved (R1)",
  "credit = 720, income unstable, age >= 18 => Manual Review (R2)",
  "credit = 640, income stable, age >= 18 => Manual Review (R3)"
];

const rainyDayScenarios = [
  "credit = 610, income unstable, age >= 18 => Rejected (R4)",
  "credit = 750, income stable, age = 17 => Rejected (R5)",
  "credit input empty or non-numeric => Invalid Input"
];

function toCurrency(value) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0
  }).format(value);
}

function classifyApplication({ creditScoreRaw, annualIncomeRaw, ageRaw, employmentYearsRaw }) {
  if (
    creditScoreRaw.trim() === "" ||
    annualIncomeRaw.trim() === "" ||
    ageRaw.trim() === "" ||
    employmentYearsRaw.trim() === ""
  ) {
    return {
      status: "Invalid Input",
      reason: "All fields are required.",
      matchedRule: "N/A",
      risk: "N/A"
    };
  }

  const creditScore = Number(creditScoreRaw);
  const annualIncome = Number(annualIncomeRaw);
  const age = Number(ageRaw);
  const employmentYears = Number(employmentYearsRaw);

  if (
    !Number.isFinite(creditScore) ||
    !Number.isFinite(annualIncome) ||
    !Number.isFinite(age) ||
    !Number.isFinite(employmentYears)
  ) {
    return {
      status: "Invalid Input",
      reason: "Inputs must be numeric.",
      matchedRule: "N/A",
      risk: "N/A"
    };
  }

  if (!Number.isInteger(age) || age < 0 || creditScore < 300 || creditScore > 850 || annualIncome < 0 || employmentYears < 0) {
    return {
      status: "Invalid Input",
      reason: "One or more values are outside accepted ranges.",
      matchedRule: "N/A",
      risk: "N/A"
    };
  }

  const conditions = {
    creditScoreHigh: creditScore >= 700,
    incomeStable: annualIncome >= 50000 && employmentYears >= 2,
    ageAdult: age >= 18
  };

  if (!conditions.ageAdult) {
    const rule = decisionRules.find((item) => item.id === "R5");
    return {
      status: rule.action,
      reason: "Applicant must be at least 18.",
      matchedRule: rule.id,
      risk: rule.risk,
      conditions
    };
  }

  const matched = decisionRules.find(
    (rule) =>
      rule.conditions.creditScoreHigh === conditions.creditScoreHigh &&
      rule.conditions.incomeStable === conditions.incomeStable &&
      rule.conditions.ageAdult === conditions.ageAdult
  );

  return {
    status: matched.action,
    reason:
      matched.id === "R1"
        ? "Strong credit and stable income satisfy automatic approval conditions."
        : matched.id === "R4"
          ? "Low credit and unstable income trigger rejection."
          : "One key condition failed, so this case requires manual review.",
    matchedRule: matched.id,
    risk: matched.risk,
    conditions
  };
}

export default function HomePage() {
  const [creditScore, setCreditScore] = useState("720");
  const [annualIncome, setAnnualIncome] = useState("76000");
  const [age, setAge] = useState("30");
  const [employmentYears, setEmploymentYears] = useState("4");

  const result = useMemo(
    () => classifyApplication({ creditScoreRaw: creditScore, annualIncomeRaw: annualIncome, ageRaw: age, employmentYearsRaw: employmentYears }),
    [creditScore, annualIncome, age, employmentYears]
  );

  return (
    <main className="page">
      <section className="card hero">
        <p className="badge">Interactive Decision Table Playground</p>
        <h1>Decision Tables for Loan Approval Rules</h1>
        <p>
          This React/Next app models complex IF-THEN business rules. The output depends on combinations of
          conditions, not a single input.
        </p>
      </section>

      <section className="card">
        <h2>Try Input Conditions</h2>
        <div className="formGrid">
          <label>
            Credit Score (300-850)
            <input value={creditScore} onChange={(event) => setCreditScore(event.target.value)} placeholder="e.g. 720" />
          </label>
          <label>
            Annual Income (USD)
            <input value={annualIncome} onChange={(event) => setAnnualIncome(event.target.value)} placeholder="e.g. 76000" />
          </label>
          <label>
            Age
            <input value={age} onChange={(event) => setAge(event.target.value)} placeholder="e.g. 30" />
          </label>
          <label>
            Years Employed
            <input value={employmentYears} onChange={(event) => setEmploymentYears(event.target.value)} placeholder="e.g. 4" />
          </label>
        </div>

        <div className="conditionStrip">
          <span className={result.conditions?.creditScoreHigh ? "true" : "false"}>Credit {">="} 700</span>
          <span className={result.conditions?.incomeStable ? "true" : "false"}>Income {">="} {toCurrency(50000)} and Employment {">="} 2 years</span>
          <span className={result.conditions?.ageAdult ? "true" : "false"}>Age {">="} 18</span>
        </div>

        <div className={`result ${result.status === "Approved" ? "approved" : result.status === "Manual Review" ? "review" : "rejected"}`}>
          <p><strong>Decision:</strong> {result.status}</p>
          <p><strong>Rule:</strong> {result.matchedRule}</p>
          <p><strong>Risk:</strong> {result.risk}</p>
          <p><strong>Reason:</strong> {result.reason}</p>
        </div>
      </section>

      <section className="card">
        <h2>Decision Table</h2>
        <div className="tableWrap">
          <table>
            <thead>
              <tr>
                <th>Rule</th>
                <th>Credit High?</th>
                <th>Income Stable?</th>
                <th>Adult?</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {decisionRules.map((rule) => (
                <tr key={rule.id} className={result.matchedRule === rule.id ? "active" : ""}>
                  <td>{rule.id}</td>
                  <td>{typeof rule.conditions.creditScoreHigh === "boolean" ? String(rule.conditions.creditScoreHigh) : "-"}</td>
                  <td>{typeof rule.conditions.incomeStable === "boolean" ? String(rule.conditions.incomeStable) : "-"}</td>
                  <td>{String(rule.conditions.ageAdult)}</td>
                  <td>{rule.action}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section className="grid">
        <article className="card">
          <h2>Sunny Day Scenarios</h2>
          <ul>
            {sunnyDayScenarios.map((scenario) => (
              <li key={scenario}>{scenario}</li>
            ))}
          </ul>
        </article>

        <article className="card">
          <h2>Rainy Day Scenarios</h2>
          <ul>
            {rainyDayScenarios.map((scenario) => (
              <li key={scenario}>{scenario}</li>
            ))}
          </ul>
        </article>
      </section>
    </main>
  );
}
