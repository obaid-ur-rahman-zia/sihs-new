import React, { useEffect, useState } from "react";
import "./DownloadsAdmin.css";

function DownloadsAdmin() {
  const [files, setFiles] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [newFile, setNewFile] = useState({
    title: "",
    description: "",
    file: null,
  });

  const fetchDownloads = async () => {
    try {
      const res = await fetch("http://localhost:5000/api/downloads");
      const data = await res.json();
      setFiles(data);
    } catch (error) {
      console.error("Error fetching downloads:", error);
    }
  };

  useEffect(() => {
    fetchDownloads();
  }, []);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setNewFile((prev) => ({
      ...prev,
      [name]: files ? files[0] : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!newFile.title || !newFile.file)
      return alert("Title & File are required");

    const formData = new FormData();
    formData.append("title", newFile.title);
    formData.append("description", newFile.description);
    formData.append("file", newFile.file);

    try {
      const res = await fetch("http://localhost:5000/api/downloads", {
        method: "POST",
        body: formData,
      });
      const data = await res.json();
      setFiles((prev) => [data, ...prev]);
      setNewFile({ title: "", description: "", file: null });
      setShowForm(false);
    } catch (error) {
      console.error("Error uploading file:", error);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this file?")) return;
    try {
      await fetch(`http://localhost:5000/api/downloads/${id}`, {
        method: "DELETE",
      });
      setFiles((prev) => prev.filter((f) => f._id !== id));
    } catch (error) {
      console.error("Error deleting file:", error);
    }
  };

  return (
    <div className="downloads-admin">
      <div className="toprow">
        <h2>Manage Downloads</h2>
        <button onClick={() => setShowForm(true)} className="btn-add">
          + Add File
        </button>
      </div>

      {showForm && (
        <div className="form-container">
          <form onSubmit={handleSubmit} className="upload-form">
            <h3>Upload New File</h3>
            <label>
              Title <span>*</span>
              <input
                type="text"
                name="title"
                value={newFile.title}
                onChange={handleChange}
                required
              />
            </label>
            <label>
              Description
              <textarea
                name="description"
                value={newFile.description}
                onChange={handleChange}
              ></textarea>
            </label>
            <label>
              File <span>*</span>
              <input
                type="file"
                name="file"
                onChange={handleChange}
                required
              />
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

      <div className="files-list">
        {files.length === 0 ? (
          <div className="empty">No files yet.</div>
        ) : (
          files.map((f) => (
            <div className="file-row" key={f._id}>
              <div>
                <strong>{f.title}</strong>
                <p>{f.description}</p>
              </div>
              <div className="actions">
                <a
                  href={`http://localhost:5000${f.fileUrl}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-view"
                >
                  View
                </a>
                <button
                  className="btn-del"
                  onClick={() => handleDelete(f._id)}
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

export default DownloadsAdmin;
