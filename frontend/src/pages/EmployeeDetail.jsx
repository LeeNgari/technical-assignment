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

  if (loading) return (
    <div className="flex justify-center items-center h-64">
      <div className="animate-pulse text-gray-500">Loading employee data...</div>
    </div>
  );
  
  if (error) return (
    <div className="p-6 max-w-2xl mx-auto">
      <div className="bg-red-50 border-l-4 border-red-500 p-4">
        <div className="flex">
          <div className="flex-shrink-0">
            <svg className="h-5 w-5 text-red-500" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
            </svg>
          </div>
          <div className="ml-3">
            <p className="text-sm text-red-700">Error loading employee: {error}</p>
          </div>
        </div>
      </div>
      <button
        onClick={() => navigate(-1)}
        className="mt-4 px-4 py-2 bg-gray-100 rounded-md hover:bg-gray-200 transition-colors"
      >
        ← Go back
      </button>
    </div>
  );
  
  if (!employee) return (
    <div className="p-6 max-w-2xl mx-auto text-center">
      <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
      <h3 className="mt-2 text-lg font-medium text-gray-900">Employee not found</h3>
      <p className="mt-1 text-gray-500">The requested employee record doesn't exist.</p>
      <button
        onClick={() => navigate(-1)}
        className="mt-4 px-4 py-2 bg-gray-100 rounded-md hover:bg-gray-200 transition-colors"
      >
        ← Go back
      </button>
    </div>
  );

  return (
    <div className="container mx-auto p-4 max-w-2xl">
      <button
        onClick={() => navigate(-1)}
        className="flex items-center mb-6 px-4 py-2 text-sm font-medium text-gray-700 bg-white rounded-md border border-gray-300 hover:bg-gray-50 transition-colors"
      >
        <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
        </svg>
        Back to list
      </button>
      
      <div className="bg-white overflow-hidden shadow rounded-lg">
        {isEditing ? (
          <div className="px-6 py-5">
            <EmployeeForm
              employee={employee}
              onSubmit={handleUpdate}
              onCancel={() => setIsEditing(false)}
            />
          </div>
        ) : (
          <>
            <div className="px-6 py-5 border-b border-gray-200 flex justify-between items-center">
              <h1 className="text-2xl font-semibold text-gray-900">{employee.name}</h1>
              <button
                onClick={() => setIsEditing(true)}
                className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-black hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black"
              >
                Edit Profile
              </button>
            </div>
            
            <div className="px-6 py-5 divide-y divide-gray-200">
              <div className="pb-4">
                <h3 className="text-sm font-medium text-gray-500">Email address</h3>
                <p className="mt-1 text-sm text-gray-900">{employee.email}</p>
              </div>
              <div className="py-4">
                <h3 className="text-sm font-medium text-gray-500">Phone number</h3>
                <p className="mt-1 text-sm text-gray-900">{employee.phoneNumber}</p>
              </div>
              <div className="pt-4">
                <h3 className="text-sm font-medium text-gray-500">Department</h3>
                <p className="mt-1 text-sm text-gray-900">{employee.department}</p>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default EmployeeDetail;