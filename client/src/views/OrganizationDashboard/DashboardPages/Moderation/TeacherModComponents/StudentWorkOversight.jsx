import React, { useState } from 'react';
import './StudentWorkOversight.css'; // Update the path if needed

// Initial data for student work
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
  // State to manage student work data
  const [studentWork, setStudentWork] = useState(initialStudentWork);

  // Function to handle toggling between 'Pending Review' and 'Reviewed' statuses
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

  // Function to handle displaying feedback input
  const handleFeedback = (workId) => {
    const updatedWork = studentWork.map((work) =>
      work.id === workId ? { ...work, showInput: true } : work
    );
    setStudentWork(updatedWork);
  };

  // Function to handle input changes for feedback
  const handleInputChange = (workId, e) => {
    const updatedWork = studentWork.map((work) =>
      work.id === workId ? { ...work, feedback: e.target.value } : work
    );
    setStudentWork(updatedWork);
  };

  // Function to handle saving feedback and changing status to 'Feedback Provided'
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
        {/* Loop through student work items */}
        {studentWork.map((work) => (
          <li key={work.id} className="student-work-item">
            <div>
              {/* Display student work details and status */}
              {work.studentName} - {work.assignment} - 
              <span className={
                work.status === 'Pending Review' ? 'pending-review' :
                work.status === 'Reviewed' ? 'reviewed' :
                work.status === 'Feedback Provided' ? 'feedback-provided' : ''
              }>
                Status: {work.status}
              </span>
            </div>
            {/* Button to handle review or undo action */}
            <button
              onClick={() => handleReview(work.id)}
              className="action-button review-button"
            >
              {work.status === 'Pending Review' ? 'Review' : 'Undo'}
            </button>
            {/* Button to handle feedback input */}
            {!work.showInput ? (
              <button
                onClick={() => handleFeedback(work.id)}
                className="action-button feedback-button"
              >
                Provide Feedback
              </button>
            ) : (
              // Display input for feedback and button to save feedback
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
            {/* Display feedback */}
            {work.feedback && <p>Your feedback: {work.feedback}</p>}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default StudentWorkOversight;