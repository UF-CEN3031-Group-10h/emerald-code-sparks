// export default function OrganizationHome() {
//   return (<p>Home Page for the organization</p>);
// }

import React, { useEffect, useState } from 'react';
import { getToken } from '../../../Utils/AuthRequests';
import { getOrgUsers } from '../../../Utils/requests';
import { message } from 'antd';
import './OrganizationHome.css'; 

export default function OrganizationHome() {
  const [org, setOrg] = useState({});
  const user = getToken();

  useEffect(() => {
    let classroomIds = [];
    getOrgUsers(
      JSON.parse(sessionStorage.getItem('user')).organization.id
    ).then((res) => {
      if (res.data) {
        setOrg(res.data);
        console.log(org);
        console.log(res.data);
      } else {
        message.error(res.err);
      }
    });
  }, []);

  if (!('Name' in org)) {
    return <div id="main-header">Welcome to Loading</div>;
  }

  return (
    <div className="organization_home">
      <div id="main-header2">Welcome to {org.Name}</div>
      <div className="cat_details">
        <div className="adjusted_mid">
          Navigate the taskbar to see more options.
        </div>
      </div>
      {/* Additional content can be added here */}
    </div>
  );
}