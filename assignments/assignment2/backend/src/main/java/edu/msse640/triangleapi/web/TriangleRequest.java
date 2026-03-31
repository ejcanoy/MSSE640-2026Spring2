package edu.msse640.triangleapi.web;

import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Positive;

public record TriangleRequest(
        @NotNull(message = "sideA is required")
        @Positive(message = "sideA must be greater than 0")
        Double sideA,

        @NotNull(message = "sideB is required")
        @Positive(message = "sideB must be greater than 0")
        Double sideB,

        @NotNull(message = "sideC is required")
        @Positive(message = "sideC must be greater than 0")
        Double sideC
) {
}
