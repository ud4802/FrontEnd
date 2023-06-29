import { useRef, useState, useEffect, useContext } from "react";
import AuthContext from "../context/AuthProvider";
import { Navigate,Link,useNavigate } from "react-router-dom";
import axios from "../api/axios";
import { Button } from "reactstrap";
import Button1 from "react-bootstrap/Button";

const LOGIN_URL = "/auth";
function LogIn() {
  const { setAuth } = useContext(AuthContext);
  const at = useContext(AuthContext);
  const userRef = useRef();
  const errRef = useRef();
  
  const [user, setUser] = useState("");
  const [pwd, setPwd] = useState("");
  const [errMsg, setErrMsg] = useState("");
  const [success, setSuccess] = useState("");
  
  useEffect(() => {
    userRef.current.focus();
  }, []);

  useEffect(() => {
    setErrMsg("");
  }, [user, pwd]);
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(user, pwd);

    try {
      const response = await axios.post(
        LOGIN_URL,
        JSON.stringify({ user, pwd }),
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        }
      );
      console.log(JSON.stringify(response?.data));
      console.log(JSON.stringify(response));

      const refreshToken = response?.data?.refreshToken;

      setAuth({ user, pwd, refreshToken });
      console.log(at.auth);
      setUser("");
      setPwd("");
      setSuccess(true);
      localStorage.setItem("auth", response.data);
    } catch (err) {
      if (!err?.response) {
        setErrMsg("No Server Response");
      } else if (err.response?.status === 400) {
        setErrMsg("Missing username or Passwrod");
      } else if (err.response?.status === 401 || err.response?.status === 402) {
        setErrMsg("Unauthorized");
      } else {
        setErrMsg("LogIn Failed");
      }
      errRef.current.focus();
    }
  };

  const navigate = useNavigate();
  return (
    <>
      {success ? (
        <Navigate replace to="/home" />
      ) : (
        <>
          <h1 class="display-5">Login As a Co-ordinator</h1>
          <br />
          <br />

          <section className="login-page">
            <p
              ref={errRef}
              className={errMsg ? "errmsg" : "offscreen"}
              aria-live="assertive"
            >
              {errMsg}
            </p>

            <h3>Log In</h3>
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label htmlFor="username">Username :</label>
                <input
                  type="text"
                  className="form-control"
                  id="username"
                  ref={userRef}
                  autoComplete="off"
                  onChange={(e) => setUser(e.target.value)}
                  value={user}
                  required
                />

                <label htmlFor="pasword">Password :</label>
                <input
                  type="password"
                  id="password"
                  className="form-control"
                  onChange={(e) => setPwd(e.target.value)}
                  value={pwd}
                  required
                />
                <p>
                  <small>
                    <span className="line">
                      {/* <Link to="/forgotp">Forgot password?</Link> */}
                        {/* <Button1
                        variant="outline-primary sm"
                        onClick={() => navigate("/forgotp")}
                      >
                        Forget passwrod?
                      </Button1> */}
                      <a href ="" onClick={()=> navigate("/forgotp")}>Forgot password?</a>
                    </span>
                  </small>
                </p>
              </div>
              <div className="align">
                <Button variant="outline-dark" type="submit">
                  LogIn
                </Button>
              </div>
            </form>
            <p>
              <small>
                {" "}
                Don't have an Account?
                <span className="line">
                {/* <Link to="/signup">Sign Up?</Link> */}
                {/* <Button1 variant="outline-dark" onClick={()=> navigate("/signup")}>Signup</Button1> */}
                <a href ="" onClick={()=> navigate("/signup")}>Sign Up</a>
                </span>
              </small>
            </p>
          
          </section>
        </>
      )}
    </>
  );
}

export default LogIn;
