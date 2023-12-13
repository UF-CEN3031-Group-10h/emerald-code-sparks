import React, { useState, useEffect } from 'react';
import { List, Button, Card, Modal, message } from 'antd';
import ClassroomForm from './ClassroomForm';
import { getAllClassrooms } from '../../../../../Utils/requests';
import './ClassroomManagementTools.css';

const ClassroomManagementTools = () => {
  const [classrooms, setClassrooms] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);

  useEffect(() => {
    const fetchClassrooms = async () => {
      const { data, error } = await getAllClassrooms();
      if (!error) {
        setClassrooms(data);
      } else {
        console.error('Failed to fetch classrooms:', error);
        message.error('Failed to create classroom');
      }
    };

    fetchClassrooms();
  }, []);

  const handleCreateClassroom = async (classroom) => {
    setClassrooms([...classrooms, { ...classroom, id: Date.now() }]);
    message.success('Classroom created successfully');
    setIsModalVisible(false);
  };

  const handleDeleteClassroom = async (classroomId) => {
    setClassrooms(
      classrooms.filter((classroom) => classroom.id !== classroomId)
    );
    message.success('Classroom deleted successfully');
  };

  return (
    <div className="classroom-management">
      <Card
      // title="Classroom Management Tools"
      // bordered={false}
      // className="category-title"
      >
        <div className="category-title" style={{ color: '#333' }}>
          Classroom Management Tools
        </div>
        <Button type="primary" onClick={() => setIsModalVisible(true)}>
          Create New Classroom
        </Button>
        <Modal
          title="New Classroom"
          visible={isModalVisible}
          onCancel={() => setIsModalVisible(false)}
          footer={null}
        >
          <ClassroomForm onSubmit={handleCreateClassroom} />
        </Modal>
        <List
          dataSource={classrooms}
          renderItem={(classroom) => (
            <List.Item
              actions={[
                <Button
                  type="danger"
                  onClick={() => handleDeleteClassroom(classroom.id)}
                >
                  Delete
                </Button>,
              ]}
            >
              {classroom.name}
            </List.Item>
          )}
        />
      </Card>
    </div>
  );
};

export default ClassroomManagementTools;
