import { useState } from "react";
import { getCurrUser } from "../../../Utils/userState";
import '../OrganizationDashboard.less';
import { Button, Form, Input, message, Modal } from "antd"
import { deleteOrganization } from "../../../Utils/requests";



export default function ManageOrganization() {
  let user = getCurrUser()
  let org = user.org
  const [deleteButtonEnabled, setDeleteButtonEnabled] = useState(org.IsOwner)
  const [visible, setVisible] = useState(false)


  function deleteOrg() {
    res = deleteOrganization(org.id)
    if (res.err) {
      message.error("Fail to delete organization")
    } else {
      message.success("Successfully delete organization")
      let userstr = sessionStorage.getItem('user')
      console.log(userstr)
      let userInt = JSON.parse(userstr)
      console.log(userInt)
      delete userInt.organization
      console.log(userInt)
      sessionStorage.setItem('user', JSON.stringify(userInt));
      setUserState(getCurrUser());
    }
  }
  function showDeleteModal() {
    setVisible(true)
  }
  const handleCancel = () => {
    setVisible(false)
  }
  return (
    <div>
      <div id="main-header">Manage {org.Name}</div>
      <div id="delete-org-div">
        <button
          onClick={showDeleteModal}
          id={deleteButtonEnabled ? "org-delete-button-enabled" : "org-delete-button-disabled"}
          disabled={!deleteButtonEnabled}
        >
          Delete Organization {org.Name}
        </button>
        <Modal
          title="Delete Organization"
          open={visible}
          width="35vw"
          onCancel={handleCancel}
          footer={null}
        >
          <h3>
            ARE YOU SURE YOU WANT TO DELETE THE ORGANIZATION {org.Name}?
            <br />
            THIS CANNOT BE UNDONE
          </h3>
          <button
            id="org-delete-button-enabled"
            onClick={deleteOrg}
          >
            Delete
          </button>
        </Modal>
      </div>
    </div>
  );
}
