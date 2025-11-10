import React, { useEffect, useState } from "react";
// Import API constants and API_BASE_URL
import { CONTENT_API, API_BASE_URL } from "../api";
import "./NotificationPage.css";

function NotificationPage() {
  const [notifications, setNotifications] = useState([]);
  
  // Extract the root domain for file URLs: API_BASE_URL
  const baseDomainUrl = API_BASE_URL.replace("/api", "");

  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        // FIXED: Use CONTENT_API.NOTIFICATIONS
        const res = await fetch(CONTENT_API.NOTIFICATIONS);
        const data = await res.json();
        setNotifications(data);
      } catch (err) {
        console.error("Error fetching notifications:", err);
      }
    };
    fetchNotifications();
  }, []);

  return (
    <div className="noti-main">
      <div className="notification-page-title">
        <h1 className="noti-section-title">Notifications</h1>
      </div>

      <div className="notification-container">
        {notifications.length === 0 ? (
          <div className="notification empty">
            <i className="far fa-sad-tear"></i>
            <p>No notifications to display. Please check back later!</p>
          </div>
        ) : (
          notifications.map((noti) => (
            <div key={noti._id} className="notification-card">
              <div className="noti-icon">
                <i className="fas fa-bell"></i>
              </div>
              <div className="noti-content">
                <h3>{noti.title}</h3>
                <p>{noti.message}</p>
                {noti.imageUrl && (
                  <img
                    // FIXED: Use baseDomainUrl to ensure correct image path
                    src={`${baseDomainUrl}${noti.imageUrl}`}
                    alt={noti.title}
                    className="noti-img"
                  />
                )}
                <span className="noti-date">
                  {new Date(noti.date).toLocaleDateString()}
                </span>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default NotificationPage;