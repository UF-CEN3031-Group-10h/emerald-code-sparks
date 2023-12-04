import React, { useState, useEffect } from 'react';
import ClassroomForm from './ClassroomForm';
import './ClassroomManagementTools.css';
import { getAllClassrooms } from '../../../../../Utils/requests';

const ClassroomManagementTools = () => {
  const [classrooms, setClassrooms] = useState([]);

  useEffect(() => {
    const fetchClassrooms = async () => {
      const { data, error } = await getAllClassrooms();
      if (!error) {
        setClassrooms(data);
        // console.log('Classrooms:', data);
      } else {
        console.error('Failed to fetch classrooms:', error);
        prompt('Failed to fetch classrooms:', error);
      }
    };

    fetchClassrooms();
  }, []);
  const handleCreateClassroom = async (classroom) => {
    // for later api request to create classroom
    setClassrooms([...classrooms, { ...classroom, id: Date.now() }]);
  };

  const handleDeleteClassroom = async (classroomId) => {
    // for later api request to delete classroom
    setClassrooms(
      classrooms.filter((classroom) => classroom.id !== classroomId)
    );
  };

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
};

export default ClassroomManagementTools;
