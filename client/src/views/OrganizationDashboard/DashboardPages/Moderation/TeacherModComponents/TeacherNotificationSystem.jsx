import React, { useState } from 'react';
import '../TeacherModComponents/TeacherNotificationSystem.css';

// dummy data  for notifications
const initialNotifications = [
  {
    id: 1,
    message: 'New student submission for Assignment 1',
    status: 'Unread',
  },
  { id: 2, message: 'Upcoming meeting with parents', status: 'Unread' },
];

const TeacherNotificationSystem = () => {
  const [notifications, setNotifications] = useState(initialNotifications);

  // function to handle marking a notification as read (still in progress)
  const markAsRead = (notificationId) => {
    const updatedNotifications = notifications.map((notification) =>
      notification.id === notificationId
        ? { ...notification, status: 'Read' }
        : notification
    );
    setNotifications(updatedNotifications);
  };

  return (
    <div className="notification-system-container">
      <h2>Notifications</h2>
      <ul className="notification-list">
        {notifications.map((notification) => (
          <li key={notification.id} className="notification-item">
            <div className="notification-message">{notification.message}</div>
            <div className="notification-status">{notification.status}</div>
            {notification.status === 'Unread' && (
              <button
                onClick={() => markAsRead(notification.id)}
                className="mark-read-button"
              >
                Mark as Read
              </button>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TeacherNotificationSystem;
