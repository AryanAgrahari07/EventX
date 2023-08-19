import React, {useState} from 'react'
import { Link } from 'react-router-dom'
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import { db } from '../firebase';
import {  doc, deleteDoc , updateDoc} from "firebase/firestore";


const Adoneline = ({event}) => {
  const [eventName, setEventName] = useState("");
  const [clubName, setClubName] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [venue, setVenue] = useState("");
  const [description, setDescription] = useState("");
  const [isEditing, setIsEditing] = useState(false);

  const handleDeleteEvent = async () => {
    const confirmation = window.confirm('Pakka Delete karna hai');
    if (confirmation) {
      try {
        await deleteDoc(doc(db, 'events', event.id));
        console.log('Event deleted successfully');
      } catch (error) {
        console.error('Error deleting event:', error);
      }
    }
  };

  const handleEdit = async (e) => {
    e.preventDefault();
    const confirmation = window.confirm('Pakka Edit karna hai na');
    if (confirmation) {
    try {
     await updateDoc(doc(db, 'events', event.id), {
        eventName,
        clubName,
        date,
        time,
        description,
        venue,
      });
      console.log('Event updated successfully.');
      // Clear the form
      setEventName('');
      setClubName('');
      setDate('');
      setTime('');
      setVenue('');
      setDescription('');

      setIsEditing(false);
    } catch (error) {
      console.error('Error updating event:', error);
    }
  }
  };

 
  const openEditForm = () => {
    setIsEditing(true);
  };

  const closeEditForm = () => {
    setIsEditing(false);
  };

  return (
    <div className='admin-online'>
      <div className='list-events'>
      <div class='container-zz'>
  <ul>
    <li class='past'>
    <Link to={`/Event/${event.id}`}><a className='oneline-a' href='#'>

      <span style={{marginTop:"5px"}} > <ArrowForwardIosIcon fontSize='small'/> </span>
      </a></Link>
      <h4 className='oneline-h3' >{event.eventName} </h4>
        <p style={{marginTop:'6px'}}>   
          <span class='duration'style={{marginTop:'3px'}}>{event.date}  | {event.time} hrs  </span>
          <span class='duration'style={{marginTop:'3px'}}>{event.userName} | {event.userEmail} </span>
        <span class='location'>{event.clubName} </span>
      </p>
  
    <button style={{backgroundColor: 'black', color:'white',padding:'5px',margin:'2px',border: 'none',borderRadius:'4px'}} onClick={handleDeleteEvent}> Delete</button>
    <button style={{ backgroundColor: 'lightgray', color:'black',padding:'5px',margin:'2px',marginTop:'2px',border:'none',borderRadius:'4px' , marginLeft:'25px'}} onClick={openEditForm}> Edit </button>
    </li>
    </ul>
    </div>
      </div>

      {isEditing && (
      <div className='edit-form'>
      <form className='formEvent' onSubmit={handleEdit} encType="multipart/form-data">
  <div className='item'>
    <label htmlFor="eventName">Event Name:</label>
    <input className='input-value' type="text" id="eventName"  value={eventName} onChange={(e) => setEventName(e.target.value)} name="eventName" required/>
  </div>
  <div className='item'>
    <label htmlFor="clubName">Club Name:</label>
    <input className='input-value' type="text" id="clubName" value={clubName}  onChange={(e) => setClubName(e.target.value)} name="clubName" required/>
  </div>
  <div className='item'>
    <label for="date">Date:</label>
    <input className='input-value' type="date" id="date" value={date} onChange={(e) => setDate(e.target.value)} name="date" required/>
  </div>
  <div className='item'>
    <label for="time">Time:</label>
    <input className='input-value' type="time" id="time" value={time} onChange={(e) => setTime(e.target.value)} name="time" required/>
  </div>
  <div className='item'>
    <label for="description">Description:</label>
    <textarea className='description-value' id="description"  value={description} onChange={(e) => setDescription(e.target.value)} name="description" required></textarea>
  </div>
  <div className='item'>
    <label for="venue">Venue:</label>
    <input className='input-value' type="text" id="venue" value={venue} onChange={(e) => setVenue(e.target.value)} name="venue" required/>
  </div>

  <button className='btnxx' type="submit" >Confirm Edit</button>
  <button onClick={closeEditForm}>Cancel</button>
</form>
      </div>
       )}
    </div>
  )
}

export default Adoneline
