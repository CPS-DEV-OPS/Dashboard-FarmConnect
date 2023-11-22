// // // import moment from "moment"
// // // import { useEffect, useState } from "react"
// // // import { useDispatch, useSelector } from "react-redux"
// // // import TitleCard from "../../../components/Cards/TitleCard"
// // // import { showNotification } from '../../common/headerSlice'
// // // import InputText from '../../../components/Input/InputText'
// // // import TextAreaInput from '../../../components/Input/TextAreaInput'
// // // import ToogleInput from '../../../components/Input/ToogleInput'

// // // function ProfileSettings(){


// // //     const dispatch = useDispatch()

// // //     // Call API to update profile settings changes
// // //     const updateProfile = () => {
// // //         dispatch(showNotification({message : "Profile Updated", status : 1}))    
// // //     }

// // //     const updateFormValue = ({updateType, value}) => {
// // //         console.log(updateType)
// // //     }

// // //     return(
// // //         <>
            
// // //             <TitleCard title="Profile Settings" topMargin="mt-2">

// // //                 <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
// // //                     <InputText labelTitle="Name" defaultValue="Name" updateFormValue={updateFormValue}/>
// // //                     <InputText labelTitle="Email Id" defaultValue="kendisharonm@gmail.com" updateFormValue={updateFormValue}/>
// // //                     <InputText labelTitle="Title" defaultValue="Farmerr" updateFormValue={updateFormValue}/>
// // //                     <InputText labelTitle="Place" defaultValue="Location" updateFormValue={updateFormValue}/>
// // //                     <TextAreaInput labelTitle="About" defaultValue="tell us what you do" updateFormValue={updateFormValue}/>
// // //                 </div>
// // //                 <div className="divider" ></div>

// // //                 <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
// // //                     <InputText labelTitle="Language" defaultValue="English" updateFormValue={updateFormValue}/>
// // //                     <InputText labelTitle="Timezone" defaultValue="IST" updateFormValue={updateFormValue}/>
// // //                     <ToogleInput updateType="syncData" labelTitle="Sync Data" defaultValue={true} updateFormValue={updateFormValue}/>
// // //                 </div>

// // //                 <div className="mt-16"><button className="btn btn-primary float-right" onClick={() => updateProfile()}>Update</button></div>
// // //             </TitleCard>
// // //         </>
// // //     )
// // // }


// // // export default ProfileSettings

// // // import React, { useState, useEffect } from 'react';
// // // import axios from 'axios';

// // // const ProfileSettings = () => {
// // //   const [userData, setUserData] = useState({
// // //     firstName: '',
// // //     email: '',
// // //     password: '',
// // //     confirmPassword: '',
// // //     role: '',
// // //     phoneNumber: '',
// // //     dob: '',
// // //     county: '',
// // //     gpsLocation: ''
// // //   });

// // //   useEffect(() => {
// // //     // Fetch user data when component mounts
// // //     axios.get('/api/user') // Replace '/api/user' with your backend endpoint
// // //       .then(response => {
// // //         setUserData(response.data);
// // //       })
// // //       .catch(error => {
// // //         console.error('Error fetching user data:', error);
// // //       });
// // //   }, []);

// // //   const handleInputChange = (e) => {
// // //     const { name, value } = e.target;
// // //     setUserData({ ...userData, [name]: value });
// // //   };

// // //   const handleSubmit = () => {
// // //     axios.put('https://localhost:7079/Auth/UpdateUser/{registrationId}', userData) // Replace '/api/user/update' with your update endpoint
// // //       .then(response => {
// // //         console.log('User data updated:', response.data);
// // //       })
// // //       .catch(error => {
// // //         console.error('Error updating user data:', error);
// // //       });
// // //   };

