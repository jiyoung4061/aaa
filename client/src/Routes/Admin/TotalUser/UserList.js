import React, { useState, useEffect } from "react";
import { Table, PageHeader, Tag, Space, Button } from "antd";

import axios from "axios";
import { auth } from "../../../_actions/user_action";
import { useDispatch } from "react-redux";
const { Column } = Table;

function UserList() {
  const dispatch = useDispatch();
  const [User, setUser] = useState([]);

  useEffect(() => {
    getUser();
  }, []);

  const getUser = () => {
    axios.get("/api/users/management").then((response) => {
      if (response.data.success) {
        setUser(response.data.users);
      } else {
        alert("불러오기 실패");
      }
    });
  };

  //일반회원 -> 관리자
  const onRoleAdminHandler = (_id) => {
    const variables = {
      _id,
    };
    axios.post("/api/users/roleAdmin",variables).then((response) => {
      if (response.data.success) {
        alert("관리자 변경완료");
        getUser();
        dispatch(auth());
      } else {
        alert("실패");
      }
    });
  };
  //관리자 -> 일반회원
  const onRoleUserHandler = (_id) => {
    const variables = {
      _id,
    };
    axios.post("/api/users/roleUser",variables).then((response) => {
      if (response.data.success) {
        alert("회원등급 변경완료");
        getUser();
        dispatch(auth());
      } else {
        alert("실패");
      }
    })
  };

  const onUserDeleteHandler = (_id) => {
    const variables = {
      _id,
    };

    axios.post("/api/users/removeFromUser", variables).then((response) => {
      if (response.data.success) {
        alert("회원 삭제")
        getUser();
      } else {
        alert("리스트에서 지우는데 실패했습니다.");
      }
    });
  };

  return (
    <PageHeader
      title="User List"
      className="site-page-header"
      subTitle="사용자 관리"
      tags={<Tag color="blue">사용자</Tag>}
      avatar={{
        src: "https://avatars1.githubusercontent.com/u/8186664?s=460&v=4",
      }}
    >
      <div style={{ width: "80%", margin: "3rem auto" }}>
        <div style={{ textAlign: "center" }}>
          <br />

          <Table dataSource={User}>
            <Column title="이름" dataIndex="name" key="name" />
            <Column title="이메일" dataIndex="email" key="email" />
            <Column title="등급" dataIndex="role" key="role" />
            <Column
              title="회원수정"
              key="action"
              dataIndex="_id"
              render={(dataIndex) => (
                <Space size="middle">
                  <Button
                    type="primary"
                    style={{
                      backgroundColor: "#9c88ff",
                      borderColor: "#9c88ff",
                    }}
                    // danger
                    onClick={() => onRoleAdminHandler(dataIndex)}
                  >
                    관리자
                  </Button>
                  <Button type="primary" onClick={() => onRoleUserHandler(dataIndex)}>
                    일반회원
                  </Button>
                </Space>
              )}
            />
            <Column
              title="회원탈퇴"
              key="action"
              dataIndex="_id"
              render={(dataIndex) => (
                <Space size="middle">
                  <Button
                    ghost
                    type="primary"
                    danger
                    style={{ border: "1.5px solid" }}
                    onClick={() => onUserDeleteHandler(dataIndex)}
                  >
                    <span style={{ color: "red" }}>삭제</span>
                  </Button>
                </Space>
              )}
            />
          </Table>
        </div>
      </div>
    </PageHeader>
  );
}

export default UserList;
