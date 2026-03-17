package com.rbac.backend.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Map;

@RestController
@RequestMapping("/api")
public class ContentController {

    @GetMapping("/public")
    public ResponseEntity<Map<String, String>> getPublicContent() {
        return ResponseEntity.ok(Map.of("message", "This is public content accessible by anyone."));
    }

    @GetMapping("/user")
    public ResponseEntity<Map<String, String>> getUserContent() {
        return ResponseEntity.ok(Map.of("message", "This is protected user content. Only authenticated users can see this."));
    }

    @GetMapping("/admin")
    public ResponseEntity<Map<String, String>> getAdminContent() {
        return ResponseEntity.ok(Map.of("message", "This is highly protected admin content. Only ADMIN role can see this."));
    }
}
