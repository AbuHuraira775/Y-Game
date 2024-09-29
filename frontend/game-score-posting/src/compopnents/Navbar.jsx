import React, { useState } from 'react'
import { Link, NavLink, Route, Routes, BrowserRouter as Router, useNavigate } from 'react-router-dom'
import { RiMenu2Fill } from "react-icons/ri";
import BtnCom from './BtnComp';
import { useAuth } from '../routers/CustomRoutes';
import { Button, Container } from '@mui/material';


function Navbar({ home, login, contact, post }) {
    const [navFlag, setNavFlag] = useState(false)
    const showNav = () => {
        setNavFlag(!navFlag)
    }
    const hideNav = () => {
        setNavFlag(!navFlag)
    }
    return (
        <nav className='nav'>
            <div className="navLogo">
                <RiMenu2Fill onClick={() => showNav()} className='menu'/>
            </div>

            {
                navFlag ?
                    <div className='toggle-nav center' >
                        <ul >
                            <li><NavLink to='/' className={({ isActive }) => (isActive ? 'active-link' : 'inactive-link')}><Button variant="outlined" onClick={hideNav}>{home}</Button></NavLink></li>
                            <li><NavLink to='/contact' className={({ isActive }) => (isActive ? 'active-link' : 'inactive-link')}><Button variant="outlined" onClick={hideNav}>{contact}</Button></NavLink></li>
                            {useAuth ?
                                <li><NavLink to='/add-post' className={({ isActive }) => (isActive ? 'active-link' : 'inactive-link')}><Button variant={post ? 'contained' : null} onClick={hideNav}>{post}</Button></NavLink></li>
                                : null
                            }
                            <li><NavLink to='/login' className={({ isActive }) => (isActive ? 'active-link' : 'inactive-link')}><Button variant={login ? "contained" : null} onClick={hideNav}>{login}</Button></NavLink></li>
                        </ul>
                    </div>

                    : null
            }

        </nav>

    )
}

export default Navbar