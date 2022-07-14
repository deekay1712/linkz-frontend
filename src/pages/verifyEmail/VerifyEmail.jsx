import React from 'react'
import { useRef, useEffect } from 'react'
import { verifyOtpCall, resendOtpCall } from '../../apiCalls'
import {Link, useParams, useNavigate} from 'react-router-dom'


// import { useHistory } from "react-router-dom";

export default function VerifyEmail() {
    // let history = useHistory();
    const PF = process.env.REACT_APP_PUBLIC_FOLDER;
    const otpRef = useRef()
    const userId = useParams().id
    const navigate = useNavigate()

    useEffect(() => {
        const resendOtp = async() => {
            await resendOtpCall(userId)
            console.log('resendOtpCall')
        }
        resendOtp()
    }, [])

    const handleOtpSubmit = async(e) => {
        e.preventDefault()
        const otp = otpRef.current.value
        const res = await verifyOtpCall(otp, userId)
        if(res){    
            navigate('/login')
        }
    }


  return (
    <div className='authFormWrapper'>
        <div className='authFormContainer'>
            <div className="authFormContainerLeft">
                <img src={PF+"formImg.jpg"} alt="" />
            </div>
            <div className="authFormContainerRight">
                <h2 className='authFormHeading'>Verify yourself !</h2>
                <form className='authForm' onSubmit={handleOtpSubmit}>
                    <input className='authFormInput' type='text' placeholder='Enter OTP' ref={otpRef} />
                    <button className='authFormButton' type='submit'>Verify OTP</button>
                </form>
            </div>
        </div>
    </div>
  )
}
