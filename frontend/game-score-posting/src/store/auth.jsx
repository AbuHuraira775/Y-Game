import axios from "axios";
import { createContext, useContext, useEffect, useState } from "react";

export const AuthContext = createContext()

export const AuthProvider = ({ children }) => {
    const [token, setToken] = useState(localStorage.getItem('token'))

    const storeTokenInLS = (server_token,email) => {
        localStorage.setItem("token", server_token);
        localStorage.setItem("email", email);
    }

    const isLoggedIn = !!token;

    const userAuthentication = async () => {
        try {
            await axios.get('http://localhost:5000/api/admin/verify-admin', {
                headers: { 'Content-Type': 'application/json' }
            })
                .then((res) => {
                    console.log(res)
                    if (res.status === 200) {
                        setToken(res.data.token)
                        localStorage.setItem('token', res.data.token)
                    } else {
                        console.log('not noice')
                        localStorage.clear();
                    }
                })
                .catch((err) => {
                    console.log(err)
                    localStorage.clear();
                })
        }
        catch (err) {
            console.log(err)
        }

    }
    const userLogout = () => {
        return localStorage.clear()
      }
    useEffect(() => {
            userAuthentication()
    }, [])
    return (
        <AuthContext.Provider value={{storeTokenInLS, isLoggedIn,userAuthentication,userLogout}}>
            {children}
        </AuthContext.Provider>
    )
}

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within AuthProvider')
    }
    return context;
}
