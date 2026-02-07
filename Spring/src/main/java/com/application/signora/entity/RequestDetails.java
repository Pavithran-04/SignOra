package com.application.signora.entity;

import com.application.signora.entity.enums.RequestStatus;
import jakarta.persistence.*;
import lombok.*;
import tools.jackson.core.ObjectReadContext;

import java.security.cert.Certificate;

@EqualsAndHashCode(callSuper = true)
@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class RequestDetails extends BaseEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "student_id")
    private Student student;

    private String requestBody;

    private String requestTitle;

    @OneToOne(mappedBy = "requestDetails", cascade = CascadeType.ALL)
    private ApprovalInfo approvalInfo;

    @OneToOne(mappedBy = "requestDetails", cascade = CascadeType.ALL)
    private CertificateInfo certificateInfo;

    @Enumerated(EnumType.STRING)
    private RequestStatus status;

}
