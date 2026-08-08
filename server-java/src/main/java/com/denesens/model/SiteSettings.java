package com.denesens.model;

import lombok.Data;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.Id;
import org.springframework.data.annotation.LastModifiedDate;
import org.springframework.data.mongodb.core.mapping.Document;

import java.time.Instant;

@Data
@Document(collection = "sitesettings")
public class SiteSettings {
    @Id
    private String id;
    
    private String brandName = "DENESENS";
    private String tagline = "BUILDING INTELLIGENT SOLUTIONS";
    private String heroBadge = "DENESENS SOLUTIONS — LUXURY SOFTWARE ARCHITECTURE";
    private String heroHeadline = "We Engineer Intelligent Software Solutions";
    private String heroSubheadline = "Bridging high-end service engineering and robust in-house SaaS platforms. We build bespoke digital products, enterprise AI engines, and resilient cloud architectures.";
    private String phone = "+91 96295 68373";
    private String email = "contact@denesens.com";
    private String address = "Salem, Tamil Nadu, India";
    private String logoUrl = "/logo.jpg";
    private String aboutTitle = "Engineering High-Performance Digital Intelligence";
    private String aboutSubtitle = "Denesens Solutions is a premier corporate software architecture firm based in Salem, Tamil Nadu, India. We fuse luxury design aesthetics with robust software engineering.";
    private String missionText = "To empower forward-thinking organizations with intelligent, secure, and infinitely scalable software solutions—eliminating technical friction and accelerating enterprise innovation.";
    private String visionText = "To stand as the global gold standard for luxury tech engineering—recognized for combining deep artificial intelligence, resilient cloud infrastructure, and unmatched visual design polish.";
    
    private String themeBg = "white";
    private String fontFamily = "outfit";
    private String accentColor = "gold";
    private String cardRadius = "rounded-3xl";

    private String customBgColor = "#FFFFFF";
    private String customCardColor = "#F8FAFC";
    private String customTextColor = "#0F172A";
    private String customSubtextColor = "#475569";
    private String customAccentColor = "#D4AF37";
    private String customBorderColor = "#E2E8F0";
    private String customGradientStart = "#F8FAFC";
    private String customGradientMid = "#D4AF37";
    private String customGradientEnd = "#B8860B";
    private String headingFont = "Outfit";
    private String bodyFont = "Inter";
    private String fontSizeScale = "normal";

    private SocialLinks socialLinks = new SocialLinks();

    @CreatedDate
    private Instant createdAt;

    @LastModifiedDate
    private Instant updatedAt;

    @Data
    public static class SocialLinks {
        private String linkedin = "https://linkedin.com";
        private String twitter = "https://twitter.com";
        private String github = "https://github.com";
        private String whatsapp = "https://wa.me/919629568373";
    }
}
