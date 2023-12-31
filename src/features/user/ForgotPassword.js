// import { useState } from "react";
// import { Link, useNavigate } from "react-router-dom";
// import LandingIntro from "./LandingIntro";
// import ErrorText from "../../components/Typography/ErrorText";
// import InputText from "../../components/Input/InputText";
// import CheckCircleIcon from "@heroicons/react/24/solid/CheckCircleIcon";
// //import ResetPassword from './ResetPassword';
// //import ResetPasswordForm from './ResetPasswordForm';

// function ForgotPassword() {
// <<<<<<< HEAD
//     const INITIAL_USER_OBJ = {
//         emailId: "",
//     };

//     const [loading, setLoading] = useState(false);
//     const [errorMessage, setErrorMessage] = useState("");
//     const [linkSent, setLinkSent] = useState(false);
//     const [userObj, setUserObj] = useState(INITIAL_USER_OBJ);

//     const submitForm = (e) => {
//       e.preventDefault();
//       setErrorMessage("");
  
//       const email = userObj.emailId;
  
//       if (email.trim() === "") {
//           return setErrorMessage("Email Id is required! (use any value)");
//       } else {
//           setLoading(true);
  
//           // Make an API request to send the reset link
//           fetch(`https://localhost:7079/api/Account/forgot-password?email=${email}`, {
//               method: "POST",
//               headers: {
//                   "Content-Type": "application/json",
//               },
//               body: JSON.stringify({ email }),
//           })
//               .then((response) => response.json())
//               .then((data) => {
//                   setLoading(false);
//                   setLinkSent(true);
//               })
//               .catch((error) => {
//                   setLoading(false);
//                   setErrorMessage("link sent");
//               });
//       }
// =======
//   const INITIAL_USER_OBJ = {
//     emailId: "",
// >>>>>>> 73348edb45c34c6adc736dd0295af09c511ab505
//   };

//   const [loading, setLoading] = useState(false);
//   const [errorMessage, setErrorMessage] = useState("");
//   const [linkSent, setLinkSent] = useState(false);
//   const [userObj, setUserObj] = useState(INITIAL_USER_OBJ);
//   const navigate = useNavigate();
  

//   const submitForm = (e) => {
//     e.preventDefault();
//     setErrorMessage("");

//     const email = userObj.emailId;

//     if (email.trim() === "") {
//       return setErrorMessage("Email Id is required! (use any value)");
//     } else {
//       setLoading(true);

//       // Make an API request to send the reset link
//       fetch(
//         `https://localhost:7079/api/Account/forgot-password?email=${email}`,
//         {
//           method: "POST",
//           headers: {
//             "Content-Type": "application/json",
//           },
//           body: JSON.stringify({ email }),
//         }
//       )
//         .then((response) => response.json())
//         .then((data) => {
//           setLoading(false);
//           setLinkSent(true);
//           setUserObj({ ...userObj, resetToken: userObj.resetToken });
//           navigate(`/reset-password?resetToken=${userObj.resetToken}`);
//         })
//         .catch((error) => {
//           setLoading(false);
//           setErrorMessage("link sent to your email");
//         });
//     }
//   };
//   const updateFormValue = ({ updateType, value }) => {
//     setErrorMessage("");
//     setUserObj({ ...userObj, [updateType]: value });
//   };

//   return (
//     <div className="min-h-screen bg-base-200 flex items-center">
//       <div className="card mx-auto w-full max-w-5xl  shadow-xl">
//         <div className="grid  md:grid-cols-2 grid-cols-1  bg-base-100 rounded-xl">
//           <div className="">
//             <LandingIntro />
//           </div>
//           <div className="py-24 px-10">
//             <h2 className="text-2xl font-semibold mb-2 text-center">
//               Forgot Password
//             </h2>

//             {linkSent ? (
//               <>
//                 <div className="text-center mt-8">
//                   <CheckCircleIcon className="inline-block w-32 text-success" />
//                 </div>
//                 <p className="my-4 text-xl font-bold text-center">Link Sent</p>
//                 <p className="mt-4 mb-8 font-semibold text-center">
//                   Check your email to reset password
//                 </p>
//                 {/* <div className="text-center mt-4">
//                   <Link to={`/reset-password`}>Reset Password</Link>
//                 </div> */}

//                 <div className="text-center mt-4">
//                   {/* Add the Link component here with the reset token */}
//                   <Link to={`/reset-password?resetToken=${userObj.resetToken}`}>
//                     Reset Password
//                   </Link>
//                 </div>
//               </>
//             ) : (
//               <>
//                 <p className="my-8 font-semibold text-center">
//                   We will send a password reset link to your email.
//                 </p>
//                 <form onSubmit={(e) => submitForm(e)}>
//                   <div className="mb-4">
//                     <InputText
//                       type="emailId"
//                       defaultValue={userObj.emailId}
//                       updateType="emailId"
//                       containerStyle="mt-4"
//                       labelTitle="Email Id"
//                       updateFormValue={updateFormValue}
//                     />
//                   </div>
//                   <ErrorText styleClass="mt-12">{errorMessage}</ErrorText>
//                   <button
//                     type="submit"
//                     className={
//                       "btn mt-2 w-full btn-primary" +
//                       (loading ? " loading" : "")
//                     }
//                   >
//                     Send Reset Link
//                   </button>
//                   <div className="text-center mt-4">
//                     Don't have an account yet?{" "}
//                     <Link to="/register">
//                       <button className="  inline-block  hover:text-primary hover:underline hover:cursor-pointer transition duration-200">
//                         Register
//                       </button>
//                     </Link>
//                   </div>
//                 </form>
//               </>
//             )}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default ForgotPassword;
