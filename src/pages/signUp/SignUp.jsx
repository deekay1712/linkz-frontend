import React from 'react'
import "./signUp.css"
import { useRef, useState } from 'react'
import {singUpCall, verifyOtpCall, uploadImageCall, resendOtpCall} from '../../apiCalls'
import {Link, useNavigate} from 'react-router-dom'


// import { useHistory } from "react-router-dom";

export default function SignUp() {
    // let history = useHistory();
    const PF = process.env.REACT_APP_PUBLIC_FOLDER;
    const emailRef = useRef()
    const usernameRef = useRef()
    const passwordRef = useRef()
    const confirmPasswordRef = useRef()
    const otpRef = useRef()
    const [userId, setUserId] = useState('')
    const [isSignedUp, setIsSignedUp] = useState(false)
    const [image, setImage] = useState({ preview: '', data: '' })
    const navigate = useNavigate()
    const handleSubmit = async(e) => {
        e.preventDefault()
        let res, imgRes;
        let formdata = new FormData()
        const email = emailRef.current.value
        const username = usernameRef.current.value
        const password = passwordRef.current.value
        const confirmPassword = confirmPasswordRef.current.value
        if (password === confirmPassword) {
            res = await singUpCall({username, email, password})
            formdata.append('image', image.data)
            imgRes = await uploadImageCall(formdata, res.userId)
            if (res) {
                setUserId(res.userId)
                setIsSignedUp(true)
            }
            
        } else {
            alert("Passwords do not match")
        }  
    }
    const handleOtpSubmit = async(e) => {
        e.preventDefault()
        const otp = otpRef.current.value
        const res = await verifyOtpCall(otp, userId)
        if(res){
            navigate('/login')
        } 
    }

    const handleFileChange = (e) => {
        const img = {
            preview: URL.createObjectURL(e.target.files[0]),
            data: e.target.files[0]
        }
        setImage(img)
        console.log(img)
    }

  return (
    <div className='authFormWrapper'>
        <div className='authFormContainer'>
            <div className="authFormContainerLeft">
                <img src={PF+"formImg.jpg"} alt="" />
            </div>
            {/* <div className="authFormContainerMiddle"></div> */}
            <div className="authFormContainerRight">
                {image.preview && <img className='authFormImagePreview' src={image.preview} alt='preview' width='100' height='100'/>}
                {!isSignedUp && <form className='authForm' onSubmit={handleSubmit}>
                    {/* <label className='authFormLabel' >Profile Picture</label> */}
                    <input className='authFormInput' id='authFormFileInput' type='file' accept="image/*" onChange={handleFileChange} />
                    {/* <label className='authFormLabel'>User Name</label> */}
                    <input className='authFormInput' type='text' placeholder='Username' ref={usernameRef} />
                    {/* <label className='authFormLabel'>Email</label> */}
                    <input className='authFormInput' type='email' placeholder='Email' ref={emailRef} />
                    {/* <label className='authFormLabel'>Password</label> */}
                    <input className='authFormInput' type='password' placeholder='Password' ref={passwordRef} />
                    {/* <label className='authFormLabel'>Confirm Password</label> */}
                    <input className='authFormInput' type='password' placeholder='Confirm Password' ref={confirmPasswordRef} />
                    <button className='authFormButton' type='submit'>Sign Up</button>
                </form>}
                {isSignedUp && <form className='authForm' onSubmit={handleOtpSubmit}>
                    <label className='authFormLabel'>OTP</label>
                    <input className='authFormInput' type='text' ref={otpRef} />
                    <button className='authFormButton' type='submit'>Verify OTP</button>
                    <button className='authFormButton' onClick={() => resendOtpCall(userId)}>Resend OTP</button>
                </form>}
                <p>Already have an account?
                    <Link to='/login'> Login</Link>
                </p>
            </div>
        </div>
    </div>
  )
}
