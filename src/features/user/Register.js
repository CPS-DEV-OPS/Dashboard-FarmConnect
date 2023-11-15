import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import LandingIntro from "./LandingIntro";
import ErrorText from "../../components/Typography/ErrorText";

const INITIAL_REGISTER_OBJ = {
  firstName: "",
  password: "",
  email: "",
  confirmPassword: "",
  Role: "",
  phoneNumber: "",
  dob: "",
  county: "",
  gpsLocation: "",
};

function Register() {
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [registerObj, setRegisterObj] = useState(INITIAL_REGISTER_OBJ);
  const [selectedOption, setSelectedOption] = useState("Farmer");
  const [showForm, setShowForm] = useState(false);
  const navigate = useNavigate();
  // const [email, setEmail] = useState("");

  const handleOptionChange = (event) => {
    setSelectedOption(event.target.value);
    setShowForm(event.target.value === "Farmer"); // Display the form when 'Farmer' is selected
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage("");

    try {
      const response = await fetch("https://localhost:7079/Auth/Register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          firstName: registerObj.firstName,
          password: registerObj.password,
          email: registerObj.email,
          confirmPassword: registerObj.confirmPassword,
          Role: registerObj.Role,
          phoneNumber: registerObj.phoneNumber,
          dob: registerObj.dob,
          county: registerObj.county,
          gpsLocation: registerObj.gpsLocation,
        }),
      });

      // if (response.status === 201) {
      if (response.ok) {
        const registrationResponse = await response.json();
        const { registrationId } = registrationResponse;

        // Store the registrationId in localStorage
        localStorage.setItem("registrationId", registrationId);
        setLoading(false);
        // localStorage.setItem("registrationId", registrationId);

        // Check if the selected option is 'Farmer' before redirecting
        if (selectedOption === "Farmer") {
          // Navigate to the farmer registration form page
          navigate("/additional"); // redirects you to the additional form
        } else {
          // For other options, you can redirect to the welcome page or handle it as needed
          window.location.href = "/app/welcome";
        }
      } else if (response.status === 401) {
        setErrorMessage("Invalid credentials. Please try again.");
      } else {
        setErrorMessage("An error occurred. Please try again.");
      }
    } catch (error) {
      console.error("API call error:", error);
      setErrorMessage("An error occurred. Please try again.");
      setLoading(false);
    }
  };

  const updateFormValue = ({ updateType, value }) => {
    setErrorMessage("");
    setRegisterObj({ ...registerObj, [updateType]: value });
  };

  return (
    <div className="min-h-screen bg-base-200 flex items-center">
      <div className="card mx-auto w-full max-w-5xl  shadow-xl">
        <div className="grid  md:grid-cols-2 grid-cols-1  bg-base-100 rounded-xl">
          <div className="">
            <LandingIntro />
          </div>
          <div className="py-24 px-10">
            <h2 className="text-2xl font-semibold mb-2 text-center">
              Register
            </h2>
            <form onSubmit={handleSubmit}>
              <div>
                <input
                  type="text"
                  placeholder="Name"
                  value={registerObj.firstName}
                  onChange={(e) =>
                    setRegisterObj({
                      ...registerObj,
                      firstName: e.target.value,
                    })
                  }
                />
              </div>
              <div>
                <input
                  type="text"
                  placeholder="Email"
                  value={registerObj.email}
                  onChange={(e) =>
                    setRegisterObj({ ...registerObj, email: e.target.value })
                  }
                />
              </div>
              <div>
                <input
                  type="password"
                  placeholder="Password"
                  value={registerObj.password}
                  onChange={(e) =>
                    setRegisterObj({ ...registerObj, password: e.target.value })
                  }
                />
              </div>

              <div>
                <input
                  type="password"
                  placeholder="confirmPassword."
                  value={registerObj.confirmPassword}
                  onChange={(e) =>
                    setRegisterObj({
                      ...registerObj,
                      confirmPassword: e.target.value,
                    })
                  }
                />
              </div>

              <div className="flex justify-center space-x-4 mb-4">
                <label className="block">
                  <input
                    type="radio"
                    value="Farmer"
                    checked={selectedOption === "Farmer"}
                    onChange={handleOptionChange}
                  />
                  <span className="ml-2">Farmer</span>
                </label>

                <label className="block">
                  <input
                    type="radio"
                    value="Buyer"
                    checked={selectedOption === "Buyer"}
                    onChange={handleOptionChange}
                  />
                  <span className="ml-2">Buyer</span>
                </label>

                <label className="block">
                  <input
                    type="radio"
                    value="Transporter"
                    checked={selectedOption === "Transporter"}
                    onChange={handleOptionChange}
                  />
                  <span className="ml-2">Transporter</span>
                </label>
              </div>

              <ErrorText styleClass="mt-8">{errorMessage}</ErrorText>
              <button
                type="submit"
                className={
                  "btn mt-2 w-full  bg-green-900 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800 " +
                  (loading ? " loading" : "")
                }
              >
                Register
              </button>

              <div className="text-center mt-4">
                Already have an account?{" "}
                <Link to="/login">
                  <span className="  inline-block  hover:text-primary hover:underline hover:cursor-pointer transition duration-200">
                    Login
                  </span>
                </Link>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Register;
