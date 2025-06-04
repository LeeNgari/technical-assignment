import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { fetchEmployeeById, updateEmployee } from "../api";
import EmployeeForm from "../components/EmployeeForm";

const EmployeeDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [employee, setEmployee] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    const loadEmployee = async () => {
      try {
        const data = await fetchEmployeeById(id);
        setEmployee(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    loadEmployee();
  }, [id]);

  const handleUpdate = async (formData) => {
    try {
      const updatedEmployee = await updateEmployee(id, formData);
      setEmployee(updatedEmployee);
      setIsEditing(false);
    } catch (err) {
      setError(err.message);
    }
  };

  if (loading) return <div className="p-4">Loading...</div>;
  if (error) return <div className="p-4 text-red-500">Error: {error}</div>;
  if (!employee) return <div className="p-4">Employee not found</div>;

  return (
    <div className="container mx-auto p-4 max-w-2xl">
      <button
        onClick={() => navigate(-1)}
        className="mb-4 px-3 py-1 bg-gray-200 rounded hover:bg-gray-300"
      >
        ← Back
      </button>
      
      <div className="bg-white p-6 rounded-lg shadow-sm">
        {isEditing ? (
          <EmployeeForm
            employee={employee}
            onSubmit={handleUpdate}
            onCancel={() => setIsEditing(false)}
          />
        ) : (
          <>
            <div className="flex justify-between items-start mb-6">
              <h1 className="text-2xl font-bold">{employee.name}</h1>
              <button
                onClick={() => setIsEditing(true)}
                className="px-3 py-1 bg-black text-white rounded hover:bg-gray-800"
              >
                Edit
              </button>
            </div>
            
            <div className="space-y-4">
              <div>
                <h3 className="text-sm font-medium text-gray-500">Email</h3>
                <p>{employee.email}</p>
              </div>
              <div>
                <h3 className="text-sm font-medium text-gray-500">Phone Number</h3>
                <p>{employee.phoneNumber}</p>
              </div>
              <div>
                <h3 className="text-sm font-medium text-gray-500">Department</h3>
                <p>{employee.department}</p>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default EmployeeDetail;