package com.denesens.model;

import lombok.Data;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.Id;
import org.springframework.data.annotation.LastModifiedDate;
import org.springframework.data.mongodb.core.index.Indexed;
import org.springframework.data.mongodb.core.mapping.Document;

import java.time.Instant;
import java.util.ArrayList;
import java.util.List;

@Data
@Document(collection = "products")
public class Product {
    @Id
    private String id;
    
    private String name;

    @Indexed(unique = true)
    private String slug;
    
    private String tagline;
    private String description;
    private String fullDetails = "";
    private List<String> features = new ArrayList<>();
    private List<String> techStack = new ArrayList<>();
    private String status = "Live"; // Live, Beta, Coming Soon
    private String demoUrl = "#";
    private String badge = "In-House SaaS";
    private Integer order = 0;

    @CreatedDate
    private Instant createdAt;

    @LastModifiedDate
    private Instant updatedAt;
}
