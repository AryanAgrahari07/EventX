import React, {useState,useEffect}  from 'react'
import './css/smallcard.css'
import { Link } from 'react-router-dom'
import {  ref, getDownloadURL } from "firebase/storage";
import {storage} from '../firebase'
const Smallcard = ({ event }) => {
  
  const [imageURL, setImageURL] = useState("");
  const [formattedEventDate, setFormattedDate] = useState('');

   useEffect(() => {
      const fileRef = ref(storage, `${event.imageURL}`);
      getDownloadURL(fileRef)
        .then((url) => {
          setImageURL(url);
        })
        .catch((error) => {
          console.log(error);
        });

        const eventDate = new Date(event.date);
        // const eventDate = new Date(`${event.date}T${event.time}`);
        const formattedEventDate = eventDate.toLocaleDateString(undefined, {
          day: 'numeric',
          month: 'long',
          year: 'numeric'
        });
        setFormattedDate(formattedEventDate);

    }, [event.image, event.date]);



  return (
    <div className='smallcard'>
      <div className='back'></div>
       <div className='contain'> 
    <img className='part-1' src={imageURL} alt={event.eventName} />
              
          <div className='part-2'>
              <div className='information-1'>
                <div className='upper'>
                <span className='name'>{event.eventName}</span>
                 </div>
                 <div className='lower'>
                    <ul className='data'>
                <li className='data-li' style={{color: "#19aaff"}}> {event.clubName} </li>
                <li className='data-li'> Date :        {formattedEventDate}    </li>
                <li className='data-li'> Venue :       {event.venue}  </li>
                    </ul>
                 </div>
              </div>
              <div className='click-btn'>
              <Link style={{textDecoration: "none"}} to={`/Event/${event.id}`} ><button className='click-btns'> More..</button></Link>
                    {/* <a href={event.registrationLink} style={{textDecoration: "none"}}>      <button  className='click-btns'><a className='btn-a-small' style={{color:"white"}} href={event.registrationLink}>Register</a> </button></a> */}
              </div>
          </div>
       </div>
    </div>
  )
}

export default Smallcard
