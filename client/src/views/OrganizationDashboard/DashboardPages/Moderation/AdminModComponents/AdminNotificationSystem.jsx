import React, { useState, useEffect } from 'react';
import { DatePicker, TimePicker, Select, message } from 'antd';
import { useGlobalState } from '../../../../../Utils/userState';
import { getTeachers, createNotification } from '../../../../../Utils/requests';

import './AdminNotificationSystem.css';

const { Option } = Select;

const AdminNotificationSystem = () => {
  const [currUser] = useGlobalState('currUser');
  const [teachers, setTeachers] = useState([]);

  const [notification, setNotification] = useState({
    receiverEmail: 'placeholder',
    receiverName: '',
    senderEmail: currUser.email || 'admin@mail.com',
    senderName: currUser.name || 'Admin',
    subject: '',
    message: '',
    date: null,
    time: null,
  });

  useEffect(() => {
    const fetchTeachers = async () => {
      try {
        const response = await getTeachers();
        if (response && response.data) {
          const formattedTeachers = response.data.map((teacher) => ({
            id: teacher.id,
            name: `${teacher.first_name} ${teacher.last_name}`,
            email: teacher.user.email,
          }));
          setTeachers(formattedTeachers);
          console.log('Teachers:', formattedTeachers);
        } else {
          message.error('No teachers data received.');
        }
      } catch (error) {
        message.error(`Error fetching teachers: ${error.message}`);
      }
    };

    fetchTeachers();
  }, []);

  // const handleSelectChange = (teacherId) => {
  //   const selectedTeacher = teachers.find(
  //     (teacher) => teacher.id === teacherId
  //   );
  //   if (selectedTeacher) {
  //     setNotification({
  //       ...notification,
  //       receiverName: selectedTeacher.name,
  //       receiverEmail: selectedTeacher.email,
  //     });
  //   }
  // };

  // const handleSelectChange = (value) => {
  //   const selectedTeacher = teachers.find(
  //     (teacher) => teacher.id.toString() === value
  //   );
  //   if (selectedTeacher && selectedTeacher.user) {
  //     setNotification({
  //       ...notification,
  //       receiverName: `${selectedTeacher.first_name} ${selectedTeacher.last_name}`,
  //       receiverEmail: selectedTeacher.user.email,
  //     });
  //   }
  // };

  const handleSelectChange = (value) => {
    const teacherDetails = JSON.parse(value);
    setNotification({
      ...notification,
      receiverName: teacherDetails.name,
      receiverEmail: teacherDetails.email || 'placeholder',
    });
  };

  const handleChange = (e) => {
    setNotification({ ...notification, [e.target.name]: e.target.value });
  };

  const handleDateChange = (date, dateString) => {
    setNotification({ ...notification, date: dateString });
  };

  const handleTimeChange = (time, timeString) => {
    setNotification({ ...notification, time: timeString });
  };

  // const handleSendNotification = async () => {
  //   if (
  //     notification.message &&
  //     notification.receiverName &&
  //     notification.receiverEmail &&
  //     notification.subject &&
  //     notification.date &&
  //     notification.time
  //   ) {
  //     try {
  //       const response = await createNotification(notification);
  //       if (response.data) {
  //         message.success('Notification has been sent successfully');
  //         setNotification({
  //           receiverEmail: '',
  //           receiverName: '',
  //           senderEmail: currUser.email || 'admin@mail.com',
  //           senderName: currUser.name || 'Admin',
  //           subject: '',
  //           message: '',
  //           date: null,
  //           time: null,
  //         });
  //       } else {
  //         message.error('Failed to send notification: No data received');
  //       }
  //     } catch (error) {
  //       message.error(`Failed to send notification: ${error.message}`);
  //     }
  //   } else {
  //     message.error('Please fill out all fields to send the notification');
  //     console.log(notification);
  //   }
  // };
  const handleSendNotification = async () => {
    const notificationData = {
      receiverEmail: notification.receiverEmail,
      receiverName: notification.receiverName,
      senderEmail: currUser.email,
      senderName: currUser.name,
      subject: notification.subject,
      message: notification.message,
      date: notification.date,
      time: notification.time,
    };

    if (
      notificationData.message &&
      notificationData.receiverEmail &&
      notificationData.subject &&
      notificationData.date &&
      notificationData.time
    ) {
      try {
        const response = await createNotification(notificationData);
        if (response.data) {
          message.success('Notification has been sent successfully');
          setNotification({
            receiverEmail: 'placeholder',
            receiverName: '',
            senderEmail: currUser.email || 'admin@mail.com',
            senderName: currUser.name || 'Admin',
            subject: '',
            message: '',
            date: null,
            time: null,
          });
          console.log('Notification:', notification);
        } else {
          message.error('Failed to send notification: No data received');
        }
      } catch (error) {
        message.error(`Failed to send notification: ${error.message}`);
      }
    } else {
      message.error('Please fill out all fields to send the notification');
      console.log(notification);
    }
  };

  return (
    <div className="admin-notification-system-container">
      <h2>Admin Notification System</h2>
      {/* From field */}
      <div className="label-field">
        <label htmlFor="from">From:</label>
        <input
          type="text"
          name="from"
          value={notification.senderName}
          onChange={handleChange}
          className="input-field"
          disabled
        />
      </div>
      {/* To field */}
      <div className="label-field">
        <label htmlFor="to">To:</label>
        {/* <Select
          showSearch
          style={{ width: '100%' }}
          placeholder="Select a teacher"
          optionFilterProp="children"
          onChange={handleSelectChange}
          filterOption={(input, option) =>
            option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
          }
        >
          {teachers.map((teacher) => (
            <Option key={teacher.id} value={teacher.id}>
              {teacher.name}
            </Option>
          ))}
        </Select> */}

        <Select
          showSearch
          style={{ width: '100%' }}
          placeholder="Select a teacher"
          onChange={handleSelectChange}
        >
          {teachers.map((teacher) => (
            <Option
              key={teacher.id}
              value={JSON.stringify({
                name: teacher?.name || '',
                email: teacher?.user?.email || '',
              })}
            >
              {teacher.name}: {teacher?.user?.email}
            </Option>
          ))}
        </Select>
      </div>
      {/* Subject field */}
      <div className="label-field">
        <label htmlFor="subject">Subject:</label>
        <input
          type="text"
          name="subject"
          value={notification.subject}
          onChange={handleChange}
          placeholder="Subject"
          className="input-field"
        />
      </div>
      {/* Message field */}
      <textarea
        name="message"
        value={notification.message}
        onChange={handleChange}
        placeholder="Message..."
        rows="4"
        className="input-field"
      ></textarea>
      {/* Date field */}
      <div className="label-field">
        <label htmlFor="date">Date:</label>
        <DatePicker
          onChange={handleDateChange}
          className="input-field date-picker"
        />
      </div>
      {/* Time field */}
      <div className="label-field">
        <label htmlFor="time">Time:</label>
        <TimePicker
          onChange={handleTimeChange}
          className="input-field time-picker"
        />
      </div>
      {/* Send button */}
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
