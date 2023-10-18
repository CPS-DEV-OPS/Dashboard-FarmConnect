// import { useState } from 'react';
// import { Link } from 'react-router-dom';
// import LandingIntro from './LandingIntro';
// import ErrorText from '../../components/Typography/ErrorText';
// import InputText from '../../components/Input/InputText';
// import CheckCircleIcon from '@heroicons/react/24/solid/CheckCircleIcon';

import React from 'react';
//import Form from '../../components/common/Elements/Form';
import styles from './PasswordResetLink.module.scss';
import Joi from "joi-browser";
import { connect } from "react-redux";
//import { sendResetLink, resendPasswordResetEmail } from '../../store/feature/accountService';
import { isEmpty } from '../../common/utils';
//import PageButton from '../../components/common/Elements/PageButton';

class PasswordResetLink extends Form {
    constructor(props) {
        super(props);
        this.state = {
            data: {
                email: "",
            },
            errors: {},
        };
    }

    //data validation schema
    schema = {
        email: Joi.string()
            .required()
            .regex(
                /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9]))\.){3}(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9])|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/
            )
            .label("Email")
            .error(() => {
                return {
                    message: "A valid email address is required.",
                };
            })
    };

    doSubmit = (e) => {
        this.handleSubmit(e);

        this.props.sendResetLink(
            this.state.data.email
        );
    }
    render() {
        return (
            <div className={styles.PasswordResetLink}>
                {
                    (isEmpty(this.props.membership) ||
                        isEmpty(this.props.membership.user) ||
                        (!this.props.membership.user.passwordResetLinkSent)) &&
                    <div>
                        <div className={styles.header}>
                            <h2>
                                Change Password
                            </h2>
                        </div>
                        <p>Please enter your email address. We will send you an email to reset your password.</p>
                        <form onSubmit={this.doSubmit}>
                            {this.renderInput("email", "Email", styles.fieldSet)}

                            {this.renderSubmitButton("Send Reset Link")}
                        </form>
                    </div>
                }
                {(this.props.membership.user && this.props.membership.user.passwordResetLinkSent) && <div>
                    <div className={styles.header}>
                        <h2>
                            Change Password
                        </h2>
                    </div>
                    <p>If we found the account associated with this email, you would receive an email soon. Please check your inbox and spam folders.</p>
                    <PageButton
                        variant="contained"
                        color="blue"
                        onClick={() => this.props.resendPasswordResetEmail()}
                    >
                        Resend Password Reset Email
                    </PageButton>

                </div>}
            </div >
        );
    }
}

const mapStateToProps = (state) => ({
    membership: state.entities.accounts.membership
});

const mapDispatchToProps = (dispatch) => ({
    sendResetLink: (email) => {
        dispatch(sendResetLink(email));
    },
    resendPasswordResetEmail: () => {
        dispatch(resendPasswordResetEmail());
    }
});

export default connect(mapStateToProps, mapDispatchToProps)(PasswordResetLink);

// function ForgotPassword() {
//     const INITIAL_USER_OBJ = {
//         emailId: "",
//     };

//     const [loading, setLoading] = useState(false);
//     const [errorMessage, setErrorMessage] = useState("");
//     const [linkSent, setLinkSent] = useState(false);
//     const [userObj, setUserObj] = useState(INITIAL_USER_OBJ);

//     const submitForm = (e) => {
//         e.preventDefault();
//         setErrorMessage("");

//         if (userObj.emailId.trim() === "") {
//             return setErrorMessage("Email Id is required! (use any value)");
//         } else {
//             setLoading(true);

//             // Make an API request to send the reset link
//             fetch("https://farmconnectbackend.azurewebsites.net/Auth/reset-password", {
//                 method: "POST",
//                 headers: {
//                     "Content-Type": "application/json",
//                 },
//                 body: JSON.stringify({ email: userObj.emailId }),
//             })
//                 .then((response) => response.json())
//                 .then((data) => {
//                     setLoading(false);
//                     setLinkSent(true);
//                 })
//                 .catch((error) => {
//                     setLoading(false);
//                     setErrorMessage("Error sending reset link.");
//                 });
//         }
//     };

//     const updateFormValue = ({ updateType, value }) => {
//         setErrorMessage("");
//         setUserObj({ ...userObj, [updateType]: value });
//     };

//     return (
//         <div className="min-h-screen bg-base-200 flex items-center">
//             <div className="card mx-auto w-full max-w-5xl  shadow-xl">
//                 <div className="grid  md:grid-cols-2 grid-cols-1  bg-base-100 rounded-xl">
//                     <div className="">
//                         <LandingIntro />
//                     </div>
//                     <div className="py-24 px-10">
//                         <h2 className="text-2xl font-semibold mb-2 text-center">
//                             Forgot Password
//                         </h2>

