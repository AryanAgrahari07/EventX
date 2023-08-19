import React, {useState} from 'react'
import { db } from '../firebase';
import {  doc, deleteDoc , updateDoc, getDoc} from "firebase/firestore";

const Adusers = ({user}) => {

  const handleDeleteEvent = async () => {
    const confirmation = window.confirm('Pakka Delete karna hai');
    if (confirmation) {
      try {
        await deleteDoc(doc(db, 'users', user.id));
        await deleteDoc(doc(db, 'allowedUsers', user.id));
        console.log('Event deleted successfully');
      } catch (error) {
        console.error('Error deleting event:', error);
      }
    }
  };



  return (
    <div>
      <div className='list-events'>
      <div class='container-zz'>
  <ul>
    <li class='past'>
      <h4 className='oneline-h3'  >{user.displayName} </h4>
      <h4 className='oneline-h3' style={{color:'black',marginTop:'10px'}}>{user.email} </h4>
      <button style={{backgroundColor: 'black', color:'white',padding:'5px',margin:'2px',border: 'none',borderRadius:'4px'}} onClick={handleDeleteEvent}> Delete</button>
    </li>
    </ul>
    </div>
      </div>
    </div>
  )
}

export default Adusers
