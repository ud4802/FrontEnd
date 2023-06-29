import { React, useContext } from "react";
import img5 from "../images/DDU.png";
import { Navigate, useNavigate, NavLink } from "react-router-dom";
import AuthContext from "../context/AuthProvider";

function Nav() {
  const loggedInUser = localStorage.getItem("auth");
  const loggedInAdmin = localStorage.getItem("admin");
  const { logout } = useContext(AuthContext);
  const at = useContext(AuthContext);

  const nav = useNavigate();
  const handleLogout = () => {
    localStorage.clear();
    nav("/");
  };

  return (
    <>
      {loggedInUser ? (
        <>
          <nav className="navbar navbar-expand-sm navbar-dark" fixed="top">
            <a href="/home">
              <img src={img5} alt="ErroImage" style={{ width: 85 + "%" }}></img>
            </a>

            <button
              className="navbar-toggler"
              type="button"
              data-toggle="collapse"
              data-target="#navbarNav"
              aria-controls="navbarNav"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span className="navbar-toggler-icon"></span>
            </button>
            <div
              className="collapse navbar-collapse justify-content-end nav-link"
              id="navbarNav"
            >
              <NavLink
                activeClassName="navbar__l--active"
                className="navbar__l"
                style={({ isActive }) => ({
                  color: isActive ? "#f69d29" : "white",
                })}
                to="/home"
              >
                Home
              </NavLink>

              <NavLink
                activeClassName="navbar__l--active"
                className="navbar__l "
                style={({ isActive }) => ({
                  color: isActive ? "#f69d29" : "white",
                })}
                to="/addstudents"
              >
                Add Students
              </NavLink>

              <NavLink
                activeClassName="navbar__l--active"
                className="navbar__l"
                style={({ isActive }) => ({
                  color: isActive ? "#f69d29" : "white",
                })}
                to="/viewstudents"
              >
                Edit & Remainder
              </NavLink>

              <NavLink
                activeClassName="navbar__l--active"
                className="navbar__l"
                style={({ isActive }) => ({
                  color: isActive ? "#f69d29" : "white",
                })}
                to="/notifystudents"
              >
                View Response
              </NavLink>
              <NavLink
                activeClassName="navbar__l--active"
                className="navbar__l"
                style={({ isActive }) => ({
                  color: isActive ? "#f69d29" : "white",
                })}
                to="/globalsearch"
              >
                Global Search
              </NavLink>
              <NavLink
                activeClassName="navbar__l--active"
                className="navbar__l"
                style={({ isActive }) => ({
                  color: isActive ? "#f69d29" : "white",
                })}
                onClick={handleLogout}
                to="/"
              >
                LogOut
              </NavLink>
            </div>
          </nav>
        </>
      ) : (
        <>
          {loggedInAdmin ? (
            <>
              <nav className="navbar navbar-expand-sm navbar-dark" fixed="top">
                <a href="/home">
                  <img
                    src={img5}
                    alt="ErroImage"
                    style={{ width: 85 + "%" }}
                  ></img>
                </a>

                <button
                  className="navbar-toggler"
                  type="button"
                  data-toggle="collapse"
                  data-target="#navbarNav"
                  aria-controls="navbarNav"
                  aria-expanded="false"
                  aria-label="Toggle navigation"
                >
                  <span className="navbar-toggler-icon"></span>
                </button>

                <div
                  className="collapse navbar-collapse justify-content-end nav-link"
                  id="navbarNav"
                >
                  <NavLink
                    activeClassName="navbar__l--active"
                    className="navbar__l"
                    style={({ isActive }) => ({
                      color: isActive ? "#f69d29" : "white",
                    })}
                    to="/adminhome"
                  >
                    Home
                  </NavLink>

                  <NavLink
                    activeClassName="navbar__l--active"
                    className="navbar__l"
                    style={({ isActive }) => ({
                      color: isActive ? "#f69d29" : "white",
                    })}
                    to="/adminview"
                  >
                    View Students
                  </NavLink>

                  <NavLink
                    activeClassName="navbar__l--active"
                    className="navbar__l"
                    style={({ isActive }) => ({
                      color: isActive ? "#f69d29" : "white",
                    })}
                    to="/viewuser"
                  >
                    View Cordinator
                  </NavLink>

                  <NavLink
                    activeClassName="navbar__l--active"
                    className="navbar__l"
                    style={({ isActive }) => ({
                      color: isActive ? "#f69d29" : "white",
                    })}
                    onClick={handleLogout}
                    to="/"
                  >
                    LogOut
                  </NavLink>
                </div>
              </nav>
            </>
          ) : (
            <>
              <nav className="navbar navbar-expand-sm navbar-dark " fixed="top">
                <a href="/home">
                  <img
                    src={img5}
                    alt="ErroImage"
                    style={{ width: 85 + "%" }}
                  ></img>
                </a>

                <button
                  className="navbar-toggler"
                  type="button"
                  data-toggle="collapse"
                  data-target="#navbarNav"
                  aria-controls="navbarNav"
                  aria-expanded="false"
                  aria-label="Toggle navigation"
                >
                  <span className="navbar-toggler-icon"></span>
                </button>
              </nav>
            </>
          )}
        </>
      )}
    </>
  );
}
export default Nav;
