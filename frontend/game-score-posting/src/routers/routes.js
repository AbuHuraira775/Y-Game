import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "../screens/Home";
import Login from "../screens/Login";
import SignUp from "../screens/SignUp";
import VerifyAccount from "../screens/VerifyAccount";
import AddPost from "../screens/AddPost";
import UpdatePost from "../screens/UpdatePost";
import DeletePost from "../screens/DeletePost";
import Profile from "../screens/Profile";
import Contact from "../screens/Contact";
import Error from "../screens/Error";
import SendOTP from "../compopnents/Send_OTP";
import { PrivateRoute, IsVerified, IsAdmin, useAuth } from "./CustomRoutes";
import Test from "../screens/Test";
import Handle from "../screens/Handle";
import Navbar from "../compopnents/Navbar";

const MainRouting = () => {
  return (
    <>
      <Router>
        <Navbar
          home="HOME"
          login={useAuth() ? null : "LOGIN"}
          post={useAuth() ? `ADD POST` : null}
          contact="CONTACT"
        />
        <Routes>
          {/* public routes for users  */}
          <Route exact path="/" element={<Home />} />
          <Route exact path="/contact" element={<Contact />} />
          <Route exact path="*" element={<Error />} />
          <Route exact path="/login" element={<Login />} />
          <Route exact path="/test" element={<Test />} />
          <Route exact path="/handle" element={<Handle />} />

          <Route path="/add-post" element={<PrivateRoute />}>
            <Route exact path="/add-post" element={<AddPost />} />
          </Route>
          <Route path="/update-post/:id" element={<PrivateRoute />}>
            <Route exact path="/update-post/:id" element={<UpdatePost />} />
          </Route>
          <Route path="/otp-send" element={<IsVerified />}>
            <Route exact path="/otp-send" element={<SendOTP />} />
          </Route>
          <Route path="/verify-account" element={<IsVerified />}>
            <Route exact path="/verify-account" element={<VerifyAccount />} />
          </Route>

          <Route path="/profile" element={<IsAdmin />}>
            <Route exact path="/profile" element={<Profile />} />
          </Route>
        </Routes>
      </Router>
    </>
  );
};

export default MainRouting;
