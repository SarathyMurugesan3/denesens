package com.denesens.model;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Data;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.Id;
import org.springframework.data.annotation.LastModifiedDate;
import org.springframework.data.mongodb.core.mapping.Document;

import java.time.Instant;

@Data
@Document(collection = "testimonials")
public class Testimonial {
    @Id
    @JsonProperty("_id")
    private String id;
    
    private String name;
    private String role;
    private String company;
    private String content;
    private Integer rating = 5;
    private String avatar = "";
    private Integer order = 0;

    @CreatedDate
    private Instant createdAt;

    @LastModifiedDate
    private Instant updatedAt;
}
