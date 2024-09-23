import { useEffect } from "react";
import "./App.css";
import EmployeeData from "./EmployeeData";
import { useState } from "react";
function App() {
  const [data, setData] = useState([]);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [age, setAge] = useState(0);
  const [id, setId] = useState(0);
  const [isUpdated, setIsUpdated] = useState(false);
  useEffect(() => {
    setData(EmployeeData);
  }, []);
  const handleEdit = (id) => {
    const selectedEmployee = data.find((item) => item.id === id); // Renamed variable
    if (selectedEmployee !== undefined) {
      setIsUpdated(true);
      setId(selectedEmployee.id);
      setFirstName(selectedEmployee.firstName);
      setLastName(selectedEmployee.lastName);
      setAge(selectedEmployee.age);
    }
  };
  const handleDelete = (id) => {
    if (id > 0) {
      if (window.confirm("Are you sure to delete this?")) {
        setData(data.filter((item) => item.id !== id));
      }
    }
  };
  const handleSave = (e) => {
    let error = "";
    e.preventDefault();
    if (age <= 0 || (firstName && lastName === "")) {
      error += "All fields must be required";
    }
    if (error === "") {
      const old = [...data];
      const newObject = {
        id: data.length + 1,
        firstName,
        lastName,
        age,
      };
      old.push(newObject);
      setData(old);
    } else {
      alert(error);
    }
  };

  const handleClear = () => {
    setId("");
    setFirstName("");
    setLastName("");
    setAge("");
    setIsUpdated(false);
  };

  const handleUpdate = () => {
    // Update data
    const updatedData = data.map((item) =>
      item.id === id ? { id, firstName, lastName, age } : item
    );
    setData(updatedData);
    handleClear();
    setIsUpdated(false);
  };
  return (
    <div>
      <div className="d-flex justify-content-center m-3">
        <div>
          <label htmlFor="fn">First Name</label>
          <input
            value={firstName}
            type="text"
            id="firstName"
            placeholder="Enter First Name"
            onChange={(e) => setFirstName(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="fn">last Name</label>
          <input
            value={lastName}
            type="text"
            id="firstName"
            placeholder="Enter First Name"
            onChange={(e) => setLastName(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="fn">Age</label>
          <input
            value={age}
            type="text"
            id="firstName"
            placeholder="Enter First Name"
            onChange={(e) => setAge(e.target.value)}
          />
        </div>
        {isUpdated ? (
          <button
            type="button"
            className="btn btn-primary bg-primary mx-3"
            onClick={() => handleUpdate()}
          >
            Update
          </button>
        ) : (
          <button
            type="button"
            className="btn btn-primary bg-primary mx-3"
            onClick={(e) => handleSave(e)}
          >
            Save
          </button>
        )}

        <button
          type="button"
          className="btn btn-danger bg-danger"
          onClick={() => handleClear()}
        >
          Clear
        </button>
      </div>
      <table className="table table-hover">
        <thead>
          <tr>
            <th>Id</th>
            <th>First Name</th>
            <th>Last Name</th>
            <th>age </th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {data.map((employee, index) => (
            <tr key={index}>
              <td>{employee.id}</td>
              <td>{employee.firstName}</td>
              <td>{employee.lastName}</td>
              <td>{employee.age}</td>
              <td>
                <button
                  type="button"
                  className="btn btn-primary bg-primary"
                  onClick={() => handleEdit(employee.id)}
                >
                  Edit
                </button>
              </td>
              <td>
                <button
                  type="button"
                  className="btn btn-danger bg-danger"
                  onClick={() => handleDelete(employee.id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default App;
