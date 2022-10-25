//8
import React from 'react'
import { createContext, useState, useEffect } from 'react';

 
//18
import {
   signInWithEmailAndPassword,
   createUserWithEmailAndPassword,
   onAuthStateChanged
} from 'firebase/auth';

//auth c'est pour montrer qui on est 
import {auth} from '../firebase-config'


export const UserContext = createContext()

export function UserContextProvider(props) {

   //19
   const [currentUser, setCurrentUser] = useState();
   const [loadingData, setLoadingData] = useState(true);

   const signUp = (email, pwd) => createUserWithEmailAndPassword(auth, email, pwd)

   //32
   const signIn = (email, pwd) => signInWithEmailAndPassword(auth, email, pwd)

   //Modals 
   const [modalState, setModalState] = useState({
      signUpModal: false,
      signInModal: false,
   });


   const toggleModals = modal => {
      if(modal === "signIn") {
         setModalState({
            signUpModal: false,
            signInModal: true,
         })
      }
      if(modal === "signUp") {
         setModalState({
            signUpModal: true,
            signInModal: false,
         })
      }
      if(modal === "close") {
         setModalState({
            signUpModal: false,
            signInModal: false,
         })
      }
   }


   //25
   useEffect(() => {
      const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
         setCurrentUser(currentUser);
         setLoadingData(false);
      })
   
      return unsubscribe;
   }, []);


   return (
      <UserContext.Provider value={{ modalState, toggleModals, signUp, currentUser, signIn }}>
         {!loadingData && props.children }
      </UserContext.Provider>
   )
}