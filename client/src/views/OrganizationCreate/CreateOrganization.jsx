import { useNavigate } from "react-router-dom";
import NavBar from "../../components/NavBar/NavBar";
import { createOrg } from "../../Utils/requests"
import { Button, Form, Input, message, Modal } from "antd"
import React, { useState } from 'react';
import { setUserState, getCurrUser } from "../../Utils/userState";


export default function CreateOrgnaization() {
  const [name, setName] = useState("")

  const handleSubmit = async e => {
    const res = await createOrg(name)
    if (res.err) {
      message.error("Fail to create a new org")
    } else {
      message.success("Successfully created unit")
      let userstr = sessionStorage.getItem('user')
      console.log(userstr)
      let user = JSON.parse(userstr)
      console.log(user)
      user.organization = res.data;
      console.log(user)
      sessionStorage.setItem('user', JSON.stringify(user));
      setUserState(getCurrUser());
    }
    console.log(getCurrUser())
  }
  return (
    <div className="container nav-padding">
      <NavBar />
      <Form
        id="add-org"
        width="35vw"
        onFinish={handleSubmit}
        layout="horizontal"
        size="default"
        labelCol={{
          span: 6,
        }}
        wrapperCol={{
          span: 14,
        }}
      >
        <Form.Item id="form-label" label="Name">
          <Input
            onChange={e => setName(e.target.value)}
            value={name}
            placeholder="Enter Organization Name"
            required
          >
          </Input>
        </Form.Item>
        <Form.Item
          wrapperCol={{
            offset: 8,
            span: 16,
          }}
          style={{ marginBottom: "0px" }}
        >
          <Button
            type="primary"
            htmlType="submit"
            size="large"
            className="content-creator-button"
          >
            Submit
          </Button>
        </Form.Item>
      </Form>
    </div >
  );
}