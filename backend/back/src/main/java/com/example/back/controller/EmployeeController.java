package com.example.back.controller;

import com.example.back.dto.EmployeeRequestDTO;
import com.example.back.dto.EmployeeResponseDTO;
import com.example.back.exception.EmployeeNotFoundException;
import com.example.back.service.EmployeeService;
import com.example.back.validators.EmployeeValidator;
import jakarta.validation.groups.Default;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.UUID;

@CrossOrigin(origins = "http://localhost:5173")
@RestController
@RequestMapping("/api/employee")
public class EmployeeController {

    private final EmployeeService employeeService;

    public EmployeeController(EmployeeService employeeService) {
        this.employeeService = employeeService;
    }

    @GetMapping
    public ResponseEntity<List<EmployeeResponseDTO>> getAllEmployees() {
        List<EmployeeResponseDTO> employees = employeeService.getEmployees();
        return ResponseEntity.ok().body(employees);
    }
    @GetMapping("/{id}")
    public ResponseEntity<EmployeeResponseDTO> getEmployeeById(@PathVariable UUID id) {
        Optional<EmployeeResponseDTO> employeeResponseDTO = employeeService.findEmployeeById(id);
        return employeeResponseDTO
                .map(ResponseEntity::ok)
                .orElseThrow(() -> new EmployeeNotFoundException("Employee not found"));
    }

    @PostMapping
    public ResponseEntity<EmployeeResponseDTO> createEmployee(
            @Validated({Default.class, EmployeeValidator.class})
            @RequestBody EmployeeRequestDTO employeeRequestDTO) {

        EmployeeResponseDTO response = employeeService.createEmployee(employeeRequestDTO);
        return ResponseEntity.ok().body(response);
    }
    @PutMapping("/{id}")
    public ResponseEntity<EmployeeResponseDTO> updateEmployee(@PathVariable UUID id,
                                                              @Validated({Default.class, EmployeeValidator.class})
                                                              @RequestBody EmployeeRequestDTO employeeRequestDTO){
        EmployeeResponseDTO response = employeeService.updateEmployee(id, employeeRequestDTO);
        return ResponseEntity.ok().body(response);
    }
    @DeleteMapping("/{id}")
    public ResponseEntity<Map<String, String>> deleteEmployee(@PathVariable UUID id) {
        employeeService.deleteEmployee(id);
        return ResponseEntity.ok(Map.of("message", "Employee deleted successfully"));
    }
}
