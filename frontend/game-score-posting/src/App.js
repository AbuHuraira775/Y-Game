import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import "./App.css";
import Navbar from "./compopnents/Navbar";
import MainRouting from "./routers/routes";
import { useAuth } from "./routers/CustomRoutes";

function App() {
  return (
    <div className="App">
      {/* <Routes>
        <Route> */}

        {/* </Route>
      </Routes> */}
      <MainRouting />
    </div>
  );
}

export default App;
