package com.denesens.controller;

import com.denesens.model.Portfolio;
import com.denesens.repository.PortfolioRepository;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import jakarta.servlet.http.HttpServletRequest;
import java.time.Instant;
import java.util.*;
import java.util.concurrent.CopyOnWriteArrayList;

@RestController
@RequestMapping("/api/portfolio")
public class PortfolioController {

    private final PortfolioRepository portfolioRepository;
    private final List<Portfolio> fallbackPortfolio = new CopyOnWriteArrayList<>();

    public PortfolioController(PortfolioRepository portfolioRepository) {
        this.portfolioRepository = portfolioRepository;

        // Seed default fallback portfolios matching portfolioRoutes.js
        Portfolio port1 = new Portfolio();
        port1.setId("port-1");
        port1.setTitle("AuraFintech AI Intelligence Vault");
        port1.setSlug("aurafintech-ai-vault");
        port1.setCategory("AI & Data Science");
        port1.setClient("Global Asset Management Corp");
        port1.setDescription("Enterprise AI knowledge portal utilizing RAG vector search, processing 10M+ financial compliance reports daily with zero latency.");
        port1.setOverview("AuraFintech required a unified AI knowledge hub capable of analyzing millions of regulatory filings, market intelligence documents, and trade records in real time.");
        port1.setChallenge("Manual compliance document analysis caused massive research delays, while legacy keyword search systems produced high false-positive rates.");
        port1.setSolution("Engineered a custom Retrieval-Augmented Generation (RAG) pipeline utilizing vector embeddings, distributed Python microservices, and sub-100ms vector search querying.");
        port1.setImpact("Reduced research query speeds by 94% across 1,200 financial analysts.");
        port1.setTags(Arrays.asList("Python", "FastAPI", "Pinecone", "React", "TailwindCSS"));
        port1.setLiveUrl("#");
        port1.setOrder(1);
        port1.setCreatedAt(Instant.now());
        fallbackPortfolio.add(port1);

        Portfolio port2 = new Portfolio();
        port2.setId("port-2");
        port2.setTitle("OmniCloud Kubernetes Sentinel");
        port2.setSlug("omnicloud-k8s-sentinel");
        port2.setCategory("Cloud Infrastructure");
        port2.setClient("Logistics SaaS Ecosystem");
        port2.setDescription("Autonomous Kubernetes cluster autoscaler and threat detection engine across hybrid cloud environments.");
        port2.setOverview("Designed for high-throughput global logistics tracking, handling over 50,000 requests per second across AWS and multi-region bare metal instances.");
        port2.setChallenge("Unpredictable traffic spikes caused cloud cost overruns and manual scaling bottlenecks during peak seasonal demand.");
        port2.setSolution("Built a custom Go-based predictive autoscaler integrated with Prometheus metrics and eBPF kernel event listeners for automated node scaling.");
        port2.setImpact("Optimized cloud infrastructure spending by $420,000 annually.");
        port2.setTags(Arrays.asList("Go", "Kubernetes", "AWS", "Prometheus", "Docker"));
        port2.setLiveUrl("#");
        port2.setOrder(2);
        port2.setCreatedAt(Instant.now());
        fallbackPortfolio.add(port2);

        Portfolio port3 = new Portfolio();
        port3.setId("port-3");
        port3.setTitle("Verve Health Telemedicine Suite");
        port3.setSlug("verve-health-suite");
        port3.setCategory("Mobile & Web Development");
        port3.setClient("Verve Health System");
        port3.setDescription("HIPAA-compliant cross-platform mobile ecosystem featuring real-time WebSockets consultation and automated prescription OCR.");
        port3.setOverview("A comprehensive digital healthcare platform uniting patients, doctors, and pharmacy networks into a single encrypted mobile application.");
        port3.setChallenge("Legacy telehealth platforms suffered from video stream lag, fragmented patient records, and non-compliant data storage risks.");
        port3.setSolution("Implemented end-to-end WebRTC video streaming, Node.js WebSocket notification layers, and HIPAA-compliant AES-256 data encryption at rest and in transit.");
        port3.setImpact("Served 250,000+ active patients with 99.99% availability.");
        port3.setTags(Arrays.asList("React Native", "Node.js", "MongoDB", "WebRTC"));
        port3.setLiveUrl("#");
        port3.setOrder(3);
        port3.setCreatedAt(Instant.now());
        fallbackPortfolio.add(port3);
    }

