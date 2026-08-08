package com.denesens.repository;

import com.denesens.model.SiteSettings;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface SiteSettingsRepository extends MongoRepository<SiteSettings, String> {
}
