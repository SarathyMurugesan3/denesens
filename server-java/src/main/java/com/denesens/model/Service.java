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
@Document(collection = "services")
public class Service {
    @Id
    private String id;
    
    private String title;

    @Indexed(unique = true)
    private String slug;
    
    private String category; // Development, Intelligence, Infrastructure, Design & Strategy
    private String shortDesc;
    private String fullDesc;
    private List<String> features = new ArrayList<>();
    private String icon = "Code";
    private List<String> tags = new ArrayList<>();
    private Integer order = 0;

    @CreatedDate
    private Instant createdAt;

    @LastModifiedDate
    private Instant updatedAt;
}
