import React from "react";
import Button from "react-bootstrap/esm/Button";
import { useNavigate } from "react-router";
import axios from "axios";
import { useState } from "react";
import { useParams } from "react-router-dom";
import { Label } from "reactstrap";

function VerifyUser() {
  const navigate = useNavigate();
  const param = useParams();
  const [user, setUser] = useState([]);
  const url = `http://localhost:3500/adminverify/${param.id}`;
  const url1 = `http://localhost:3500/adminverify/${param.id}/verify`;

  const verifyUrl = async () => {
    try {
      const u = await axios.post(url);
      setUser(u);

      console.log(user);
    } catch (error) {
      console.log(error);
    }
  };

  const verifyUser = async () => {
    try {
      const u = await axios.post(url1);
      console.log(user);
    } catch (error) {
      console.log(error);
    }
    setUser([]);
  };
  return (
    <>
      <h2 className="display-2">Verify the user having Data : </h2>
      <section style={{ justifyItems: "center" }}>
        <div className="align">
          <Button className="outline-success" onClick={verifyUrl}>
            Fetch User Details
          </Button>
        </div>
        {user.data ? (
          <>
            <Label title="Username : " description={user.data.username} />
            <Label title="Password : " description={user.data.email} />
          </>
        ) : (
          ""
        )}
        <br />
        <br />
        <br />

        <div className="align">
          <Button variant="outline-success" onClick={verifyUser}>
            Verify
          </Button>
          &nbsp; &nbsp; &nbsp;
          <Button
            variant="outline-danger"
            onClick={() => navigate("/verifyuser")}
          >
            Cancel
          </Button>
        </div>
      </section>
    </>
  );
}

export default VerifyUser;
