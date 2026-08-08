package com.denesens.controller;

import com.denesens.model.Product;
import com.denesens.repository.ProductRepository;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import jakarta.servlet.http.HttpServletRequest;
import java.time.Instant;
import java.util.*;
import java.util.concurrent.CopyOnWriteArrayList;

@RestController
@RequestMapping("/api/products")
public class ProductController {

    private final ProductRepository productRepository;
    private final List<Product> fallbackProducts = new CopyOnWriteArrayList<>();

    public ProductController(ProductRepository productRepository) {
        this.productRepository = productRepository;

        // Seed default fallback products matching productRoutes.js
        Product prod1 = new Product();
        prod1.setId("prod-1");
        prod1.setName("Denesens Intelligence Engine (DIE)");
        prod1.setSlug("intelligence-engine");
        prod1.setTagline("Autonomous Workflow & Knowledge Orchestration Platform");
        prod1.setDescription("An enterprise AI platform that ingests multi-format internal documents, connects to corporate APIs, and delivers context-aware generative insights.");
        prod1.setFullDetails("The Denesens Intelligence Engine (DIE) combines high-throughput vector retrieval with custom LLM orchestration. Designed for zero-trust enterprise environments, DIE features end-to-end data encryption, role-based document access controls, and custom fine-tuning modules tailored for healthcare, finance, and legal compliance.");
        prod1.setFeatures(Arrays.asList("RAG Vector Search Engine", "Multi-tenant Access Control", "Custom AI Agent Builder", "Real-Time Telemetry"));
        prod1.setTechStack(Arrays.asList("Python", "FastAPI", "Pinecone", "React", "TailwindCSS"));
        prod1.setStatus("Live");
        prod1.setDemoUrl("#");
        prod1.setBadge("Enterprise SaaS");
        prod1.setOrder(1);
        prod1.setCreatedAt(Instant.now());
        fallbackProducts.add(prod1);

        Product prod2 = new Product();
        prod2.setId("prod-2");
        prod2.setName("Denesens Cloud Pulse");
        prod2.setSlug("cloud-pulse");
        prod2.setTagline("Automated Infrastructure Performance & Cost Sentinel");
        prod2.setDescription("Real-time observability and predictive cloud spend optimization platform for multi-cloud Kubernetes clusters.");
        prod2.setFullDetails("Denesens Cloud Pulse delivers automated Kubernetes pod autoscaling, anomaly detection, and unified infrastructure metrics. Powered by eBPF kernel tracing and Prometheus metrics, Cloud Pulse monitors CPU/memory drift, prevents node starvation, and automatically suggests resource rightsizing.");
        prod2.setFeatures(Arrays.asList("Anomalous Spend Alerts", "Kubernetes Pod Auto-scaler", "Security Threat Detection", "One-Click Compliance Reporting"));
        prod2.setTechStack(Arrays.asList("Node.js", "Go", "Prometheus", "Grafana", "MongoDB"));
        prod2.setStatus("Live");
        prod2.setDemoUrl("#");
        prod2.setBadge("DevOps Tooling");
        prod2.setOrder(2);
        prod2.setCreatedAt(Instant.now());
        fallbackProducts.add(prod2);

        Product prod3 = new Product();
        prod3.setId("prod-3");
        prod3.setName("Denesens Sentinel Shield");
        prod3.setSlug("sentinel-shield");
        prod3.setTagline("Zero-Trust API Security & Rate-Limit Middleware Suite");
        prod3.setDescription("A lightweight microservices security gatekeeper offering instantaneous DDOS protection, JWT validation, and automated bot mitigation.");
        prod3.setFullDetails("Sentinel Shield runs as a high-performance Wasm micro-proxy deployed in front of modern web services. It intercepts API traffic at sub-millisecond speeds, executing dynamic rate limiting, token validation, IP reputation checking, and SQL injection blocking.");
        prod3.setFeatures(Arrays.asList("Sub-millisecond Middleware Proxy", "Dynamic IP Reputation Filtering", "OAuth2 / OIDC Federation", "Audit Trail Analytics"));
        prod3.setTechStack(Arrays.asList("Rust", "Express.js", "Redis", "WebAssembly"));
        prod3.setStatus("Beta");
        prod3.setDemoUrl("#");
        prod3.setBadge("Security Suite");
        prod3.setOrder(3);
        prod3.setCreatedAt(Instant.now());
        fallbackProducts.add(prod3);
    }

