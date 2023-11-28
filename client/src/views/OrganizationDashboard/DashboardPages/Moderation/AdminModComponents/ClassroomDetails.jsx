import React, { useState, useEffect } from 'react';
import { Modal, Form, Input, Collapse } from 'antd';
import './ClassroomDetails.css';
import { getAllClassrooms } from '../../../../../Utils/requests';

const { Panel } = Collapse;

const ClassroomDetails = () => {
  const [classrooms, setClassrooms] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [editingClassroom, setEditingClassroom] = useState(null);
  const [form] = Form.useForm();

  useEffect(() => {
    const fetchClassrooms = async () => {
      try {
        const { data, err } = await getAllClassrooms();
        if (err) throw new Error(err);
        setClassrooms(data);
        console.log('Classrooms:', data);
      } catch (error) {
        console.error('Error fetching classrooms:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchClassrooms();
  }, []);

  const showModal = (classroom) => {
    setEditingClassroom(classroom);
    setIsModalVisible(true);
    form.setFieldsValue({
      name: classroom.name,
      description: classroom.description,
    });
  };

  const handleOk = () => {
    form
      .validateFields()
      .then((values) => {
        const updatedClassrooms = classrooms.map((classroom) =>
          classroom.id === editingClassroom.id
            ? { ...classroom, ...values }
            : classroom
        );
        setClassrooms(updatedClassrooms);
        setIsModalVisible(false);
      })
      .catch((errorInfo) => {
        console.log('Validation Failed:', errorInfo);
      });
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  if (isLoading) {
    return <div>Loading Classrooms...</div>;
  }

  return (
    <div className="classroom-details-container">
      <h2>Classroom Details and Organization</h2>
      {classrooms.length > 0 ? (
        classrooms.map((classroom) => (
          <div key={classroom.id} className="classroom-item">
            <h3>{classroom.name}</h3>
            <p>{classroom.description}</p>
            <div className="teacher-text">
              Teachers:{' '}
              {classroom.mentors
                ?.map((mentor) => `${mentor.first_name} ${mentor.last_name}`)
                .join(', ')}
            </div>
            <Collapse accordion className="classroom-students-collapse">
              <Panel header="Students: Click to view" key={classroom.id}>
                {classroom.students?.map((student, index) => (
                  <p key={index}>
                    {student.name} {student.character}
                  </p>
                ))}
              </Panel>
            </Collapse>
            <button
              onClick={() => showModal(classroom)}
              className="edit-classroom-button"
            >
              Edit Details
            </button>
          </div>
        ))
      ) : (
        <div>No classrooms found.</div>
      )}
      <Modal
        title="Edit Classroom Details"
        open={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <Form form={form} layout="vertical">
          <Form.Item
            name="name"
            label="Classroom Name"
            rules={[
              { required: true, message: 'Please input the classroom name!' },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="description"
            label="Description"
            rules={[
              {
                required: true,
                message: 'Please input the classroom description!',
              },
            ]}
          >
            <Input.TextArea />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default ClassroomDetails;
