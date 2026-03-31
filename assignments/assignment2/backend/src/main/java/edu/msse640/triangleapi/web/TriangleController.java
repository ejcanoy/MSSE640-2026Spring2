package edu.msse640.triangleapi.web;

import edu.msse640.triangleapi.domain.TriangleType;
import edu.msse640.triangleapi.model.Triangle;
import edu.msse640.triangleapi.model.TriangleRepository;
import edu.msse640.triangleapi.service.TriangleService;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/triangles")
@CrossOrigin(origins = "http://localhost:5173")
public class TriangleController {

    private final TriangleService triangleService;
    private final TriangleRepository triangleRepository;

    public TriangleController(TriangleService triangleService, TriangleRepository triangleRepository) {
        this.triangleService = triangleService;
        this.triangleRepository = triangleRepository;
    }

    @PostMapping("/classify")
    public TriangleClassifyResponse classify(@Valid @RequestBody TriangleRequest request) {
        Triangle savedTriangle = triangleService.classifyAndSave(request.sideA(), request.sideB(), request.sideC());

        if (!savedTriangle.getValid()) {
            return new TriangleClassifyResponse(savedTriangle.getId(), false, savedTriangle.getTriangleType(), "The provided sides do not form a valid triangle.");
        }

        return new TriangleClassifyResponse(savedTriangle.getId(), true, savedTriangle.getTriangleType(), "Triangle classified successfully.");
    }

    @GetMapping
    public ResponseEntity<List<Triangle>> getAllTriangles() {
        return ResponseEntity.ok(triangleRepository.findAll());
    }

    @GetMapping("/{id}")
    public ResponseEntity<Triangle> getTriangleById(@PathVariable Long id) {
        return triangleRepository.findById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PutMapping("/{id}")
    public ResponseEntity<Triangle> updateTriangle(@PathVariable Long id, @Valid @RequestBody TriangleRequest request) {
        return triangleRepository.findById(id)
                .map(triangle -> {
                    triangle.setSideA(request.sideA());
                    triangle.setSideB(request.sideB());
                    triangle.setSideC(request.sideC());
                    
                    TriangleType type = triangleService.classify(request.sideA(), request.sideB(), request.sideC());
                    triangle.setValid(type != TriangleType.INVALID);
                    triangle.setTriangleType(type);
                    
                    return ResponseEntity.ok(triangleRepository.save(triangle));
                })
                .orElse(ResponseEntity.notFound().build());
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteTriangle(@PathVariable Long id) {
        if (triangleRepository.existsById(id)) {
            triangleRepository.deleteById(id);
            return ResponseEntity.noContent().build();
        }
        return ResponseEntity.notFound().build();
    }
}
