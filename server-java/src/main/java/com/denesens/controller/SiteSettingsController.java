package com.denesens.controller;

import com.denesens.model.SiteSettings;
import com.denesens.model.Stat;
import com.denesens.repository.SiteSettingsRepository;
import com.denesens.repository.StatRepository;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import jakarta.servlet.http.HttpServletRequest;
import java.time.Instant;
import java.util.*;
import java.util.concurrent.CopyOnWriteArrayList;

@RestController
@RequestMapping("/api/settings")
public class SiteSettingsController {

    private final SiteSettingsRepository settingsRepository;
    private final StatRepository statRepository;

    private SiteSettings fallbackSettings = new SiteSettings();
    private final List<Stat> fallbackStats = new CopyOnWriteArrayList<>();

    public SiteSettingsController(SiteSettingsRepository settingsRepository, StatRepository statRepository) {
        this.settingsRepository = settingsRepository;
        this.statRepository = statRepository;

        // Seed fallback stats matching settingsRoutes.js
        Stat stat1 = new Stat();
        stat1.setId("stat-1");
        stat1.setLabel("Enterprise Projects");
        stat1.setValue("150+");
        stat1.setDescription("Global client architectures delivered");
        stat1.setIcon("Award");
        stat1.setOrder(1);
        fallbackStats.add(stat1);

        Stat stat2 = new Stat();
        stat2.setId("stat-2");
        stat2.setLabel("System Uptime Guarantee");
        stat2.setValue("99.99%");
        stat2.setDescription("Resilient cloud infrastructure SLA");
        stat2.setIcon("ShieldCheck");
        stat2.setOrder(2);
        fallbackStats.add(stat2);

        Stat stat3 = new Stat();
        stat3.setId("stat-3");
        stat3.setLabel("AI Inference Engines");
        stat3.setValue("45+");
        stat3.setDescription("Deployed models & RAG pipelines");
        stat3.setIcon("Cpu");
        stat3.setOrder(3);
        fallbackStats.add(stat3);

        Stat stat4 = new Stat();
        stat4.setId("stat-4");
        stat4.setLabel("Client Satisfaction");
        stat4.setValue("100%");
        stat4.setDescription("Obsidian standards & zero-defect policy");
        stat4.setIcon("Users");
        stat4.setOrder(4);
        fallbackStats.add(stat4);
    }

    @GetMapping
    public ResponseEntity<?> getSettings() {
        try {
            List<SiteSettings> allSettings = settingsRepository.findAll();
            if (!allSettings.isEmpty()) {
                return ResponseEntity.ok(Map.of("success", true, "data", allSettings.get(0)));
            }
        } catch (Exception err) {
            System.err.println("[Settings API] Failed to fetch settings from DB: " + err.getMessage());
        }
        return ResponseEntity.ok(Map.of("success", true, "data", fallbackSettings));
    }

    @PutMapping
    public ResponseEntity<?> updateSettings(@RequestBody SiteSettings settingsUpdate, HttpServletRequest request) {
        try {
            List<SiteSettings> allSettings = settingsRepository.findAll();
            SiteSettings settings;
            if (!allSettings.isEmpty()) {
                settings = allSettings.get(0);
            } else {
                settings = new SiteSettings();
            }

            // Copy fields from update
            settings.setBrandName(settingsUpdate.getBrandName());
            settings.setTagline(settingsUpdate.getTagline());
            settings.setHeroBadge(settingsUpdate.getHeroBadge());
            settings.setHeroHeadline(settingsUpdate.getHeroHeadline());
            settings.setHeroSubheadline(settingsUpdate.getHeroSubheadline());
            settings.setPhone(settingsUpdate.getPhone());
            settings.setEmail(settingsUpdate.getEmail());
            settings.setAddress(settingsUpdate.getAddress());
            settings.setLogoUrl(settingsUpdate.getLogoUrl());
            settings.setAboutTitle(settingsUpdate.getAboutTitle());
            settings.setAboutSubtitle(settingsUpdate.getAboutSubtitle());
            settings.setMissionText(settingsUpdate.getMissionText());
            settings.setVisionText(settingsUpdate.getVisionText());
            settings.setThemeBg(settingsUpdate.getThemeBg());
            settings.setFontFamily(settingsUpdate.getFontFamily());
            settings.setAccentColor(settingsUpdate.getAccentColor());
            settings.setCardRadius(settingsUpdate.getCardRadius());
            settings.setCustomBgColor(settingsUpdate.getCustomBgColor());
            settings.setCustomCardColor(settingsUpdate.getCustomCardColor());
            settings.setCustomTextColor(settingsUpdate.getCustomTextColor());
            settings.setCustomSubtextColor(settingsUpdate.getCustomSubtextColor());
            settings.setCustomAccentColor(settingsUpdate.getCustomAccentColor());
            settings.setCustomBorderColor(settingsUpdate.getCustomBorderColor());
            settings.setCustomGradientStart(settingsUpdate.getCustomGradientStart());
            settings.setCustomGradientMid(settingsUpdate.getCustomGradientMid());
            settings.setCustomGradientEnd(settingsUpdate.getCustomGradientEnd());
            settings.setHeadingFont(settingsUpdate.getHeadingFont());
            settings.setBodyFont(settingsUpdate.getBodyFont());
            settings.setFontSizeScale(settingsUpdate.getFontSizeScale());
            settings.setSocialLinks(settingsUpdate.getSocialLinks());

            SiteSettings saved = settingsRepository.save(settings);
            fallbackSettings = saved;
            return ResponseEntity.ok(Map.of("success", true, "data", saved));
        } catch (Exception err) {
            System.err.println("[Settings API] Database write failed, fallback in-memory: " + err.getMessage());
            fallbackSettings = settingsUpdate;
            return ResponseEntity.ok(Map.of("success", true, "data", settingsUpdate, "fallback", true));
        }
    }

