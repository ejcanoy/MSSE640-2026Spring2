import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import App from "./App";

vi.mock("./api", () => ({
  classifyTriangle: vi.fn(() => Promise.resolve({ valid: true, triangleType: "SCALENE", message: "ok" }))
}));

describe("App", () => {
  it("shows validation messages when fields are missing", async () => {
    render(<App />);

    fireEvent.click(screen.getByRole("button", { name: /classify triangle/i }));

    expect(await screen.findByText(/sideA is required/i)).toBeInTheDocument();
    expect(await screen.findByText(/sideB is required/i)).toBeInTheDocument();
    expect(await screen.findByText(/sideC is required/i)).toBeInTheDocument();
  });
});
