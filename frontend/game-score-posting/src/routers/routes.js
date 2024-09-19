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
import {PrivateRoute, ExistAdmin, IsRegistered, IsVerified, CheckVerification,ForPost} from './CustomRoutes'

const MainRouting = () => {
  return (
    <Router>
      <Routes>
        {/* public routes for users  */}
        <Route exact path="/" element={<Home />} />
        <Route exact path="/contact" element={<Contact />} />
        <Route exact path="*" element={<Error />} />

        {/* protected routes for admin  */}
        {/* all protected routes check token and session id  */}
        {/* also check admin is verified or not  */}
        <Route path="/add-post" element={<ForPost />}>
          <Route exact path="/add-post" element={<AddPost />} />
        </Route>
        <Route path="/update-post/:id" element={<ForPost />}>
          <Route exact path="/update-post/:id" element={<UpdatePost />} />
        </Route>
        <Route path="/delete-post/:id" element={<ForPost />}>
          <Route exact path="/delete-post/:id" element={<DeletePost />} />
        </Route>
        {/* if not verified before post add, update and delete  */}
        {/* if verified -> profile  */}
        <Route path="/otp-send" element={<IsVerified />}>
          <Route exact path="/otp-send" element={<SendOTP />} />
        </Route>

        {/* protected and conditional routes for admin -> must check token and session id*/}
        {/* if no admin exists*/}
        <Route path="/signup" element={<ExistAdmin />}>
          <Route exact path="/signup" element={<SignUp />} />
        </Route>

        {/* if token and session is populated than show, otherwise goto home page  */}
        {/* if not verified -> verify account  */}
        {/* if verified -> profile  */}
        <Route path="/login" element={<IsRegistered />}>
          <Route exact path="/login" element={<Login />} />
        </Route>

        {/* if no token and session id -> home page  */}
        {/* if yes and verified -> profile   */}
        {/* if yes and not verfied -> verify account  */}
        <Route path="/verify-account" element={<CheckVerification />}>
          <Route exact path="/verify-account" element={<VerifyAccount />} />
        </Route>

        {/* if verified and going to login, verify and otp -> profile  */}
        <Route path="/profile" element={<PrivateRoute />}>
          <Route exact path="/profile" element={<Profile />} />
        </Route>
      </Routes>
    </Router>
  );
};

export default MainRouting;
