import { useState, useRef } from "react";
import { Link,  useNavigate   } from "react-router-dom";
import LandingIntro from "./LandingIntro";
import ErrorText from "../../components/Typography/ErrorText";
import InputText from "../../components/Input/InputText";

import axios from 'axios'; // Import Axios

function Login() {
  const INITIAL_LOGIN_OBJ = {
    password: "",
    email: ""
  };
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [loginObj, setLoginObj] = useState(INITIAL_LOGIN_OBJ);
  const navigate = useNavigate();


  const submitForm = async (e) => {
    e.preventDefault();
    setErrorMessage(""); // Clear any previous error messages

    // Password complexity validation
    const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$/;
    const isPasswordValid = passwordRegex.test(loginObj.password);

    // Email format validation
    const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
    const isEmailValid = emailRegex.test(loginObj.email);

    // Check if the email domain is allowed
    const allowedDomains = ['gmail.com', 'yahoo.com', 'outlook.com'];
    const emailDomain = loginObj.email.split('@')[1];

    if (!isPasswordValid) {
      setErrorMessage("Password must contain at least 8 characters, including one uppercase letter, one lowercase letter, and one number.");
    } else if (!isEmailValid) {
      setErrorMessage("Invalid email format. Please enter a valid email address.");
    } else if (!allowedDomains.includes(emailDomain.toLowerCase())) {
      setErrorMessage("Invalid email domain. Please use an email address from Gmail, Yahoo, or Outlook.");
    } else {
      setLoading(true);
      // try {
      //   const response = await axios.post("https://farmconnectbackend.azurewebsites.net/Auth/Login", {
      //     password: loginObj.password,
      //     email: loginObj.email,
      //   });
      try {
        const response = await axios.post("https://localhost:7079/Auth/Login", {
          password: loginObj.password,
          email: loginObj.email,
        });
        if (response.status === 200) { // Check the response status code
          const data = response.data; 
        // localStorage.setItem("token", data.token);
        setLoading(false);
        navigate('/app/dashboard');
      } else {
        // Handle different HTTP status codes appropriately
        if (response.status === 401) {
          setErrorMessage("Invalid credentials. Please try again.");
        } else {
          setErrorMessage("An error occurred. Please try again.");
        }
        setLoading(false);
      }
    } catch (error) {
      console.error("API call error:", error);
      setErrorMessage("An error occurred. Please try again.");
      setLoading(false);
    }
  }
  };
  
  const updateFormValue = ({ updateType, value }) => {
    setErrorMessage("");
    setLoginObj({ ...loginObj, [updateType]: value });
  };
 

  return (
    <div className="min-h-screen bg-base-200 flex items-center">
      <div className="card mx-auto w-full max-w-5xl  shadow-xl">
        <div className="grid  md:grid-cols-2 grid-cols-1  bg-base-100 rounded-xl">
          <div className="">
            <LandingIntro />
          </div>
          <div className="py-24 px-10">
            <h2 className="text-2xl font-semibold mb-2 text-center">Login</h2>
            <form onSubmit={submitForm}>
              <div>
        <input
          type="text"
          placeholder="Email"
          value={loginObj.email}
          onChange={(e) => setLoginObj({ ...loginObj, email: e.target.value })}
        />
        </div>
        <div>
        <input
          type="password"
          placeholder="Password"
          value={loginObj.password}
          onChange={(e) => setLoginObj({ ...loginObj, password: e.target.value })}
        />
        </div>
        
              <div className="text-right text-primary">
                <Link to="/forgot-password">
                  <span className="text-sm  inline-block  hover:text-primary hover:underline hover:cursor-pointer transition duration-200">
                    Forgot Password?
                  </span>
                </Link>
              </div>
              <ErrorText styleClass="mt-8">{errorMessage}</ErrorText>
              <button
                type="submit"
                className={
                  "btn mt-2 w-full  bg-green-900 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800 " +
                  (loading ? " loading" : "")
                }
              >
                Login
              </button>
              <div className="text-center mt-4">
               You Don't have an account yet?{" "}
                <Link to="/register">
                  <span className="  inline-block  hover:text-primary hover:underline hover:cursor-pointer transition duration-200">
                    Register
                  </span>
                </Link>
              </div>

            </form>
            <div className="my-5 flex items-center before:mt-0.5 before:flex-1 before:border-t before:border-neutral-300 after:mt-0.5 after:flex-1 after:border-t after:border-neutral-300">
              <p className="mx-4 mb-0 text-center font-semibold text-slate-500">
                Or
              </p>
            </div>
            <div className="flex justify-center space-x-4 mt-4">
           
             
              <button
                type="submit"
                className="  btn bg-transparent hover:bg-green-50 rounded-full"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  x="0px"
                  y="0px"
                  width="30"
                  height="30"
                  viewBox="0 0 48 48"
                >
                  <linearGradient
                    id="Ld6sqrtcxMyckEl6xeDdMa_uLWV5A9vXIPu_gr1"
                    x1="9.993"
                    x2="40.615"
                    y1="9.993"
                    y2="40.615"
                    gradientUnits="userSpaceOnUse"
                  >
                    <stop offset="0" stop-color="#2aa4f4"></stop>
                    <stop offset="1" stop-color="#007ad9"></stop>
                  </linearGradient>
                  <path
                    fill="url(#Ld6sqrtcxMyckEl6xeDdMa_uLWV5A9vXIPu_gr1)"
                    d="M24,4C12.954,4,4,12.954,4,24s8.954,20,20,20s20-8.954,20-20S35.046,4,24,4z"
                  ></path>
                  <path
                    fill="#fff"
                    d="M26.707,29.301h5.176l0.813-5.258h-5.989v-2.874c0-2.184,0.714-4.121,2.757-4.121h3.283V12.46 c-0.577-0.078-1.797-0.248-4.102-0.248c-4.814,0-7.636,2.542-7.636,8.334v3.498H16.06v5.258h4.948v14.452 C21.988,43.9,22.981,44,24,44c0.921,0,1.82-0.084,2.707-0.204V29.301z"
                  ></path>
                </svg>
              </button>
              <button
                type="submit"
                className="btn bg-transparent hover:bg-green-50 rounded-full"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  x="0px"
                  y="0px"
                  width="30"
                  height="30"
                  viewBox="0 0 48 48"
                >
                  <path
                    fill="#ff5722"
                    d="M6 6H22V22H6z"
                    transform="rotate(-180 14 14)"
                  ></path>
                  <path
                    fill="#4caf50"
                    d="M26 6H42V22H26z"
                    transform="rotate(-180 34 14)"
                  ></path>
                  <path
                    fill="#ffc107"
                    d="M26 26H42V42H26z"
                    transform="rotate(-180 34 34)"
                  ></path>
                  <path
                    fill="#03a9f4"
                    d="M6 26H22V42H6z"
                    transform="rotate(-180 14 34)"
                  ></path>
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
export default Login;