    @GetMapping
    public ResponseEntity<?> getPortfolios() {
        try {
            List<Portfolio> items = portfolioRepository.findAllByOrderByOrderAsc();
            if (!items.isEmpty()) {
                return ResponseEntity.ok(Map.of("success", true, "data", items));
            }
        } catch (Exception err) {
            System.err.println("[Portfolio API] Failed to fetch portfolios: " + err.getMessage());
        }
        return ResponseEntity.ok(Map.of("success", true, "data", fallbackPortfolio));
    }

    @PostMapping
    public ResponseEntity<?> createPortfolio(@RequestBody Portfolio portfolio, HttpServletRequest request) {
        try {
            portfolio.setCreatedAt(Instant.now());
            Portfolio saved = portfolioRepository.save(portfolio);
            return ResponseEntity.status(HttpStatus.CREATED).body(Map.of("success", true, "data", saved));
        } catch (Exception err) {
            portfolio.setId("port-" + System.currentTimeMillis());
            portfolio.setCreatedAt(Instant.now());
            fallbackPortfolio.add(portfolio);
            return ResponseEntity.status(HttpStatus.CREATED).body(Map.of("success", true, "data", portfolio, "fallback", true));
        }
    }

    @PutMapping("/{id}")
    public ResponseEntity<?> updatePortfolio(@PathVariable String id, @RequestBody Portfolio portfolioUpdate, HttpServletRequest request) {
        try {
            Optional<Portfolio> existingOpt = portfolioRepository.findById(id);
            if (existingOpt.isPresent()) {
                Portfolio existing = existingOpt.get();
                // Map fields
                existing.setTitle(portfolioUpdate.getTitle());
                existing.setSlug(portfolioUpdate.getSlug());
                existing.setCategory(portfolioUpdate.getCategory());
                existing.setClient(portfolioUpdate.getClient());
                existing.setDescription(portfolioUpdate.getDescription());
                existing.setOverview(portfolioUpdate.getOverview());
                existing.setChallenge(portfolioUpdate.getChallenge());
                existing.setSolution(portfolioUpdate.getSolution());
                existing.setImpact(portfolioUpdate.getImpact());
                existing.setImage(portfolioUpdate.getImage());
                existing.setTags(portfolioUpdate.getTags());
                existing.setLiveUrl(portfolioUpdate.getLiveUrl());
                existing.setOrder(portfolioUpdate.getOrder());

                Portfolio saved = portfolioRepository.save(existing);
                return ResponseEntity.ok(Map.of("success", true, "data", saved));
            }
        } catch (Exception err) {
            System.err.println("[Portfolio API] Failed to update portfolio in DB: " + err.getMessage());
        }

        // In-memory fallback
        for (int i = 0; i < fallbackPortfolio.size(); i++) {
            Portfolio p = fallbackPortfolio.get(i);
            if (p.getId().equals(id)) {
                portfolioUpdate.setId(id);
                fallbackPortfolio.set(i, portfolioUpdate);
                return ResponseEntity.ok(Map.of("success", true, "data", portfolioUpdate));
            }
        }

        return ResponseEntity.status(HttpStatus.NOT_FOUND)
                .body(Map.of("success", false, "error", "Portfolio item not found"));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> deletePortfolio(@PathVariable String id, HttpServletRequest request) {
        try {
            portfolioRepository.deleteById(id);
        } catch (Exception err) {
            System.err.println("[Portfolio API] Failed to delete portfolio from DB: " + err.getMessage());
        }
        fallbackPortfolio.removeIf(p -> p.getId().equals(id));
        return ResponseEntity.ok(Map.of("success", true, "message", "Portfolio item deleted successfully"));
    }
}
