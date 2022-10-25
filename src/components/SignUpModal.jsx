//10 useContext
import React, { useContext, useRef, useState } from 'react';

//26
import { useNavigate } from 'react-router-dom';

//11
import { UserContext } from "../context/userContext";

const SignUpModal = () => {
   //27 
   const navigate = useNavigate();

   //12
   //20 add signUp in destruct below
   const {  modalState, toggleModals, signUp } = useContext(UserContext);

   //18
   const [validation, setValidation] = useState("");

    //16
   const inputs = useRef([]);

    //22
   const formRef = useRef();

   const addInputs = el => {
      if (el && !inputs.current.includes(el)) {
         inputs.current.push(el)
      }
   }

   //17
   const handleForm = async (e)=> {
      e.preventDefault();
      if((inputs.current[1].value.length || inputs.current[2].value.length )< 6) {
         setValidation("6 chars min");
         return
      }
      else if(inputs.current[1].value !== inputs.current[2].value) {
         setValidation("pwd do not match");
         return
      }

      //21
      try {
         const cred = await signUp(
            inputs.current[0].value,
            inputs.current[1].value,
         )
         formRef.current.reset();
         setValidation("");
         navigate("/private/private-home");
         toggleModals("close");
      }
      catch (err) {
         console.log(err)
         if(err.code === "auth/invalid-email") {
            setValidation("Email format invalid")
         }
         if (err.code === "auth/email-already-in-use") {
            setValidation("Email already used")
         }
      }
   }
 
   const closeModal = () => {
      setValidation("");
      toggleModals("close")
   }
  return (
    <>
    {/* //13 if true show popup */}
    { modalState.signUpModal && 
      ( <div className="position-fixed top-0 vw-100 vh-100"
         >
            <div className="w-100 h-100 bg-dark bg-opacity-75"
            onClick={ closeModal }>
            </div>
            <div className="position-absolute top-50 start-50 translate-middle" style={{ minWidth: "400px" }}>
               <div className="modal-dialog">
                  <div className="modal-content bg-white p-4">
                     <div className="modal-header">
                           <h5 className="modal-title">SignUp</h5>
                           <button className="btn-close" onClick={ closeModal}></button>
                     </div>

                     <div className="modal-body">
                        <form ref={formRef} action="" className="sign-up-form" onSubmit={handleForm}>
                           <div className="mb-3">
                              <label className='form-label' htmlFor="signUpEmail">Emaim address</label>
                              <input type="email"
                                 ref={addInputs}
                                 name='email' 
                                 required
                                 className='form-control'
                                 id="signUpEmail"
                                 />
                           </div>
                           <div className="mb-3">
                              <label className='form-label' htmlFor="signUpPwd">Password</label>
                              <input type="password"
                                 ref={addInputs}
                                 name='pwd' 
                                 required
                                 className='form-control'
                                 id="signUpPwd"
                                 />
                           </div>
                           <div className="mb-3">
                              <label className='form-label' htmlFor="repeatPwd">Repeat password</label>
                              <input type="password"
                                 ref={addInputs}
                                 name='pwd' 
                                 required
                                 className='form-control'
                                 id="repeatPwd"
                                 />
                                 <p className="text-danger mt-1"> { validation }</p>
                           </div>

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

export default SignUpModal