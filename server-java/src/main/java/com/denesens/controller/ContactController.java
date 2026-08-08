package com.denesens.controller;

import com.denesens.model.ContactSubmission;
import com.denesens.repository.ContactSubmissionRepository;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import jakarta.mail.internet.MimeMessage;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.validation.Valid;
import java.time.Instant;
import java.util.*;
import java.util.concurrent.CopyOnWriteArrayList;

@RestController
@RequestMapping("/api/contact")
@Validated
public class ContactController {

    private final ContactSubmissionRepository contactSubmissionRepository;
    private final JavaMailSender mailSender;
    
    @Value("${spring.mail.username:}")
    private String smtpUser;

    @Value("${app.notification-email:info@denesens.com}")
    private String notificationEmail;

    private final List<ContactSubmission> fallbackSubmissions = new CopyOnWriteArrayList<>();

    public ContactController(ContactSubmissionRepository contactSubmissionRepository, Optional<JavaMailSender> mailSender) {
        this.contactSubmissionRepository = contactSubmissionRepository;
        this.mailSender = mailSender.orElse(null);

        // Seed fallback submission matching the Node.js database
        ContactSubmission fallback = new ContactSubmission();
        fallback.setId("sub-1");
        fallback.setName("Robert Vance");
        fallback.setEmail("robert@apexcapital.com");
        fallback.setPhone("+1 (555) 234-5678");
        fallback.setCompany("Apex Capital");
        fallback.setSubject("AI & Data Solutions");
        fallback.setMessage("We are looking to implement a custom RAG vector search engine for internal compliance audit documents.");
        fallback.setCreatedAt(Instant.now());
        fallbackSubmissions.add(fallback);
    }

    @GetMapping
    public ResponseEntity<?> getSubmissions(HttpServletRequest request) {
        try {
            List<ContactSubmission> list = contactSubmissionRepository.findAll();
            if (!list.isEmpty()) {
                return ResponseEntity.ok(Map.of("success", true, "data", list));
            }
        } catch (Exception err) {
            System.err.println("[Contact API] Failed to fetch submissions: " + err.getMessage());
        }
        return ResponseEntity.ok(Map.of("success", true, "data", fallbackSubmissions));
    }

    @PostMapping
    public ResponseEntity<?> createSubmission(@Valid @RequestBody ContactSubmission submission) {
        submission.setCreatedAt(Instant.now());
        ContactSubmission savedSubmission;

        try {
            savedSubmission = contactSubmissionRepository.save(submission);
        } catch (Exception dbErr) {
            System.err.println("[Contact API] MongoDB not available, logging in memory: " + dbErr.getMessage());
            submission.setId("in-memory-" + System.currentTimeMillis());
            fallbackSubmissions.add(0, submission);
            savedSubmission = submission;
        }

        // Trigger email notification if SMTP is configured
        if (mailSender != null && smtpUser != null && !smtpUser.isEmpty()) {
            try {
                MimeMessage mimeMessage = mailSender.createMimeMessage();
                MimeMessageHelper helper = new MimeMessageHelper(mimeMessage, "utf-8");
                
                String htmlMsg = String.format(
                    "<div style=\"font-family: Arial, sans-serif; background-color: #0a0a0a; color: #ffffff; padding: 20px; border-radius: 8px;\">" +
                    "  <h2 style=\"color: #D4AF37; border-bottom: 2px solid #D4AF37; padding-bottom: 10px;\">New Contact Form Inquiry</h2>" +
                    "  <p><strong>Name:</strong> %s</p>" +
                    "  <p><strong>Email:</strong> %s</p>" +
                    "  <p><strong>Phone:</strong> %s</p>" +
                    "  <p><strong>Company:</strong> %s</p>" +
                    "  <p><strong>Subject:</strong> %s</p>" +
                    "  <hr style=\"border: 0; border-top: 1px solid #333;\" />" +
                    "  <p style=\"white-space: pre-wrap; font-size: 15px; color: #dddddd;\">%s</p>" +
                    "</div>",
                    savedSubmission.getName(),
                    savedSubmission.getEmail(),
                    savedSubmission.getPhone() != null ? savedSubmission.getPhone() : "N/A",
                    savedSubmission.getCompany() != null ? savedSubmission.getCompany() : "N/A",
                    savedSubmission.getSubject(),
                    savedSubmission.getMessage()
                );

                helper.setText(htmlMsg, true);
                helper.setTo(notificationEmail);
                helper.setSubject("[Denesens Website Inquiry] " + savedSubmission.getSubject());
                helper.setFrom(smtpUser);
                helper.setReplyTo(savedSubmission.getEmail());

                mailSender.send(mimeMessage);
                System.out.println("[Mail Service] Notification sent successfully to " + notificationEmail);
            } catch (Exception mailErr) {
                System.err.println("[Mail Service] Failed to send email: " + mailErr.getMessage());
            }
        } else {
            System.out.println(String.format("[Contact Form Received] From: %s (%s) | Subject: %s", 
                savedSubmission.getName(), savedSubmission.getEmail(), savedSubmission.getSubject()));
        }

        return ResponseEntity.status(HttpStatus.CREATED).body(Map.of(
                "success", true,
                "message", "Thank you for reaching out to Denesens Solutions. Our team will contact you shortly.",
                "data", savedSubmission
        ));
    }
}
