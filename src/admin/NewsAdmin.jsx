import React, { useState, useEffect } from "react";
import { CONTENT_API, REQUEST_CONFIG, buildUrl } from "../api";
import "./NewsAdmin.css";

function NewsAdmin() {
  const [events, setEvents] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    date: "",
    description: "",
    facebookEmbedUrl: "",
    image: null,
  });

  const fetchEvents = async () => {
    const res = await fetch(CONTENT_API.EVENTS);
    const data = await res.json();
    setEvents(data);
  };

  useEffect(() => {
    fetchEvents();
  }, []);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: files ? files[0] : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const form = new FormData();
    Object.entries(formData).forEach(([key, val]) => form.append(key, val));

    const res = await fetch(CONTENT_API.EVENTS, {
      method: "POST",
      body: form,
    });

    if (res.ok) {
      alert("Event added successfully!");
      fetchEvents();
      setShowForm(false);
      setFormData({
        title: "",
        date: "",
        description: "",
        facebookEmbedUrl: "",
        image: null,
      });
    } else {
      alert("Failed to add event.");
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this event?")) return;
    await fetch(buildUrl(CONTENT_API.EVENTS, id), REQUEST_CONFIG.DELETE);
    fetchEvents();
  };

  return (
    <div className="news-admin">
      <div className="news-admin-top">
        <h2>News & Events Manager</h2>
        <button className="btn-add" onClick={() => setShowForm(true)}>
          + Add Event
        </button>
      </div>

      {showForm && (
        <div className="form-container">
          <form className="news-form" onSubmit={handleSubmit}>
            <h3>Add News/Event</h3>

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
              Date <span>*</span>
              <input
                type="date"
                name="date"
                value={formData.date}
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
                rows="3"
              />
            </label>

            <label>
              Image
              <input type="file" name="image" onChange={handleChange} />
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

      <div className="news-list">
        {events.length === 0 ? (
          <div className="empty">No items. Use Add Event to create.</div>
        ) : (
          events.map((ev) => (
            <div className="news-item" key={ev._id}>
              <div className="news-info">
                {ev.imageUrl && (
                  <img
                    src={`http://localhost:5000${ev.imageUrl}`}
                    alt={ev.title}
                    className="news-img"
                  />
                )}
                <div>
                  <h3>{ev.title}</h3>
                  <p className="meta">
                    {new Date(ev.date).toLocaleDateString()}
                  </p>
                  <p>{ev.description}</p>
                </div>
              </div>
              <div className="news-actions">
                <button className="btn-del" onClick={() => handleDelete(ev._id)}>
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

export default NewsAdmin;
