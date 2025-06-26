package com.url.shortener.controller;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

import com.url.shortener.models.UrlMapping;
import com.url.shortener.service.UrlMappingService;

@RestController
@CrossOrigin(origins = {"https://golinkly.netlify.app", "https://*.netlify.app"})
public class RedirectController {

    private static final Logger log = LoggerFactory.getLogger(RedirectController.class);
    private final UrlMappingService urlMappingService;

    public RedirectController(UrlMappingService urlMappingService) {
        this.urlMappingService = urlMappingService;
    }

    @GetMapping("/test-redirect")
    public ResponseEntity<String> testRedirect(){
        return ResponseEntity.ok("Redirect controller is working!");
    }

    @GetMapping("/{shortUrl}")
    public ResponseEntity<Void> redirect(@PathVariable String shortUrl){
        log.info("Redirect request for shortUrl: {}", shortUrl);
        try {
            UrlMapping urlMapping = urlMappingService.getOriginalUrl(shortUrl);
            if (urlMapping != null) {
                log.info("Found URL mapping, redirecting to: {}", urlMapping.getOriginalUrl());
                return ResponseEntity.status(302)
                    .header("Location", urlMapping.getOriginalUrl())
                    .build();
            } else {
                log.warn("No URL mapping found for shortUrl: {}", shortUrl);
                return ResponseEntity.notFound().build();
            }
        } catch (Exception e) {
            log.error("Error processing redirect for shortUrl: {}", shortUrl, e);
            return ResponseEntity.internalServerError().build();
        }
    }
}
