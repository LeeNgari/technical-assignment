const API_BASE = "http://localhost:8081/api/employee";

const handleError = async (response) => {
  if (!response.ok) {
    let errorMessage = 'An unexpected error occurred';
    
    try {
      const errorData = await response.json();
      if (errorData.message) {
        errorMessage = errorData.message;
      }
    } catch (e) {
      errorMessage = response.statusText;
    }
    
    
    switch (response.status) {
      case 400:
        errorMessage = ` ${errorMessage}`;
        break;
      case 404:
        errorMessage = errorMessage.includes('not found') 
          ? errorMessage 
          : 'Resource not found';
        break;
      case 409:
        errorMessage = `Conflict: ${errorMessage}`;
        break;
      default:
        break;
    }
    
    throw new Error(errorMessage);
  }
};

export const fetchEmployees = async () => {
  const response = await fetch(API_BASE);
  await handleError(response);
  return await response.json();
};

export const fetchEmployeeById = async (id) => {
  const response = await fetch(`${API_BASE}/${id}`);
  await handleError(response);
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
  await handleError(response);
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
  await handleError(response);
  return await response.json();
};

export const deleteEmployee = async (id) => {
  const response = await fetch(`${API_BASE}/${id}`, {
    method: "DELETE",
  });
  await handleError(response);
  
  if (response.status === 204) {
    return { message: 'Employee deleted successfully' };
  }
  return await response.json();
};
