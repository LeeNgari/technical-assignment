package com.example.back.dto;

import java.util.List;

public record ErrorResponse(
        String message,
        List<String> details
) {}