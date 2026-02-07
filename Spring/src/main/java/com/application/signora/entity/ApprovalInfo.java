package com.application.signora.entity;

import jakarta.persistence.*;
import lombok.*;

@EqualsAndHashCode(callSuper = true)
@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class ApprovalInfo extends BaseEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private Boolean needHodSign;

    private Boolean needPrincipalSign;

    @OneToOne
    @JoinColumn(name = "request_id")
    private RequestDetails requestDetails;

}
