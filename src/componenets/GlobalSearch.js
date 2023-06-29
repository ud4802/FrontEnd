import React, { useEffect, useState, useRef, useContext } from "react";
import axios from "../api/axios";
import Button from "react-bootstrap/Button";
import { Table, Input, Space, Form } from "antd";
import Highlighter from "react-highlight-words";
import { SearchOutlined } from "@ant-design/icons";
import AuthContext from "../context/AuthProvider";
import { Card, Col, Modal, Row } from "react-bootstrap";

function GlobalSearch() {
  const at = useContext(AuthContext);

  const [editingRow, setEditingRow] = useState(null);
  const [form] = Form.useForm();

  const [searchText, setSearchText] = useState("");
  const [searchedColumn, setSearchedColumn] = useState("");
  const searchInput = useRef(null);
  const [userData, setUserData] = useState([]);
  const [showUpdateConfirmation, setShowUpdateConfirmation] = useState(false);
  const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);

  const handleSearch = (selectedKeys, confirm, dataIndex) => {
    confirm();
    setSearchText(selectedKeys[0]);
    setSearchedColumn(dataIndex);
  };
  const handleReset = (clearFilters) => {
    clearFilters();
    setSearchText("");
  };

  const getColumnSearchProps = (dataIndex) => ({
    filterDropdown: ({
      setSelectedKeys,
      selectedKeys,
      confirm,
      clearFilters,
      close,
    }) => (
      <div
        style={{
          padding: 8,
        }}
        onKeyDown={(e) => e.stopPropagation()}
      >
        <Input
          ref={searchInput}
          placeholder={`Search ${dataIndex}`}
          value={selectedKeys[0]}
          onChange={(e) =>
            setSelectedKeys(e.target.value ? [e.target.value] : [])
          }
          onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex)}
          style={{
            marginBottom: 8,
            display: "block",
          }}
        />
        <Space>
          <Button
            type="primary"
            onClick={() => handleSearch(selectedKeys, confirm, dataIndex)}
            icon={<SearchOutlined />}
            size="small"
            style={{
              width: 90,
            }}
          >
            Search
          </Button>
          <Button
            onClick={() => clearFilters && handleReset(clearFilters)}
            size="small"
            style={{
              width: 90,
            }}
          >
            Reset
          </Button>
          <Button
            type="link"
            size="small"
            onClick={() => {
              confirm({
                closeDropdown: false,
              });
              setSearchText(selectedKeys[0]);
              setSearchedColumn(dataIndex);
            }}
          >
            Filter
          </Button>
          <Button
            type="link"
            size="small"
            onClick={() => {
              close();
            }}
          >
            close
          </Button>
        </Space>
      </div>
    ),
    filterIcon: (filtered) => (
      <SearchOutlined
        style={{
          color: filtered ? "#1890ff" : undefined,
        }}
      />
    ),
    onFilter: (value, record) =>
      record[dataIndex].toString().toLowerCase().includes(value.toLowerCase()),
    onFilterDropdownOpenChange: (visible) => {
      if (visible) {
        setTimeout(() => searchInput.current?.select(), 100);
      }
    },
    render: (text) =>
      searchedColumn === dataIndex ? (
        <Highlighter
          highlightStyle={{
            backgroundColor: "#ffc069",
            padding: 0,
          }}
          searchWords={[searchText]}
          autoEscape
          textToHighlight={text ? text.toString() : ""}
        />
      ) : (
        text
      ),
  });

  const columns = [
    {
      title: "ID",
      dataIndex: "id",
      render: (text, record) => {
        if (editingRow === record.key) {
          return (
            <Form.Item
              name="id"
              rules={[
                {
                  required: true,
                  message: "Please Enter ID.",
                },
              ]}
            >
              <Input />
            </Form.Item>
          );
        } else {
          return <p>{text}</p>;
        }
      },
    },
    {
      title: "Name",
      dataIndex: "name",
      ...getColumnSearchProps("name"),
      render: (text, record) => {
        if (editingRow === record.key) {
          return (
            <Form.Item
              name="name"
              rules={[
                {
                  required: true,
                  message: "Please Enter Name.",
                },
              ]}
            >
              <Input />
            </Form.Item>
          );
        } else {
          return <p>{text}</p>;
        }
      },
    },

    {
      title: "Sem",
      dataIndex: "sem",
      render: (text, record) => {
        if (editingRow === record.key) {
          return (
            <>
              <Form.Item name="sem">
                <Input readOnly />
              </Form.Item>
            </>
          );
        } else {
          return <p>{text}</p>;
        }
      },
    },

    {
      title: "Year",
      dataIndex: "year",
      render: (text, record) => {
        if (editingRow === record.key) {
          return (
            <>
              <Form.Item name="year">
                <Input readOnly />
              </Form.Item>
            </>
          );
        } else {
          return <p>{text}</p>;
        }
      },
    },
    {
      title: "Email",
      dataIndex: "email",
      render: (text, record) => {
        if (editingRow === record.key) {
          return (
            <>
              <Form.Item name="email">
                <Input />
              </Form.Item>
            </>
          );
        } else {
          return <p>{text}</p>;
        }
      },
    },
    {
      title: "MobileNo",
      dataIndex: "mobileno",
      render: (text, record) => {
        if (editingRow === record.key) {
          return (
            <>
              <Form.Item name="mobileno">
                <Input />
              </Form.Item>
            </>
          );
        } else {
          return <p>{text}</p>;
        }
      },
    },
    {
      title: "Status",
      dataIndex: "status",
      render: (text, record) => {
        if (editingRow === record.key) {
          return (
            <>
              <Form.Item name="status">
                <Input readOnly />
              </Form.Item>
            </>
          );
        } else {
          return <p>{text}</p>;
        }
      },
      filters: [
        {
          text: "Paid",
          value: "Paid",
        },
        {
          text: "Not Paid",
          value: "Not Paid",
        },
      ],
      onFilter: (value, record) => record.status.indexOf(value) === 0,
    },
  ];

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    console.log(at);
    try {
      const response = await axios.post(
        "/viewrecord",
        { at },
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        }
      );
      setUserData(response.data);
      console.log(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const data = [];
  for (var k = 0; k < userData.length; k++) {
    data.push({
      key: k,
      id: userData[k].id,
      name: userData[k].name,
      sem: userData[k].sem,
      year: userData[k].year,
      email: userData[k].email,
      mobileno: userData[k].mobileno,
      status: userData[k].status,
    });
  }

  //code for delete with confirmation
  const handleDeleteAll = () => {
    setShowDeleteConfirmation(true);
  };

  const handleConfirmDeleteAll = async () => {
    // TODO: delete all table items
    setShowDeleteConfirmation(false);
    console.log(at);
    const response = await axios.post("/deleteall", {
      at,
    });
    setUserData(response.data);
  };

  const handleCancelDeleteAll = () => {
    setShowDeleteConfirmation(false);
  };

  const handleUpdate = () => {
    setShowUpdateConfirmation(true);
  };

  const handleConfirmUpdateAll = async () => {
    setShowUpdateConfirmation(false);
    const response = await axios.post("/updateall", {
      at,
    });
    setUserData(response.data);
  };

  const handleCancelUpdateAll = () => {
    setShowUpdateConfirmation(false);
  };

  return (
    <>
      <Modal
        show={showDeleteConfirmation}
        onClos={() => setShowDeleteConfirmation(false)}
      >
        <div class="confirmation">
          <p>Are you sure you want to delete all table items?</p>
          <Button variant="success" onClick={handleConfirmDeleteAll}>
            Yes
          </Button>
          &nbsp;&nbsp;&nbsp;&nbsp;
          <Button varient="" onClick={handleCancelDeleteAll}>
            No
          </Button>
        </div>
      </Modal>
      <Modal
        show={showUpdateConfirmation}
        onClos={() => setShowUpdateConfirmation(false)}
      >
        <div class="confirmation">
          <p>Are you sure you want to update semester of all students ?</p>
          <Button variant="success" onClick={handleConfirmUpdateAll}>
            Yes
          </Button>
          &nbsp;&nbsp;&nbsp;&nbsp;
          <Button varient="" onClick={handleCancelUpdateAll}>
            No
          </Button>
        </div>
      </Modal>
      <div className="card-gs">
        <Row>
          <Col>
            <Card>
              <Card.Body>
                <Card.Title>Delete data of all semester : </Card.Title>

                <Card.Link>
                  <Button
                    variant="outline-danger btn-sm"
                    onClick={handleDeleteAll}
                  >
                    Delete
                  </Button>
                </Card.Link>
              </Card.Body>
            </Card>
          </Col>
          &nbsp;&nbsp;&nbsp;
          <Col id="col3">
            <Card>
              <Card.Body>
                <Card.Title>Update semeseter of all data :</Card.Title>

                <Card.Link>
                  <Button
                    variant="outline-primary btn-sm"
                    onClick={handleUpdate}
                  >
                    Update
                  </Button>
                </Card.Link>
              </Card.Body>
            </Card>
          </Col>
          &nbsp;&nbsp;&nbsp;
        </Row>
      </div>
      <div id="ref">
        <Button variant="outline-dark btn-sm" onClick={fetchData}>
          Refresh
        </Button>
      </div>

      <div id="table">
        <Table
          columns={columns}
          dataSource={data}
          sticky
          scroll={{
            y: 600,
          }}
        />
      </div>
    </>
  );
}

export default GlobalSearch;
