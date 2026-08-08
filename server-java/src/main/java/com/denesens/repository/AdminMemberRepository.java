package com.denesens.repository;

import com.denesens.model.AdminMember;
import org.springframework.data.mongodb.repository.MongoRepository;
import java.util.Optional;

public interface AdminMemberRepository extends MongoRepository<AdminMember, String> {
    Optional<AdminMember> findByUsername(String username);
    Optional<AdminMember> findByPassword(String password);
}
