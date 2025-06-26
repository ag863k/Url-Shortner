package com.url.shortener.controller;

import java.net.MalformedURLException;
import java.net.URL;
import java.security.Principal;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.time.format.DateTimeParseException;
import java.util.List;
import java.util.Map;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.url.shortener.dtos.ClickEventDTO;
import com.url.shortener.dtos.UrlMappingDTO;
import com.url.shortener.models.User;
import com.url.shortener.service.UrlMappingService;
import com.url.shortener.service.UserService;

@RestController
@RequestMapping("/api/urls")
@CrossOrigin(origins = {"https://golinkly.netlify.app", "https://*.netlify.app"})
public class UrlMappingController {
    private static final Logger logger = LoggerFactory.getLogger(UrlMappingController.class);
    private final UrlMappingService urlMappingService;
    private final UserService userService;

    public UrlMappingController(UrlMappingService urlMappingService, UserService userService) {
        this.urlMappingService = urlMappingService;
        this.userService = userService;
    }

    @PostMapping("/shorten")
    @PreAuthorize("hasRole('USER')")
    public ResponseEntity<UrlMappingDTO> createShortUrl(@RequestBody Map<String, String> request,
                                                        Principal principal){
        try {
            String originalUrl = request.get("originalUrl");
            
            if (originalUrl == null || originalUrl.trim().isEmpty()) {
                logger.warn("Received empty or null URL from user: {}", principal.getName());
                return ResponseEntity.badRequest().build();
            }
            
            originalUrl = originalUrl.trim();
            
            // Validate URL format
            if (!isValidUrl(originalUrl)) {
                logger.warn("Invalid URL format received from user {}: {}", principal.getName(), originalUrl);
                return ResponseEntity.badRequest().build();
            }
            
            User user = userService.findByUsername(principal.getName());
            if (user == null) {
                logger.error("User not found: {}", principal.getName());
                return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
            }
            
            UrlMappingDTO urlMappingDTO = urlMappingService.createShortUrl(originalUrl, user);
            logger.info("Successfully created short URL for user: {}", principal.getName());
            return ResponseEntity.ok(urlMappingDTO);
            
        } catch (Exception e) {
            logger.error("Error creating short URL for user {}: {}", principal.getName(), e.getMessage(), e);
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }
    
    private boolean isValidUrl(String url) {
        try {
            @SuppressWarnings("unused")
            URL validatedUrl = new URL(url);
            return true;
        } catch (MalformedURLException e) {
            return false;
        }
    }


    @GetMapping("/myurls")
    @PreAuthorize("hasRole('USER')")
    public ResponseEntity<List<UrlMappingDTO>> getUserUrls(Principal principal){
        try {
            User user = userService.findByUsername(principal.getName());
            if (user == null) {
                logger.error("User not found: {}", principal.getName());
                return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
            }
            
            List<UrlMappingDTO> urls = urlMappingService.getUrlsByUser(user);
            logger.info("Retrieved {} URLs for user: {}", urls.size(), principal.getName());
            return ResponseEntity.ok(urls);
            
        } catch (Exception e) {
            logger.error("Error retrieving URLs for user {}: {}", principal.getName(), e.getMessage(), e);
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }


    @GetMapping("/analytics/{shortUrl}")
    @PreAuthorize("hasRole('USER')")
    public ResponseEntity<List<ClickEventDTO>> getUrlAnalytics(@PathVariable String shortUrl,
                                                               @RequestParam("startDate") String startDate,
                                                               @RequestParam("endDate") String endDate){
        try {
            if (shortUrl == null || shortUrl.trim().isEmpty()) {
                logger.warn("Empty or null short URL provided for analytics");
                return ResponseEntity.badRequest().build();
            }
            
            DateTimeFormatter formatter = DateTimeFormatter.ISO_LOCAL_DATE_TIME;
            LocalDateTime start;
            LocalDateTime end;
            
            try {
                start = LocalDateTime.parse(startDate, formatter);
                end = LocalDateTime.parse(endDate, formatter);
            } catch (DateTimeParseException e) {
                logger.warn("Invalid date format provided for analytics: startDate={}, endDate={}", startDate, endDate);
                return ResponseEntity.badRequest().build();
            }
            
            if (start.isAfter(end)) {
                logger.warn("Start date is after end date for analytics: start={}, end={}", start, end);
                return ResponseEntity.badRequest().build();
            }
            
            List<ClickEventDTO> clickEventDTOS = urlMappingService.getClickEventsByDate(shortUrl.trim(), start, end);
            logger.info("Retrieved {} click events for short URL: {}", clickEventDTOS.size(), shortUrl);
            return ResponseEntity.ok(clickEventDTOS);
            
        } catch (Exception e) {
            logger.error("Error retrieving analytics for short URL {}: {}", shortUrl, e.getMessage(), e);
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }


    @GetMapping("/totalClicks")
    @PreAuthorize("hasRole('USER')")
    public ResponseEntity<Map<LocalDate, Long>> getTotalClicksByDate(Principal principal,
                                                                     @RequestParam("startDate") String startDate,
                                                                     @RequestParam("endDate") String endDate){
        try {
            User user = userService.findByUsername(principal.getName());
            if (user == null) {
                logger.error("User not found: {}", principal.getName());
                return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
            }
            
            DateTimeFormatter formatter = DateTimeFormatter.ISO_LOCAL_DATE;
            LocalDate start;
            LocalDate end;
            
            try {
                start = LocalDate.parse(startDate, formatter);
                end = LocalDate.parse(endDate, formatter);
            } catch (DateTimeParseException e) {
                logger.warn("Invalid date format provided for total clicks: startDate={}, endDate={}", startDate, endDate);
                return ResponseEntity.badRequest().build();
            }
            
            if (start.isAfter(end)) {
                logger.warn("Start date is after end date for total clicks: start={}, end={}", start, end);
                return ResponseEntity.badRequest().build();
            }
            
            Map<LocalDate, Long> totalClicks = urlMappingService.getTotalClicksByUserAndDate(user, start, end);
            logger.info("Retrieved total clicks data for user {} between {} and {}", principal.getName(), start, end);
            return ResponseEntity.ok(totalClicks);
            
        } catch (Exception e) {
            logger.error("Error retrieving total clicks for user {}: {}", principal.getName(), e.getMessage(), e);
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }
}
