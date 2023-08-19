import React, { useState, useEffect } from 'react';
import './css/bigcard.css';
import { Link } from 'react-router-dom';
import { getDownloadURL, ref } from 'firebase/storage';
import { storage } from '../firebase';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ShareIcon from '@mui/icons-material/Share';

const Bigcard = ({ event }) => {
  const [imageURL, setImageURL] = useState('');
  const [formattedEventDate, setFormattedDate] = useState('');
  const [formattedEventTime, setFormattedTime] = useState('');

  useEffect(() => {
    const fetchImageURL = async () => {
      try {
        const url = await getDownloadURL(ref(storage, event.imageURL));
        setImageURL(url);
      } catch (error) {
        console.log(error);
      }
    };

    fetchImageURL();

    const eventDate = new Date(`${event.date}T${event.time}`);
    const formattedEventDate = eventDate.toLocaleDateString(undefined, {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    });
    setFormattedDate(formattedEventDate);

    const formattedEventTime = eventDate.toLocaleTimeString(undefined, {
      hour: 'numeric',
      minute: 'numeric',
      hour12: true,
    });
    setFormattedTime(formattedEventTime);
  }, [event.imageURL, event.date, event.time]);


  const shareText = `Check out this New Event: \n\n${event.eventName} \n\nOrganized by: ${event.clubName}! \n\nDate: ${formattedEventDate}.\n\nMore details here: https://eventx.social/Event/${event.id}`;


  const handleShare = () => {
    const text = `${shareText}`;
    const imageUrl = `${imageURL}`;
    const url = `whatsapp://send?text=${encodeURIComponent(text)}&image=${encodeURIComponent(imageUrl)}`;

    window.open(url);
  };

  return (
    <div className="bigcard">
      <div className="big">
        <div className="topback">
          <Link to="/event" className="card-link">
          <div>
            <button className="bigcard-da-mai-buttontop" style={{ width: 'auto', marginLeft: '2vw' }}>
              <ArrowBackIcon fontSize="large" />
            </button>
          </div>
          </Link>
          <div className='top-se'>
         
          </div>
          <div>
          <button className="bigcard-da-mai-buttontop-right" onClick={handleShare}> <ShareIcon fontSize="large"/></button>
        </div>
        </div>
        <div className='top-right-share'>Share with friends</div>
        <div className="heading-club-name">{event.clubName} Presents</div>
        <img className="bigcard-img" src={imageURL} alt="Event" />
        <div className="inf">
          <pre className="gyaan-about-event">
            <span style={{ color: 'gray' }}>@{event.clubName}</span> {event.description}
          </pre>
          <ul className="bigcard-ul">
            <li className="bigcard-li">Event Name: {event.eventName}</li>
            <li className="bigcard-li">Date: {formattedEventDate}</li>
            <li className="bigcard-li">Time: {formattedEventTime}</li>
            <li className="bigcard-li">Venue: {event.venue}</li>
          </ul>
          <div className="btnBigcard">
            <a href={event.registrationLink}>
              <button className="bigcard-da-mai-button">
                <a href={event.registrationLink} style={{ color: 'white', textDecoration: 'none' }}>
                  Register
                </a>
              </button>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Bigcard;
