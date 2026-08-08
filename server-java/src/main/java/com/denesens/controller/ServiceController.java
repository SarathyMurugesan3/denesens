package com.denesens.controller;

import com.denesens.model.Service;
import com.denesens.repository.ServiceRepository;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import jakarta.servlet.http.HttpServletRequest;
import java.time.Instant;
import java.util.*;
import java.util.concurrent.CopyOnWriteArrayList;

@RestController
@RequestMapping("/api/services")
public class ServiceController {

    private final ServiceRepository serviceRepository;
    private final List<Service> fallbackServices = new CopyOnWriteArrayList<>();

    public ServiceController(ServiceRepository serviceRepository) {
        this.serviceRepository = serviceRepository;

        // Seed default fallback services matching serviceRoutes.js
        Service srv1 = new Service();
        srv1.setId("srv-1");
        srv1.setTitle("Custom Software Development");
        srv1.setSlug("custom-software-development");
        srv1.setCategory("Development");
        srv1.setShortDesc("Tailor-made web, backend, and enterprise software solutions engineered for high performance and scalability.");
        srv1.setFullDesc("We architect and build end-to-end bespoke software applications customized to your enterprise workflows. From modular microservices to resilient client applications, we ensure reliability and seamless scale.");
        srv1.setFeatures(Arrays.asList("Microservices Architecture", "High-throughput APIs", "Legacy System Modernization", "Custom Enterprise Portals"));
        srv1.setIcon("Code");
        srv1.setTags(Arrays.asList("React", "Node.js", "Go", "Microservices"));
        srv1.setOrder(1);
        srv1.setCreatedAt(Instant.now());
        fallbackServices.add(srv1);

        Service srv2 = new Service();
        srv2.setId("srv-2");
        srv2.setTitle("Web & Mobile App Development");
        srv2.setSlug("web-mobile-development");
        srv2.setCategory("Development");
        srv2.setShortDesc("Responsive, fluid web apps and native mobile applications crafted with modern frameworks.");
        srv2.setFullDesc("Deliver exceptional cross-platform experiences on iOS, Android, and web with sub-second response times, glassmorphic dark-mode UIs, and robust offline sync.");
        srv2.setFeatures(Arrays.asList("Progressive Web Apps (PWA)", "iOS & Android Native Performance", "Cross-Platform React Native/Flutter", "Real-time WebSockets"));
        srv2.setIcon("Smartphone");
        srv2.setTags(Arrays.asList("React Native", "Vite", "TypeScript", "TailwindCSS"));
        srv2.setOrder(2);
        srv2.setCreatedAt(Instant.now());
        fallbackServices.add(srv2);

        Service srv3 = new Service();
        srv3.setId("srv-3");
        srv3.setTitle("AI/ML & Data Solutions");
        srv3.setSlug("ai-ml-data-solutions");
        srv3.setCategory("Intelligence");
        srv3.setShortDesc("Intelligent automation, LLM integration, predictive analytics, and enterprise AI engines.");
        srv3.setFullDesc("Embed custom artificial intelligence models into your business process. We specialize in Retrieval-Augmented Generation (RAG), neural networks, automated document vision, and real-time data pipelines.");
        srv3.setFeatures(Arrays.asList("Custom LLM Fine-Tuning", "Predictive Analytics Models", "Natural Language Processing", "Computer Vision & OCR"));
        srv3.setIcon("Brain");
        srv3.setTags(Arrays.asList("Python", "PyTorch", "LangChain", "OpenAI API"));
        srv3.setOrder(3);
        srv3.setCreatedAt(Instant.now());
        fallbackServices.add(srv3);

        Service srv4 = new Service();
        srv4.setId("srv-4");
        srv4.setTitle("Cloud & DevOps Infrastructure");
        srv4.setSlug("cloud-devops-infrastructure");
        srv4.setCategory("Infrastructure");
        srv4.setShortDesc("Resilient cloud infrastructure, automated CI/CD pipelines, and zero-downtime Kubernetes deployments.");
        srv4.setFullDesc("Optimize your cloud operations on AWS, GCP, or Azure. We design immutable infrastructure with automated secrets management, container orchestration, and continuous security compliance.");
        srv4.setFeatures(Arrays.asList("Infrastructure as Code (Terraform)", "Kubernetes & Docker Pipelines", "Cost Optimization & Monitoring", "Zero-Trust Security Architecture"));
        srv4.setIcon("Cloud");
        srv4.setTags(Arrays.asList("AWS", "Docker", "Kubernetes", "Terraform"));
        srv4.setOrder(4);
        srv4.setCreatedAt(Instant.now());
        fallbackServices.add(srv4);

        Service srv5 = new Service();
        srv5.setId("srv-5");
        srv5.setTitle("UI/UX & Product Design");
        srv5.setSlug("ui-ux-product-design");
        srv5.setCategory("Design & Strategy");
        srv5.setShortDesc("High-end aesthetic visual design, intuitive user flows, dark-mode design systems, and design tokens.");
        srv5.setFullDesc("Elevate your enterprise SaaS and consumer products with luxury design aesthetics. We create interactive visual prototypes, scalable design systems, and friction-free user journeys.");
        srv5.setFeatures(Arrays.asList("Figma Design Tokens", "Luxury Visual Aesthetics", "Interactive Micro-animations", "Accessibility Compliance (WCAG)"));
        srv5.setIcon("Palette");
        srv5.setTags(Arrays.asList("Figma", "UX Research", "Design Systems", "Framer"));
        srv5.setOrder(5);
        srv5.setCreatedAt(Instant.now());
        fallbackServices.add(srv5);

        Service srv6 = new Service();
        srv6.setId("srv-6");
        srv6.setTitle("IT & Technology Consulting");
        srv6.setSlug("it-technology-consulting");
        srv6.setCategory("Design & Strategy");
        srv6.setShortDesc("Strategic technology advisory, architecture audits, security reviews, and fractional CTO services.");
        srv6.setFullDesc("Navigate complex technical transformations with guidance from battle-tested engineering leadership. We evaluate system bottlenecks, security postures, and technology stack selection.");
        srv6.setFeatures(Arrays.asList("Architecture Audits", "Fractional CTO Support", "Cybersecurity Healthchecks", "Tech Stack Optimization"));
        srv6.setIcon("Compass");
        srv6.setTags(Arrays.asList("Strategy", "Audit", "Security", "Compliance"));
        srv6.setOrder(6);
        srv6.setCreatedAt(Instant.now());
        fallbackServices.add(srv6);
    }

