package com.application.signora.repository;

import com.application.signora.dto.response.projections.RequestFormInfoProjection;
import com.application.signora.entity.RequestDetails;
import org.apache.coyote.Request;
import org.apache.coyote.RequestInfo;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.NativeQuery;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface RequestDetailsRepository extends JpaRepository<RequestDetails, Long> {
    List<RequestDetails> findByStudentId(Long studentId);

    @Query(value = """
        SELECT
            RD.ID as id,
            RD.REQUEST_BODY as requestBody,
            RD.REQUEST_TITLE as requestTitle,
            RD.STATUS as status,
            AI.NEED_HOD_SIGN as requiredHodApproval,
            AI.NEED_PRINCIPAL_SIGN as requiredPrincipalApproval,
            CI.LINK as certificateLink
        FROM AUTHORITY AUTH
        JOIN BATCH_DETAILS BD ON AUTH.ID = BD.FACULTY_ID
        JOIN STUDENT STUD ON STUD.BATCH_ID = BD.ID
        JOIN REQUEST_DETAILS RD ON RD.STUDENT_ID = STUD.ID
        JOIN APPROVAL_INFO AI ON AI.REQUEST_ID = RD.ID
        LEFT JOIN CERTIFICATE_INFO CI ON CI.REQUEST_ID = RD.ID
        WHERE AUTH.REGISTERED_USER_ID = :IDENTIFIER
        """, nativeQuery = true)
    List<RequestFormInfoProjection> getFormsByFaculty(@Param("IDENTIFIER") Long identifier);

    @Query(value = """
        SELECT
            RD.ID as id,
            RD.REQUEST_TITLE as requestTitle,
            RD.REQUEST_BODY as requestBody,
            RD.STATUS as status,
            AI.NEED_HOD_SIGN as requiredHodApproval,
            AI.NEED_PRINCIPAL_SIGN as requiredPrincipalApproval,
            CI.LINK as certificateLink
        FROM AUTHORITY AUTH
        JOIN DEPARTMENT DEPT ON DEPT.HOD_ID = AUTH.ID
        JOIN BATCH_DETAILS BD ON BD.DEPARTMENT_ID = DEPT.ID
        JOIN STUDENT STUD ON STUD.BATCH_ID = BD.ID
        JOIN REQUEST_DETAILS RD ON RD.STUDENT_ID = STUD.ID
        JOIN APPROVAL_INFO AI ON AI.REQUEST_ID = RD.ID
        LEFT JOIN CERTIFICATE_INFO CI ON CI.REQUEST_ID = RD.ID
        WHERE AUTH.REGISTERED_USER_ID = :IDENTIFIER
        AND RD.STATUS NOT IN (
            'APPROVED_BY_FACULTY',
            'REJECTED_BY_FACULTY',
            'MOVED_TO_FACULTY'
        )
        """, nativeQuery = true)
    List<RequestFormInfoProjection> getFormsByHod(@Param("IDENTIFIER") Long identifier);

    @Query(value = """
        SELECT
            RD.ID as id,
            RD.REQUEST_TITLE as requestTitle,
            RD.REQUEST_BODY as requestBody,
            RD.STATUS as status,
            AI.NEED_HOD_SIGN as requiredHodApproval,
            AI.NEED_PRINCIPAL_SIGN as requiredPrincipalApproval,
            CI.LINK as certificateLink
        FROM AUTHORITY AUTH
        JOIN COLLEGE COL ON COL.PRINCIPAL_ID = AUTH.ID
        JOIN DEPARTMENT DEPT ON DEPT.COLLEGE_ID = COL.ID
        JOIN BATCH_DETAILS BD ON BD.DEPARTMENT_ID = DEPT.ID
        JOIN STUDENT STUD ON STUD.BATCH_ID = BD.ID
        JOIN REQUEST_DETAILS RD ON RD.STUDENT_ID = STUD.ID
        JOIN APPROVAL_INFO AI ON AI.REQUEST_ID = RD.ID
        LEFT JOIN CERTIFICATE_INFO CI ON CI.REQUEST_ID = RD.ID
        WHERE AUTH.REGISTERED_USER_ID = :IDENTIFIER
        AND RD.STATUS NOT IN (
            'APPROVED_BY_FACULTY',
            'REJECTED_BY_FACULTY',
            'APPROVED_BY_HOD',
            'REJECTED_BY_HOD',
            'MOVED_TO_FACULTY',
            'MOVED_TO_HOD'
        )
        """, nativeQuery = true)
    List<RequestFormInfoProjection> getFormsByPrincipal(@Param("IDENTIFIER") Long identifier);

}
