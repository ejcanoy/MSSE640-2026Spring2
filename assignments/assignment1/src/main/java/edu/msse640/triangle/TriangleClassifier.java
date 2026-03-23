package edu.msse640.triangle;

public final class TriangleClassifier {

    private TriangleClassifier() {
        // Utility class
    }

    public static TriangleType classify(double a, double b, double c) {
        if (a <= 0 || b <= 0 || c <= 0) {
            return TriangleType.INVALID;
        }

        if (a + b <= c || a + c <= b || b + c <= a) {
            return TriangleType.INVALID;
        }

        if (a == b && b == c) {
            return TriangleType.EQUILATERAL;
        }

        if (a == b || a == c || b == c) {
            return TriangleType.ISOSCELES;
        }

        return TriangleType.SCALENE;
    }
}
