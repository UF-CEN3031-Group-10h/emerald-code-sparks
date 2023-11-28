import React, { useState } from 'react';
import '../Moderation/Moderation.css';
import ClassroomForm from './AdminModComponents/ClassroomForm';
import TeacherAssignment from './AdminModComponents/TeacherAssignment';
import ClassroomDetails from './AdminModComponents/ClassroomDetails';
import AdminNotificationSystem from './AdminModComponents/AdminNotificationSystem';

const ModerationAdmin = () => {
  // const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState(
    'Classroom Management Tools'
  );
  const [classrooms, setClassrooms] = useState([]);

  const handleCreateClassroom = (classroom) => {
    setClassrooms([...classrooms, { ...classroom, id: Date.now() }]);
  };

  const handleDeleteClassroom = (classroomId) => {
    setClassrooms(
      classrooms.filter((classroom) => classroom.id !== classroomId)
    );
  };

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
        // TODO: frontend ui for CRUD operations for classrooms
        return (
          <div className="classroom-management">
            <div className="category-title">Classroom Management Tools</div>
            <div className="category-content">
              <div className="new-classroom">
                <h3 className="add-classroom-title">Create New Classroom</h3>
                <ClassroomForm onSubmit={handleCreateClassroom} />
              </div>
              <div className="new-classroom">
                <h3 className="add-classroom-title">Existing Classrooms:</h3>
                <ul>
                  {classrooms.map((classroom) => (
                    <li key={classroom.id}>
                      {classroom.name}
                      <button
                        className="classroom-delete-btn"
                        onClick={() => handleDeleteClassroom(classroom.id)}
                      >
                        X
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        );
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
