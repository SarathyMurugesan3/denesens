package com.denesens.controller;

import com.denesens.model.Testimonial;
import com.denesens.repository.TestimonialRepository;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import jakarta.servlet.http.HttpServletRequest;
import java.time.Instant;
import java.util.*;
import java.util.concurrent.CopyOnWriteArrayList;

@RestController
@RequestMapping("/api/testimonials")
public class TestimonialController {

    private final TestimonialRepository testimonialRepository;
    private final List<Testimonial> fallbackTestimonials = new CopyOnWriteArrayList<>();

    public TestimonialController(TestimonialRepository testimonialRepository) {
        this.testimonialRepository = testimonialRepository;

        // Seed default fallback testimonials matching testimonialRoutes.js
        Testimonial t1 = new Testimonial();
        t1.setId("test-1");
        t1.setName("Alexander Sterling");
        t1.setRole("VP of Technology");
        t1.setCompany("Apex Global Capital");
        t1.setContent("Denesens Solutions re-architected our core AI compliance infrastructure with precision. Their attention to security, zero-downtime deployment, and obsidian visual polish is truly unmatched.");
        t1.setRating(5);
        t1.setOrder(1);
        t1.setCreatedAt(Instant.now());
        fallbackTestimonials.add(t1);

        Testimonial t2 = new Testimonial();
        t2.setId("test-2");
        t2.setName("Elena Rostova");
        t2.setRole("Head of Product Engineering");
        t2.setCompany("Vanguard SaaS Labs");
        t2.setContent("Working with Denesens on our Cloud Pulse observability suite saved us months of engineering time. They deliver true enterprise-grade software architecture on tight deadlines.");
        t2.setRating(5);
        t2.setOrder(2);
        t2.setCreatedAt(Instant.now());
        fallbackTestimonials.add(t2);

        Testimonial t3 = new Testimonial();
        t3.setId("test-3");
        t3.setName("Marcus Vance");
        t3.setRole("Chief Technology Officer");
        t3.setCompany("Aura Logistics");
        t3.setContent("The custom software solution built by Denesens transformed our multi-tenant operations. Their team combines high-end design aesthetics with robust microservice scalability.");
        t3.setRating(5);
        t3.setOrder(3);
        t3.setCreatedAt(Instant.now());
        fallbackTestimonials.add(t3);
    }

    @GetMapping
    public ResponseEntity<?> getTestimonials() {
        try {
            List<Testimonial> items = testimonialRepository.findAllByOrderByOrderAsc();
            if (!items.isEmpty()) {
                return ResponseEntity.ok(Map.of("success", true, "data", items));
            }
        } catch (Exception err) {
            System.err.println("[Testimonial API] Failed to fetch testimonials: " + err.getMessage());
        }
        return ResponseEntity.ok(Map.of("success", true, "data", fallbackTestimonials));
    }

    @PostMapping
    public ResponseEntity<?> createTestimonial(@RequestBody Testimonial testimonial, HttpServletRequest request) {
        try {
            testimonial.setCreatedAt(Instant.now());
            Testimonial saved = testimonialRepository.save(testimonial);
            return ResponseEntity.status(HttpStatus.CREATED).body(Map.of("success", true, "data", saved));
        } catch (Exception err) {
            testimonial.setId("test-" + System.currentTimeMillis());
            testimonial.setCreatedAt(Instant.now());
            fallbackTestimonials.add(testimonial);
            return ResponseEntity.status(HttpStatus.CREATED).body(Map.of("success", true, "data", testimonial, "fallback", true));
        }
    }

    @PutMapping("/{id}")
    public ResponseEntity<?> updateTestimonial(@PathVariable String id, @RequestBody Testimonial testimonialUpdate, HttpServletRequest request) {
        try {
            Optional<Testimonial> existingOpt = testimonialRepository.findById(id);
            if (existingOpt.isPresent()) {
                Testimonial existing = existingOpt.get();
                existing.setName(testimonialUpdate.getName());
                existing.setRole(testimonialUpdate.getRole());
                existing.setCompany(testimonialUpdate.getCompany());
                existing.setContent(testimonialUpdate.getContent());
                existing.setRating(testimonialUpdate.getRating());
                existing.setAvatar(testimonialUpdate.getAvatar());
                existing.setOrder(testimonialUpdate.getOrder());

                Testimonial saved = testimonialRepository.save(existing);
                return ResponseEntity.ok(Map.of("success", true, "data", saved));
            }
        } catch (Exception err) {
            System.err.println("[Testimonial API] DB update failed: " + err.getMessage());
        }

        // In-memory fallback
        for (int i = 0; i < fallbackTestimonials.size(); i++) {
            Testimonial t = fallbackTestimonials.get(i);
            if (t.getId().equals(id)) {
                testimonialUpdate.setId(id);
                fallbackTestimonials.set(i, testimonialUpdate);
                return ResponseEntity.ok(Map.of("success", true, "data", testimonialUpdate));
            }
        }

        return ResponseEntity.status(HttpStatus.NOT_FOUND)
                .body(Map.of("success", false, "error", "Testimonial not found"));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteTestimonial(@PathVariable String id, HttpServletRequest request) {
        try {
            testimonialRepository.deleteById(id);
        } catch (Exception err) {
            System.err.println("[Testimonial API] DB delete failed: " + err.getMessage());
        }
        fallbackTestimonials.removeIf(t -> t.getId().equals(id));
        return ResponseEntity.ok(Map.of("success", true, "message", "Testimonial deleted successfully"));
    }
}
