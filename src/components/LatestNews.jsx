import React, { useEffect, useState } from "react";
import axios from "axios";
import "./LatestNews.css";

function LatestNews() {
  const [latest, setLatest] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/events")
      .then((res) => setLatest(res.data.slice(0, 3)))
      .catch((err) => console.error(err));
  }, []);

  return (
    <section className="latest-events-section">
      <div className="smc-container">
        <h2 className="section-title">Latest News & Events</h2>

        <div className="events-grid">
          {latest.map((ev) => (
            <div className="event-card-latest" key={ev._id}>
              <img
                src={`http://localhost:5000${ev.imageUrl || "/images/default.jpg"}`}
                alt={ev.title}
              />
              <div className="card-body-latest">
                <div className="event-date-latest">
                  <i className="far fa-calendar-alt"></i>{" "}
                  {new Date(ev.date).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </div>
                <h3 className="card-title-latest">{ev.title}</h3>
                <p className="card-text-latest">
                  {ev.description?.slice(0, 120)}...
                </p>
                <a href={`/event/${ev._id}`} className="btn-primary-latest">
                  Read More
                </a>
              </div>
            </div>
          ))}
        </div>

        <div className="view-all-btn">
          <a href="/news-events" className="btn-outline-primary-latest">
            View All News & Events <i className="fas fa-arrow-right"></i>
          </a>
        </div>
      </div>
    </section>
  );
}

export default LatestNews;
