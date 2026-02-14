package com.application.signora.entity;


import jakarta.persistence.*;
import lombok.*;

@EqualsAndHashCode(callSuper = true)
@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class Student extends BaseEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String firstName;

    private String lastName;

    private String rollNo;

    @ManyToOne
    @JoinColumn(name = "batch_id")
    private BatchDetails batchDetails;

    @OneToOne
    @JoinColumn(name = "registered_user_id")
    private User user;

}
