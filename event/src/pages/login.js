import React, { useState } from "react";
import "./cs/register.css"
// import { Link } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
import {  signInWithEmailAndPassword  } from "firebase/auth";
import { doc, getDoc ,collection,getDocs } from "firebase/firestore";
import {db, auth} from '../firebase'
const Login = () => {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

    const handleLogin = async (event) => {
      event.preventDefault();
      setLoading(true);
      try {
        const userCredential = await signInWithEmailAndPassword(
          auth,
          email,
          password
        );
        const user = userCredential.user;
        const allowedUsersSnapshot = await getDocs(collection(db, "allowedUsers"));
        const allowedUsers = allowedUsersSnapshot.docs.map(
          (doc) => doc.data().email
        );
        const isAdminSnapshot = await getDoc(doc(db, "admins", email));
        const isAdmin = isAdminSnapshot.exists();
        if (isAdmin) {
          navigate("/admin");
        } else if (allowedUsers.includes(user.email)) {
          navigate("/addevent"); 
        } else {
          setError("You are not authorized to access this page.");
        }
      } catch (error) {
        console.error(error);
        setError("Invalid email or password.");
      }
      setLoading(false);
    };

  return (
    <div className='reg'>
    <div className='formContainer'>
      <div className='formWrapper'>
        <span className='logo'> Event-X</span>
        <span className='title'>Login</span>
        <form className='forms' onSubmit={handleLogin}>
            <input className='fillitem' value={email} type="email" placeholder='Email'  onChange={(e) => setEmail(e.target.value)}/>
            <input className='fillitem' value={password} type="password" placeholder='Password' onChange={(e) => setPassword(e.target.value)}/>
            <button type="submit" className='btn' >Sign In</button>
            {/* {err && <span>Something went wrong</span>} */}
        </form>
        {error && <p>{error}</p>}
        <p > Login to add a Event !  {" "}
        {/* <Link to = "/register" style={{textDecoration : "none"}}>
          Register
          </Link> */}
          </p>
      </div>
    </div>
    </div>
  );
};

export default Login;
