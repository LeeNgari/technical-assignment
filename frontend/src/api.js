const API_BASE = "http://localhost:8081/api/employee";

export const fetchEmployees = async () => {
  const response = await fetch(API_BASE);
  if (!response.ok) {
    throw new Error("Failed to fetch employees");
  }
  return await response.json();
};

export const fetchEmployeeById = async (id) => {
  const response = await fetch(`${API_BASE}/${id}`);
  if (!response.ok) {
    throw new Error("Employee not found");
  }
  return await response.json();
};

export const createEmployee = async (employeeData) => {
  const response = await fetch(API_BASE, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(employeeData),
  });
  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.details?.join(", ") || "Failed to create employee");
  }
  return await response.json();
};

export const updateEmployee = async (id, employeeData) => {
  const response = await fetch(`${API_BASE}/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(employeeData),
  });
  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.details?.join(", ") || "Failed to update employee");
  }
  return await response.json();
};

export const deleteEmployee = async (id) => {
  const response = await fetch(`${API_BASE}/${id}`, {
    method: "DELETE",
  });
  if (!response.ok) {
    throw new Error("Failed to delete employee");
  }
  return await response.json();
};