import React, { useState } from 'react';

const data = [
  { id: 1, name: 'Alice', age: 25 },
  { id: 2, name: 'Bob', age: 30 },
  { id: 3, name: 'Charlie', age: 28 },
  { id: 4, name: 'David', age: 35 },
  { id: 5, name: 'Eve', age: 22 },
  { id: 6, name: 'Frank', age: 27 },
  { id: 7, name: 'Grace', age: 31 },
  { id: 8, name: 'Heidi', age: 29 },
  { id: 9, name: 'Ivan', age: 33 },
  { id: 10, name: 'Judy', age: 26 },
  // add more rows if needed
];

const PAGE_SIZE = 3;

export default function PaginatedTable() {
  const [currentPage, setCurrentPage] = useState(1);

  // Calculate total pages
  const totalPages = Math.ceil(data.length / PAGE_SIZE);

  // Get current page data slice
  const currentData = data.slice(
    (currentPage - 1) * PAGE_SIZE,
    currentPage * PAGE_SIZE
  );

  function goToPrevious() {
    setCurrentPage((page) => Math.max(page - 1, 1));
  }

  function goToNext() {
    setCurrentPage((page) => Math.min(page + 1, totalPages));
  }

  return (
    <div>
      <table className="min-w-full border border-gray-300 rounded-lg overflow-hidden">
        <thead className="bg-gray-100">
          <tr>
        <th className="px-4 py-2 text-left font-semibold text-gray-700 border-b border-gray-300">ID</th>
        <th className="px-4 py-2 text-left font-semibold text-gray-700 border-b border-gray-300">Name</th>
        <th className="px-4 py-2 text-left font-semibold text-gray-700 border-b border-gray-300">Age</th>
          </tr>
        </thead>
        <tbody>
          {currentData.map(({ id, name, age }) => (
        <tr key={id} className="even:bg-gray-50 hover:bg-gray-100 transition-colors">
          <td className="px-4 py-2 border-b border-gray-200">{id}</td>
          <td className="px-4 py-2 border-b border-gray-200">{name}</td>
          <td className="px-4 py-2 border-b border-gray-200">{age}</td>
        </tr>
          ))}
        </tbody>
      </table>

      <div style={{ marginTop: 10, display: 'flex', justifyContent: 'space-between', maxWidth: 200 }}>
        <button onClick={goToPrevious} disabled={currentPage === 1}>
          Previous
        </button>

        <span>
          Page {currentPage} of {totalPages}
        </span>

        <button onClick={goToNext} disabled={currentPage === totalPages}>
          Next
        </button>
      </div>
    </div>
  );
}
