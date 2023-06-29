import React from "react";
import axios from "../api/axios";
import { useRef, useState, useEffect, useContext } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import * as XLS from "xlsx";
import xlfile from "./Model.xlsx";
import { Button } from "antd/es/radio";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCheck,
  faTimes,
  faInfoCircle,
} from "@fortawesome/free-solid-svg-icons";
import AuthContext from "../context/AuthProvider";

const EXCEL_URL = "/upload";

const YEAR_REGEX = /^[0-9][0-9]\d{2}-([0-9][0-9]\d{2})$/;

function AddStudents() {
  const loggedInUser = localStorage.getItem("auth");
  const [file, setFile] = useState(null);
  const [error, setError] = useState(null);
  const [data, setData] = useState(null);
  const [sem, setSem] = useState("");
  const userRef = useRef();
  const at = useContext(AuthContext);

  const [year, setYear] = useState("");
  const [validYear, setValidYear] = useState(true);
  const [yeatFocus, setYearFocus] = useState(false);
  const { auth } = useContext(AuthContext);

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

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setFile(file);
    setError(null);
    if (file) {
      const reader = new FileReader();
      reader.readAsArrayBuffer(file);
      reader.onload = (e) => {
        const bufferArray = e.target.result;
        const wb = XLS.read(bufferArray, { type: "buffer" });
        const wsname = wb.SheetNames[0];
        const ws = wb.Sheets[wsname];
        const data = XLS.utils.sheet_to_json(ws);
        setData(data);
        console.log(data[0].MobileNo);
      };
      setFile(null);
    }
  };

  const [successmsg, setSuccessMsg] = useState(null);
  const [errormsg, setErrorMsg] = useState(null);
  const [message, setMessage] = useState("");
  const handleUpload = (e) => {
    e.preventDefault();

    var error = false;
    if (data) {
      data.forEach((row) => {
        if (
          !row.ID ||
          !row.RollNo ||
          !row.Name ||
          !row.Email ||
          !row.MobileNo 
          ||!row.Status
        ) {
          error = true;
        }
      });
      if (error) {
        setErrorMsg("Invalid data found in the uploaded file.");
        setSem("");
        setYear("");
        setTimeout(() => setErrorMsg(null), 3000); // clear error message after 3 seconds
      } else {
        setSuccessMsg("All data in the uploaded file is valid.");
        setTimeout(() => setSuccessMsg(null), 3000);
        try {
          const response = axios.post(EXCEL_URL, { data, sem, year, at });
          setMessage("File Uploaded Successfully.");

          setSem("");
          setYear("");
          setTimeout(() => setMessage(null), 3000); // clear success message after 3 seconds
        } catch (error) {
          setErrorMsg("Error uploading file.");
          setSem("");
          setYear("");
          setTimeout(() => setErrorMsg(null), 3000); // clear error message after 3 seconds
        }
      }
    } else {
      setErrorMsg("Please upload a file first.");
      setTimeout(() => setErrorMsg(null), 3000); // clear error message after 3 seconds
    }
  };

  return (
    <>
      {auth.user ? (
        <>
          <h6 class="display-4">Add students</h6>
          <p className="lead">Upload XLSX file containing student details.</p>

          <br />
          <br />

          <div>
            {message && (
              <div class="alert alert-success" role="alert">
                <p>{message}</p>
              </div>
            )}
          </div>
          <div>
            {errormsg && (
              <div class="alert alert-danger" role="alert">
                <p>{errormsg}</p>
              </div>
            )}
          </div>
          <div>
            {successmsg && (
              <div class="alert alert-success" role="alert">
                <p>{successmsg}</p>
              </div>
            )}
          </div>

          <section>
            <div>
              <h3>Add Students</h3>
            </div>
            <div>
              <h6>Download Formate :</h6>

              <Link to={xlfile} target="_blank" download>
                <button type="button" className="btn btn-success btn-sm">
                  Download
                </button>
              </Link>
            </div>
            <label for="exampleInputEmail1">Semester : </label>
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

            <div class="form-group">
              <label for="academicyear">
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
              <br />
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
              />
            </div>
            <p
              id="yearnote"
              className={yeatFocus && !validYear ? "instructions" : "offscreen"}
            >
              <FontAwesomeIcon icon={faInfoCircle} />
              <li>
                Entered Year Should be in <b>yyyy-yyyy</b> Formate only.
              </li>
              <li>And difference between both years should be exactly 4.</li>
              eg.,{" "}
              <span style={{ color: "green" }}>
                2020-2024,2024-2028 etc.
              </span>{" "}
              are <span style={{ color: "green" }}>valid</span>
              <br />
              but <span style={{ color: "red" }}>
                2020-2021,2020-2025 etc.
              </span>{" "}
              are <span style={{ color: "red" }}>invalid.</span>
            </p>

            <br />
            <input type="file" accept=".xlsx" onChange={handleFileChange} />

            <div className="align">
              <button
                type="submit"
                onClick={handleUpload}
                class="btn btn-secondary btn-sm"
                required
                disabled={!validYear ? true : false}
              >
                Submit
              </button>
            </div>
            <br />
          </section>
        </>
      ) : (
        <Navigate replace to="/"></Navigate>
      )}
    </>
  );
}

export default AddStudents;
