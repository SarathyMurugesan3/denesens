package com.denesens.model;

import lombok.Data;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.time.Instant;

@Data
@Document(collection = "contactsubmissions")
public class ContactSubmission {
    @Id
    private String id;
    
    private String name;
    private String email;
    private String phone = "";
    private String company = "";
    private String subject;
    private String message;
    private String status = "NEW"; // NEW, IN_PROGRESS, RESOLVED

    @CreatedDate
    private Instant createdAt;
}