//                         {linkSent ? (
//                             <>
//                                 <div className="text-center mt-8">
//                                     <CheckCircleIcon className="inline-block w-32 text-success" />
//                                 </div>
//                                 <p className="my-4 text-xl font-bold text-center">
//                                     Link Sent
//                                 </p>
//                                 <p className="mt-4 mb-8 font-semibold text-center">
//                                     Check your email to reset password
//                                 </p>
//                                 <div className="text-center mt-4">
//                                     <Link to="/reset-password">
//                                         <button className="btn btn-block btn-primary ">
//                                             Reset Password
//                                         </button>
//                                     </Link>
//                                 </div>
//                             </>
//                         ) : 
//                             <>
//                                 <p className="my-8 font-semibold text-center">
//                                     We will send a password reset link to your email.
//                                 </p>
//                                 <form onSubmit={(e) => submitForm(e)}>
//                                     <div className="mb-4">
//                                         <InputText
//                                             type="emailId"
//                                             defaultValue={userObj.emailId}
//                                             updateType="emailId"
//                                             containerStyle="mt-4"
//                                             labelTitle="Email Id"
//                                             updateFormValue={updateFormValue}
//                                         />
//                                     </div>
//                                     <ErrorText styleClass="mt-12">
//                                         {errorMessage}
//                                     </ErrorText>
//                                     <button
//                                         type="submit"
//                                         className={
//                                             "btn mt-2 w-full btn-primary" +
//                                             (loading ? " loading" : "")
//                                         }
//                                     >
//                                         Send Reset Link
//                                     </button>
//                                     <div className="text-center mt-4">
//                                         Don't have an account yet?{" "}
//                                         <Link to="/register">
//                                             <button className="  inline-block  hover:text-primary hover:underline hover:cursor-pointer transition duration-200">
//                                                 Register
//                                             </button>
//                                         </Link>
//                                     </div>
//                                 </form>
//                             </>
//                         }
//                     </div>
//                 </div>
//             </div>
//         </div>
//     );
// }

// export default ForgotPassword;


// import {useState, useRef} from 'react'
// import {Link} from 'react-router-dom'
// import LandingIntro from './LandingIntro'
// import ErrorText from  '../../components/Typography/ErrorText'
// import InputText from '../../components/Input/InputText'
// import CheckCircleIcon  from '@heroicons/react/24/solid/CheckCircleIcon'

// function ForgotPassword(){

//     const INITIAL_USER_OBJ = {
//         emailId : ""
//     }

//     const [loading, setLoading] = useState(false)
//     const [errorMessage, setErrorMessage] = useState("")
//     const [linkSent, setLinkSent] = useState(false)
//     const [userObj, setUserObj] = useState(INITIAL_USER_OBJ)

//     const submitForm = (e) =>{
//         e.preventDefault()
//         setErrorMessage("")

//         if(userObj.emailId.trim() === "")return setErrorMessage("Email Id is required! (use any value)")
//         else{
//             setLoading(true)
//             // Call API to send password reset link
//             setLoading(false)
//             setLinkSent(true)
//         }
//     }

//     const updateFormValue = ({updateType, value}) => {
//         setErrorMessage("")
//         setUserObj({...userObj, [updateType] : value})
//     }

//     return(
//         <div className="min-h-screen bg-base-200 flex items-center">
//             <div className="card mx-auto w-full max-w-5xl  shadow-xl">
//                 <div className="grid  md:grid-cols-2 grid-cols-1  bg-base-100 rounded-xl">
//                 <div className=''>
//                         <LandingIntro />
//                 </div>
//                 <div className='py-24 px-10'>
//                     <h2 className='text-2xl font-semibold mb-2 text-center'>Forgot Password</h2>

//                     {
//                         linkSent && 
//                         <>
//                             <div className='text-center mt-8'><CheckCircleIcon className='inline-block w-32 text-success'/></div>
//                             <p className='my-4 text-xl font-bold text-center'>Link Sent</p>
//                             <p className='mt-4 mb-8 font-semibold text-center'>Check your email to reset password</p>
//                             <div className='text-center mt-4'><Link to="/login"><button className="btn btn-block btn-primary ">Login</button></Link></div>

//                         </>
//                     }

//                     {
//                         !linkSent && 
//                         <>
//                             <p className='my-8 font-semibold text-center'>We will send password reset link on your email Id</p>
//                             <form onSubmit={(e) => submitForm(e)}>

//                                 <div className="mb-4">

//                                     <InputText type="emailId" defaultValue={userObj.emailId} updateType="emailId" containerStyle="mt-4" labelTitle="Email Id" updateFormValue={updateFormValue}/>


//                                 </div>

//                                 <ErrorText styleClass="mt-12">{errorMessage}</ErrorText>
//                                 <button type="submit" className={"btn mt-2 w-full btn-primary" + (loading ? " loading" : "")}>Send Reset Link</button>

//                                 <div className='text-center mt-4'>Don't have an account yet? <Link to="/register"><button className="  inline-block  hover:text-primary hover:underline hover:cursor-pointer transition duration-200">Register</button></Link></div>
//                             </form>
//                         </>
//                     }
                    
//                 </div>
//             </div>
//             </div>
//         </div>
//     )
// }

// export default ForgotPassword