package com.denesens.repository;

import com.denesens.model.Portfolio;
import org.springframework.data.mongodb.repository.MongoRepository;
import java.util.List;
import java.util.Optional;

public interface PortfolioRepository extends MongoRepository<Portfolio, String> {
    List<Portfolio> findAllByOrderByOrderAsc();
    Optional<Portfolio> findBySlug(String slug);
}
