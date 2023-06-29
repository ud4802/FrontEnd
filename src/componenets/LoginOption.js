import Button from "react-bootstrap/esm/Button";
import { React, useContext, useEffect } from "react";
import img from "../images/AdminLogin.png";
import img2 from "../images/CoordinatorLogin.png";
import { Navigate, useNavigate } from "react-router";
import { Card, Col, Row } from "react-bootstrap";
import AuthContext from "../context/AuthProvider";

function LoginOption() {
  const navigate = useNavigate();
  const { setAuth, setAdmin } = useContext(AuthContext);

  useEffect(() => {
    localStorage.clear();
    setAuth({});
    setAdmin(false);
  }, []);

  return (
    <>
      <div >
        <div style={{display: "center"}}>
        <h6 class="display-3">
          <b>Welcome to the Fee Management System</b>
        </h6>
        </div>
        <marquee direction="left">
          Upload Excel file containing stuent details, sned reminder to them
          regarding to their fess and review the response sent by the students
          and accordingly update fee status.
        </marquee>
      </div>
      <br />
      <h1 class="display-6">Login As a ...</h1>
      <br />

      <Row>
        <Col md={6}>
          <Card>
            <Card.Body>
              <img
                src={img}
                alt="Image not found."
                height="150em"
                width="150em"
              />
              <Card.Title>Administrator</Card.Title>
              <Card.Link>
                <Button
                  variant="outline-primary"
                  onClick={() => navigate("/adminLogin")}
                >
                  Login
                </Button>
              </Card.Link>
            </Card.Body>
          </Card>
        </Col>
        <Col md={6}>
          <Card>
            <Card.Body>
              <img
                src={img2}
                alt="Image not found."
                height="150em"
                width="150em"
              />
              <Card.Title>Co-ordinator</Card.Title>
              <Card.Link>
                <Button
                  variant="outline-primary"
                  onClick={() => navigate("/login")}
                >
                  Login
                </Button>
              </Card.Link>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </>
  );
}

export default LoginOption;
