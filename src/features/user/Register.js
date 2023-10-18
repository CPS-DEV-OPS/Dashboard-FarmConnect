


import {useState, useRef} from 'react'
import {Link} from 'react-router-dom'
import LandingIntro from './LandingIntro'
import ErrorText from  '../../components/Typography/ErrorText'
import InputText from '../../components/Input/InputText'

import { useNavigate } from "react-router-dom";

function Register(){
    
    let navigate = useNavigate(); 
    const routeChange = () =>{ 
      let path = `additional`; 
      navigate(path);
       }
    const INITIAL_REGISTER_OBJ = {
        name : "",
        password : "",
        emailId : ""
    }

//     const [loading, setLoading] = useState(false)
//     const [errorMessage, setErrorMessage] = useState("")
//     const [registerObj, setRegisterObj] = useState(INITIAL_REGISTER_OBJ)

//     const submitForm = async (e) => {
//       e.preventDefault();
//       setErrorMessage("");

//       const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$/;
//       const isPasswordValid = passwordRegex.test(registerObj.password);
  
//       // Email format validation
//       const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
//       const isEmailValid = emailRegex.test(registerObj.email);
  
//       // Check if the email domain is allowed
//       const allowedDomains = ['gmail.com', 'yahoo.com', 'outlook.com'];
//       const emailDomain = registerObj.email.split('@')[1];
  
//       if (!isPasswordValid) {
//         setErrorMessage("Password must contain at least 8 characters, including one uppercase letter, one lowercase letter, and one number.");
//       } else if (!isEmailValid) {
//         setErrorMessage("Invalid email format. Please enter a valid email address.");
//       } else if (!allowedDomains.includes(emailDomain.toLowerCase())) {
//         setErrorMessage("Invalid email domain. Please use an email address from Gmail, Yahoo, or Outlook.");
//       } else {
//         setLoading(true);
//         try {
//           const response = await axios.post('https://localhost:7079/Auth/Register', {
//             FirstName: registerObj.FirstName,
//             email: registerObj.email,
//             password: registerObj.password,
//           });
//           console.log("Response status:", response.status); // Log the response status
//           console.log("Response data:", response.data); // Log the response data
//           if (response.status === 200) { // Check the response status code
//             const data = response.data; 
//           // localStorage.setItem("token", data.token);
//           setLoading(false);
//           window.location.href = '/app/welcome'
//         } else {
//           // Handle different HTTP status codes appropriately
//           if (response.status === 401) {
//             setErrorMessage("Invalid credentials. Please try again.");
//           } else {
//             setErrorMessage("An error occurred. Please try again.");
//           }
//           setLoading(false);
//         }
//       } catch (error) {
//         console.error("API call error:", error);
//         setErrorMessage("An error occurred. Please try again.");
//         setLoading(false);
//       }
//     }
//     };
    
//     const updateFormValue = ({ updateType, value }) => {
//       setErrorMessage("");
//       setRegisterObj({ ...registerObj, [updateType]: value });
//     };


//     return(
//         <div className="min-h-screen bg-base-200 flex items-center">
//             <div className="card mx-auto w-full max-w-5xl  shadow-xl">
//                 <div className="grid  md:grid-cols-2 grid-cols-1  bg-base-100 rounded-xl">
//                 <div className=''>
//                         <LandingIntro />
//                 </div>
//                 <div className='py-24 px-10'>
//                     <h2 className='text-2xl font-semibold mb-2 text-center'>Register</h2>
//                     <form onSubmit={submitForm}>
//                     <div>
//         <input
//           type="text"
//           placeholder="Name"
//           value={registerObj.FirstName}
//           onChange={(e) => setRegisterObj({ ...registerObj,FirstName: e.target.value })}
//         />
//         </div>
//               <div>
//         <input
//           type="text"
//           placeholder="Email"
//           value={registerObj.email}
//           onChange={(e) => setRegisterObj({ ...registerObj, email: e.target.value })}
//         />
//         </div>
//         <div>
//         <input
//           type="password"
//           placeholder="Password"
//           value={registerObj.password}
//           onChange={(e) =>setRegisterObj({ ...registerObj, password: e.target.value })}
//         />
//         </div>
                        

//                         <ErrorText styleClass="mt-8">{errorMessage}</ErrorText>
//                         <button type="submit" className={"btn mt-2 w-full  bg-green-900 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800 " + (loading ? " loading" : "")}>Register</button>

   

export default Register

