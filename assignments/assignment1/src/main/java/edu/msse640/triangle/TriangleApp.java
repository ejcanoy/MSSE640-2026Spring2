package edu.msse640.triangle;

import java.util.Scanner;

public class TriangleApp {

    public static void main(String[] args) {
        try (Scanner scanner = new Scanner(System.in)) {
            System.out.print("Enter side 1: ");
            double side1 = scanner.nextDouble();

            System.out.print("Enter side 2: ");
            double side2 = scanner.nextDouble();

            System.out.print("Enter side 3: ");
            double side3 = scanner.nextDouble();

            TriangleType type = TriangleClassifier.classify(side1, side2, side3);

            if (type == TriangleType.INVALID) {
                System.out.println("These sides do not form a valid triangle.");
            } else {
                System.out.println("Triangle type: " + type);
            }
        } catch (Exception ex) {
            System.out.println("Invalid input. Please enter numeric side lengths.");
        }
    }
}
