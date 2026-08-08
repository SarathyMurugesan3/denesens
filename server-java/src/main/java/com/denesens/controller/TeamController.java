package com.denesens.controller;

import com.denesens.model.TeamMember;
import com.denesens.repository.TeamMemberRepository;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import jakarta.servlet.http.HttpServletRequest;
import java.time.Instant;
import java.util.*;
import java.util.concurrent.CopyOnWriteArrayList;

@RestController
@RequestMapping("/api/team")
public class TeamController {

    private final TeamMemberRepository teamMemberRepository;
    private final List<TeamMember> fallbackTeam = new CopyOnWriteArrayList<>();

    public TeamController(TeamMemberRepository teamMemberRepository) {
        this.teamMemberRepository = teamMemberRepository;

        // Seed default fallback team members matching teamRoutes.js
        TeamMember sm = new TeamMember();
        sm.setId("team-1");
        sm.setName("Sarathy M");
        sm.setRole("CEO");
        sm.setBio("Visionary leader driving strategic growth, product expansion, and enterprise partnerships at Denesens Solutions.");
        sm.setInitials("SM");
        sm.setAvatar("https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80");
        TeamMember.SocialLinks smLinks = new TeamMember.SocialLinks();
        smLinks.setLinkedin("https://linkedin.com");
        smLinks.setTwitter("https://twitter.com");
        smLinks.setGithub("https://github.com");
        sm.setSocialLinks(smLinks);
        sm.setOrder(1);
        sm.setCreatedAt(Instant.now());
        fallbackTeam.add(sm);

        TeamMember ds = new TeamMember();
        ds.setId("team-2");
        ds.setName("Deepan S");
        ds.setRole("CTO");
        ds.setBio("Chief Architect specializing in high-concurrency systems, AI integrations, and cloud infrastructure scalability.");
        ds.setInitials("DS");
        ds.setAvatar("https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80");
        TeamMember.SocialLinks dsLinks = new TeamMember.SocialLinks();
        dsLinks.setLinkedin("https://linkedin.com");
        dsLinks.setTwitter("https://twitter.com");
        dsLinks.setGithub("https://github.com");
        ds.setSocialLinks(dsLinks);
        ds.setOrder(2);
        ds.setCreatedAt(Instant.now());
        fallbackTeam.add(ds);

        TeamMember dr = new TeamMember();
        dr.setId("team-3");
        dr.setName("Durai Rajan G");
        dr.setRole("Marketing Lead");
        dr.setBio("Brand strategist overseeing global client acquisition, digital campaigns, and product marketing initiatives.");
        dr.setInitials("DR");
        dr.setAvatar("https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=400&q=80");
        TeamMember.SocialLinks drLinks = new TeamMember.SocialLinks();
        drLinks.setLinkedin("https://linkedin.com");
        drLinks.setTwitter("https://twitter.com");
        drLinks.setGithub("https://github.com");
        dr.setSocialLinks(drLinks);
        dr.setOrder(3);
        dr.setCreatedAt(Instant.now());
        fallbackTeam.add(dr);
    }

    @GetMapping
    public ResponseEntity<?> getTeam() {
        try {
            List<TeamMember> team = teamMemberRepository.findAllByOrderByOrderAsc();
            if (!team.isEmpty()) {
                return ResponseEntity.ok(Map.of("success", true, "data", team));
            }
        } catch (Exception err) {
            System.err.println("[Team API] Failed to fetch team from DB: " + err.getMessage());
        }
        return ResponseEntity.ok(Map.of("success", true, "data", fallbackTeam));
    }

    @PostMapping
    public ResponseEntity<?> createTeamMember(@RequestBody TeamMember member, HttpServletRequest request) {
        try {
            member.setCreatedAt(Instant.now());
            TeamMember saved = teamMemberRepository.save(member);
            return ResponseEntity.status(HttpStatus.CREATED).body(Map.of("success", true, "data", saved));
        } catch (Exception err) {
            member.setId("team-" + System.currentTimeMillis());
            member.setCreatedAt(Instant.now());
            fallbackTeam.add(member);
            return ResponseEntity.status(HttpStatus.CREATED).body(Map.of("success", true, "data", member, "fallback", true));
        }
    }

    @PutMapping("/{id}")
    public ResponseEntity<?> updateTeamMember(@PathVariable String id, @RequestBody TeamMember memberUpdate, HttpServletRequest request) {
        try {
            Optional<TeamMember> existingOpt = teamMemberRepository.findById(id);
            if (existingOpt.isPresent()) {
                TeamMember existing = existingOpt.get();
                existing.setName(memberUpdate.getName());
                existing.setRole(memberUpdate.getRole());
                existing.setBio(memberUpdate.getBio());
                existing.setInitials(memberUpdate.getInitials());
                existing.setAvatar(memberUpdate.getAvatar());
                existing.setSocialLinks(memberUpdate.getSocialLinks());
                existing.setOrder(memberUpdate.getOrder());

                TeamMember saved = teamMemberRepository.save(existing);
                return ResponseEntity.ok(Map.of("success", true, "data", saved));
            }
        } catch (Exception err) {
            System.err.println("[Team API] Failed to update team member: " + err.getMessage());
        }

        // In-memory fallback
        for (int i = 0; i < fallbackTeam.size(); i++) {
            TeamMember t = fallbackTeam.get(i);
            if (t.getId().equals(id)) {
                memberUpdate.setId(id);
                fallbackTeam.set(i, memberUpdate);
                return ResponseEntity.ok(Map.of("success", true, "data", memberUpdate));
            }
        }

        return ResponseEntity.status(HttpStatus.NOT_FOUND)
                .body(Map.of("success", false, "error", "Team member not found"));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteTeamMember(@PathVariable String id, HttpServletRequest request) {
        try {
            teamMemberRepository.deleteById(id);
        } catch (Exception err) {
            System.err.println("[Team API] Failed to delete member: " + err.getMessage());
        }
        fallbackTeam.removeIf(t -> t.getId().equals(id));
        return ResponseEntity.ok(Map.of("success", true, "message", "Team member deleted successfully"));
    }
}
