import React, { useEffect, useReducer, useState } from 'react';
import { getMentor, getClassrooms, createClassroom, deleteClassroom } from '../../Utils/requests';
import { getUser } from '../../Utils/AuthRequests';
import { message } from 'antd';
import './Dashboard.less';
import DashboardDisplayCodeModal from './DashboardDisplayCodeModal';
import MentorSubHeader from '../../components/MentorSubHeader/MentorSubHeader';
import NavBar from '../../components/NavBar/NavBar';
import { useNavigate } from 'react-router-dom';

export default function Dashboard() {
  const [classrooms, setClassrooms] = useState([]);
  const user = getUser();
    const navigate = useNavigate();
    const newName = useRef();
    const newId = useRef();

  useEffect(() => {
    let classroomIds = [];
    getMentor().then((res) => {
      if (res.data) {
        res.data.classrooms.forEach((classroom) => {
          classroomIds.push(classroom.id);
        });
        getClassrooms(classroomIds).then((classrooms) => {
          setClassrooms(classrooms);
        });
      } else {
        message.error(res.err);
      }
    });
  }, []);

  const handleViewClassroom = (classroomId) => {
    navigate(`/classroom/${classroomId}`);
    };
  const deleteClass = (classroomId) => {
        deleteClassroom(classroomId);
    };
    function newClassroom() {
        const newClass = {
            id: newId.current.value,
            name: newName.current.value 
        }
        createClassroom(newClass.id, newClass.name);
    }

  return (
    <div className='container nav-padding'>
     <NavBar isMentor={true} />
     <div id='main-header'>Hello {user.username}</div>
          <MentorSubHeader title={'Your Classrooms'}></MentorSubHeader>
          <div id = 'classrooms=container'>
              <h1 id='card-title'> Add Class </h1>
              <div id ='card-button-container'>
              <input ref={newName} type="text" placeholder="Name" />
              <input ref={newId} type="text" placeholder="Id" />
              <button onClick={newClassroom}>
                  Add
              </button>
              </div>
          </div>
      <div id='classrooms-container'>
        <div id='dashboard-card-container'>
          {classrooms.map((classroom) => (
            <div key={classroom.id} id='dashboard-class-card'>
              <div id='card-left-content-container'>
                <h1 id='card-title'>{classroom.name}</h1>
                <div id='card-button-container' className='flex flex-row'>
                  <button onClick={() => handleViewClassroom(classroom.id)}>
                    View
                  </button>
                 <button onClick={() => deleteClass(classroom.id)}>
                  Delete
                 </button>
                </div>
              </div>
              <div id='card-right-content-container'>
                <DashboardDisplayCodeModal code={classroom.code} />
                <div id='divider' />
                <div id='student-number-container'>
                  <h1 id='number'>{classroom.students.length}</h1>
                  <p id='label'>Students</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
