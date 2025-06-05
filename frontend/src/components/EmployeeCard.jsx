import { Link } from "react-router-dom";
import EmployeeIcon from "./EmployeeIcon";

const EmployeeCard = ({ employee, onDelete }) => {
  const handleDelete = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (window.confirm(`Are you sure you want to delete ${employee.name}?`)) {
      onDelete(employee.id);
    }
  };

  return (
    <div className="group hover:bg-gray-50 transition-colors">
      <Link 
        to={`/employee/${employee.id}`} 
        className="flex items-center justify-between p-6 w-full focus:outline-none focus:bg-gray-50"
      >
        <div className="flex items-center space-x-4 flex-grow min-w-0">
          <div className="flex-shrink-0">
            <EmployeeIcon />
          </div>
          <div className="flex-grow min-w-0">
            <div className="flex items-center space-x-3">
              <h3 className="text-lg font-semibold text-gray-900 truncate group-hover:text-black transition-colors">
                {employee.name}
              </h3>
              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                {employee.department}
              </span>
            </div>
            <div className="mt-1 flex items-center space-x-4 text-sm text-gray-500">
              
              {employee.email && (
                <span className="flex items-center">
                  <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 7.89a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                  {employee.email}
                </span>
              )}
            </div>
          </div>
        </div>
        
        <div className="flex items-center space-x-2 flex-shrink-0 ml-4">
          
          <button
            onClick={handleDelete}
            className="opacity-0 group-hover:opacity-100 transition-all duration-200 p-2 rounded-lg text-gray-400 hover:text-red-600 hover:bg-red-50 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
            title={`Delete ${employee.name}`}
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
            </svg>
          </button>
        </div>
      </Link>
    </div>
  );
};

export default EmployeeCard;