    @GetMapping("/stats")
    public ResponseEntity<?> getStats() {
        try {
            List<Stat> stats = statRepository.findAllByOrderByOrderAsc();
            if (!stats.isEmpty()) {
                return ResponseEntity.ok(Map.of("success", true, "data", stats));
            }
        } catch (Exception err) {
            System.err.println("[Stats API] Failed to fetch stats: " + err.getMessage());
        }
        return ResponseEntity.ok(Map.of("success", true, "data", fallbackStats));
    }

    @PostMapping("/stats")
    public ResponseEntity<?> createStat(@RequestBody Stat stat, HttpServletRequest request) {
        try {
            stat.setCreatedAt(Instant.now());
            Stat saved = statRepository.save(stat);
            return ResponseEntity.status(HttpStatus.CREATED).body(Map.of("success", true, "data", saved));
        } catch (Exception err) {
            stat.setId("stat-" + System.currentTimeMillis());
            stat.setCreatedAt(Instant.now());
            fallbackStats.add(stat);
            return ResponseEntity.status(HttpStatus.CREATED).body(Map.of("success", true, "data", stat, "fallback", true));
        }
    }

    @PutMapping("/stats/{id}")
    public ResponseEntity<?> updateStat(@PathVariable String id, @RequestBody Stat statUpdate, HttpServletRequest request) {
        try {
            Optional<Stat> existingOpt = statRepository.findById(id);
            if (existingOpt.isPresent()) {
                Stat existing = existingOpt.get();
                existing.setLabel(statUpdate.getLabel());
                existing.setValue(statUpdate.getValue());
                existing.setSuffix(statUpdate.getSuffix());
                existing.setDescription(statUpdate.getDescription());
                existing.setIcon(statUpdate.getIcon());
                existing.setOrder(statUpdate.getOrder());

                Stat saved = statRepository.save(existing);
                return ResponseEntity.ok(Map.of("success", true, "data", saved));
            }
        } catch (Exception err) {
            System.err.println("[Stats API] DB update failed: " + err.getMessage());
        }

        // In-memory fallback
        for (int i = 0; i < fallbackStats.size(); i++) {
            Stat s = fallbackStats.get(i);
            if (s.getId().equals(id)) {
                statUpdate.setId(id);
                fallbackStats.set(i, statUpdate);
                return ResponseEntity.ok(Map.of("success", true, "data", statUpdate));
            }
        }

        return ResponseEntity.status(HttpStatus.NOT_FOUND)
                .body(Map.of("success", false, "error", "Stat not found"));
    }

    @DeleteMapping("/stats/{id}")
    public ResponseEntity<?> deleteStat(@PathVariable String id, HttpServletRequest request) {
        try {
            statRepository.deleteById(id);
        } catch (Exception err) {
            System.err.println("[Stats API] DB delete failed: " + err.getMessage());
        }
        fallbackStats.removeIf(s -> s.getId().equals(id));
        return ResponseEntity.ok(Map.of("success", true, "message", "Stat deleted successfully"));
    }
}
