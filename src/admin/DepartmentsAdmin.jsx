import React, { useState } from "react";
import "./DepartmentsAdmin.css";

function DepartmentsAdmin() {
  const [depts, setDepts] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    logo: null,
  });

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: files ? files[0] : value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name) return alert("Department name is required");

    const newDept = {
      id: Date.now(),
      name: formData.name,
      description: formData.description,
      logo: formData.logo ? URL.createObjectURL(formData.logo) : null,
    };

    setDepts((prev) => [newDept, ...prev]);
    setFormData({ name: "", description: "", logo: null });
    setShowForm(false);
  };

  const handleDelete = (id) => {
    setDepts((prev) => prev.filter((d) => d.id !== id));
  };

  return (
    <div className="depts-admin">
      <div className="toprow">
        <h2>Departments</h2>
        <button className="btn-add" onClick={() => setShowForm(true)}>
          + Add Department
        </button>
      </div>

      {showForm && (
        <div className="form-container">
          <form className="dept-form" onSubmit={handleSubmit}>
            <h3>New Department</h3>
            <label>
              Department Name <span>*</span>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </label>

            <label>
              Description
              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
              />
            </label>

            <label>
              Logo/Image
              <input type="file" name="logo" onChange={handleChange} />
            </label>

            <div className="form-actions">
              <button type="submit" className="btn-save">
                Save
              </button>
              <button
                type="button"
                className="btn-cancel"
                onClick={() => setShowForm(false)}
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}

      <div className="list">
        {depts.length === 0 ? (
          <div className="empty">No departments.</div>
        ) : (
          depts.map((d) => (
            <div className="row" key={d.id}>
              <div className="dept-info">
                {d.logo && <img src={d.logo} alt={d.name} className="logo" />}
                <div>
                  <strong>{d.name}</strong>
                  <p>{d.description}</p>
                </div>
              </div>
              <div className="actions">
                <button className="btn-edit">Edit</button>
                <button className="btn-del" onClick={() => handleDelete(d.id)}>
                  Delete
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default DepartmentsAdmin;
