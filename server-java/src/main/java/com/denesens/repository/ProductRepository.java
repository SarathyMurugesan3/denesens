package com.denesens.repository;

import com.denesens.model.Product;
import org.springframework.data.mongodb.repository.MongoRepository;
import java.util.List;
import java.util.Optional;

public interface ProductRepository extends MongoRepository<Product, String> {
    List<Product> findAllByOrderByOrderAsc();
    Optional<Product> findBySlug(String slug);
}
