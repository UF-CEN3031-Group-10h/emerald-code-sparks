import React, { useState } from 'react';
import '../Moderation/Moderation.css';
import ClassroomForm from './AdminModComponents/ClassroomForm';
import TeacherAssignment from './AdminModComponents/TeacherAssignment';
import ClassroomDetails from './AdminModComponents/ClassroomDetails';
import AdminNotificationSystem from './AdminModComponents/AdminNotificationSystem';
import ClassroomManagementTools from './AdminModComponents/ClassroomManagementTools';

const ModerationAdmin = () => {
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [classrooms, setClassrooms] = useState([]);

  const settingsCategories = [
    'Classroom Management Tools',
    'Teacher Assignment and Role Management',
    'Classroom Details and Organization',
    'Notification System for Teachers',
  ];

  // func to render details for the selected category
  const renderCategoryDetails = (category) => {
    switch (category) {
      case 'Classroom Management Tools':
        return <ClassroomManagementTools />;
      case 'Teacher Assignment and Role Management':
        return <TeacherAssignment />;
      case 'Classroom Details and Organization':
        return <ClassroomDetails />;
      case 'Notification System for Teachers':
        return <AdminNotificationSystem />;
      default:
        return (
          <div className="default-category">
            Select a category to see more options
          </div>
        );
    }
  };

  return (
    <div>
      <div id="main-header2">Admin Moderation Tools</div>
      <div className="moderation-teacher-container">
        <div className="settings-categories">
          {settingsCategories.map((category) => (
            <div
              key={category}
              className={`category-item ${
                selectedCategory === category ? 'active' : ''
              }`}
              onClick={() => setSelectedCategory(category)}
            >
              {category}
            </div>
          ))}
        </div>
        <div className="settings-divider" />
        <div className="category-details">
          {renderCategoryDetails(selectedCategory)}
        </div>
      </div>
    </div>
  );
};

export default ModerationAdmin;
