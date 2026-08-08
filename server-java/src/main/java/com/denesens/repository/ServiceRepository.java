package com.denesens.repository;

import com.denesens.model.Service;
import org.springframework.data.mongodb.repository.MongoRepository;
import java.util.List;
import java.util.Optional;

public interface ServiceRepository extends MongoRepository<Service, String> {
    List<Service> findAllByOrderByOrderAsc();
    Optional<Service> findBySlug(String slug);
}
