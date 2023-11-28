// StudentWorkOversight.jsx
import React, { useState } from 'react';
import '../TeacherModComponents/StudentWorkOversight.css';

// dummy data  for student work
const initialStudentWork = [
  {
    id: 1,
    studentName: 'Student 1',
    assignment: 'Essay on Environment',
    status: 'Pending Review',
  },
  {
    id: 2,
    studentName: 'Student 2',
    assignment: 'Math Homework',
    status: 'Reviewed',
  },
];

const StudentWorkOversight = () => {
  const [studentWork, setStudentWork] = useState(initialStudentWork);

  // function to handle reviewing student work (still in progress)
  const handleReview = (workId) => {
    const updatedWork = studentWork.map((work) =>
      work.id === workId ? { ...work, status: 'Reviewed' } : work
    );
    setStudentWork(updatedWork);
  };

  // function to handle providing feedback on student work (still in progress)
  const handleFeedback = (workId) => {
    const updatedWork = studentWork.map((work) =>
      work.id === workId ? { ...work, status: 'Feedback Provided' } : work
    );
    setStudentWork(updatedWork);
  };

  return (
    <div className="student-work-container">
      <h2>Student Work</h2>
      <ul className="student-work-list">
        {studentWork.map((work) => (
          <li key={work.id} className="student-work-item">
            <div className="work-details">
              {work.studentName} - {work.assignment} - Status: {work.status}
            </div>
            <button
              onClick={() => handleReview(work.id)}
              className="action-button review-button"
            >
              Review
            </button>
            <button
              onClick={() => handleFeedback(work.id)}
              className="action-button feedback-button"
            >
              Provide Feedback
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default StudentWorkOversight;
