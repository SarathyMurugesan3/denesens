package com.denesens.model;

import com.fasterxml.jackson.annotation.JsonProperty;
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
@Document(collection = "portfolios")
public class Portfolio {
    @Id
    @JsonProperty("_id")
    private String id;
    
    private String title;

    @Indexed(unique = true)
    private String slug;
    
    private String category;
    private String client = "Enterprise Client";
    private String description;
    private String overview = "";
    private String challenge = "";
    private String solution = "";
    private String impact = "";
    private String image = "";
    private List<String> tags = new ArrayList<>();
    private String liveUrl = "#";
    private Integer order = 0;

    @CreatedDate
    private Instant createdAt;

    @LastModifiedDate
    private Instant updatedAt;
}
