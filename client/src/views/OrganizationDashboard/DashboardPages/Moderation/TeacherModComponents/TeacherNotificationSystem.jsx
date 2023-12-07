//
import React, { useState, useEffect } from 'react';
import { Collapse } from 'antd';
import { getNotifications } from '../../../../../Utils/requests';
import '../TeacherModComponents/TeacherNotificationSystem.css';

const { Panel } = Collapse;

const TeacherNotificationSystem = () => {
  const [notifications, setNotifications] = useState([]);
  const [activeKey, setActiveKey] = useState(null);

  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        const response = await getNotifications();
        if (response && response.data) {
          setNotifications(response.data);
        } else {
          console.error('No notifications data received.');
        }
      } catch (error) {
        console.error(`Error fetching notifications: ${error.message}`);
      }
    };
    fetchNotifications();
  }, []);

  const markAsRead = async (notificationId) => {
    await updateNotificationStatus(notificationId, { status: 'Read' });

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
      <Collapse accordion activeKey={activeKey} onChange={setActiveKey}>
        {notifications.map((notification) => (
          <Panel
            header={`${notification.senderName}: ${notification.subject}`}
            key={notification.id}
          >
            {notification.status === 'Unread' && (
              <button
                onClick={() => markAsRead(notification.id)}
                className={`mark-read-button ${
                  notification.status === 'Read' ? 'read' : ''
                }`}
              >
                Mark as Read
              </button>
            )}
            <p>
              <strong>Message:</strong> {notification.message}
            </p>
            <p>
              <strong>Sender Email:</strong> {notification.senderEmail || 'N/A'}
            </p>
            <p>
              <strong>Receiver Name:</strong>{' '}
              {notification.receiverName || 'N/A'}
            </p>
            <p>
              <strong>Receiver Email:</strong>{' '}
              {notification.receiverEmail || 'N/A'}
            </p>
            <p>
              <strong>Date Sent:</strong> {notification.date || 'N/A'}
            </p>
            <p>
              <strong>Time Sent:</strong> {notification.time || 'N/A'}
            </p>
            <p>
              <strong>Created At:</strong>{' '}
              {new Date(notification.created_at).toLocaleString()}
            </p>
          </Panel>
        ))}
      </Collapse>
    </div>
  );
};

export default TeacherNotificationSystem;
