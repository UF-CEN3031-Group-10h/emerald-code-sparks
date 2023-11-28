import React, { useState, useEffect } from 'react';
import { Button, Modal, Form, Input, Select } from 'antd';

import { getTeachers, getAllClassrooms } from '../../../../../Utils/requests';
import './TeacherAssignment.css';

const initialTeachers = [
  {
    id: 1,
    name: 'John Doe',
    role: 'Lead Teacher',
    assignedClassroom: 'Classroom A',
  },
];

const TeacherAssignment = () => {
  const [teachers, setTeachers] = useState(initialTeachers);
  const [openAccordionId, setOpenAccordionId] = useState(null);

  useEffect(() => {
    const fetchTeachers = async () => {
      const { data, err } = await getTeachers();
      if (!err) {
        setTeachers(data);
        // console.log('Teachers:', data);
      } else {
        console.error('Failed to fetch teachers:', err);
        prompt('Failed to fetch teachers:', err);
      }
    };

    fetchTeachers();
  }, []);

  // Fetch classrooms
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

  // function to handle role changes
  const handleRoleChange = async (teacherId) => {
    const newRole = prompt('Enter new role:');
    if (newRole) {
      const { data, error } = await updateTeacher(teacherId, { role: newRole });
      if (!error) {
        const updatedTeachers = teachers.map((teacher) =>
          teacher.id === teacherId ? { ...teacher, role: newRole } : teacher
        );
        setTeachers(updatedTeachers);
      } else {
        console.error('Failed to update teacher role:', error);
        prompt('Failed to update teacher role:', error);
      }
    }
  };

  // function to handle classroom assignments
  const handleClassroomAssignment = async (teacherId) => {
    const newClassroom = prompt('Enter new classroom:');
    if (newClassroom) {
      const { data, error } = await updateTeacher(teacherId, {
        assignedClassroom: newClassroom,
      });
      if (!error) {
        const updatedTeachers = teachers.map((teacher) =>
          teacher.id === teacherId
            ? { ...teacher, assignedClassroom: newClassroom }
            : teacher
        );
        setTeachers(updatedTeachers);
      } else {
        console.error('Failed to update teacher classroom:', error);
        prompt('Failed to update teacher classroom:', error);
      }
    }
  };

  const [isModalVisible, setIsModalVisible] = useState(false);
  const [form] = Form.useForm();

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleOk = async () => {
    try {
      await form.validateFields();
      const values = form.getFieldsValue();
      console.log('Received values of form:', values);
      form.resetFields();
      setIsModalVisible(false);
    } catch (errorInfo) {
      console.log('Failed:', errorInfo);
    }
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const toggleAccordion = (id) => {
    setOpenAccordionId(openAccordionId === id ? null : id);
    console.log(openAccordionId);
  };

  return (
    <div className="teacher-assignment-container">
      <h2>Teacher Assignment and Role Management</h2>
      <Button
        type="primary"
        onClick={showModal}
        className="add-new-teacher-btn"
      >
        Add New Teacher
      </Button>
      <Modal
        title="Add New Teacher"
        visible={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <Form form={form} layout="vertical" name="teacherForm">
          <Form.Item
            name="firstName"
            label="First Name"
            rules={[
              {
                required: true,
                message: "Please input the teacher's first name!",
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="lastName"
            label="Last Name"
            rules={[
              {
                required: true,
                message: "Please input the teacher's last name!",
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="role"
            label="Role"
            rules={[
              { required: true, message: "Please select the teacher's role!" },
            ]}
          >
            <Select>
              <Select.Option value="leadTeacher">Lead Teacher</Select.Option>
              <Select.Option value="assistant">
                Teacher's Assistant
              </Select.Option>
            </Select>
          </Form.Item>
          <Form.Item
            name="classroom"
            label="Classroom Assignment"
            rules={[{ required: true, message: 'Please select a classroom!' }]}
          >
            <Select>
              {classrooms.map((classroom) => (
                <Select.Option key={classroom.id} value={classroom.id}>
                  {classroom.name}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>
        </Form>
      </Modal>

      <ul className="teacher-list">
        {teachers.map((teacher) => (
          <li key={teacher.id} className="teacher-item">
            <div className="teacher-details">
              <span className="teacher-name">
                Teacher Name: {teacher.first_name} {teacher.last_name}
              </span>
              <button
                onClick={() => toggleAccordion(teacher.id)}
                className={
                  openAccordionId === teacher.id
                    ? 'accordion-toggle-button active'
                    : 'accordion-toggle-button'
                }
              >
                {openAccordionId === teacher.id ? 'Hide' : 'Show'} Classrooms
              </button>
            </div>

            {openAccordionId === teacher.id && (
              <div
                className={`accordion-content ${
                  openAccordionId === teacher.id ? 'active' : ''
                }`}
              >
                {teacher.classrooms.map((classroom, index) => (
                  <div key={index} className="classroom-name">
                    {classroom.name}
                  </div>
                ))}
              </div>
            )}

            {/* checking data */}
            {/* {teacher.classrooms.map((classroom, index) =>
              console.log(classroom.name, index)
            )} */}

            <div className="teacher-actions">
              <button
                onClick={() => handleRoleChange(teacher.id)}
                className="edit-role-button"
              >
                Change Role
              </button>
              <button
                onClick={() => handleClassroomAssignment(teacher.id)}
                className="edit-assignment-button"
              >
                Change Classroom
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TeacherAssignment;
