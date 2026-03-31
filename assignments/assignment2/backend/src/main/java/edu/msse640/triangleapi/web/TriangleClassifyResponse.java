package edu.msse640.triangleapi.web;

import edu.msse640.triangleapi.domain.TriangleType;

public record TriangleClassifyResponse(
        Long id,
        boolean valid,
        TriangleType triangleType,
        String message
) {}
