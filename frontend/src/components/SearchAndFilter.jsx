import React from "react";
const SearchAndFilter = ({ onSearch, onFilter, departments }) => {
  const [searchTerm, setSearchTerm] = React.useState("");
  const [departmentFilter, setDepartmentFilter] = React.useState("");

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleFilterChange = (e) => {
    setDepartmentFilter(e.target.value);
    onFilter(e.target.value);
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    onSearch(searchTerm);
  };

  return (
    <div className="mb-6 space-y-4">
      <form onSubmit={handleSearchSubmit} className="flex space-x-2">
        <input
          type="text"
          placeholder="Search employees..."
          value={searchTerm}
          onChange={handleSearchChange}
          className="flex-grow p-2 border rounded"
        />
        <button
          type="submit"
          className="px-4 py-2 bg-black text-white rounded hover:bg-gray-800"
        >
          Search
        </button>
      </form>
      <div>
        <select
          value={departmentFilter}
          onChange={handleFilterChange}
          className="w-full p-2 border rounded"
        >
          <option value="">All Departments</option>
          {departments.map((dept) => (
            <option key={dept} value={dept}>
              {dept}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};

export default SearchAndFilter;