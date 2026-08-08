package com.denesens.controller;

import com.denesens.model.AdminMember;
import com.denesens.repository.AdminMemberRepository;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import jakarta.servlet.http.HttpServletRequest;
import java.time.Instant;
import java.util.*;
import java.util.concurrent.CopyOnWriteArrayList;

@RestController
@RequestMapping("/api/admin")
public class AdminController {

    @Value("${app.admin-secret}")
    private String adminSecret;

    private final AdminMemberRepository adminMemberRepository;
    
    // In-memory fallback members matching the Node.js behavior
    private final List<AdminMember> fallbackMembers = new CopyOnWriteArrayList<>();

    public AdminController(AdminMemberRepository adminMemberRepository) {
        this.adminMemberRepository = adminMemberRepository;
        
        // Seed default fallback member
        AdminMember defaultFallback = new AdminMember();
        defaultFallback.setId("mem-1");
        defaultFallback.setName("Durai Rajan G");
        defaultFallback.setUsername("durai_admin");
        defaultFallback.setPassword("password123");
        defaultFallback.setRole("editor");
        defaultFallback.setCreatedBy("Owner");
        defaultFallback.setCreatedAt(Instant.now());
        fallbackMembers.add(defaultFallback);
    }

    @PostMapping("/verify")
    public ResponseEntity<?> verifyAdmin(@RequestBody Map<String, String> body) {
        String password = body.get("password");
        String username = body.get("username");

        // 1. Master Passcode Check (Owner)
        if (password != null && password.equals(adminSecret)) {
            return ResponseEntity.ok(Map.of(
                    "success", true,
                    "user", Map.of(
                            "name", "Master Owner",
                            "username", "superadmin",
                            "role", "owner"
                    ),
                    "message", "Authenticated as Owner"
            ));
        }

        // 2. Member Username + Password Check
        if (username != null) {
            String cleanUsername = username.toLowerCase().trim();
            try {
                Optional<AdminMember> memberOpt = adminMemberRepository.findByUsername(cleanUsername);
                if (memberOpt.isPresent() && memberOpt.get().getPassword().equals(password)) {
                    AdminMember member = memberOpt.get();
                    return ResponseEntity.ok(Map.of(
                            "success", true,
                            "user", Map.of(
                                    "name", member.getName(),
                                    "username", member.getUsername(),
                                    "role", member.getRole() != null ? member.getRole() : "editor"
                            ),
                            "message", "Authenticated as " + member.getRole()
                    ));
                }
            } catch (Exception err) {
                System.err.println("[Admin Auth] Mongo member search fallback: " + err.getMessage());
            }

            // In-memory fallback check
            Optional<AdminMember> match = fallbackMembers.stream()
                    .filter(m -> m.getUsername().equalsIgnoreCase(cleanUsername) && m.getPassword().equals(password))
                    .findFirst();

            if (match.isPresent()) {
                AdminMember member = match.get();
                return ResponseEntity.ok(Map.of(
                        "success", true,
                        "user", Map.of(
                                "name", member.getName(),
                                "username", member.getUsername(),
                                "role", member.getRole() != null ? member.getRole() : "editor"
                        ),
                        "message", "Authenticated as " + member.getRole() + " (fallback)"
                ));
            }
        }

        return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                .body(Map.of("success", false, "error", "Invalid admin credentials or passcode."));
    }

    @GetMapping("/members")
    public ResponseEntity<?> getMembers(HttpServletRequest request) {
        try {
            List<AdminMember> list = adminMemberRepository.findAll();
            if (!list.isEmpty()) {
                return ResponseEntity.ok(Map.of("success", true, "data", removePasswords(list)));
            }
        } catch (Exception err) {
            System.err.println("[Admin API] Failed to fetch members: " + err.getMessage());
        }
        return ResponseEntity.ok(Map.of("success", true, "data", removePasswords(fallbackMembers)));
    }

    @PostMapping("/members")
    public ResponseEntity<?> addMember(@RequestBody Map<String, String> body, HttpServletRequest request) {
        String name = body.get("name");
        String username = body.get("username");
        String password = body.get("password");

        if (name == null || username == null || password == null) {
            return ResponseEntity.badRequest()
                    .body(Map.of("success", false, "error", "Name, Username, and Password are required."));
        }

        String cleanUsername = username.toLowerCase().trim();

        try {
            Optional<AdminMember> existing = adminMemberRepository.findByUsername(cleanUsername);
            if (existing.isPresent()) {
                return ResponseEntity.badRequest()
                        .body(Map.of("success", false, "error", "Username already exists. Please choose a different username."));
            }

            AdminMember newMember = new AdminMember();
            newMember.setName(name);
            newMember.setUsername(cleanUsername);
            newMember.setPassword(password);
            newMember.setRole("editor");
            newMember.setCreatedBy("Owner");

            AdminMember saved = adminMemberRepository.save(newMember);
            
            Map<String, Object> responseData = new HashMap<>();
            responseData.put("id", saved.getId());
            responseData.put("name", saved.getName());
            responseData.put("username", saved.getUsername());
            responseData.put("role", saved.getRole());
            responseData.put("createdAt", saved.getCreatedAt());

            return ResponseEntity.status(HttpStatus.CREATED)
                    .body(Map.of("success", true, "data", responseData));

        } catch (Exception err) {
            // Fallback to in-memory list
            AdminMember fallbackMember = new AdminMember();
            fallbackMember.setId("mem-" + System.currentTimeMillis());
            fallbackMember.setName(name);
            fallbackMember.setUsername(cleanUsername);
            fallbackMember.setPassword(password);
            fallbackMember.setRole("editor");
            fallbackMember.setCreatedBy("Owner");
            fallbackMember.setCreatedAt(Instant.now());

            fallbackMembers.add(fallbackMember);

            Map<String, Object> safeMember = new HashMap<>();
            safeMember.put("id", fallbackMember.getId());
            safeMember.put("name", fallbackMember.getName());
            safeMember.put("username", fallbackMember.getUsername());
            safeMember.put("role", fallbackMember.getRole());
            safeMember.put("createdAt", fallbackMember.getCreatedAt());

            return ResponseEntity.status(HttpStatus.CREATED)
                    .body(Map.of("success", true, "data", safeMember, "fallback", true));
        }
    }

    @DeleteMapping("/members/{id}")
    public ResponseEntity<?> deleteMember(@PathVariable String id, HttpServletRequest request) {
        try {
            adminMemberRepository.deleteById(id);
        } catch (Exception err) {
            System.err.println("[Admin API] Failed to delete member from DB: " + err.getMessage());
        }
        fallbackMembers.removeIf(m -> m.getId().equals(id));
        return ResponseEntity.ok(Map.of("success", true, "message", "Admin member access revoked successfully."));
    }

    private List<Map<String, Object>> removePasswords(List<AdminMember> members) {
        List<Map<String, Object>> safeList = new ArrayList<>();
        for (AdminMember m : members) {
            Map<String, Object> map = new HashMap<>();
            map.put("id", m.getId());
            map.put("name", m.getName());
            map.put("username", m.getUsername());
            map.put("role", m.getRole());
            map.put("createdAt", m.getCreatedAt());
            map.put("createdBy", m.getCreatedBy());
            safeList.add(map);
        }
        return safeList;
    }
}
