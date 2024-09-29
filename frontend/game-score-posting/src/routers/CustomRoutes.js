import axios from "axios";
import { useEffect, useState } from "react";
import { Navigate, Outlet } from "react-router-dom";


const useAuth = () => {
  const [isAuth, setIsAuth] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      let token = localStorage.getItem("token");
      let id = localStorage.getItem("session_id");
      var url = "http://localhost:5000/api/admin/verify-admin";

      if (!token || !id) setIsAuth(false);
      else {
        try {
          const res = await axios.post(url, { token, id, apiType: "route" });
          console.log(`response from the isAuth: ${res}`);
          setIsAuth(false);

          if (res.status === 200) {
            console.log("noice");
            setIsAuth(true);
          } else {
            setIsAuth(false);
            localStorage.clear();
          }
        } catch (e) {
          console.log(e);
          setIsAuth(false);
          localStorage.clear();
        }
      }
    };

    fetchData();
  }, []);

  return isAuth;
};

const PrivateRoute = () => {
  const isAuth = useAuth();
  console.log("isAuth", isAuth);
  if (isAuth === null)
    // waiting..
    return null;

  return isAuth ? <Outlet /> : <Navigate to="/otp-send" />;
};

  // const url = "http://localhost:5000/api/admin/get-admin";
  // let data = {}
  // axios
  // .get(url, {  
  //     headers: {
  //       "Content-Type": "application/json",
  //     },
  //   })
  //   .then((res) => {
  //     if (res.status === 200) {
  //       data['token'] = res.data.data.token;
  //       data['id'] = res.data.data._id;
  //       data['isVerified'] = res.data.data.isVerified;
  //       data['email'] = res.data.data.email;  
        
  //       // Store them in localStorage
        
  //       localStorage.setItem('user', JSON.stringify({
  //         token: data.token,
  //         id: data.id,
  //         email: data.email,
  //         isVerified: data.isVerified
  //       }));
        
  //     } 
  //   })
  //   .catch((err) => {
  //     console.log(err);
  //     localStorage.clear();
  //   });

    // get response directly 
    // use try and catch 
    // fault tolerate 

    // write (admin) CRUD only one 
    // all are readers (contact)
    // all are readers (home)
    
    // 1. admin crednetils (pre created)
    // 2. admin login (frontend) (public)
    // 3. OPTIMIZATION (least APIs)
    // PUBLIC PAGES: 
    // (home, login)
    
  
  const IsVerified = () => {
    // const user = JSON.parse(localStorage.getItem("user"));
    // console.log(`from check verification `,user)
    let token = localStorage.getItem('token')
    let id = localStorage.getItem('session_id')
    return (token && id)? <Outlet />: <Navigate to="/login" />  ;
};

const IsAdmin  = ()=>{
  
  let token = localStorage.getItem("token");
  let id = localStorage.getItem("session_id");
  return (token && id)?  <Outlet /> : <Navigate to="/login"/>
}
export {
  PrivateRoute,
  IsVerified,
  IsAdmin,
  useAuth
};
