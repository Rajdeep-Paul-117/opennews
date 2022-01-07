import React, { useState, useEffect } from 'react'
import { GoogleLogin } from 'react-google-login'
import { useDispatch, useSelector } from 'react-redux'

import { signIn, signUp, googleLogIn } from '../actions/auth'
import { RESET } from '../actions/actionTypes'

function Auth(props) {
    const initialState = { name: "", email: "", password: "" }
    const [isSignup, setisSignup] = useState(false)
    const [formData, setformData] = useState(initialState)

    const dispatch = useDispatch()

    const message = useSelector(state => state.info)


    const handleInputChange = (e) => {
        if (message.errorMessage)
            dispatch({ type: RESET })
        const { name, value } = e.target
        setformData({ ...formData, [name]: value })
    }
    const handleSignUp = () => {
        if (message.errorMessage)
            dispatch({ type: RESET })
        setisSignup((isSignup) => !isSignup)
    }
    const submitForm = (e) => {
        e.preventDefault();
        if (isSignup) {
            dispatch(signUp(formData))
        }
        else {
            dispatch(signIn(formData))
        }
    }
    useEffect(() => {
        if (message.successMessage) {
            dispatch({ type: RESET })
            props.toggleModal()
        }
    }, [dispatch, props, message.successMessage])

    const googleSuccess = async (res) => {
        dispatch(googleLogIn(res))
    }
    const googleError = (e) => {
        console.log(e)
    }
    return (
        <div className="modal show fade border" style={{ display: "block", backgroundColor: "rgba(0,0,0,0.5)" }}>
            <div className="modal-dialog modal-dialog-centered  ">
                <div className="modal-content">
                    <div className="modal-header border-0">
                        <p className="modal-title text-center text-danger fw-bold fs-2 ps-3 w-100 fst-italic" >Sign {isSignup ? "Up" : "In"}</p>
                        <button type="button" className="btn-close" onClick={props.toggleModal}></button>
                    </div>
                    <div className="modal-body">
                        {message.errorMessage ? <div className="alert alert-danger d-flex align-items-center" role="alert">
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" className="bi bi-exclamation-triangle-fill flex-shrink-0 me-2" viewBox="0 0 16 16" role="img" aria-label="Warning:">
                                <path d="M8.982 1.566a1.13 1.13 0 0 0-1.96 0L.165 13.233c-.457.778.091 1.767.98 1.767h13.713c.889 0 1.438-.99.98-1.767L8.982 1.566zM8 5c.535 0 .954.462.9.995l-.35 3.507a.552.552 0 0 1-1.1 0L7.1 5.995A.905.905 0 0 1 8 5zm.002 6a1 1 0 1 1 0 2 1 1 0 0 1 0-2z" />
                            </svg>
                            <div>
                                {message.errorMessage}
                            </div>
                        </div> : ""}
                        <form onSubmit={submitForm}>
                            {isSignup ? <div className="form-floating mb-3">
                                <input required type="text" className="form-control" placeholder="Name" onChange={handleInputChange} name='name' value={formData.name} />
                                <label >Name</label>
                            </div> : ""}
                            <div className="form-floating mb-3">
                                <input required type="email" className="form-control" placeholder="name@example.com" name='email' value={formData.email} onChange={handleInputChange} />
                                <label >Email address</label>
                            </div>
                            <div className="form-floating">
                                <input required type="password" className="form-control" placeholder="Password" name="password" value={formData.password} onChange={handleInputChange} autoComplete="on" />
                                <label >Password</label>
                            </div>
                            <button type="submit" className='mt-2 w-100 btn btn-danger'>Sign {isSignup ? "Up" : "In"}</button>
                        </form>
                        <GoogleLogin
                            clientId='524048269211-6bevbl525dhcn5u1m8fjjotla8despd3.apps.googleusercontent.com'
                            render={(renderProps) => (
                                <button onClick={renderProps.onClick} disabled={renderProps.disabled} className='mt-2 w-100 btn btn-danger'>Sign In with Google</button>
                            )}
                            onSuccess={googleSuccess}
                            onFailure={googleError}
                            cookiePolicy="single_host_origin"
                        />

                        <button className='mt-2 btn text-primary' onClick={handleSignUp}>{isSignup ? "Already have an account? Sign In instead" : "Don't have account? Sign up instead"}</button>
                    </div>
                    <div className="modal-footer border-0">
                    </div>
                </div>
            </div>
        </div >
    )
}

export default Auth
