package com.application.signora.entity;

import jakarta.persistence.*;
import lombok.*;
import tools.jackson.core.ObjectReadContext;

@EqualsAndHashCode(callSuper = true)
@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class Department extends BaseEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;

    @ManyToOne
    @JoinColumn(name = "college_id")
    private College college;

    @OneToOne
    @JoinColumn(name = "hod_id")
    private Authority hod;

}
