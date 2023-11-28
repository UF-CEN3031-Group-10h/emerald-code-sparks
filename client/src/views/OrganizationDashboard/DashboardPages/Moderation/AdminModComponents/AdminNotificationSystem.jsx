import React, { useState } from 'react';
import './AdminNotificationSystem.css';

const AdminNotificationSystem = () => {
  const [notification, setNotification] = useState('');
  const [selectedTeachers, setSelectedTeachers] = useState([]);

  // dummy list of teachers
  const teachers = [
    { id: 1, name: 'John Doe' },
    { id: 2, name: 'Jane Smith' },
  ];

  const handleSelectTeacher = (event) => {
    const selectedOptions = Array.from(
      event.target.selectedOptions,
      (option) => option.value
    );
    setSelectedTeachers(selectedOptions);
  };

  // func to handle sending notification
  const handleSendNotification = () => {
    if (notification && selectedTeachers.length > 0) {
      alert(
        `Notification sent to ${selectedTeachers.join(', ')}: ${notification}`
      );
      setNotification('');
      setSelectedTeachers([]);
    } else {
      alert(
        'Please enter a notification message and select at least one teacher.'
      );
    }
  };

  return (
    <div className="admin-notification-system-container">
      <h2>Notification System for Teachers</h2>
      <select
        multiple
        onChange={handleSelectTeacher}
        className="teacher-select-dropdown"
      >
        {teachers.map((teacher) => (
          <option key={teacher.id} value={teacher.name}>
            {teacher.name}
          </option>
        ))}
      </select>
      <textarea
        value={notification}
        onChange={(e) => setNotification(e.target.value)}
        placeholder="Write your notification message here..."
        rows="4"
      ></textarea>
      <button
        onClick={handleSendNotification}
        className="send-notification-button"
      >
        Send Notification
      </button>
    </div>
  );
};

export default AdminNotificationSystem;
