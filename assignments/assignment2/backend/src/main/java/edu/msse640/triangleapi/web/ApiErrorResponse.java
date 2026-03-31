package edu.msse640.triangleapi.web;

import java.util.List;

public record ApiErrorResponse(
        String message,
        List<String> details
) {
}
