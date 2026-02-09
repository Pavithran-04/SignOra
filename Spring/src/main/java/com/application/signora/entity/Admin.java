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
public class Admin extends BaseEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;

    @OneToOne
    @JoinColumn(name = "registered_user_id")
    private User user;
}
