package com.application.signora.entity;

import jakarta.persistence.*;
import lombok.*;

@EqualsAndHashCode(callSuper = true)
@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Table(name = "COLLEGE_AUTHORITIES")
public class CollegeAuthority extends BaseEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;

    private String empId;

    private String designation;

    @OneToOne
    @JoinColumn(name = "registered_user_id")
    private User user;

}
