import React, { useState, useEffect } from "react";
import { CONTENT_API, REQUEST_CONFIG, buildUrl } from "../api";
import "./NotificationsAdmin.css";

function NotificationsAdmin() {
  const [notes, setNotes] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    message: "",
    date: new Date().toISOString().split("T")[0],
    image: null,
  });

  // ✅ Fetch notifications
  useEffect(() => {
    fetchNotes();
  }, []);

  const fetchNotes = async () => {
    try {
      const res = await fetch(CONTENT_API.NOTIFICATIONS);
      const data = await res.json();
      setNotes(data);
    } catch (err) {
      console.error("Error fetching notifications:", err);
    }
  };

  // ✅ Handle form change
  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "image" && files.length > 0) {
      setFormData((prev) => ({ ...prev, image: files[0] }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  // ✅ Submit new notification
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.title || !formData.message)
      return alert("Title and message are required!");

    const formDataToSend = new FormData();
    formDataToSend.append("title", formData.title);
    formDataToSend.append("message", formData.message);
    formDataToSend.append("date", formData.date);
    if (formData.image) formDataToSend.append("image", formData.image);

    try {
      const res = await fetch(`${process.env.REACT_APP_API_URL}/notifications`, {
        method: "POST",
        body: formDataToSend,
      });
      if (res.ok) {
        fetchNotes();
        setFormData({
          title: "",
          message: "",
          date: new Date().toISOString().split("T")[0],
          image: null,
        });
        setShowForm(false);
      } else {
        alert("Failed to publish notification");
      }
    } catch (err) {
      console.error("Error submitting notification:", err);
    }
  };

  // ✅ Delete notification
  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this notification?"))
      return;
    try {
      await fetch(`${process.env.REACT_APP_API_URL}/notifications/${id}`, {
        method: "DELETE",
      });
      setNotes((prev) => prev.filter((n) => n._id !== id));
    } catch (err) {
      console.error("Error deleting:", err);
    }
  };

  return (
    <div className="notes-admin">
      <div className="toprow">
        <h2>Notifications</h2>
        <button className="btn-add" onClick={() => setShowForm(true)}>
          + Publish
        </button>
      </div>

      {showForm && (
        <div className="form-container">
          <form className="note-form" onSubmit={handleSubmit}>
            <h3>Publish Notification</h3>

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
              Message <span>*</span>
              <textarea
                name="message"
                rows="3"
                value={formData.message}
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
              Image (optional)
              <input
                type="file"
                name="image"
                accept="image/*"
                onChange={handleChange}
              />
            </label>

            <div className="form-actions">
              <button type="submit" className="btn-save">Publish</button>
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

      <div className="notes-list">
        {notes.length === 0 ? (
          <div className="empty">No notifications yet.</div>
        ) : (
          notes.map((n) => (
            <div className="note-row" key={n._id}>
              <div className="note-content">
                {n.imageUrl && (
                  <img
                    src={`API_BASE_URL${n.imageUrl}`}
                    alt="Notice"
                    className="note-img"
                  />
                )}
                <div>
                  <h3>{n.title}</h3>
                  <p>{n.message}</p>
                  <span className="date">
                    {new Date(n.date).toLocaleDateString()}
                  </span>
                </div>
              </div>
              <div className="actions">
                <button className="btn-del" onClick={() => handleDelete(n._id)}>
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

export default NotificationsAdmin;
