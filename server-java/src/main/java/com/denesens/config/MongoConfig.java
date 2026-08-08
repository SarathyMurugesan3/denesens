package com.denesens.config;

import com.mongodb.MongoClientSettings;
import org.springframework.boot.autoconfigure.mongo.MongoClientSettingsBuilderCustomizer;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import java.util.concurrent.TimeUnit;

@Configuration
public class MongoConfig {

    @Bean
    public MongoClientSettingsBuilderCustomizer mongoClientSettingsBuilderCustomizer() {
        return builder -> builder
                .applyToSocketSettings(settings -> settings
                        .connectTimeout(3000, TimeUnit.MILLISECONDS)
                        .readTimeout(3000, TimeUnit.MILLISECONDS))
                .applyToClusterSettings(settings -> settings
                        .serverSelectionTimeout(3000, TimeUnit.MILLISECONDS));
    }
}
