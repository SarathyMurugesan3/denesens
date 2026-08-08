package com.denesens.model;

import lombok.Data;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.Id;
import org.springframework.data.annotation.LastModifiedDate;
import org.springframework.data.mongodb.core.mapping.Document;

import java.time.Instant;

@Data
@Document(collection = "teammembers")
public class TeamMember {
    @Id
    private String id;
    
    private String name;
    private String role;
    private String bio = "";
    private String initials;
    private String avatar = "";
    private SocialLinks socialLinks = new SocialLinks();
    private Integer order = 0;

    @CreatedDate
    private Instant createdAt;

    @LastModifiedDate
    private Instant updatedAt;

    @Data
    public static class SocialLinks {
        private String linkedin = "#";
        private String twitter = "#";
        private String github = "#";
    }
}
