import React from 'react'

const EmployeeCard = ({ employee, onEdit, onDelete }) => {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      <div className="p-6">
        <div className="flex items-center justify-center w-16 h-16 bg-blue-100 rounded-full mb-4">
          <span className="text-2xl font-bold text-blue-600">
            {employee?.employee ? employee.employee.charAt(0) : '?'}
          </span>
        </div>
        <h3 className="text-xl font-semibold text-gray-800 mb-2">
          {employee?.employee || 'Unknown'}
        </h3>
        <p className="text-gray-600 mb-4">
          <span className="font-medium">Department:</span> {employee?.department || 'Not Assigned'}
        </p>
        <div className="flex gap-2">
          <button
            onClick={() => onEdit(employee)}
            className="flex-1 bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded"
          >
            Edit
          </button>
          <button
            onClick={() => onDelete(employee.id)}
            className="flex-1 bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  )
}

export default EmployeeCard 