package com.example.back.service;

import com.example.back.dto.EmployeeRequestDTO;
import com.example.back.dto.EmployeeResponseDTO;
import com.example.back.exception.EmailAlreadyExists;
import com.example.back.exception.EmailException;
import com.example.back.exception.EmployeeNotFoundException;
import com.example.back.mapper.EmployeeMapper;
import com.example.back.model.Employee;
import com.example.back.repository.EmployeeRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Service
public class EmployeeService {

    private final EmployeeRepository employeeRepository;

    public EmployeeService(EmployeeRepository employeeRepository) {
        this.employeeRepository = employeeRepository;
    }

    public List<EmployeeResponseDTO> getEmployees() {
        List<Employee> employees = employeeRepository.findAll();
        return employees.stream().map(EmployeeMapper::toDTO).toList();
    }
    public Optional<EmployeeResponseDTO> findEmployeeById(UUID id) {
        Optional<Employee> employee = employeeRepository.findById(id);
        return employee.map(EmployeeMapper::toDTO);

    }

    public EmployeeResponseDTO createEmployee(EmployeeRequestDTO employeeRequestDTO) {

        if(employeeRepository.existsByEmail(employeeRequestDTO.getEmail())){
            throw new EmailException("Employee with the email already exists" + employeeRequestDTO.getEmail());

        }
        Employee employee = EmployeeMapper.toEntity(employeeRequestDTO);
        employeeRepository.save(employee);

        return EmployeeMapper.toDTO(employee);
    }

    public EmployeeResponseDTO updateEmployee(UUID id, EmployeeRequestDTO employeeRequestDTO) {

        Employee employee = employeeRepository.findById(id).orElseThrow(
                ()-> new EmployeeNotFoundException("Employee with id " + id + " not found")
        );
        if(employeeRepository.existsByEmailAndIdNot(employeeRequestDTO.getEmail(), id)){
            throw new EmailAlreadyExists("Employee with the email already exists" + employeeRequestDTO.getEmail());
        }
        employee.setEmail(employeeRequestDTO.getEmail());
        employee.setName(employeeRequestDTO.getName());
        employee.setDepartment(employeeRequestDTO.getDepartment());
        employee.setPhoneNumber(employeeRequestDTO.getPhoneNumber());

        Employee updatedEmployee = employeeRepository.save(employee);
        return EmployeeMapper.toDTO(updatedEmployee);
    }
    public void deleteEmployee(UUID id) {
        employeeRepository.deleteById(id);
    }
}
