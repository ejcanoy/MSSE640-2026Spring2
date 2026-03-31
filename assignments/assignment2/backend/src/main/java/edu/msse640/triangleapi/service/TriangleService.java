package edu.msse640.triangleapi.service;

import edu.msse640.triangleapi.domain.TriangleType;
import edu.msse640.triangleapi.model.Triangle;
import edu.msse640.triangleapi.model.TriangleRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class TriangleService {

    @Autowired
    private TriangleRepository triangleRepository;

    public TriangleType classify(double sideA, double sideB, double sideC) {
        if (sideA <= 0 || sideB <= 0 || sideC <= 0) {
            return TriangleType.INVALID;
        }

        if (sideA + sideB <= sideC || sideA + sideC <= sideB || sideB + sideC <= sideA) {
            return TriangleType.INVALID;
        }

        if (sideA == sideB && sideB == sideC) {
            return TriangleType.EQUILATERAL;
        }

        if (sideA == sideB || sideA == sideC || sideB == sideC) {
            return TriangleType.ISOSCELES;
        }

        return TriangleType.SCALENE;
    }

    public Triangle classifyAndSave(double sideA, double sideB, double sideC) {
        TriangleType type = classify(sideA, sideB, sideC);
        
        Triangle triangle = new Triangle();
        triangle.setSideA(sideA);
        triangle.setSideB(sideB);
        triangle.setSideC(sideC);
        triangle.setValid(type != TriangleType.INVALID);
        triangle.setTriangleType(type);
        
        return triangleRepository.save(triangle);
    }
}
