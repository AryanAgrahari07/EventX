import React ,{useState,useEffect} from 'react'
import './css/oneline.css'
import { Link } from 'react-router-dom'
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
const Oneline = ({ event }) => {
  
  const [formattedEventDateday, setFormattedDateday] = useState('');
  const [formattedEventDatemonth, setFormattedDatemonth] = useState('');
  const [formattedEventTime, setFormattedTime] = useState('');

  useEffect(() => {
  // const eventDate = new Date(event.date);
  const eventDate = new Date(`${event.date}T${event.time}`);
  const formattedEventDateday = eventDate.toLocaleDateString(undefined, {
    day: 'numeric',
    // month: 'long',
  });

  const formattedEventDatemonth = eventDate.toLocaleDateString(undefined, {
    // day: 'numeric',
    month: 'long',
  });
  setFormattedDateday(formattedEventDateday);
  setFormattedDatemonth(formattedEventDatemonth);




  // const eventTime = new Date(event.time);
  const formattedEventTime = eventDate.toLocaleTimeString(undefined, {
    hour: 'numeric',
    minute: 'numeric',
    hour12: true,
  });
  setFormattedTime(formattedEventTime);

}, [event.date, event.time]);


  return (
    <div className='oneline'>
  {/* <h2 className='oneline-h'>This Week</h2> */}
      <div class='container-zz'>
  <ul>
    <li class='past'>
      <label class='date'>
        {/* add day in words like monday,etc  */}
        <span class='weekday'> {/* {event.date}*/} {formattedEventDatemonth} </span>
        {/* add date in numbers  */}
        <span class='day'>{formattedEventDateday}</span>
      </label>
    <Link to='/Event' > <a className='oneline-a' href='#'>

      <span style={{marginTop:"5px"}} > <ArrowForwardIosIcon fontSize='small'/> </span>
      </a></Link>
      <h3 className='oneline-h3'>{event.eventName}</h3>
      <p className='p-oneline'>
        <span class='duration'>{formattedEventTime}</span>
        <span class='location'>{event.clubName}</span>
      </p>
    </li>
    </ul>
    </div>
    </div>

  )
}

export default Oneline
