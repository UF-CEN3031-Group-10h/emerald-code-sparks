import React, { useState } from 'react';
import { Modal, Form, Input, Button, message } from 'antd';
import { useGlobalState } from '../../../Utils/userState';
import { reportFlaggedContent } from '../../../Utils/requests';

import './Gallery.css';

const GalleryPage = () => {
  const [isReportModalVisible, setIsReportModalVisible] = useState(false);
  const [selectedImageId, setSelectedImageId] = useState(null);
  const [form] = Form.useForm();
  const [currUser] = useGlobalState('currUser');

  const dummyData = Array.from({ length: 12 }).map((_, index) => ({
    id: index,
    title: `Pic ${index + 1}`,
    orgName: 'Dummy Org Name',
    image:
      'https://www.wallpaperup.com/uploads/wallpapers/2014/04/16/334397/0c916d8ffde9e269ee6553c65282d764.jpg',
  }));

  const handleReportClick = (id) => {
    console.log(`Report content ID: ${id}`);
  };

  const showReportModal = (id) => {
    setSelectedImageId(id);
    setIsReportModalVisible(true);
  };

  const handleReport = async (values) => {
    console.log('Current User:', currUser);
    const reportData = {
      activity: selectedImageId,
      users_permissions_user: currUser.id,
      reason: values.reason,
      date_flagged: new Date().toISOString(),
      // status: "pending_review",
      // admin_permissions_user, action_taken, review_date will be set later bythe admin loigged in
    };

    try {
      const response = await reportFlaggedContent(reportData);
      if (response && response.data) {
        message.success('Content has been reported successfully');
      } else {
        message.error('Failed to report content: No data received.');
      }
    } catch (error) {
      message.error(`Failed to report content: ${error.message}`);
    } finally {
      setIsReportModalVisible(false);
      form.resetFields();
    }
  };

  const handleCancel = () => {
    setIsReportModalVisible(false);
  };

  return (
    <div className="gallery-container">
      <h1 className="gallery-title">Gallery</h1>
      <div className="gallery-grid">
        {dummyData.map((item) => (
          <div key={item.id} className="card">
            <img src={item.image} alt={item.title} />
            <div className="card-info">
              <h2>{item.title}</h2>
              <p>{item.orgName}</p>
            </div>
            <Button
              className="report-button"
              onClick={() => showReportModal(item.id)}
            >
              Report
            </Button>
          </div>
        ))}
      </div>

      <Modal
        title="Report Content"
        visible={isReportModalVisible}
        onOk={form.submit}
        onCancel={handleCancel}
        okText="Report"
        cancelText="Cancel"
      >
        <Form
          form={form}
          name="report_form"
          initialValues={{ remember: true }}
          onFinish={handleReport}
        >
          <Form.Item
            name="reason"
            label="Reason for Reporting"
            rules={[{ required: true, message: 'Please enter the reason!' }]}
          >
            <Input.TextArea
              rows={4}
              placeholder="Enter the reason for reporting this content"
            />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default GalleryPage;
