package com.denesens.repository;

import com.denesens.model.TeamMember;
import org.springframework.data.mongodb.repository.MongoRepository;
import java.util.List;

public interface TeamMemberRepository extends MongoRepository<TeamMember, String> {
    List<TeamMember> findAllByOrderByOrderAsc();
}
