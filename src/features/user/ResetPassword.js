import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

function ResetPassword() {
  const { resetToken } = useParams();
  const [isValidToken, setIsValidToken] = useState(true);
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const navigate = useNavigate();

  

  useEffect(() => {
    
    if (!isValidToken) {
      setErrorMessage('Invalid or expired token number');
      return;
    }
    fetch(`https://localhost:7079/api/Account/Reset-password?resetToken=${resetToken}`)
      .then((response) => {
        if (response.status === 200) {
          setIsValidToken(true);
        } else {
          setIsValidToken(false);
        }
      })
      .catch((error) => {
        setIsValidToken(false);
      });
  }, [resetToken]);

  const handleResetPassword = () => {
    if (!isValidToken) {
      setErrorMessage('Invalid or expired token');
      return;
    }

    fetch('https://localhost:7079/api/Account/Reset-password', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        resetToken,
        newPassword: password,
        confirmPassword,
      }),
    })
    .then((response) => {
      if (response.ok) {
        setErrorMessage('');
        setSuccessMessage('Password reset successful. You can now log in.');
        setTimeout(() => navigate('/login'), 3000);
        // window.location.href = '/reset-password';
      } else {
        setSuccessMessage('');
        setErrorMessage('Password reset failed. Please try again.');
      }
    })
    .catch((error) => {
      console.error('Password reset error:', error);
      setErrorMessage('An error occurred. Please try again.');
    });
  };

  return (
    <div>
      {isValidToken ? (
        <div>
          <input
            type="password"
            placeholder="New Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <input
            type="password"
            placeholder="Confirm Password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
          <button type="submit" onClick={handleResetPassword}>
            Reset Password
          </button>
        </div>
      ) : (
        <div>
          <h2>Invalid Token</h2>
          <p>The password reset token is either invalid or has expired.</p>
        </div>
      )}
      {errorMessage && <div>{errorMessage}</div>}
      {successMessage && <div>{successMessage}</div>}
    </div>
  );
}

export default ResetPassword;



// import React, { useState } from 'react';
// import { useLocation } from 'react-router-dom';

// function ResetPassword() {
//     const location = useLocation();
//     const queryParams = new URLSearchParams(location.search);
//     const resetToken = queryParams.get('resetToken');
    
    

//     const [password, setPassword] = useState('');
//     const [confirmPassword, setConfirmPassword] = useState('');
//     const [errorMessage, setErrorMessage] = useState('');
//     const [successMessage, setSuccessMessage] = useState('');

//     const handleResetPassword = () => {
//         // Perform client-side validation here

//         if (!password || !confirmPassword) {
//             setErrorMessage('Please fill in both password fields.');
//             return;
//         }

//         if (password !== confirmPassword) {
//             setErrorMessage('Passwords do not match.');
//             return;
//         }

//         // Send a request to the backend to reset the password
//         fetch('https://localhost:7079/api/Account/Reset-password', {
//             method: 'POST',
//             headers: {
//                 'Content-Type': 'application/json',
//             },
//             body: JSON.stringify({
//                 resetToken,
//                 // newPassword: password,
//                 password: password,
//             }),
//         })
//         .then((response) => {
//             if (response.ok) {
//                 setErrorMessage('');
//                 setSuccessMessage('Password reset successful. You can now log in.');
//             } else {
//                 setSuccessMessage('');
//                 setErrorMessage('Password reset failed. Please try again.');
//             }
//         })
//         .catch((error) => {
//             console.error('Password reset error:', error);
//             setErrorMessage('An error occurred. Please try again.');
//         });
//     };

//     return (
//         <div>
//             <h2>Reset Password</h2>
//             <form onSubmit={handleResetPassword}>
//                 <input
//                     type="password"
//                     placeholder="New Password"
//                     value={password}
//                     onChange={(e) => setPassword(e.target.value)}
//                 />
//                 <input
//                     type="password"
//                     placeholder="Confirm Password"
//                     value={confirmPassword}
//                     onChange={(e) => setConfirmPassword(e.target.value)}
//                 />
//                 <button type="submit">Reset Password</button>
//             </form>
//             {errorMessage && <div>{errorMessage}</div>}
//             {successMessage && <div>{successMessage}</div>}
//         </div>
//     );
// }

// export default ResetPassword;


// import React, { useState } from 'react'
// import { redirect } from 'react-router';
// import {useHistory} from 'react-router-dom'

// const ResetPassword=(props) =>{
//     const [redirect, setRedirect]= useState(false);
//     // const history= useHistory();
//     const [password, setPassword] = useState('');
//     const [passwordConfirm, setPasswordConfirm] = useState('');

//     const submit = async (e) => {
//         e.preventDefault();

//         await fetch('https://localhost:7079/api/Account/Reset-password', {
//             method: 'POST',
//             headers: {'Content-Type': 'application/json'},
//             body: JSON.stringify({
//                 //resetToken: props.match.params.token,
//                 resetToken: props.match.params.resetToken,
//                 password,
//                 passwordConfirm
//             })
//         });

//         setRedirect(true);
//         // history.push('/login'); // Use history to navigate
//     }
//     if (redirect){
//         return <redirect to="/login"/>;
//         // return history.push('/login');
//     }

//   return (
//     <form onSubmit={submit}>
//             <h1 className="h3 mb-3 fw-normal">Please ResetPassword</h1>

//             <input type="password" className="form-control" placeholder="Password" required
//                    onChange={e => setPassword(e.target.value)}
//             />
//             <input type="password" className="form-control" placeholder="Password Confirm" required
//                    onChange={e => setPasswordConfirm(e.target.value)}
//             />
            

//             <button className="w-100 btn btn-lg btn-primary" type="submit">Submit</button>
//         </form>
//     );
// };

// export default ResetPassword;