// // //   return (
// // //     <div>
// // //       <h2>User Profile Settings</h2>
// // //       <form onSubmit={handleSubmit}>
// // //         <label>
// // //           First Name:
// // //           <input type="text" name="firstName" value={userData.firstName} onChange={handleInputChange} />
// // //         </label>
// // //         <label>
// // //           Email:
// // //           <input type="email" name="email" value={userData.email} onChange={handleInputChange} />
// // //         </label>
// // //         <label>
// // //           Password:
// // //           <input type="password" name="password" value={userData.password} onChange={handleInputChange} />
// // //         </label>
// // //         <label>
// // //           Confirm Password:
// // //           <input type="password" name="confirmPassword" value={userData.confirmPassword} onChange={handleInputChange} />
// // //         </label>
// // //         <label>
// // //           Location:
// // //           <input type="gpsLocation" name="gpsLocation" value={userData.gpsLocation} onChange={handleInputChange} />
// // //         </label>
// // //         {/* Add input fields for other user data fields */}
// // //         <button type="submit">Update</button>
// // //       </form>
// // //     </div>
// // //   );
// // // };

// // // export default ProfileSettings;

// // // import React, { useState, useEffect } from 'react';
// // // import axios from 'axios';
// // // import Register from '../../user/Register';

// // // const UserProfile = () => {
// // //   const [userData, setUserData] = useState(null);
// // //   const registrationId = 3; // Replace with the actual registration ID

// // //   useEffect(() => {
// // //     // Fetch user data from the backend API using the registration ID
// // //     const fetchUserData = async () => {
// // //       try {
// // //         const response = await axios.get(`https://localhost:7079/Auth/UserProfile/${registrationId}`);
// // //         setUserData(response.data);
// // //       } catch (error) {
// // //         // Handle error
// // //         console.error('Error fetching user data:', error);
// // //       }
// // //     };

// // //     fetchUserData();
// // //   }, [registrationId]);

// // //   return (
// // //     <div>
// // //       {userData && (
// // //         <div>
// // //           <p>First Name: {userData.firstName}</p>
// // //           <p>Email: {userData.email}</p>
// // //           <p>Password: {userData.confirmPassword}</p>
// // //           <p>Role: {userData.role}</p>
// // //           <p>phone Number: {userData.phoneNumber}</p>
// // //           <p>Date of Birth: {userData.dob}</p>
// // //           <p>County: {userData.county}</p>
// // //           <p>GPS Location: {userData.gpsLocation}</p>
          
// // //         </div>
// // //       )}
// // //     </div>
// // //   );
// // // };

// // // export default UserProfile;

// // // import React, { useState, useEffect } from 'react';

// // // function UserProfile() {
// // //   const [userProfile, setUserProfile] = useState(null);

// // //   useEffect(() => {
// // //     // Retrieve user profile data from localStorage on component mount
// // //     const storedUserProfile = JSON.parse(localStorage.getItem('userProfile'));
// // //     setUserProfile(storedUserProfile);
// // //   }, []);

// // //   return (
// // //     <div>
// // //       <h1>User Profile</h1>
// // //       {userProfile ? (
// // //         <div>
// // //           <p>Name: {userProfile.firstName}</p>
// // //           <p>Email: {userProfile.email}</p>
// // //           {/* Display other user profile details */}
// // //         </div>
// // //       ) : (
// // //         <p>No user profile data found</p>
// // //       )}
// // //     </div>
// // //   );
// // // }

// // // export default UserProfile;

// // import React, { useState, useEffect } from 'react';
// // import axios from 'axios'; // Use axios for making API requests

// // const UserProfileSettings = ({registrationId}) => {
// //   const [userProfile, setUserProfile] = useState({
// //     firstName: '',
// //     email: '',
// //     password: '',
// //     confirmPassword: '',
// //     role: '',
// //     phoneNumber: '',
// //     dob: '',
// //     county: '',
// //     gpsLocation: '',
// //   });
  

// //   useEffect(() => {
// //     // Fetch user profile data from the backend and populate the form
// //     // Make an API call to retrieve user profile data
// //     // Use Axios or Fetch API for this purpose

// //     // Example using Axios:
// //     axios.get(`https://localhost:7079/Auth/UserProfile/${registrationId}`) // Replace with your API endpoint
// //       .then((response) => {
// //         setUserProfile(response.data); // Assuming response.data is the user profile data
// //       })
// //       .catch((error) => {
// //         console.error('Error fetching user profile:', error);
// //         // Handle error: display a message to the user or redirect to an error page
// //       });
// //   }, []);

