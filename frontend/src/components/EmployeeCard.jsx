import { Link } from "react-router-dom";
import EmployeeIcon from "./EmployeeIcon";

const EmployeeCard = ({ employee, onDelete }) => {
  return (
    <div className="border p-4 rounded-lg shadow-sm hover:shadow-md transition-shadow flex items-center justify-between">
      <Link to={`/employee/${employee.id}`} className="flex items-center space-x-4 flex-grow">
        <EmployeeIcon />
        <div>
          <h3 className="font-medium">{employee.name}</h3>
          <p className="text-sm text-gray-600">{employee.department}</p>
        </div>
      </Link>
      <button
        onClick={() => onDelete(employee.id)}
        className="px-3 py-1 bg-gray-200 hover:bg-gray-300 rounded text-sm"
      >
        Delete
      </button>
    </div>
  );
};

export default EmployeeCard;