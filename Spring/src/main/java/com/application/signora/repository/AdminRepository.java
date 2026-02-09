package com.application.signora.repository;

import com.application.signora.entity.Admin;
import com.sun.jdi.LongValue;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface AdminRepository extends JpaRepository<Admin, Long> {

    @Query(value = "SELECT * FROM ADMIN WHERE REGISTERED_USER_ID = :REGISTERED_USER_ID", nativeQuery = true)
    Admin findByRegisteredUserId(@Param("REGISTERED_USER_ID") Long registeredUserId);


}
