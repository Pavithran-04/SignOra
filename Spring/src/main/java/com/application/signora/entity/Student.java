package com.application.signora.entity;


import jakarta.persistence.*;
import lombok.*;

@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class Student extends BaseEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;

    private String rollNo;

    @ManyToOne
    @JoinColumn(name = "department_id")
    private Department department;

    private Integer startYear;

    private Integer endYear;

    private Long registeredUserId;

}
