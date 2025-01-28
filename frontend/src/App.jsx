import React, { useState, useEffect } from 'react'
import axios from 'axios'
import EmployeeCard from './components/EmployeeCard'
import EmployeeForm from './components/EmployeeForm'

const App = () => {
  const [employees, setEmployees] = useState([])
  const [showForm, setShowForm] = useState(false)
  const [isEditing, setIsEditing] = useState(false)
  const [formData, setFormData] = useState({
    employee: '',
    department: ''
  })

  useEffect(() => {
    fetchEmployees()
  }, [])

  const fetchEmployees = async () => {
    try {
      const response = await axios.get('http://localhost:8000/')
      console.log('API Response:', response.data)
      setEmployees(response.data)
    } catch (error) {
      console.error('Error fetching data:', error)
      setEmployees([])
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      if (isEditing) {
        await axios.put(`http://localhost:8000/update/${formData.id}/`, formData)
      } else {
        await axios.post('http://localhost:8000/create/', formData)
      }
      await fetchEmployees()
      setShowForm(false)
      setIsEditing(false)
      setFormData({ employee: '', department: '' })
    } catch (error) {
      console.error('Error saving employee:', error)
    }
  }

  const handleEdit = (employee) => {
    setFormData({
      id: employee.id,
      employee: employee.employee,
      department: employee.department
    })
    setIsEditing(true)
    setShowForm(true)
  }

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this employee?')) {
      try {
        await axios.delete(`http://localhost:8000/delete/${id}/`)
        await fetchEmployees()
      } catch (error) {
        console.error('Error deleting employee:', error)
      }
    }
  }

  const handleCancel = () => {
    setShowForm(false)
    setIsEditing(false)
    setFormData({ employee: '', department: '' })
  }

  return (
    <div className="min-h-screen bg-gray-100 py-8 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800">Employee Directory</h1>
          {!showForm && (
            <button
              onClick={() => {
                setShowForm(true)
                setIsEditing(false)
                setFormData({ employee: '', department: '' })
              }}
              className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg"
            >
              Add Employee
            </button>
          )}
        </div>

        {showForm && (
          <EmployeeForm 
            formData={formData}
            setFormData={setFormData}
            handleSubmit={handleSubmit}
            isEditing={isEditing}
            onCancel={handleCancel}
          />
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {employees && employees.length > 0 ? (
            employees.map((emp) => (
              <EmployeeCard 
                key={emp.id} 
                employee={emp} 
                onEdit={handleEdit}
                onDelete={handleDelete}
              />
            ))
          ) : (
            <div className="col-span-3 text-center py-8 text-gray-500">
              No employees found
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default App
