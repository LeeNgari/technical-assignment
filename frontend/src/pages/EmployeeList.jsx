import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { fetchEmployees, deleteEmployee } from "../api";
import EmployeeCard from "../components/EmployeeCard";
import SearchAndFilter from "../components/SearchAndFilter";

const EmployeeList = () => {
  const [employees, setEmployees] = useState([]);
  const [filteredEmployees, setFilteredEmployees] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [departments, setDepartments] = useState([]);

  useEffect(() => {
    const loadEmployees = async () => {
      try {
        const data = await fetchEmployees();
        setEmployees(data);
        setFilteredEmployees(data);
        
        // Extract unique departments
        const uniqueDepts = [...new Set(data.map(emp => emp.department))];
        setDepartments(uniqueDepts);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    loadEmployees();
  }, []);

  const handleSearch = (term) => {
    const filtered = employees.filter(emp =>
      emp.name.toLowerCase().includes(term.toLowerCase())
    );
    setFilteredEmployees(filtered);
  };

  const handleFilter = (dept) => {
    if (!dept) {
      setFilteredEmployees(employees);
    } else {
      const filtered = employees.filter(emp => emp.department === dept);
      setFilteredEmployees(filtered);
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteEmployee(id);
      setEmployees(prev => prev.filter(emp => emp.id !== id));
      setFilteredEmployees(prev => prev.filter(emp => emp.id !== id));
    } catch (err) {
      setError(err.message);
    }
  };

  if (loading) return <div className="p-4">Loading...</div>;
  if (error) return <div className="p-4 text-red-500">Error: {error}</div>;

  return (
    <div className="container mx-auto p-4 max-w-4xl">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Employee Management</h1>
        <Link
          to="/employee/new"
          className="px-4 py-2 bg-black text-white rounded hover:bg-gray-800"
        >
          Add Employee
        </Link>
      </div>
      
      <SearchAndFilter 
        onSearch={handleSearch} 
        onFilter={handleFilter} 
        departments={departments} 
      />
      
      <div className="space-y-3">
        {filteredEmployees.length === 0 ? (
          <p className="text-center py-4">No employees found</p>
        ) : (
          filteredEmployees.map(employee => (
            <EmployeeCard 
              key={employee.id} 
              employee={employee} 
              onDelete={handleDelete} 
            />
          ))
        )}
      </div>
    </div>
  );
};

export default EmployeeList;