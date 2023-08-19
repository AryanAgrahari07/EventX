import React, { useState, useEffect } from 'react'
// import Oneline from './oneline'
import { db } from '../firebase';
import {  collection, onSnapshot } from "firebase/firestore";
import {  doc, getDoc, setDoc} from "firebase/firestore";
import Adoneline from '../comp/adoneline';
import Adusers from '../comp/adusers';
import { useParams } from 'react-router-dom';
import Adallowed from '../comp/adallowed';


import './cs/register.css'
import {createUserWithEmailAndPassword ,updateProfile} from "firebase/auth";
import {auth} from "../firebase";
import {useNavigate } from 'react-router-dom'




const Admin = () => {
    const [upcomingEvents, setUpcomingEvents] = useState([]);
    const [pastEvents, setPastEvents] = useState([]);
    const [userList, setUserList] = useState([]);
    const { id } = useParams();
    const [users, setUsers] = useState(null);
    const [alloweduserList, setAllowedUserList] = useState([]);
    const [allowedusers, setAllowedUsers] = useState(null);
    const [isEditing, setIsEditing] = useState(false);
    const [err, setErr] = useState(false);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
  
    useEffect(() => {
      const eventCol = collection(db, "events");
      const unsubscribe = onSnapshot(eventCol, (snapshot) => {
        const eventList = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
        const upcomingEventsList = eventList.filter((event) => new Date(event.date) > new Date());
        const pastEventsList = eventList.filter((event) => new Date(event.date) < new Date());
        setUpcomingEvents(upcomingEventsList);
        setPastEvents(pastEventsList);
      });
      return unsubscribe;
    }, []);
  
    upcomingEvents.sort((a, b) => new Date(a.date) - new Date(b.date));
    pastEvents.sort((a, b) => new Date(b.date) - new Date(a.date));


    useEffect(() => {
      const userCol = collection(db, "users");
      const unsubscribe = onSnapshot(userCol, (snapshot) => {
        const userList = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
        setUserList(userList);
      });
      return unsubscribe;
    }, []);


    useEffect(() => {
        const getUsersData = async () => {
          const usersRef = doc(db, 'users', id);
          const usersData = await getDoc(usersRef);
          setUsers({ id: usersData.id, ...usersData.data() });
        };
    
        getUsersData();
      }, [id]);
      
  
      useEffect(() => {
        const alloweduserCol = collection(db, "allowedUsers");
        const unsubscribe = onSnapshot(alloweduserCol, (snapshot) => {
          const alloweduserList = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
          setAllowedUserList(alloweduserList);
        });
        return unsubscribe;
      }, []);
  

    useEffect(() => {
        const getallowedUsersData = async () => {
          const allowedusersRef = doc(db, 'allowedUsers', id);
          const allowedusersData = await getDoc(allowedusersRef);
          setAllowedUsers({ id: allowedusersData.id, ...allowedusersData.data() });
        };
    
        getallowedUsersData();
      }, [id]);






      const handleSubmit = async (e) => {
        e.preventDefault();
        const displayName = e.target[0].value;
        const email = e.target[1].value;
        const password = e.target[2].value;
    
        try {
          const res = await createUserWithEmailAndPassword(auth, email, password);
    
          try {
            await updateProfile(res.user, {
              displayName,
            });
    
            const userDoc = {
              uid: res.user.uid,
              displayName,
              email,
              displayNameLowercase: displayName.toLowerCase(),
            };
    
            await setDoc(doc(db, "users", res.user.uid), userDoc);
            await setDoc(doc(db, "allowedUsers", res.user.uid), userDoc);
    
            navigate("/admin");
          } catch (err) {
            console.log(err);
            setErr(true);
            setLoading(false);
          }
        } catch (error) {
          console.log(error);
          setErr(true);
          setLoading(false);
        }
      };

      const openEditForm = () => {
        setIsEditing(true);
      };
    
      const closeEditForm = () => {
        setIsEditing(false);
      };
    



  return (
    <div className='admin-page'>
      <div className='admin1 '>
        <div className='admin-events-list'>
             
             {/* edit or remove events  */}
      <h3 style={{textAlign:'center', backgroundColor:"#f15c5c",padding:'5%'}}> List of Events</h3>
      <h3 style={{textAlign:'center'}}> Upcoming Events</h3>
           
             {upcomingEvents.map((event) => (
       <Adoneline key={event.id} event={event}  />
      ))}
      <h3 style={{textAlign:'center'}}> Past Events</h3>
             {pastEvents.map((event) => (
       <Adoneline key={event.id} event={event}  />
      ))}
          
        </div>





        <div className='users-events-list'>
              <h4 style={{textAlign:'center', backgroundColor:"#40add0",padding:'5%'}}>Users list</h4>

              <button style={{ backgroundColor: '#3891ff', color:'black', fontWeight: 'bold',padding:'25px',margin:'12px',marginTop:'12px',border:'none',borderRadius:'4px' , marginLeft:'50px'}} onClick={openEditForm}> Add User </button>
              {isEditing && (
              
              <div className='reg'>
    <div className='formContainer'>
      <div className='formWrapper'>
        <span className='logo'> Event-X</span>
        <span className='title'>Register</span>
        <form className='forms' onSubmit={handleSubmit}>
            <input className='fillitem' type="text" placeholder='Username'/>
            <input className='fillitem' type="email" placeholder='Email'/>
            <input className='fillitem' type="password" placeholder='Password'/>
            <input style={{display:"none"}} className='fillitem' type="file" id='file' />
           
            <button disabled={loading} className='btn'>Sign Up</button>
            <button onClick={closeEditForm} >Cancel</button>
           {err && <span> Something went wrong </span>}
        </form>
       
      </div>
    </div>
    </div>
            )}


           {userList.map((user) => (
       <Adusers user={user}  />
      ))}

      
              <h4 style={{textAlign:'center'}}>Allowed Users list</h4>
           {alloweduserList.map((alloweduser) => (
       <Adallowed alloweduser={alloweduser}  />
      ))}
        </div>
      </div>
    </div>
  )
}

export default Admin
