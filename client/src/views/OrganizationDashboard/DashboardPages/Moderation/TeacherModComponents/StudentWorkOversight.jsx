import React, { useState } from 'react';
import './StudentWorkOversight.css'; // Update the path if needed

const initialStudentWork = [
  {
    id: 1,
    studentName: 'Student 1',
    assignment: 'Essay on Environment',
    status: 'Pending Review',
    feedback: '',
  },
  {
    id: 2,
    studentName: 'Student 2',
    assignment: 'Math Homework',
    status: 'Pending Review',
    feedback: '',
  },
];

const StudentWorkOversight = () => {
  const [studentWork, setStudentWork] = useState(initialStudentWork);

  const handleReview = (workId) => {
    const updatedWork = studentWork.map((work) =>
      work.id === workId
        ? {
            ...work,
            status: work.status === 'Pending Review' ? 'Reviewed' : 'Pending Review',
          }
        : work
    );
    setStudentWork(updatedWork);
  };

  const handleFeedback = (workId) => {
    const updatedWork = studentWork.map((work) =>
      work.id === workId ? { ...work, showInput: true } : work
    );
    setStudentWork(updatedWork);
  };

  const handleInputChange = (workId, e) => {
    const updatedWork = studentWork.map((work) =>
      work.id === workId ? { ...work, feedback: e.target.value } : work
    );
    setStudentWork(updatedWork);
  };

  const handleSaveFeedback = (workId) => {
    const updatedWork = studentWork.map((work) =>
      work.id === workId ? { ...work, status: 'Feedback Provided', showInput: false } : work
    );
    setStudentWork(updatedWork);
  };

  return (
    <div className="student-work-container">
      <h2>Student Work</h2>
      <ul className="student-work-list">
        {studentWork.map((work) => (
          <li key={work.id} className="student-work-item">
            <div>
              {work.studentName} - {work.assignment} - 
              <span className={
                work.status === 'Pending Review' ? 'pending-review' :
                work.status === 'Reviewed' ? 'reviewed' :
                work.status === 'Feedback Provided' ? 'feedback-provided' : ''
              }>
                Status: {work.status}
              </span>
            </div>
            <button
              onClick={() => handleReview(work.id)}
              className="action-button review-button"
            >
              {work.status === 'Pending Review' ? 'Review' : 'Undo'}
            </button>
            {!work.showInput ? (
              <button
                onClick={() => handleFeedback(work.id)}
                className="action-button feedback-button"
              >
                Provide Feedback
              </button>
            ) : (
              <div>
                <textarea
                  placeholder="Enter your feedback"
                  value={work.feedback}
                  onChange={(e) => handleInputChange(work.id, e)}
                />
                <button
                  onClick={() => handleSaveFeedback(work.id)}
                  className="action-button feedback-button"
                >
                  Save Feedback
                </button>
              </div>
            )}
            {work.feedback && <p>Your feedback: {work.feedback}</p>}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default StudentWorkOversight;