import React, { useState } from 'react';
import '../Moderation/Moderation.css';
import ContentMonitoring from '../Moderation/TeacherModComponents/ContentMonitoring';
import StudentWorkOversight from '../Moderation/TeacherModComponents/StudentWorkOversight';
import TeacherNotificationSystem from './TeacherModComponents/TeacherNotificationSystem';

const ModerationTeacher = () => {
  const [selectedCategory, setSelectedCategory] = useState(null);

  const settingsCategories = [
    'Content Monitoring and Filtering',
    'Visibility and Oversight of Student Work',
    'Notification System',
  ];

  // func to render details for the selected category
  const renderCategoryDetails = (category) => {
    switch (category) {
      case 'Content Monitoring and Filtering':
        return <ContentMonitoring />;
      case 'Visibility and Oversight of Student Work':
        return <StudentWorkOversight />;
      case 'Notification System':
        return <TeacherNotificationSystem />;
      default:
        return (
          <div className="default-category">
            Select a category to see more options
          </div>
        );
    }
  };
  return (
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
  );
};

export default ModerationTeacher;
