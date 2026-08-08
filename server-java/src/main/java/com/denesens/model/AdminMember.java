package com.denesens.model;

import lombok.Data;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.Id;
import org.springframework.data.annotation.LastModifiedDate;
import org.springframework.data.mongodb.core.index.Indexed;
import org.springframework.data.mongodb.core.mapping.Document;

import java.time.Instant;

@Data
@Document(collection = "adminmembers")
public class AdminMember {
    @Id
    private String id;
    
    private String name;

    @Indexed(unique = true)
    private String username;
    
    private String password;
    
    private String role = "editor";
    
    private String createdBy = "Owner";

    @CreatedDate
    private Instant createdAt;

    @LastModifiedDate
    private Instant updatedAt;
}