// //   const handleInputChange = (e) => {
// //     const { name, value } = e.target;
// //     setUserProfile((prevProfile) => ({
// //       ...prevProfile,
// //       [name]: value,
// //     }));
// //   };
  

// //   const handleSubmit = (e) => {
// //     e.preventDefault();
// //     // Make an API call to update user profile
// //     axios.put(`https://localhost:7079/Auth/UpdateUser/${registrationId}`, userProfile) // Replace with your API endpoint
// //       .then((response) => {
// //         // Handle success: show a success message or perform any necessary action
// //         console.log('User profile updated successfully:', response.data);
// //       })
// //       .catch((error) => {
// //         console.error('Error updating user profile:', error);
// //         // Handle error: display a message to the user or redirect to an error page
// //       });
// //   };

// //   return (
// //     <div className="container mx-auto">
// //       <h1 className="text-2xl font-bold mb-4">User Profile Settings</h1>
// //       <form onSubmit={handleSubmit} className="max-w-md mx-auto">
// //         {/* Your form fields */}
// //         <label htmlFor="firstName">First Name:</label>
// //         <input
// //           type="text"
// //           id="firstName"
// //           name="firstName"
// //           value={userProfile.firstName}
// //           onChange={handleInputChange}
// //           className="border rounded-md px-3 py-2 mb-2 w-full"
// //         />
// //         <label htmlFor="firstName">Email:</label>
// //         <input
// //           type="text"
// //           id="email"
// //           name="email"
// //           value={userProfile.email}
// //           onChange={handleInputChange}
// //           className="border rounded-md px-3 py-2 mb-2 w-full"
// //         />
        
// //         {/* Add other input fields similarly */}
        
// //         <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded-md">
// //           Update Profile
// //         </button>
// //       </form>
// //     </div>
// //   );
// // };

// // export default UserProfileSettings;

//  import React, { useState, useEffect } from 'react';
// import axios from 'axios';

// const ProfileSettings = ({ registrationId }) => {
//   const [userProfile, setUserProfile] = useState({
//     firstName: '',
//     email: '',
//     password: '',
//     confirmPassword: '',
//     role: '',
//     phoneNumber: '',
//     dob: '',
//     county: '',
//     gpsLocation: '',
//   });

//   useEffect(() => {
//     // Fetch user profile data from the backend and populate the form
//     axios.get(`https://localhost:7079/Auth/UserProfile?registrationId=${registrationId}`) // Replace with your API endpoint
//       .then((response) => {
//         setUserProfile(response.data); // Assuming response.data is the user profile data
//       })
//       .catch((error) => {
//         console.error('Error fetching user profile:', error);
//         // Handle error: display a message to the user or redirect to an error page
//       });
//   }, [registrationId]);

//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setUserProfile((prevProfile) => ({
//       ...prevProfile,
//       [name]: value,
//     }));
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     // Make an API call to update user profile
//     axios.put(`https://localhost:7079/Auth/UpdateUser/${registrationId}`, userProfile) // Replace with your API endpoint
//       .then((response) => {
//         // Handle success: show a success message or perform any necessary action
//         console.log('User profile updated successfully:', response.data);
//       })
//       .catch((error) => {
//         console.error('Error updating user profile:', error);
//         // Handle error: display a message to the user or redirect to an error page
//       });
//   };

//   return (
//     <div className="container mx-auto">
//       <h1 className="text-2xl font-bold mb-4">User Profile Settings</h1>
//       <form onSubmit={handleSubmit} className="max-w-md mx-auto">
//         {/* Your form fields */}
//         <label htmlFor="firstName">First Name:</label>
//         <input
//           type="text"
//           id="firstName"
//           name="firstName"
//           value={userProfile.firstName}
//           onChange={handleInputChange}
//           className="border rounded-md px-3 py-2 mb-2 w-full"
//         />
//         <label htmlFor="email">Email:</label>
//         <input
//           type="text"
//           id="email"
//           name="email"
//           value={userProfile.email}
//           onChange={handleInputChange}
//           className="border rounded-md px-3 py-2 mb-2 w-full"
//         />

