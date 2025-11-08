import React, { useEffect, useState } from "react";
// Import API constants and API_BASE_URL
import { CONTENT_API, API_BASE_URL } from "../api"; 
import "./NewsandEvents.css";

function NewsandEvents() {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  
  // Extract the root domain for file URLs: http://localhost:5000
  const baseDomainUrl = API_BASE_URL.replace("/api", "");

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const res = await fetch(CONTENT_API.EVENTS);
        const data = await res.json();
        setEvents(data);
      } catch (err) {
        console.error("Error fetching events:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchEvents();
  }, []);

  return (
    <div className="news-main">
      <div className="News-And-Evnets-title">
        <h2 className="NewsEvents-section-title">News & Events</h2>
      </div>

      <div className="mainevents">
        {loading ? (
          <p style={{ textAlign: "center" }}>Loading events...</p>
        ) : events.length > 0 ? (
          <div className="events-grid">
            {events.map((event) => (
              <div key={event._id} className="event-card-latest">
                <img
                  // FIXED: Use baseDomainUrl (http://localhost:5000) for image path
                  src={`${baseDomainUrl}${event.imageUrl || "/images/default.jpg"}`}
                  alt={event.title}
                />
                <div className="card-body-latest">
                  <div className="event-date-latest">
                    <i className="far fa-calendar-alt"></i>{" "}
                    {new Date(event.date).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </div>
                  <h3 className="card-title-latest">{event.title}</h3>
                  <p className="card-text-latest">
                    {event.description?.slice(0, 150)}...
                  </p>
                  <a href={`/event/${event._id}`} className="btn-primary-latest">
                    Read More
                  </a>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p style={{ textAlign: "center" }}>No events available right now.</p>
        )}
      </div>

      {/* Facebook Embed (from backend or static fallback) */}
      <div className="events-grid">
        <div className="Events-iframe-container">
          <iframe
            src={
              // Fallback URL corrected to use https
              events[0]?.facebookEmbedUrl ||
              "https://www.facebook.com/plugins/page.php?href=https://www.facebook.com/SIHSsargodha&tabs=timeline&width=1400&height=2200&small_header=false&adapt_container_width=true&hide_cover=false&show_facepile=true"
            }
            className="Events-iframe"
            frameBorder="0"
            allowFullScreen
            allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"
            title="SIHS Facebook Page"
          ></iframe>
        </div>
      </div>
    </div>
  );
}

export default NewsandEvents;