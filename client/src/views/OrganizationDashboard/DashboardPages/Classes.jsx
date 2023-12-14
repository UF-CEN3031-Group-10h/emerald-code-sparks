import React, { useEffect, useRef, useState } from 'react';
import { getOrgClasses, getClassrooms, createClassroom, deleteClassroom } from '../../../Utils/requests';
import { getCurrUser } from '../../../Utils/userState';
import { getOrgUsers } from "../../../Utils/requests";
import { message } from 'antd';
import '../../Dashboard/Dashboard.less';
import DashboardDisplayCodeModal from '../../Mentor/Dashboard/DashboardDisplayCodeModal';
import MentorSubHeader from '../../../components/MentorSubHeader/MentorSubHeader';
import NavBar from '../../../components/NavBar/NavBar';
import { useNavigate } from 'react-router-dom';
//import { org } from '../Home';

export default function OrganizationClasses() {
    const [classrooms, setClassrooms] = useState([]);
    const [org, setOrg] = useState({});
    const orgUsers = getOrgUsers();
    const user = getCurrUser();
    const navigate = useNavigate();
    const newName = useRef();
    const newId = useRef();
    
    useEffect(() => {
        let classroomIds = [];
        getOrgUsers(JSON.parse(sessionStorage.getItem("user")).organization.id).then((res) => {
            if (res.data) {
                 res.data.classrooms.forEach((classroom) => {
                  classroomIds.push(classroom.id);
                });
                 getClassrooms(classroomIds).then((classrooms) => {
                  setClassrooms(classrooms);
                });
                setOrg(res.data);
                console.log(org);
                console.log(res.data);
            } else {
                message.error(res.err);
            }
        });
    }, []);
   const handleViewClassroom = (classroomId) => {
            navigate(`/classroom/${classroomId}`);
    };
    const confirmDelete = (classroomId) => {
        if (confirm("Are you sure you want to delete this class? " + classroomId)) {
            deleteClassroom(classroomId);
            setUserState(getCurrUser());
        }

    }
    function newClassroom(){
       // id = newId.current.value;
        name = newName.current.value;
        mentor = user.username;
        const res = createClassroom(name, mentor);
        if (res.err) {
            message.error("Fail to create a new class")
        } else {
            message.success("Successfully created unit")
        }
        setUserState(getCurrUser());
        }

        return (
            <div className='container nav-padding'>
                <NavBar isMentor={true} />
                <div id='main-header2'>Hello {user.username}</div>
                <MentorSubHeader title={'Your Classrooms'}></MentorSubHeader>
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
                                        
                                    </div>
                                </div>
                                <div id='card-right-content-container'>
                                    <button onClick={() => confirmDelete(classroom.id)}>
                                        Delete
                                    </button>
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
                    <div id='classrooms-container'>
                        <h1 id='card-title'> Add Class </h1>
                        <div id='card-button-container'>
                            <input ref={newName} type="text" placeholder="Name" />
                            
                            <button onClick={newClassroom}>
                                Add
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        );
    }