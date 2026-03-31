package edu.msse640.triangleapi.service;

import edu.msse640.triangleapi.domain.TriangleType;
import org.springframework.stereotype.Service;

@Service
public class TriangleService {

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
}
