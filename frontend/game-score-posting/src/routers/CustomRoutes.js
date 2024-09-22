import axios from "axios";
import { useEffect, useState } from "react";
import { Navigate, Outlet } from "react-router-dom";

const PublicRoutes = () => {
  let token = localStorage.getItem("token");
  let id = localStorage.getItem("id");
  console.log(`token : ${token} \nid : ${id}`);
  return token && id ? <Navigate to="/profile" /> : <Outlet />;
};

const useAuth = () => {
  const [isAuth, setIsAuth] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      let token = JSON.parse(localStorage.getItem("user")).token;
      let id = JSON.parse(localStorage.getItem("user")).id;
      var url = "http://localhost:5000/api/admin/verify-admin";

      if (!token || !id) setIsAuth(false);
      else {
        try {
          const res = await axios.post(url, { token, id, apiType: "route" });
          console.log(res);
          setIsAuth(false);

          if (res.status === 200) {
            console.log("noice");
            setIsAuth(true);
          } else {
            console.log("else:");

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

  return isAuth ? <Outlet /> : <Navigate to="/login" />;
};

const fetchAdmin = async()=>{
  const url = "http://localhost:5000/api/admin/get-admin";
  let data = {}
  
  axios
  .get(url, {
      headers: {
        "Content-Type": "application/json",
      },
    })
    .then((res) => {
      if (res.status === 200) {
        data['token'] = res.data.data.token;
        data['id'] = res.data.data._id;
        data['isVerified'] = res.data.data.isVerified;
        data['email'] = res.data.data.email;  
        
        // Store them in localStorage
        
        localStorage.setItem('user', JSON.stringify({
          token: data.token,
          id: data.id,
          email: data.email,
          isVerified: data.isVerified
        }));
        
      } 
    })
    .catch((err) => {
      console.log(err);
      localStorage.clear();
    });
  }

const ExistAdmin = () => {
  // localStorage.clear()
  const url = "http://localhost:5000/api/admin/get-admin";
  let data = {}
  axios
  .get(url, {
      headers: {
        "Content-Type": "application/json",
      },
    })
    .then((res) => {
      console.log(res);
      if (res.status === 200) {
        data['token'] = res.data.data.token;
        data['id'] = res.data.data._id;
        data['isVerified'] = res.data.data.isVerified;
        data['email'] = res.data.data.email;  
        localStorage.setItem('user', JSON.stringify({
          token: data.token,
          id: data.id,
          email: data.email,
          isVerified: data.isVerified
        }));
      } 
    })
    .catch((err) => {
      console.log(err);
      localStorage.clear();
    });
    // Get the token and ID from local storage
    // data.token = localStorage.getItem("token");
    // data.id = localStorage.getItem("id");
    // data.isVerified = localStorage.getItem("isVerified");
    // data.email = localStorage.getItem("adminEmail");
    return !data.token && !data.id ? <Navigate to="/" /> : <Outlet />;
  };
  
  const IsRegistered = async() => { 

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
    
    await fetchAdmin()
    const user = JSON.parse(localStorage.getItem("user"));
    console.log(user);
    if(!user){
      console.log('access denied ')
      localStorage.clear()
      return <Navigate to='/'/>
    }
    if(!user.token && !user.id ){
      console.log(`from is registered `,user)
      return <Navigate to='/login' /> 
    }
    if(!user.isVerified){
      return <Navigate to='/verify-account'/>
    }
    // localStorage.clear()
  };
  
  const CheckVerification = () => {
    fetchAdmin()
    const user = JSON.parse(localStorage.getItem("user"));
    console.log(`from check verification `,user)
    return (user.token && user.id && user.isVerified ) ? <Navigate to="/profile" /> : <Outlet />;
  };
  
  const IsVerified = () => {
    fetchAdmin()
    const user = JSON.parse(localStorage.getItem("user"));
    console.log(`from check verification `,user)
    return (user.token && user.id && user.isVerified ) ? <Navigate to="/profile" /> : <Outlet />;
};

const ForPost =()=>{
 
  fetchAdmin()
  const user = JSON.parse(localStorage.getItem("user"));
  console.log(`from check verification `,user)
  return (user.token && user.id && user.isVerified ) ? <Outlet />: <Navigate to="/verify-account" />  ; 
}
export {
  PublicRoutes,
  PrivateRoute,
  CheckVerification,
  IsRegistered,
  IsVerified,
  ExistAdmin,
  ForPost
};
