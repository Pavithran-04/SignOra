package com.application.signora.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Staff extends BaseEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;

    private String empId;

    @ManyToOne
    @JoinColumn(name = "department_id")
    private Department department;

    private Long registeredUserId;

    private Boolean isFaculty;

    private Boolean isHod;

    private Boolean isPrincipal;
}
