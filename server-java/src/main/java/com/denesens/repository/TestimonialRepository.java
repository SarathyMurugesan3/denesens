package com.denesens.repository;

import com.denesens.model.Testimonial;
import org.springframework.data.mongodb.repository.MongoRepository;
import java.util.List;

public interface TestimonialRepository extends MongoRepository<Testimonial, String> {
    List<Testimonial> findAllByOrderByOrderAsc();
}
