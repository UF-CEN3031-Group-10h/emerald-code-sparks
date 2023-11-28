import React from 'react';
import './AdminHome.css';

const AdminHome = () => {
  return (
    <div className="admin-home-container">
      <h1 className="admin-home-title">Admin Dashboard (Dummy Data )</h1>
      <div className="admin-home-sections">
        <div className="admin-home-section">
          <h2>Quick Stats</h2>
          <p>Number of Users: 120</p>
          <p>Active Classrooms: 45</p>
          <p>Content Pending Review: 10</p>
        </div>
        <div className="admin-home-section">
          <h2>Recent Activities</h2>
          <ul>
            <li>User 'Batman' created a new classroom in Gotham</li>
            <li>User 'SuperMan' reported content as Kryptonite</li>
            <li>New teacher account requested verification</li>
          </ul>
        </div>
        <div className="admin-home-section">
          <h2>Quick Links</h2>
          <ul>
            <li>Manage Users</li>
            <li>View Reports</li>
            <li>System Settings</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default AdminHome;
