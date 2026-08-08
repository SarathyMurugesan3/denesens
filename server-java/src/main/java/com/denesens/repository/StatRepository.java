package com.denesens.repository;

import com.denesens.model.Stat;
import org.springframework.data.mongodb.repository.MongoRepository;
import java.util.List;

public interface StatRepository extends MongoRepository<Stat, String> {
    List<Stat> findAllByOrderByOrderAsc();
}
