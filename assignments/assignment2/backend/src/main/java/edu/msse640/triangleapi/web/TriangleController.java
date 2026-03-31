package edu.msse640.triangleapi.web;

import edu.msse640.triangleapi.domain.TriangleType;
import edu.msse640.triangleapi.service.TriangleService;
import jakarta.validation.Valid;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/triangles")
@CrossOrigin(origins = "http://localhost:5173")
public class TriangleController {

    private final TriangleService triangleService;

    public TriangleController(TriangleService triangleService) {
        this.triangleService = triangleService;
    }

    @PostMapping("/classify")
    public TriangleResponse classify(@Valid @RequestBody TriangleRequest request) {
        TriangleType type = triangleService.classify(request.sideA(), request.sideB(), request.sideC());

        if (type == TriangleType.INVALID) {
            return new TriangleResponse(false, type, "The provided sides do not form a valid triangle.");
        }

        return new TriangleResponse(true, type, "Triangle classified successfully.");
    }
}
