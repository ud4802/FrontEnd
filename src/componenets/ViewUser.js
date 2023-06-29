import { Table, Button } from "antd";
import React, { useEffect, useState, useContext } from "react";
import axios from "../api/axios";
import AuthContext from "../context/AuthProvider";

function ViewUser() {
  const { admin } = useContext(AuthContext);

  const columns = [
    {
      title: "Username",
      dataIndex: "username",
    },
    {
      title: "Email",
      dataIndex: "email",
    },
    {
      title: "Verified",
      dataIndex: "verified",
    },
    {
      title: "Branch",
      dataIndex: "branch",
    },
    {
      title: "Actions",
      render: (_, record) => {
        return (
          <>
            <Button
              type="link"
              htmlType="submit"
              onClick={() => {
                handleVerify(record.email);
              }}
            >
              Verify
            </Button>
            <Button
              type="link"
              onClick={() => {
                handleUnverify(record.email);
              }}
            >
              Unverify
            </Button>
          </>
        );
      },
    },
  ];

  const handleUnverify = (e) => {
    axios
      .post("/adminunverify", { admin, e })
      .then((res) => {
        setUserData(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleVerify = (e) => {
    console.log(e);
    axios
      .post("/adminverify", { admin, e })
      .then((res) => {
        setUserData(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const [userData, setUserData] = useState([]);

  useEffect(() => {
    console.log(admin);
    axios
      .get(`/userinfo?q=${admin.refreshToken}`)
      .then((res) => {
        setUserData(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  console.log(userData);
  const data = [];
  for (var k = 0; k < userData.length; k++) {
    data.push({
      key: k,
      username: userData[k].username,
      email: userData[k].email,
      verified: userData[k].verified,
      branch: userData[k].branch,
    });
  }
  return (
    <div>
      
      <h1 class="display-4">Co-ordinator Details : </h1>
      <div id="table">
        <Table
          columns={columns}
          dataSource={data}
          sticky
          scroll={{
            y: 340,
          }}
        />
      </div>
    </div>
  );
}

export default ViewUser;
