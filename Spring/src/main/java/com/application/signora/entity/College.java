package com.application.signora.entity;

import jakarta.persistence.*;
import lombok.*;

@EqualsAndHashCode(callSuper = true)
@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class College extends BaseEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;

    private String address;

    private String code;

    @OneToOne
    @JoinColumn(name = "principal_id")
    private Authority principal;

    @ManyToOne
    @JoinColumn(name = "admin_id")
    private Admin admin;
}
