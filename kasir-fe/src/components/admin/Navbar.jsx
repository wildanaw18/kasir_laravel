//import React
import React, { useState, useEffect } from 'react'

//import Link from react router dom
import { Link, useNavigate } from 'react-router-dom'

//import API
import Api from '../../services/Api'

//import js cookie
import Cookies from 'js-cookie'

//import toast
import toast from 'react-hot-toast'
import { PiLockKeyOpenBold } from 'react-icons/pi'
import { MdOutlinePassword } from 'react-icons/md'

export default function navbar() {
    //state toggle
    const [sidebarToggle, setSidebarToggle] = useState(false)
    //get data user from cookies
    const user = JSON.parse(Cookies.get('user'))
    //function toggle hanlder
    const sidebarToggleHandler = (e) => {
        e.preventDefault()

        if (sidebarToggle) {
            //add class on body
            document.body.classList.add('sb-sidenav-toggled')

            //set state "sidebarToggle" to true
            setSidebarToggle(false)
        } else {
            //remove class on body
            document.body.classList.remove('sb-sidenav-toggled')

            //set state "sidebarToggle" to false
            setSidebarToggle(true)
        }
    }
    //useEffect
    useEffect(() => {
        //call method "fetchdata"
        if (sidebarToggle || location.pathname.includes('/admin/transactions')) {
            //add class on body
            document.body.classList.add('sb-sidenav-toggled')

            //set state "sidebarToggle" to true
            setSidebarToggle(true)
        } else {
            //remove class on body
            document.body.classList.remove('sb-sidenav-toggled')

            //set state "sidebarToggle" to false
            setSidebarToggle(true)
        }
    }, [])
    //navigate
    const navigate = useNavigate()

    //method logout
    const logout = async (e) => {
        e.preventDefault()

        //fetch to rest api for logout
        await Api.post('/logout').then(() => {
            //remove user from cookies
            Cookies.remove('user')

            //remove token from cookies
            Cookies.remove('token')

            //remove permissions from cookies
            Cookies.remove('permissions')

            //show toast
            toast.success('Logout Successfully!', {
                position: 'top-right',
                duration: 4000,
            })

            //redirect to login page
            navigate('/login')
        })
    }

    return (
        <nav className="sb-topnav navbar navbar-expand navbar-dark bg-green shadow-sm fixed-top" style={{ paddingLeft: 0, height: '56px', zIndex: '1039' }}>
            <a className="navbar-brand ps-3 fw-bold" href="index.html">
                Sistem Kasir
            </a>
            <button className="btn btn-link btn-sm order-1 order-lg-0 me-4 me-lg-0" id="sidebarToggle" onClick={sidebarToggleHandler} href="#!">
                <i className="fas fa-bars"></i>
            </button>

            <form className="d-none d-md-inline-block form-inline ms-auto me-0 me-md-3 my-2 my-md-0"></form>
            <ul className="navbar-nav ms-auto ms-md-0 me-3 me-lg-4">
                <li className="nav-item dropdown">
                    <a className="nav-link dropdown-toggle" id="navbarDropdown" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                        <i className="fas fa-user fa-fw"></i>
                    </a>
                    <ul className="dropdown-menu dropdown-menu-end" aria-labelledby="navbarDropdown">
                        <li>
                            <Link className="dropdown-item" onClick={logout}>
                                <PiLockKeyOpenBold size={'1.5em'} className="me-2" />
                                Logout
                            </Link>
                            <Link className="dropdown-item" to={`/admin/users/edit-password/${user.id}`}>
                                <MdOutlinePassword size={'1.5em'} className="me-2" />
                                Change Password
                            </Link>
                        </li>
                    </ul>
                </li>
            </ul>
        </nav>
    )
}
