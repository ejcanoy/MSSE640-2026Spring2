package edu.msse640.triangle;

import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.assertEquals;

class TriangleClassifierTest {

    @Test
    void shouldClassifyEquilateral() {
        assertEquals(TriangleType.EQUILATERAL, TriangleClassifier.classify(3, 3, 3));
    }

    @Test
    void shouldClassifyIsosceles() {
        assertEquals(TriangleType.ISOSCELES, TriangleClassifier.classify(5, 5, 3));
    }

    @Test
    void shouldClassifyScalene() {
        assertEquals(TriangleType.SCALENE, TriangleClassifier.classify(4, 5, 6));
    }

    @Test
    void shouldClassifyScaleneInAllOrders() {
        assertEquals(TriangleType.SCALENE, TriangleClassifier.classify(4, 5, 6));
        assertEquals(TriangleType.SCALENE, TriangleClassifier.classify(4, 6, 5));
        assertEquals(TriangleType.SCALENE, TriangleClassifier.classify(5, 4, 6));
        assertEquals(TriangleType.SCALENE, TriangleClassifier.classify(5, 6, 4));
        assertEquals(TriangleType.SCALENE, TriangleClassifier.classify(6, 4, 5));
        assertEquals(TriangleType.SCALENE, TriangleClassifier.classify(6, 5, 4));
    }

    @Test
    void shouldReturnInvalidForNonPositiveSides() {
        assertEquals(TriangleType.INVALID, TriangleClassifier.classify(0, 4, 4));
        assertEquals(TriangleType.INVALID, TriangleClassifier.classify(-1, 4, 4));
    }

    @Test
    void shouldReturnInvalidForTriangleInequalityViolation() {
        assertEquals(TriangleType.INVALID, TriangleClassifier.classify(1, 2, 3));
        assertEquals(TriangleType.INVALID, TriangleClassifier.classify(10, 1, 1));
    }
}
