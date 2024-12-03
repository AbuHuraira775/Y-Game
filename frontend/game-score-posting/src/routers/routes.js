import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "../screens/Home";
import Login from "../screens/Login";
import Logout from "../screens/Logout";
import AddPost from "../screens/AddPost";
import UpdatePost from "../screens/UpdatePost";
import Profile from "../screens/Profile";
import Contact from "../screens/Contact";
import Error from "../screens/Error";
import { PrivateRoute } from "./CustomRoutes";
import Navbar from "../compopnents/Navbar";
import DeletePost from "../screens/DeletePost";

const MainRouting = () => {
  const title = '404 Error'
  const description = 'Page Not Found'
  return (
    <>
      <Router>
        <Navbar
          home="HOME"
          login="LOGIN"
          post='ADD POST' 
          contact="CONTACT"
        />
        <Routes>
          {/* public routes for users  */}
          <Route exact path="/" element={<Home />} />
          <Route exact path="/contact" element={<Contact />} />
          <Route exact path="*" element={<Error title={title} description={description}/>} />
          <Route exact path="/login" element={<Login />} />
          <Route exact path="/logout" element={<Logout />} />

          <Route path="/add-post" element={<PrivateRoute />}>
            <Route exact path="/add-post" element={<AddPost />} />
          </Route>
          <Route path="/update-post/:id" element={<PrivateRoute />}>
            <Route exact path="/update-post/:id" element={<UpdatePost />} />
          </Route>
          <Route path="/delete-post/:id" element={<PrivateRoute />}>
            <Route exact path="/delete-post/:id" element={<DeletePost />} />
          </Route>

          <Route path="/profile" element={<PrivateRoute />}>
            <Route exact path="/profile" element={<Profile />} />
          </Route>
        </Routes>
      </Router>
    </>
  );
};

export default MainRouting;
