import { useState } from "react";
import axios from "axios";
import Button from "react-bootstrap/Button";
import { useNavigate } from "react-router";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [msg, setMsg] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    console.log("hii");
    try {
      const url = `http://localhost:3500/password-reset`;
      const { data } = await axios.post(url, { email });
      setMsg(data.message);
      navigate("/resetsent");
      setError("");
    } catch (error) {
      if (
        error.response &&
        error.response.status >= 400 &&
        error.response.status <= 500
      ) {
        setError(error.response.data.message);
        setMsg("");
      }
    }
  };

  return (
    <>
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <section3>
        <div>
          {msg && (
            <div class="alert alert-success" role="alert">
              <p>{msg}</p>
            </div>
          )}
        </div>

        <form>
          <h3>Forgot Password </h3>
          <div className="form-group">
            <label htmlFor="email">Email : </label>
            <input
              type="email"
              className="form-control"
              name="email"
              onChange={(e) => setEmail(e.target.value)}
              value={email}
              required
              placeholder="Enter Email"
            />
          </div>
          {error && <div>{error}</div>}
          {msg && <div>{msg}</div>}
          <div className="align">
            <Button variant="outline-dark" onClick={handleSubmit}>
              Send
            </Button>
          </div>
        </form>
      </section3>
    </>
  );
};

export default ForgotPassword;
