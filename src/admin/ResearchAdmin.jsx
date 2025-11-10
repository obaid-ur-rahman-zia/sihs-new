import React, { useState, useEffect } from "react";
import "./ResearchAdmin.css";

function ResearchAdmin() {
  const [items, setItems] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    date: new Date().toISOString().split("T")[0],
    file: null,
    fileUrl: "",
  });

  // ✅ Fetch all research data
  useEffect(() => {
    fetchResearch();
  }, []);

  const fetchResearch = async () => {
    try {
      const res = await fetch(`${process.env.REACT_APP_API_URL}/research`);
      const data = await res.json();
      setItems(data);
    } catch (err) {
      console.error("Error fetching research:", err);
    }
  };

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "file" && files.length > 0) {
      setFormData((prev) => ({ ...prev, file: files[0] }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.title || !formData.description) {
      return alert("Title and abstract are required!");
    }

    const dataToSend = new FormData();
    dataToSend.append("title", formData.title);
    dataToSend.append("description", formData.description);
    dataToSend.append("date", formData.date);
    if (formData.file) dataToSend.append("file", formData.file);
    if (formData.fileUrl) dataToSend.append("fileUrl", formData.fileUrl);

    try {
      const url = editingId
        ? `${process.env.REACT_APP_API_URL}/research/${editingId}`
        : `${process.env.REACT_APP_API_URL}/research`;
      const method = editingId ? "PUT" : "POST";

      const res = await fetch(url, {
        method,
        body: dataToSend,
      });

      if (res.ok) {
        fetchResearch();
        setFormData({
          title: "",
          description: "",
          date: new Date().toISOString().split("T")[0],
          file: null,
          fileUrl: "",
        });
        setShowForm(false);
        setEditingId(null);
      } else {
        alert("Failed to save research");
      }
    } catch (err) {
      console.error("Error saving research:", err);
    }
  };

  const handleEdit = (item) => {
    setFormData({
      title: item.title,
      description: item.description,
      date: item.date.split("T")[0],
      file: null,
      fileUrl: item.fileUrl,
    });
    setEditingId(item._id);
    setShowForm(true);
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this paper?")) return;

    try {
      const res = await fetch(`${process.env.REACT_APP_API_URL}/research/${id}`, {
        method: "DELETE",
      });
      if (res.ok) setItems((prev) => prev.filter((i) => i._id !== id));
    } catch (err) {
      console.error("Error deleting:", err);
    }
  };

  return (
    <div className="research-admin">
      <div className="toprow">
        <h2>Research Papers</h2>
        <button className="btn-add" onClick={() => setShowForm(true)}>
          + Add Paper
        </button>
      </div>

      {showForm && (
        <div className="form-container">
          <form className="research-form" onSubmit={handleSubmit}>
            <h3>{editingId ? "Edit Paper" : "Add New Paper"}</h3>

            <label>
              Title <span>*</span>
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleChange}
                required
              />
            </label>

            <label>
              Abstract <span>*</span>
              <textarea
                name="description"
                rows="4"
                value={formData.description}
                onChange={handleChange}
                required
              />
            </label>

            <label>
              Date
              <input
                type="date"
                name="date"
                value={formData.date}
                onChange={handleChange}
              />
            </label>

            <label>
              Upload File (optional)
              <input
                type="file"
                name="file"
                accept=".pdf,.doc,.docx"
                onChange={handleChange}
              />
            </label>

            {formData.fileUrl && (
              <div className="preview-file">
                <a
                  href={`API_BASE_URL${formData.fileUrl}`}
                  target="_blank"
                  rel="noreferrer"
                >
                  📄 View Current File
                </a>
              </div>
            )}

            <div className="form-actions">
              <button type="submit" className="btn-save">
                {editingId ? "Update" : "Save"}
              </button>
              <button
                type="button"
                className="btn-cancel"
                onClick={() => {
                  setShowForm(false);
                  setEditingId(null);
                }}
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}

      <div className="list">
        {items.length === 0 ? (
          <div className="empty">No papers yet.</div>
        ) : (
          items.map((i) => (
            <div className="row" key={i._id}>
              <div>
                <strong>{i.title}</strong>
                <p>{i.description}</p>
                <span className="meta">
                  {new Date(i.date).toLocaleDateString()}
                </span>
                {i.fileUrl && (
                  <div>
                    <a
                      href={`API_BASE_URL${i.fileUrl}`}
                      target="_blank"
                      rel="noreferrer"
                    >
                      📄 View File
                    </a>
                  </div>
                )}
              </div>
              <div className="actions">
                <button onClick={() => handleEdit(i)} className="btn-edit">
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(i._id)}
                  className="btn-del"
                >
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

export default ResearchAdmin;
