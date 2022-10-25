import React, { useContext } from 'react';

//30
import { UserContext } from '../context/userContext';


const Home = () => {

   //31
   const { currentUser } = useContext(UserContext);
   console.log("first: ", currentUser)
  return (
    <div>
      <h1 className='display-1 text-white'> 
      { currentUser ? "Yoo mina" : "Yo, Sign In or Sign Up !"}
         
      </h1>
    </div>
  )
}

export default Home