    @GetMapping
    public ResponseEntity<?> getProducts() {
        try {
            List<Product> products = productRepository.findAllByOrderByOrderAsc();
            if (!products.isEmpty()) {
                return ResponseEntity.ok(Map.of("success", true, "data", products));
            }
        } catch (Exception err) {
            System.err.println("[Product API] Failed to fetch products: " + err.getMessage());
        }
        return ResponseEntity.ok(Map.of("success", true, "data", fallbackProducts));
    }

    @GetMapping("/{slug}")
    public ResponseEntity<?> getProductBySlug(@PathVariable String slug) {
        try {
            Optional<Product> productOpt = productRepository.findBySlug(slug);
            if (productOpt.isPresent()) {
                return ResponseEntity.ok(Map.of("success", true, "data", productOpt.get()));
            }
        } catch (Exception err) {
            System.err.println("[Product API] Failed to fetch product by slug: " + err.getMessage());
        }

        Optional<Product> fallbackOpt = fallbackProducts.stream()
                .filter(p -> p.getSlug().equalsIgnoreCase(slug))
                .findFirst();

        if (fallbackOpt.isPresent()) {
            return ResponseEntity.ok(Map.of("success", true, "data", fallbackOpt.get()));
        }

        return ResponseEntity.status(HttpStatus.NOT_FOUND)
                .body(Map.of("success", false, "error", "Product not found"));
    }

    @PostMapping
    public ResponseEntity<?> createProduct(@RequestBody Product product, HttpServletRequest request) {
        try {
            product.setCreatedAt(Instant.now());
            Product saved = productRepository.save(product);
            return ResponseEntity.status(HttpStatus.CREATED).body(Map.of("success", true, "data", saved));
        } catch (Exception err) {
            product.setId("prod-" + System.currentTimeMillis());
            product.setCreatedAt(Instant.now());
            fallbackProducts.add(product);
            return ResponseEntity.status(HttpStatus.CREATED).body(Map.of("success", true, "data", product, "fallback", true));
        }
    }

    @PutMapping("/{id}")
    public ResponseEntity<?> updateProduct(@PathVariable String id, @RequestBody Product productUpdate, HttpServletRequest request) {
        try {
            Optional<Product> existingOpt = productRepository.findById(id);
            if (existingOpt.isPresent()) {
                Product existing = existingOpt.get();
                existing.setName(productUpdate.getName());
                existing.setSlug(productUpdate.getSlug());
                existing.setTagline(productUpdate.getTagline());
                existing.setDescription(productUpdate.getDescription());
                existing.setFullDetails(productUpdate.getFullDetails());
                existing.setFeatures(productUpdate.getFeatures());
                existing.setTechStack(productUpdate.getTechStack());
                existing.setStatus(productUpdate.getStatus());
                existing.setDemoUrl(productUpdate.getDemoUrl());
                existing.setBadge(productUpdate.getBadge());
                existing.setOrder(productUpdate.getOrder());

                Product saved = productRepository.save(existing);
                return ResponseEntity.ok(Map.of("success", true, "data", saved));
            }
        } catch (Exception err) {
            System.err.println("[Product API] Failed to update product in DB: " + err.getMessage());
        }

        // In-memory fallback
        for (int i = 0; i < fallbackProducts.size(); i++) {
            Product p = fallbackProducts.get(i);
            if (p.getId().equals(id)) {
                productUpdate.setId(id);
                fallbackProducts.set(i, productUpdate);
                return ResponseEntity.ok(Map.of("success", true, "data", productUpdate));
            }
        }

        return ResponseEntity.status(HttpStatus.NOT_FOUND)
                .body(Map.of("success", false, "error", "Product not found"));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteProduct(@PathVariable String id, HttpServletRequest request) {
        try {
            productRepository.deleteById(id);
        } catch (Exception err) {
            System.err.println("[Product API] Failed to delete product: " + err.getMessage());
        }
        fallbackProducts.removeIf(p -> p.getId().equals(id));
        return ResponseEntity.ok(Map.of("success", true, "message", "Product deleted successfully"));
    }
}
