import { useState } from "react";
import { classifyTriangle } from "./api";
import TriangleList from "./components/TriangleList";

const emptyInputs = {
  sideA: "",
  sideB: "",
  sideC: ""
};

function validateInputs(inputs) {
  const errors = {};

  for (const [key, value] of Object.entries(inputs)) {
    if (value.trim() === "") {
      errors[key] = `${key} is required`;
      continue;
    }

    const numericValue = Number(value);
    if (Number.isNaN(numericValue)) {
      errors[key] = `${key} must be a number`;
      continue;
    }

    if (numericValue <= 0) {
      errors[key] = `${key} must be greater than 0`;
    }
  }

  return errors;
}

export default function App() {
  const [inputs, setInputs] = useState(emptyInputs);
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [apiError, setApiError] = useState("");
  const [refreshTrigger, setRefreshTrigger] = useState(0);

  function handleInputChange(event) {
    const { name, value } = event.target;
    setInputs((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: undefined }));
    setApiError("");
    setResult(null);
  }

  async function handleSubmit(event) {
    event.preventDefault();

    const validationErrors = validateInputs(inputs);
    setErrors(validationErrors);
    setResult(null);
    setApiError("");

    if (Object.keys(validationErrors).length > 0) {
      return;
    }

    setIsLoading(true);

    try {
      const payload = {
        sideA: Number(inputs.sideA),
        sideB: Number(inputs.sideB),
        sideC: Number(inputs.sideC)
      };

      const response = await classifyTriangle(payload);
      setResult(response);
      setInputs(emptyInputs);
      setRefreshTrigger(prev => prev + 1);
    } catch (error) {
      setApiError(error.message || "Failed to classify triangle.");
    } finally {
      setIsLoading(false);
    }
  }

  function resetForm() {
    setInputs(emptyInputs);
    setErrors({});
    setResult(null);
    setApiError("");
  }

  return (
    <main className="min-h-screen w-full bg-gradient-to-br from-teal-50 to-blue-50 p-6">
      <div className="mx-auto max-w-7xl">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Form Section */}
          <div className="lg:col-span-1">
            <section className="rounded-3xl border border-teal-200/60 bg-white/90 p-8 shadow-xl backdrop-blur-sm sticky top-6">
              <h1 className="text-3xl font-bold text-slate-900">Triangle Classifier</h1>
              <p className="mt-2 text-slate-600">
                Enter three side lengths to check if the triangle is valid and determine its type.
              </p>

              <form onSubmit={handleSubmit} className="mt-8 space-y-5">
                {["sideA", "sideB", "sideC"].map((field) => (
                  <div key={field}>
                    <label htmlFor={field} className="mb-1 block text-sm font-semibold text-slate-700">
                      {field}
                    </label>
                    <input
                      id={field}
                      name={field}
                      type="number"
                      step="any"
                      value={inputs[field]}
                      onChange={handleInputChange}
                      className="w-full rounded-xl border border-slate-300 px-4 py-3 text-slate-900 outline-none transition focus:border-accent-500 focus:ring-2 focus:ring-accent-500/20"
                      placeholder="Enter a positive number"
                    />
                    {errors[field] ? <p className="mt-1 text-sm text-red-600">{errors[field]}</p> : null}
                  </div>
                ))}

                <div className="flex flex-wrap gap-3">
                  <button
                    type="submit"
                    disabled={isLoading}
                    className="rounded-xl bg-accent-500 px-5 py-3 font-semibold text-white transition hover:bg-accent-600 disabled:cursor-not-allowed disabled:opacity-60"
                  >
                    {isLoading ? "Checking..." : "Classify Triangle"}
                  </button>
                  <button
                    type="button"
                    onClick={resetForm}
                    className="rounded-xl border border-slate-300 px-5 py-3 font-semibold text-slate-700 transition hover:bg-slate-100"
                  >
                    Reset
                  </button>
                </div>
              </form>

              {apiError ? (
                <div className="mt-6 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-red-700">
                  {apiError}
                </div>
              ) : null}

              {result ? (
                <div className="mt-6 rounded-xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-emerald-900">
                  <p className="font-semibold">Result</p>
                  <p>Valid triangle: {result.valid ? "Yes" : "No"}</p>
                  <p>Triangle type: {result.triangleType}</p>
                  <p className="text-sm opacity-80">{result.message}</p>
                </div>
              ) : null}
            </section>
          </div>

          {/* History Panel */}
          <div className="lg:col-span-2 h-screen sticky top-6">
            <TriangleList 
              refreshTrigger={refreshTrigger}
              onTriangleUpdated={() => setRefreshTrigger(prev => prev + 1)}
            />
          </div>
        </div>
      </div>
    </main>
  );
}
