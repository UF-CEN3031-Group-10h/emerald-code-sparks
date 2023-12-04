// ContentMonitoring.jsx
import React, { useState, useEffect } from 'react';
import {
  getFlaggedContent,
  approveFlaggedContent,
  rejectFlaggedContent,
} from '../../../../../Utils/requests';
import '../TeacherModComponents/ContentMonitoring.css';

const ContentMonitoring = () => {
  const [flaggedContent, setFlaggedContent] = useState([]);
  const [actionHistory, setActionHistory] = useState([]);

  useEffect(() => {
    const fetchFlaggedContent = async () => {
      try {
        const response = await getFlaggedContent();
        if (response && response.data) {
          setFlaggedContent(response.data);
          console.log(response.data);
        }
      } catch (error) {
        console.error(error);
      }
    };

    fetchFlaggedContent();
  }, []);

  const handleApprove = async (contentId) => {
    try {
      await approveFlaggedContent(contentId);
      const content = flaggedContent.find((item) => item.id === contentId);
      const updatedFlaggedContent = flaggedContent.filter(
        (item) => item.id !== contentId
      );
      setFlaggedContent(updatedFlaggedContent);
      if (content) {
        setActionHistory([
          ...actionHistory,
          { ...content, action: 'Approved' },
        ]);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleReject = async (contentId) => {
    try {
      await rejectFlaggedContent(contentId);
      const content = flaggedContent.find((item) => item.id === contentId);
      const updatedFlaggedContent = flaggedContent.filter(
        (item) => item.id !== contentId
      );
      setFlaggedContent(updatedFlaggedContent);
      if (content) {
        setActionHistory([
          ...actionHistory,
          { ...content, action: 'Rejected' },
        ]);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const toggleAccordion = (index) => {
    const element = document.getElementById(`accordion-${index}`);
    if (element) {
      element.classList.toggle('open');
    }
  };

  return (
    <div className="content-monitoring-container">
      <h2>Flagged Content</h2>
      {flaggedContent.length > 0 ? (
        <ul className="flagged-content-list">
          {flaggedContent.map((content) => (
            <li key={content.id} className="flagged-content-item">
              <div className="content-details">
                <p>
                  <strong>Reason:</strong> {content.reason}
                </p>
                <p>
                  <strong>Reported by:</strong>{' '}
                  {content.users_permissions_user.username}
                </p>
                <p>
                  <strong>Date Flagged:</strong>{' '}
                  {new Date(content.date_flagged).toLocaleString()}
                </p>
                <p>
                  <strong>Activity Description:</strong>{' '}
                  {content.activity.description}
                </p>
                <p>
                  <strong>Admin Review:</strong>{' '}
                  {content.admin_permissions_user.username}
                </p>
              </div>
              <div className="content-actions">
                <button
                  onClick={() => handleApprove(content.id)}
                  className="action-button approve-button"
                >
                  Approve
                </button>
                <button
                  onClick={() => handleReject(content.id)}
                  className="action-button reject-button"
                >
                  Reject
                </button>
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <p>No flagged content yet.</p>
      )}

      <div className="action-history-container">
        <h2 className="action-history-title">Action History</h2>
        {actionHistory.length > 0 ? (
          <ul className="action-history-list">
            {actionHistory.map((item, index) => (
              <li key={index} className="action-history-item">
                <button
                  className="accordion-toggle"
                  onClick={() => toggleAccordion(index)}
                >
                  {item.content} - Decision:
                  <span
                    className={`decision ${
                      item.action === 'Rejected' ? 'rejected' : ''
                    }`}
                  >
                    {item.action}
                  </span>
                </button>
                <div className="accordion-content" id={`accordion-${index}`}>
                  <p>
                    <strong>Reason:</strong> {item.reason}
                  </p>
                  <p>
                    <strong>Reported by:</strong>{' '}
                    {item.users_permissions_user.username}
                  </p>
                  <p>
                    <strong>Date Flagged:</strong>{' '}
                    {new Date(item.date_flagged).toLocaleString()}
                  </p>
                  <p>
                    <strong>Activity Description:</strong>{' '}
                    {item.activity.description}
                  </p>
                  <p>
                    <strong>Admin Review:</strong>{' '}
                    {item.admin_permissions_user.username}
                  </p>
                </div>
              </li>
            ))}
          </ul>
        ) : (
          <p>No action history yet.</p>
        )}
      </div>
    </div>
  );
};

export default ContentMonitoring;
