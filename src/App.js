import "./App.css";
import Home from "./componenets/Home";
import LogIn from "./componenets/LogIn";
import SignUp from "./componenets/SignUp";
import { Routes, Route } from "react-router-dom";
import Layout from "./componenets/Layout";
import Nav from "./componenets/Nav";
import ForgotPassword from "./componenets/ForgotPassword";
import PasswordReset from "./componenets/ResetPassword";
import AddStudents from "./componenets/AddStudents";
import ViewStudents from "./componenets/ViewStudents";
import NotifyStudents from "./componenets/NotifyStudents";
import LoginOption from "./componenets/LoginOption";
import AdminLogin from "./componenets/AdminLogin";
import VerifyUser from "./componenets/VerifyUser";
import ViewForAdmin from "./componenets/ViewForAdmin";
import HomeAdmin from "./componenets/HomeAdmin";
import ViewUser from "./componenets/ViewUser";
import GlobalSearch from "./componenets/GlobalSearch";
import ResetSent from "./componenets/ResetSent";

function App() {
  window.onbeforeunload = function () {
    localStorage.clear();
  };
  const loggedInUser = localStorage.getItem("auth");
  return (
    <>
      <Nav />
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route path="/" element={<LoginOption />} />

          <Route path="/adminLogin" element={<AdminLogin />} />

          <Route exact path="/login" element={<LogIn />} />
          <Route exact path="/signup" element={<SignUp />} />

          <Route path="/home" element={<Home />} />
          <Route exact path="/forgotp" element={<ForgotPassword />} />
          <Route path="/resetsent" element={<ResetSent/>}/>
          <Route path="/adminverify" element={<VerifyUser />} />

          <Route
            path="/password-reset/:id/:token"
            element={<PasswordReset />}
          />
          <Route path="/addstudents" element={<AddStudents />} />
          <Route path="/viewstudents" element={<ViewStudents />} />
          <Route path="/notifystudents" element={<NotifyStudents />} />
          <Route path="/adminview" element={<ViewForAdmin />} />
          <Route path="/adminhome" element={<HomeAdmin />} />
          <Route path="/viewuser" element={<ViewUser />} />
          <Route path="/globalsearch" element={<GlobalSearch />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
