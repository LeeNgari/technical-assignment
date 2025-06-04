package com.example.back.mapper;

import com.example.back.dto.EmployeeRequestDTO;
import com.example.back.dto.EmployeeResponseDTO;
import com.example.back.model.Employee;

public class EmployeeMapper {

    public static EmployeeResponseDTO toDTO(Employee employee) {
        EmployeeResponseDTO employeeDTO = new EmployeeResponseDTO();
        employeeDTO.setId(employee.getId().toString());
        employeeDTO.setName(employee.getName());
        employeeDTO.setEmail(employee.getEmail());
        employeeDTO.setDepartment(employee.getDepartment());
        employeeDTO.setPhoneNumber(employee.getPhoneNumber());
        return employeeDTO;
    }
    public static Employee toEntity(EmployeeRequestDTO employeeRequestDTO) {
        Employee employee = new Employee();
        employee.setName(employeeRequestDTO.getName());
        employee.setEmail(employeeRequestDTO.getEmail());
        employee.setDepartment(employeeRequestDTO.getDepartment());
        employee.setPhoneNumber(employeeRequestDTO.getPhoneNumber());

        return employee;
    }
}
