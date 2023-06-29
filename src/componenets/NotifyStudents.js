import React from "react";
import { Navigate, useNavigate } from "react-router-dom";
import axios from "../api/axios";

import { useRef, useState, useEffect, useContext } from "react";

import { Button, Table, Input, Space, Form } from "antd";
import { SearchOutlined } from "@ant-design/icons";
import Highlighter from "react-highlight-words";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCheck,
  faTimes,
  faInfoCircle,
} from "@fortawesome/free-solid-svg-icons";
import AuthContext from "../context/AuthProvider";

const YEAR_REGEX = /^[0-9][0-9]\d{2}-([0-9][0-9]\d{2})$/;

function NotifyStudents() {
  const loggedInUser = localStorage.getItem("auth");

  const [searchText, setSearchText] = useState("");
  const [searchedColumn, setSearchedColumn] = useState("");
  const searchInput = useRef(null);
  const { auth } = useContext(AuthContext);
  const at = useContext(AuthContext);

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

  const [Row, setRow] = useState(null);
  const [form] = Form.useForm();
  //For Declaration of columns
  const columns = [
    {
      title: "ID",
      dataIndex: "id",
    },
    {
      title: "Name",
      dataIndex: "name",
      ...getColumnSearchProps("name"),
    },
    {
      title: "Sem",
      dataIndex: "sem",
    },

    {
      title: "Year",
      dataIndex: "year",
    },
    {
      title: "Email",
      dataIndex: "email",
    },
    {
      title: "MobileNo",
      dataIndex: "mobileno",
    },
    {
      title: "Status",
      dataIndex: "status",

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
    {
      title: "Response",
      render: (text, record) => {
        var result = userData.find(({ email }) => email === record.email);
        // console.log(result.response);
        return (
          <>
            {result.response ? (
              <Button
                type="link"
                htmlType="submit"
                onClick={() => {
                  console.log(record.email);
                  console.log(result.response);
                  var url = viewResponse(result.response);
                  window.open(url, "_blank");
                }}
              >
                View
              </Button>
            ) : (
              <>
                <br></br>
                <p>No Response</p>
              </>
            )}
          </>
        );
      },
    },
  ];

  const [pdfUrl, setPdfUrl] = useState(null);

  const [userData, setUserdata] = useState([]);
  const [sem, setSem] = useState("");

  const [year, setYear] = useState("");
  const [validYear, setValidYear] = useState(true);
  const [yeatFocus, setYearFocus] = useState(false);

  useEffect(() => {
    const matches = year.match(YEAR_REGEX);
    if (matches) {
      const startYear = Number(matches[0].substring(0, 4));
      const endYear = Number(matches[1]);

      if (endYear - startYear !== 4) {
        setValidYear(false);
      } else {
        setValidYear(true);
      }
    } else {
      setValidYear(false);
    }
  }, [year]);

  const handleUpload = async (e) => {
    const listData = await axios.post(
      "/api",
      JSON.stringify({ sem, year, at }),
      {
        headers: { "Content-Type": "application/json" },
        withCredentials: true,
      }
    );

    setUserdata(listData.data);
  };

  console.log(sem);

  const list = [];
  const data = [];

  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const [loading, setLoading] = useState(false);

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
      response: userData[k].response,
    });
  }
  console.log(data);
  var hasSelected = false;
  const select = (e) => {
    if (e > 0) {
      hasSelected = true;
    } else {
      hasSelected = false;
    }
  };

  console.log(userData);
  console.log(data);

  const verify = async (e) => {
    console.log(list);
    await axios
      .post("/verify", { list, at })
      .then((response) => {
        console.log(response.data);
        setUserdata(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
    handleUpload();
  };

  const unverify = async (e) => {
    console.log(list);
    await axios
      .post("/unverify", { list, at })
      .then((response) => {
        console.log(response.data);
        setUserdata(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
    handleUpload();
  };

  // const handleRefresh = async () => {
  //   var pdfData = await axios.post("/receive", { data, at });
  //   console.log(typeof pdfData.data[0]);
  //   if (typeof pdfData.data[0] === "string") {
  //     console.log("byy");
  //     ExpireToken(pdfData.data);
  //   } else {
  //     viewResponse(pdfData.data);
  //   }
  // };

  const ExpireToken = (pdfData) => {
    window.location.href = pdfData;
  };

  const viewResponse = (pdfData) => {
    if (pdfData == false) {
    } else if (pdfData.startsWith("data:application/pdf;base64,") == true) {
      const binaryData = atob(
        pdfData.substr("data:application/pdf;base64,".length)
      );
      const array = [];
      for (let i = 0; i < binaryData.length; i++) {
        array.push(binaryData.charCodeAt(i));
      }
      const blob = new Blob([new Uint8Array(array)], {
        type: "application/pdf",
      });
      const url = URL.createObjectURL(blob);
      console.log(url);

      return url;
    }
    // }
  };

  return (
    <>
      {auth.user ? (
        <>
          <div>
            <h1 class="display-1">Verify students</h1>
            <p className="lead">
              Verify students according to their fees payment.
            </p>
          </div>

          <div>
            <section4 class="search">
              <label for="exampleInputEmail1">Semester : </label>
              &nbsp; &nbsp;
              <select
                class="form-select form-select-sm"
                aria-label=".form-select-sm example"
                onChange={(e) => setSem(e.target.value)}
                value={sem}
              >
                <option selected>Select Semester</option>
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
                <option value="5">5</option>
                <option value="6">6</option>
                <option value="7">7</option>
                <option value="8">8</option>
              </select>
              &nbsp; &nbsp; &nbsp; &nbsp;
              <label for="academicyear" className="form-label">
                Academic Year :
                <FontAwesomeIcon
                  icon={faCheck}
                  className={validYear ? "valid" : "hide"}
                />
                <FontAwesomeIcon
                  icon={faTimes}
                  className={validYear || !year ? "hide" : "invalid"}
                />
              </label>
              &nbsp; &nbsp; &nbsp; &nbsp;
              <div>
                <input
                  type="text"
                  class="form-control"
                  id="academicyear"
                  onChange={(e) => setYear(e.target.value)}
                  value={year}
                  required
                  aria-invalid={validYear ? "false" : "true"}
                  aria-describedby="yearnote"
                  onFocus={() => setYearFocus(true)}
                  onBlur={() => setYearFocus(false)}
                  maxLength="9"
                  style={{ width: "200px" }}
                />

                <p
                  id="yearnote"
                  className={
                    yeatFocus && !validYear ? "instructions" : "offscreen"
                  }
                >
                  <FontAwesomeIcon icon={faInfoCircle} />
                  <li>
                    Entered Year Should be in <b>yyyy-yyyy</b> Formate only.
                  </li>
                  <li>
                    And difference between both years should be exactly 4.
                  </li>
                  eg.,{" "}
                  <span style={{ color: "green" }}>
                    2020-2024,2024-2028 etc.
                  </span>{" "}
                  are <span style={{ color: "green" }}>valid</span>
                  <br />
                  but{" "}
                  <span style={{ color: "red" }}>
                    2020-2021,2020-2025 etc.
                  </span>{" "}
                  are <span style={{ color: "red" }}>invalid.</span>
                </p>
              </div>
              <br />
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
              <button
                type="submit"
                onClick={(e) => {
                  handleUpload(e);
                }}
                class="btn btn-secondary btn-sm"
                required
              >
                Submit
              </button>
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
              <button
                type="primary"
                onClick={verify}
                className="btn btn-success btn-sm"
              >
                Verify
              </button>
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
              <button
                type="primary"
                onClick={unverify}
                className="btn btn-success btn-sm"
              >
                Unverify
              </button>
            </section4>
          </div>

          <div className="refresh-button-container"></div>

          <div id="table">
            <div
              style={{
                marginBottom: 16,
              }}
            >
              <span
                style={{
                  marginLeft: 8,
                }}
              >
                {hasSelected ? `Selected ${selectedRowKeys.length} items` : ""}
              </span>
            </div>

            <div>
              <Form form={form}>
                <Table
                  rowSelection={{
                    type: "checkbox",

                    onChange: (record, r1) => {
                      list.splice(0, list.length);
                      for (var k = 0; k < r1.length; k++) {
                        list.push([r1[k].email, r1[k].status]);
                        select(list.length);
                      }

                      console.log(list);
                    },
                  }}
                  columns={columns}
                  dataSource={data}
                  sticky
                  scroll={{
                    y: 600,
                  }}
                />
              </Form>
            </div>
          </div>
        </>
      ) : (
        <Navigate replace to="/"></Navigate>
      )}
    </>
  );
}

export default NotifyStudents;
