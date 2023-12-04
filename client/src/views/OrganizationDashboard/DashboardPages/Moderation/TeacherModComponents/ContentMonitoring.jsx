// ContentMonitoring.jsx
import React, { useState, useEffect } from 'react';
import {
  getFlaggedContent,
  approveFlaggedContent,
  rejectFlaggedContent,
} from '../../../../../Utils/requests';
import '../TeacherModComponents/ContentMonitoring.css';

const initialFlaggedContent = [
  {
    id: 1,
    content: 'Flagged post 1',
    reason: 'Inappropriate Language',
  },
  { id: 2, content: 'Flagged post 2', reason: 'Bullying' },
  {
    id: 3,
    content: 'Flagged post 3',
    reason: 'Inappropriate Language',
  },
  {
    id: 4,
    content: 'Flagged post 4',
    reason: 'Inappropriate Language',
  },
  {
    id: 5,
    content: 'Flagged post 5',
    reason: 'Inappropriate Language',
  },
];

const ContentMonitoring = () => {
  const [flaggedContent, setFlaggedContent] = useState([]);
  const [actionHistory, setActionHistory] = useState([]);

  useEffect(() => {
    const fetchFlaggedContent = async () => {
      try {
        const response = await getFlaggedContent();
        // Accessing the data array from the response
        if (response && response.data) {
          setFlaggedContent(response.data);
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
      const updatedFlaggedContent = flaggedContent.filter(
        (item) => item.id !== contentId
      );
      setFlaggedContent(updatedFlaggedContent);
      setActionHistory([
        ...actionHistory,
        { id: contentId, action: 'Approved' },
      ]);
    } catch (error) {
      console.error(error);
    }
  };

  const handleReject = async (contentId) => {
    try {
      await rejectFlaggedContent(contentId);
      const updatedFlaggedContent = flaggedContent.filter(
        (item) => item.id !== contentId
      );
      setFlaggedContent(updatedFlaggedContent);
      setActionHistory([
        ...actionHistory,
        { id: contentId, action: 'Rejected' },
      ]);
    } catch (error) {
      console.error(error);
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
                Reason: {content.reason} - Date Flagged: {content.date_flagged}
              </div>
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
                {item.content} - Decision:{' '}
                <span
                  className={`decision ${
                    item.action === 'Rejected' ? 'rejected' : ''
                  }`}
                >
                  {item.action}
                </span>
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
