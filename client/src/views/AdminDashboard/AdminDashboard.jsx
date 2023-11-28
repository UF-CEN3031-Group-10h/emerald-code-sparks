import React from 'react';
import { Tabs } from 'antd';
import NavBar from '../../components/NavBar/NavBar';
// import './AdminDashboard.less';
import { useSearchParams } from 'react-router-dom';

// Import or define the admin-specific components
import AdminHome from './AdminDashboardPages/AdminHome';
import AdminUsers from './AdminDashboardPages/Users';
import AdminModeration from '../OrganizationDashboard/DashboardPages/Moderation/ModerationAdmin';
import AdminClasses from './AdminDashboardPages/AdminClasses';

const { TabPane } = Tabs;

const AdminDashboard = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const tab = searchParams.get('tab');

  return (
    <div className="container nav-padding">
      <NavBar />
      <Tabs
        defaultActiveKey={tab || 'home'}
        onChange={(key) => setSearchParams({ tab: key })}
      >
        <TabPane tab="Home" key="home">
          <AdminHome />
        </TabPane>
        <TabPane tab="Users" key="users">
          <AdminUsers />
        </TabPane>
        <TabPane tab="Moderation" key="moderation">
          <AdminModeration />
        </TabPane>
        <TabPane tab="Classes" key="classes">
          <AdminClasses />
        </TabPane>
      </Tabs>
    </div>
  );
};

export default AdminDashboard;
