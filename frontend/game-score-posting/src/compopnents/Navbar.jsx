import React, { useState } from 'react'
import { Link, NavLink, Route, Routes, BrowserRouter as Router, useNavigate } from 'react-router-dom'
import { RiMenu2Fill } from "react-icons/ri";
import BtnCom from './BtnComp';
import { useAuth } from '../store/auth';

function Navbar({ home, login, contact, post }) {
    const navigate = useNavigate()
    const {isLoggedIn} = useAuth()
    const [navFlag, setNavFlag] = useState(false)
    const showNav = () => {
        setNavFlag(!navFlag)
    }
    const hideNav = () => {
        setNavFlag(!navFlag)
    }

    const {userLogout} = useAuth()

    const logoutUser = async()=>{
        try{
            await userLogout()
        setNavFlag(!navFlag)
            navigate('/')
        }
        catch(err){
            console.log(err)
        }
    }
    return (
        <nav className='nav '>
            <div className="navLogo bg-cyan-600 flex justify-end p-3 fixed w-full z-10">
                <RiMenu2Fill onClick={() => showNav()} className='menu text-3xl text-white' />
            </div>
            {/* <Button variant="outlined" onClick={hideNav}>{home}</Button> */}
            {/* <Button variant={post ? 'contained' : null} onClick={hideNav}>{post}</Button> */}
            {
                navFlag ?
                    <div className='toggle-nav center bg-white h-[100vh] fixed w-screen h-[100vh] top-0  z-10 flex flex-col items-center justify-center ' >
                        <ul className=' flex flex-col  items-center justify-center  '>
                            <li><NavLink to='/' className={({ isActive }) => (isActive ? 'active-link' : 'inactive-link')}><BtnCom text={home} onClick={hideNav} className="w-40 text-slate-500  px-5 py-1 border-2 bg-transparet rounded-md hover:bg-slate-300 font-semibold mb-2"/></NavLink></li>
                            <li><NavLink to='/contact' className={({ isActive }) => (isActive ? 'active-link' : 'inactive-link')}><BtnCom text={contact} onClick={hideNav} className="w-40 text-slate-500  px-5 py-1 border-2 bg-transparet rounded-md hover:bg-slate-300 font-semibold mb-2"/></NavLink></li>
                            {isLoggedIn ?
                            <>
                                <li><NavLink to='/add-post' className={({ isActive }) => (isActive ? 'active-link' : 'inactive-link')}><BtnCom text={post} onClick={hideNav} className="w-40 text-white  px-5 py-1 border-2 bg-cyan-600 rounded-md hover:bg-cyan-700 font-semibold mb-2"/></NavLink></li>
                                <li><NavLink to='/logout' className={({ isActive }) => (isActive ? 'active-link' : 'inactive-link')}><BtnCom text='LOG OUT' onClick={logoutUser} className="w-40 text-white  px-5 py-1 border-2 bg-red-600 rounded-md hover:bg-red-700 font-semibold mb-2"/></NavLink></li>
                            </>
                                :
                                <li><NavLink to='/login' className={({ isActive }) => (isActive ? 'active-link' : 'inactive-link')}><BtnCom text={login} onClick={hideNav} className="w-40 text-white  px-5 py-1 border-2 bg-cyan-600 rounded-md hover:bg-cyan-700 font-semibold mb-2"/></NavLink></li>
                            }
                            {/* {useAuth ?
                                :
                                null
                            } */}
                        </ul>
                    </div>

                    : null
            }

        </nav>

    )
}

export default Navbar