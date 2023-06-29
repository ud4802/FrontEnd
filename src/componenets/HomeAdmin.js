import React from "react";
import { Card, Col, Row } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import { useNavigate } from "react-router";
import img1 from "../images/ViewCoordinator.png";
import img2 from "../images/ViewStudent.png";

function HomeAdmin() {
  const navigate = useNavigate();
  return (
    <>
      <br />
      <br />
      <br />

      <div>
        <Row>
          <Col md={6}>
            <Card>
              <Card.Body style={{ background: "whitesmoke" }}>
                <img src={img1} alt="Image not Found" />
                <br />
                <br />
                <Card.Title>
                  <b>View Co-ordinators</b>
                </Card.Title>
                <Card.Text>
                  <ul>
                    <li>view Co-ordinators details</li>
                  </ul>
                </Card.Text>
                <Card.Link>
                  <Button
                    variant="outline-primary"
                    onClick={() => navigate("/viewuser")}
                  >
                    view
                  </Button>
                </Card.Link>
              </Card.Body>
            </Card>
          </Col>
          <Col md={6}>
            <Card>
              <Card.Body style={{ background: "whitesmoke" }}>
                <img src={img2} alt="Image not Found." />
                <br />
                <br />
                <br />
                <Card.Title>
                  <b>View Students</b>
                </Card.Title>
                <Card.Text>
                  <ul>
                    <li>view student details</li>
                  </ul>
                </Card.Text>
                <br />
                {/* <br/> */}
                <Card.Link>
                  <Button
                    variant="outline-primary"
                    onClick={() => navigate("/adminview")}
                  >
                    View
                  </Button>
                </Card.Link>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </div>
    </>
  );
}

export default HomeAdmin;
