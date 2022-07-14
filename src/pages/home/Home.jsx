import React from 'react'
import { useContext } from 'react'
import { AuthContext } from '../../context/AuthContext'
import { logout } from '../../authenticatedApiCalls'
import "./home.css"

export default function Home() {
    const profileImg = process.env.REACT_APP_PROFILE_IMAGE_FOLDER
    const { state, dispatch } = useContext(AuthContext)
    console.log(state)
    const handleLogout = async(e) => {
        e.preventDefault()
        dispatch({ type: 'LOGOUT' })
        await logout(state.accessToken)
    }
  return (
    <div className='homeWrapper'>
      <div className="homeContainer">
        <img className='homeProfileImg' src={profileImg + state.user.profilePicture} alt="" />
        <h1 className='homeGreeting'>Welcome {state.user.username}</h1>
        <p className='homeEmail'>Your email is {state.user.email}</p>
        <button className='homeLogoutButton' onClick={handleLogout}>Logout</button>
      </div>
    </div>
  )
}
