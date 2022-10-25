//14 useContext
import React, { useContext } from 'react'
//28
import { signOut } from 'firebase/auth';

//5
import { Link, useNavigate } from "react-router-dom";

//15
import { UserContext } from '../context/userContext';
import { auth } from '../firebase-config';
 

const Navbar = () => {
  const { toggleModals }  = useContext(UserContext);

  //29
  const navigate = useNavigate();

  const logOut = async () => {
    try {
      await signOut(auth)
      navigate('/')
    } catch {
      alert("please check your nonnexion ! ")
    }
  }

  return (
    <div className="nav navbar navbar-light bg-light px-4">
      <Link to="/" className='navbar-brand'>
         AuthJs
      </Link>

      <div>
         <button className="btn btn-primary" onClick={()=>toggleModals("signUp")}> Sign Up </button>
         <button className="btn btn-primary ms-2" onClick={()=> toggleModals("signIn")}> Sign In </button>
         <button className="btn btn-danger"
         onClick={ logOut }> 
         Log Out </button>
      </div>
    </div>
  )
}

export default Navbar