import React, { useState, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { Link, useNavigate, NavLink, useLocation } from 'react-router-dom'
import decode from 'jwt-decode'
import Auth from './Auth'
import { AUTH, LOG_OUT } from '../actions/actionTypes'

function Header() {
    const [showmodal, setshowmodal] = useState(false)
    const [user, setUser] = useState(JSON.parse(localStorage.getItem('profile')))
    const [searchValue, setsearchValue] = useState("")

    const dispatch = useDispatch()
    const location = useLocation()
    const navigate = useNavigate()

    const toggleModal = () => {
        setshowmodal((showmodal) => !showmodal)
    }
    const logout = () => {
        dispatch({ type: LOG_OUT })
        setUser(null)
    }
    useEffect(() => {
        const token = user?.token
        if (token) {
            const decodedToken = decode(token);

            if (decodedToken.exp * 1000 < new Date().getTime())
                logout();
            else {
                dispatch({ type: AUTH, payload: user })
            }
        }
        setUser(JSON.parse(localStorage.getItem('profile')))
    }, [showmodal, location])

    const searchHandler = (e) => {
        const { value } = e.target
        setsearchValue(value)
    }
    const handleKeyPress = (e) => {
        if (e.keyCode === 13) {
            e.preventDefault()
            navigate(`/search?searchValue=${searchValue}`)
        }
    }
    return (
        <>
            <nav className="navbar navbar-expand-lg navbar-dark bg-danger">
                <div className="container-fluid">
                    <NavLink className="navbar-brand fs-4" to='/'>Open News</NavLink>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                            <li className="nav-item fs-5">
                                <NavLink className="nav-link" aria-current="page" to="/">Home</NavLink>
                            </li>
                            <li className="nav-item fs-5">
                                <NavLink className="nav-link" to="/news">News</NavLink>
                            </li>
                            <li className="nav-item fs-5">
                                <NavLink className="nav-link" to="/add-article">Add Article</NavLink>
                            </li>
                            {user ? <li className="nav-item fs-5">
                                <NavLink className="nav-link" to={`/profile/${user.user._id}`}>My Profile</NavLink>
                            </li> : ""
                            }
                        </ul>
                        <form className="d-flex ">
                            <input onKeyDown={handleKeyPress} className="form-control me-2" name="search" value={searchValue} type="search" placeholder="Search" onChange={searchHandler} aria-label="Search" />
                            <Link to={`/search?searchValue=${searchValue}`} className="btn btn-success" type="submit">Search</Link>
                        </form>
                        <ul className="navbar-nav ms-lg-2 mt-2 mt-lg-0 mb-2 mb-lg-0">
                            <li className="nav-item">
                                {user ? <button className='btn btn-primary' onClick={logout}>Log Out</button>
                                    : <button className='btn btn-primary' onClick={toggleModal}>Sign In</button>}
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
            {
                showmodal ? <Auth toggleModal={toggleModal} /> : ""
            }
        </>

    )
}

export default Header
