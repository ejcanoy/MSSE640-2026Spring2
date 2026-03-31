package edu.msse640.triangleapi.service;

import edu.msse640.triangleapi.domain.TriangleType;
import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.assertEquals;

class TriangleServiceTest {

    private final TriangleService triangleService = new TriangleService();

    @Test
    void shouldClassifyEquilateralTriangle() {
        assertEquals(TriangleType.EQUILATERAL, triangleService.classify(5, 5, 5));
    }

    @Test
    void shouldClassifyIsoscelesTriangle() {
        assertEquals(TriangleType.ISOSCELES, triangleService.classify(5, 5, 3));
    }

    @Test
    void shouldClassifyScaleneTriangleInAllOrders() {
        assertEquals(TriangleType.SCALENE, triangleService.classify(4, 5, 6));
        assertEquals(TriangleType.SCALENE, triangleService.classify(4, 6, 5));
        assertEquals(TriangleType.SCALENE, triangleService.classify(5, 4, 6));
        assertEquals(TriangleType.SCALENE, triangleService.classify(5, 6, 4));
        assertEquals(TriangleType.SCALENE, triangleService.classify(6, 4, 5));
        assertEquals(TriangleType.SCALENE, triangleService.classify(6, 5, 4));
    }

    @Test
    void shouldReturnInvalidForZeroOrNegativeInput() {
        assertEquals(TriangleType.INVALID, triangleService.classify(0, 4, 4));
        assertEquals(TriangleType.INVALID, triangleService.classify(-1, 4, 4));
    }

    @Test
    void shouldReturnInvalidWhenTriangleInequalityFails() {
        assertEquals(TriangleType.INVALID, triangleService.classify(1, 2, 3));
    }
}
