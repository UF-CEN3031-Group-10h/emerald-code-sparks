// export default function OrganizationHome() {
//   return (<p>Home Page for the organization</p>);
// }

import React, { useEffect, useState } from 'react';
import { getToken } from '../../../Utils/AuthRequests';
import { getOrgUsers } from '../../../Utils/requests';
import { message } from 'antd';

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
    <>
      <div id="main-header2">Welcome to {org.Name}</div>
      {/* <p>{sessionStorage.getItem("user")}</p>
    {orgs.map((organization) => (
      <div key={organization.id} id='dashboard-class-card'>
        <div id='card-left-content-container'>
          <h1 id='card-title'>{organization.name}</h1>
          <div id='card-button-container' className='flex flex-row'>
            <button>
              View
            </button>
          </div>
        </div>
        <div id='card-right-content-container'>
          <DashboardDisplayCodeModal code={organization.code} />
          <div id='divider' />
          <div id='student-number-container'>
            <h1 id='number'>{organization.students.length}</h1>
            <p id='label'>Students</p>
          </div>
        </div>
      </div>
    ))} */}
    </>
  );
}
