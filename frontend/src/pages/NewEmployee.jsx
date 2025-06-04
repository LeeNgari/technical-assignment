import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createEmployee } from "../api";
import EmployeeForm from "../components/EmployeeForm";

const NewEmployee = () => {
  const navigate = useNavigate();
  const [error, setError] = useState(null);

  const handleSubmit = async (formData) => {
    try {
      await createEmployee(formData);
      navigate("/");
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="container mx-auto p-4 max-w-2xl">
      <button
        onClick={() => navigate(-1)}
        className="mb-4 px-3 py-1 bg-gray-200 rounded hover:bg-gray-300"
      >
        ← Back
      </button>
      
      <div className="bg-white p-6 rounded-lg shadow-sm">
        <h1 className="text-2xl font-bold mb-6">Add New Employee</h1>
        {error && <div className="mb-4 text-red-500">{error}</div>}
        <EmployeeForm
          employee={{}}
          onSubmit={handleSubmit}
          onCancel={() => navigate("/")}
        />
      </div>
    </div>
  );
};

export default NewEmployee;