//33
import React, { useContext, useRef, useState } from 'react';

import { useNavigate } from 'react-router-dom';

import { UserContext } from "../context/userContext";

const SignInModal = () => {
   const navigate = useNavigate();

   const {  modalState, toggleModals, signIn } = useContext(UserContext);

   const [validation, setValidation] = useState("");

   const inputs = useRef([]);

   const formRef = useRef();

   const addInputs = el => {
      if (el && !inputs.current.includes(el)) {
         inputs.current.push(el)
      }
   }

   const handleForm = async (e)=> {
      e.preventDefault();
      try {
         const cred = await signIn(
            inputs.current[0].value,
            inputs.current[1].value,
         )
         formRef.current.reset();
         setValidation("");
         navigate("/private/private-home");
         toggleModals("close");
      }
      catch (err) {
         // console.log(err)
         if(err.code === "auth/wrong-password") {
            setValidation("Wrong password")
         }
         if (err.code === "auth/user-not-found") {
            setValidation("Email does not exist")
         }
      }
   }
 
   const closeModal = () => {
      setValidation("");
      toggleModals("close")
   }
  return (
    <>
    { modalState.signInModal && 
      ( <div className="position-fixed top-0 vw-100 vh-100"
         >
            <div className="w-100 h-100 bg-dark bg-opacity-75"
            onClick={ closeModal }>
            </div>
            <div className="position-absolute top-50 start-50 translate-middle" style={{ minWidth: "400px" }}>
               <div className="modal-dialog">
                  <div className="modal-content bg-white p-4">
                     <div className="modal-header">
                           <h5 className="modal-title">SignIn</h5>
                           <button className="btn-close" onClick={ closeModal}></button>
                     </div>

                     <div className="modal-body">
                        <form ref={formRef} action="" className="sign-in-form" onSubmit={handleForm}>
                           <div className="mb-3">
                              <label className='form-label' htmlFor="signInEmail">Email address</label>
                              <input type="email"
                                 ref={addInputs}
                                 name='email' 
                                 required
                                 className='form-control'
                                 id="signInEmail"
                                 />
                           </div>
                           <div className="mb-3">
                              <label className='form-label' htmlFor="signInPwd">Password</label>
                              <input type="password"
                                 ref={addInputs}
                                 name='pwd' 
                                 required
                                 className='form-control'
                                 id="signInPwd"
                                 />
                           </div>

                           <p className="text-danger mt-1"> { validation }</p>
                           <button className="btn btn-primary"> Submit </button>
                        </form>
                     </div>
                  </div>
               </div>
            </div>
         </div>
      )}
    </>
  )
}

export default SignInModal