    @GetMapping
    public ResponseEntity<?> getServices() {
        try {
            List<Service> services = serviceRepository.findAllByOrderByOrderAsc();
            if (!services.isEmpty()) {
                return ResponseEntity.ok(Map.of("success", true, "data", services));
            }
        } catch (Exception err) {
            System.err.println("[Service API] Failed to fetch services: " + err.getMessage());
        }
        return ResponseEntity.ok(Map.of("success", true, "data", fallbackServices));
    }

    @GetMapping("/{slug}")
    public ResponseEntity<?> getServiceBySlug(@PathVariable String slug) {
        try {
            Optional<Service> serviceOpt = serviceRepository.findBySlug(slug);
            if (serviceOpt.isPresent()) {
                return ResponseEntity.ok(Map.of("success", true, "data", serviceOpt.get()));
            }
        } catch (Exception err) {
            System.err.println("[Service API] Failed to fetch service by slug: " + err.getMessage());
        }

        Optional<Service> fallbackOpt = fallbackServices.stream()
                .filter(s -> s.getSlug().equalsIgnoreCase(slug))
                .findFirst();

        if (fallbackOpt.isPresent()) {
            return ResponseEntity.ok(Map.of("success", true, "data", fallbackOpt.get()));
        }

        return ResponseEntity.status(HttpStatus.NOT_FOUND)
                .body(Map.of("success", false, "error", "Service not found"));
    }

    @PostMapping
    public ResponseEntity<?> createService(@RequestBody Service service, HttpServletRequest request) {
        try {
            service.setCreatedAt(Instant.now());
            Service saved = serviceRepository.save(service);
            return ResponseEntity.status(HttpStatus.CREATED).body(Map.of("success", true, "data", saved));
        } catch (Exception err) {
            service.setId("srv-" + System.currentTimeMillis());
            service.setCreatedAt(Instant.now());
            fallbackServices.add(service);
            return ResponseEntity.status(HttpStatus.CREATED).body(Map.of("success", true, "data", service, "fallback", true));
        }
    }

    @PutMapping("/{id}")
    public ResponseEntity<?> updateService(@PathVariable String id, @RequestBody Service serviceUpdate, HttpServletRequest request) {
        try {
            Optional<Service> existingOpt = serviceRepository.findById(id);
            if (existingOpt.isPresent()) {
                Service existing = existingOpt.get();
                existing.setTitle(serviceUpdate.getTitle());
                existing.setSlug(serviceUpdate.getSlug());
                existing.setCategory(serviceUpdate.getCategory());
                existing.setShortDesc(serviceUpdate.getShortDesc());
                existing.setFullDesc(serviceUpdate.getFullDesc());
                existing.setFeatures(serviceUpdate.getFeatures());
                existing.setIcon(serviceUpdate.getIcon());
                existing.setTags(serviceUpdate.getTags());
                existing.setOrder(serviceUpdate.getOrder());

                Service saved = serviceRepository.save(existing);
                return ResponseEntity.ok(Map.of("success", true, "data", saved));
            }
        } catch (Exception err) {
            System.err.println("[Service API] Failed to update service: " + err.getMessage());
        }

        // In-memory fallback
        for (int i = 0; i < fallbackServices.size(); i++) {
            Service s = fallbackServices.get(i);
            if (s.getId().equals(id)) {
                serviceUpdate.setId(id);
                fallbackServices.set(i, serviceUpdate);
                return ResponseEntity.ok(Map.of("success", true, "data", serviceUpdate));
            }
        }

        return ResponseEntity.status(HttpStatus.NOT_FOUND)
                .body(Map.of("success", false, "error", "Service not found"));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteService(@PathVariable String id, HttpServletRequest request) {
        try {
            serviceRepository.deleteById(id);
        } catch (Exception err) {
            System.err.println("[Service API] Failed to delete service: " + err.getMessage());
        }
        fallbackServices.removeIf(s -> s.getId().equals(id));
        return ResponseEntity.ok(Map.of("success", true, "message", "Service deleted successfully"));
    }
}
