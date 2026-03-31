package edu.msse640.triangleapi.model;

import edu.msse640.triangleapi.domain.TriangleType;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;

@Entity
public class Triangle {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private Double sideA;
    private Double sideB;
    private Double sideC;
    private Boolean valid;

    @Enumerated(EnumType.STRING)
    private TriangleType triangleType;

    public Triangle() {
    }

    public Triangle(Double sideA, Double sideB, Double sideC, Boolean valid, TriangleType triangleType) {
        this.sideA = sideA;
        this.sideB = sideB;
        this.sideC = sideC;
        this.valid = valid;
        this.triangleType = triangleType;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Double getSideA() {
        return sideA;
    }

    public void setSideA(Double sideA) {
        this.sideA = sideA;
    }

    public Double getSideB() {
        return sideB;
    }

    public void setSideB(Double sideB) {
        this.sideB = sideB;
    }

    public Double getSideC() {
        return sideC;
    }

    public void setSideC(Double sideC) {
        this.sideC = sideC;
    }

    public Boolean getValid() {
        return valid;
    }

    public void setValid(Boolean valid) {
        this.valid = valid;
    }

    public TriangleType getTriangleType() {
        return triangleType;
    }

    public void setTriangleType(TriangleType triangleType) {
        this.triangleType = triangleType;
    }
}
