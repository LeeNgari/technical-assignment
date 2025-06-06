# Employee Management System API


[Watch the demo video](https://res.cloudinary.com/du74ofrgc/video/upload/v1749115576/Screencast_from_2025-06-05_12-21-41_ujups5.webm)

## Setup and Running the Project


### Backend (Java Spring Boot)

1.  Clone the repository.
2.  Navigate to the backend project directory.
3.  Ensure you have Java and Maven installed.
4.  Build the project with `mvn clean intall`
5.  Run it with `mvn spring-boot:run`.
5.  **Database Configuration:**
    * Ensure you have PostgreSQL installed and running.
    * Create a database for this application (e.g., `employee_db`).
    * Open the `src/main/resources/application.properties` file.
    * Update the following PostgreSQL connection properties with your own credentials and database details:
        ```properties
        spring.datasource.url=jdbc:postgresql://localhost:5432/your_database_name
        spring.datasource.username=your_postgres_username
        spring.datasource.password=your_postgres_password
        spring.jpa.hibernate.ddl-auto=update
        spring.jpa.properties.hibernate.dialect=org.hibernate.dialect.PostgreSQLDialect
        ```
    * Replace `your_database_name`, `your_postgres_username`, and `your_postgres_password` accordingly.
6.  The backend will start on `http://localhost:8081`.

### Frontend (React.js)

1.  Navigate to the frontend project directory.
2.  Ensure you have Node.js and npm installed.
3.  Run `npm install`.
4.  Run `npm run dev` .
5.  The frontend will start on `http://localhost:5173` 

## Technologies Used

* **Frontend:** React.js
* **Backend:** Java Spring Boot
* **API:** RESTful

---

## API Endpoints

The base URL for all API endpoints is `http://localhost:8081/api/employee`.

---

### 1. Get All Employees

Retrieves a list of all employees.

* **Method:** `GET`
* **Endpoint:** `/`
* **Headers:**
    * `Accept: application/json` (Implicit)

* **Success Response (200 OK):**
    ```json
    [
      {
        "id": "f5879b6e-0217-4468-95d3-9ee2bbbc221a",
        "name": "Jane öDe",
        "phoneNumber": "0111111111",
        "email": "Jjsasaso@gmail.com",
        "department": "health"
      }
    ]
    ```

---

### 2. Create Employee

Creates a new employee.

* **Method:** `POST`
* **Endpoint:** `/`
* **Headers:**
    * `Content-Type: application/json`

* **Request Body:**
    ```json
    {
      "name": "Jane öDe",
      "email":"Jjo@gmail.com",
      "department": "engineering",
      "phoneNumber": "0111111111"
    }
    ```

* **Success Response (201 Created or 200 OK):**
    ```json
    {
      "id": "f5879b6e-0217-4468-95d3-9ee2bbbc221a",
      "name": "Jane öDe",
      "phoneNumber": "0111111111",
      "email": "Jjo@gmail.com",
      "department": "engineering"
    }
    ```
* **In case of any duplicate fields email or phone number (400 ):**
```json
{
"message": "Phone number already exists"
}
  ```
```json
 {
  "message": "Email address already exists"
  }
   ```
---

### 3. Update Employee

Updates an existing employee's details by their ID.

* **Method:** `PUT`
* **Endpoint:** `/{employeeId}`
    * Example: `/f5879b6e-0217-4468-95d3-9ee2bbbc221a`
* **Headers:**
    * `Content-Type: application/json`

* **Request Body:**
    ```json
    {
      "name": "Jane öDe",
      "email":"Jjsasaso@gmail.com",
      "department": "health",
      "phoneNumber": "0111111111"
    }
    ```

* **Success Response (200 OK):**
    ```json
    {
      "id": "f5879b6e-0217-4468-95d3-9ee2bbbc221a",
      "name": "Jane öDe",
      "email":"Jjsasaso@gmail.com",
      "department": "health",
      "phoneNumber": "0111111111"
    }
    ```
  
If employee not found
 ```json
{
"message": "Employee not found"
}
  ```

In case email or phone number already exists
```json

{
"message": "Phone number already exists"
}
{
"message": "Email already exists"
}
  ```

---

### 4. Delete Employee

Deletes an employee by their ID.

* **Method:** `DELETE`
* **Endpoint:** `/{employeeId}`
    * Example: `/f5879b6e-0217-4468-95d3-9ee2bbbc221a`

* **Success Response (200 OK or 204 No Content):**
    ```json
    {
      "message": "Employee deleted successfully"
    }
    ```
In case employee not found
  ```json
{
"message": "Employee not found"
}
  ```
---

### 5. Get Employee by ID

Retrieves a specific employee by their ID.

* **Method:** `GET`
* **Endpoint:** `/{employeeId}`
    * Example: `/f5879b6e-0217-4468-95d3-9ee2bbbc221a`
* **Headers:**
    * `Accept: application/json`

* **Success Response (200 OK):**
    ```json
    {
      "id": "f5879b6e-0217-4468-95d3-9ee2bbbc221a",
      "name": "Jane öDe",
      "phoneNumber": "0111111111",
      "email": "Jjsasaso@gmail.com",
      "department": "health"
    }
    ```
* **Error Response (404 Not Found):**
    If the employee with the specified ID is not found.
    ```json
    {
      "error": "Employee not found"
    }
    ```

---