//         {/* Add other input fields similarly */}

//         <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded-md">
//           Update Profile
//         </button>
//       </form>
//     </div>
//   );
// };

// export default ProfileSettings;


import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const ProfileSettings = () => {
  const { registrationId } = useParams();
  const [userProfile, setUserProfile] = useState({
    firstName: '',
    email: '',
    password: '',
    confirmPassword: '',
    role: '',
    phoneNumber: '',
    dob: '',
    county: '',
    gpsLocation: '',
  });

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const response = await axios.get(`https://localhost:7079/Auth/UserProfile/14`);
        const userProfileData = response.data;
        setUserProfile(userProfileData);
      } catch (error) {
        console.error('Error fetching user profile:', error);
      }
    };

    fetchUserProfile();
  }, []);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setUserProfile((prevProfile) => ({
      ...prevProfile,
      [name]: value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      await axios.put(`https://localhost:7079/Auth/UpdateUser/${registrationId}`, userProfile);
      alert('Profile updated successfully!');
    } catch (error) {
      console.error('Error updating user profile:', error);
    }
  };

  if (!userProfile) {
    return <div>Loading user profile...</div>;
  }
  return (
    <div className="container mx-auto">
      <h1 className="text-2xl font-bold mb-4">User Profile Settings</h1>
      <form onSubmit={handleSubmit} className="max-w-md mx-auto">
        <label htmlFor="firstName">First Name:</label>
        <input
          type="text"
          id="firstName"
          name="firstName"
          value={userProfile.firstName}
          onChange={handleInputChange}
          className="border rounded-md px-3 py-2 mb-2 w-full"
        />
        <label htmlFor="email">Email:</label>
        <input
          type="text"
          id="email"
          name="email"
          value={userProfile.email}
          onChange={handleInputChange}
          className="border rounded-md px-3 py-2 mb-2 w-full"
        />
        <label htmlFor="password">Password:</label>
        <input
          type="password"
          id="password"
          name="password"
          value={userProfile.password}
          onChange={handleInputChange}
          className="border rounded-md px-3 py-2 mb-2 w-full"
        />
        <label htmlFor="confirmPassword">Confirm Password:</label>
        <input
          type="password"
          id="confirmPassword"
          name="confirmPassword"
          value={userProfile.confirmPassword}
          onChange={handleInputChange}
          className="border rounded-md px-3 py-2 mb-2 w-full"
        />

        <label htmlFor="role">Role:</label>
        <select
          id="role"
          name="role"
          value={userProfile.role}
          onChange={handleInputChange}
          className="border rounded-md px-3 py-2 mb-2 w-full"
        >
          <option value="farmer">Farmer</option>
          <option value="buyer">Buyer</option>
          <option value="transporter">Transporter</option>
        </select>
        
        <label htmlFor="phoneNumber">Phone Number:</label>
        <input
          type="tel"
          id="phoneNumber"
          name="phoneNumber"
          value={userProfile.phoneNumber}
          onChange={handleInputChange}
          className="border rounded-md px-3 py-2 mb-2 w-full"
        />
        <label htmlFor="dob">Date of Birth:</label>
        <input
          type="date"
          id="dob"
          name="dob"
          value={userProfile.dob}
          onChange={handleInputChange}
          className="border rounded-md px-3 py-2 mb-2 w-full"
        />
        <label htmlFor="county">County:</label>
        <input
          type="text"
          id="county"
          name="county"
          value={userProfile.county}
          onChange={handleInputChange}
          className="border rounded-md px-3 py-2 mb-2 w-full"
        />
        <label htmlFor="gpsLocation">GPS Location:</label>
        <input
          type="text"
          id="gpsLocation"
          name="gpsLocation"
          value={userProfile.gpsLocation}
          onChange={handleInputChange}
          className="border rounded-md px-3 py-2 mb-2 w-full"
        />
        /         <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded-md">
          Update Profile
        </button>
      </form>
    </div>
  );
};

export default ProfileSettings;





 





