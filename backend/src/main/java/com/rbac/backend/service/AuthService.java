package com.rbac.backend.service;

import com.rbac.backend.dto.AuthResponse;
import com.rbac.backend.dto.LoginRequest;
import com.rbac.backend.dto.RegisterRequest;
import com.rbac.backend.entity.User;
import com.rbac.backend.mapper.UserMapper;
import com.rbac.backend.repository.UserRepository;
import com.rbac.backend.security.JwtService;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class AuthService {
    
    private final UserRepository repository;
    private final PasswordEncoder passwordEncoder;
    private final JwtService jwtService;
    private final AuthenticationManager authenticationManager;
    private final UserMapper userMapper;

    public AuthResponse register(RegisterRequest request) {
        if (repository.findByEmail(request.getEmail()).isPresent()) {
            throw new RuntimeException("Email already in use");
        }
        
        var user = User.builder()
            .name(request.getName())
            .email(request.getEmail())
            .password(passwordEncoder.encode(request.getPassword()))
            .role(request.getRole())
            .build();
            
        var savedUser = repository.save(user);
        var jwtToken = jwtService.generateToken(user);
        
        return AuthResponse.builder()
            .token(jwtToken)
            .user(userMapper.toDto(savedUser))
            .build();
    }

    public AuthResponse login(LoginRequest request) {
        authenticationManager.authenticate(
            new UsernamePasswordAuthenticationToken(
                request.getEmail(),
                request.getPassword()
            )
        );
        var user = repository.findByEmail(request.getEmail())
            .orElseThrow();
        var jwtToken = jwtService.generateToken(user);
        
        return AuthResponse.builder()
            .token(jwtToken)
            .user(userMapper.toDto(user))
            .build();
    }
}
