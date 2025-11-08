import React, { useState } from "react";
import "./FacultyManager.css";

function FacultyManager() {
  const [faculty, setFaculty] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    dept: "",
    designation: "",
    photo: null,
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
    if (!formData.name || !formData.dept) return alert("Name and department are required");

    const newFaculty = {
      id: Date.now(),
      name: formData.name,
      dept: formData.dept,
      designation: formData.designation,
      photo: formData.photo ? URL.createObjectURL(formData.photo) : null,
    };

    setFaculty((prev) => [newFaculty, ...prev]);
    setFormData({ name: "", dept: "", designation: "", photo: null });
    setShowForm(false);
  };

  const handleDelete = (id) => {
    setFaculty((prev) => prev.filter((f) => f.id !== id));
  };

  return (
    <div className="faculty-admin">
      <div className="toprow">
        <h2>Faculty Manager</h2>
        <button className="btn-add" onClick={() => setShowForm(true)}>
          + Add Faculty
        </button>
      </div>

      {showForm && (
        <div className="form-container">
          <form className="faculty-form" onSubmit={handleSubmit}>
            <h3>Add Faculty</h3>

            <label>
              Name <span>*</span>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </label>

            <label>
              Department <span>*</span>
              <input
                type="text"
                name="dept"
                value={formData.dept}
                onChange={handleChange}
                required
              />
            </label>

            <label>
              Designation
              <input
                type="text"
                name="designation"
                value={formData.designation}
                onChange={handleChange}
              />
            </label>

            <label>
              Photo
              <input type="file" name="photo" onChange={handleChange} />
            </label>

            <div className="form-actions">
              <button type="submit" className="btn-save">Save</button>
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

      <div className="faculty-list">
        {faculty.length === 0 ? (
          <div className="empty">No faculty added yet.</div>
        ) : (
          faculty.map((f) => (
            <div className="faculty-row" key={f.id}>
              <div className="faculty-info">
                {f.photo && <img src={f.photo} alt={f.name} className="photo" />}
                <div>
                  <strong>{f.name}</strong>
                  <p>{f.dept}</p>
                  {f.designation && <small>{f.designation}</small>}
                </div>
              </div>
              <div className="actions">
                <button className="btn-edit">Edit</button>
                <button className="btn-del" onClick={() => handleDelete(f.id)}>
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

export default FacultyManager;
