package edu.msse640.triangleapi.web;

import edu.msse640.triangleapi.domain.TriangleType;

public record TriangleResponse(
        boolean valid,
        TriangleType triangleType,
        String message
) {
}
