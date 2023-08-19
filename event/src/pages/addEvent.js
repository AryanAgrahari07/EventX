import React, { useState } from 'react';
import Nav from '../comp/nav';
import { storage, db, auth } from "../firebase";
import { ref, uploadBytes } from "firebase/storage";
import { collection, addDoc } from "firebase/firestore";
import './cs/addEvent.css';

const AddEvent = () => {
  const [eventName, setEventName] = useState("");
  const [clubName, setClubName] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [description, setDescription] = useState("");
  const [registrationLink, setRegistrationLink] = useState("");
  const [image, setImage] = useState(null);
  const [venue, setVenue] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsLoading(true); // Set loading state to true
    setSuccessMessage("");
    setErrorMessage("");

    const storageRef = ref(storage, `images/${image.name}`);
    await uploadBytes(storageRef, image);

    try {
      const user = auth.currentUser;
      const docRef = await addDoc(collection(db, 'events'), {
        eventName,
        clubName,
        date,
        time,
        description,
        registrationLink,
        imageURL: storageRef.fullPath,
        venue,
        userId: user.uid,
        userName: user.displayName,
        userEmail: user.email,
      });
      console.log('Event submitted successfully.');

      const notificationData = {
        app_id: 'c3352cf5-8d19-45f3-8488-b0deed625be2',
        contents: {
          en: 'A new event has been added!',
        },
        headings: {
          en: 'New Event Added',
        },
        included_segments: ['All'],
      };

      fetch('https://onesignal.com/api/v1/notifications', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: 'Basic YOUR_ONESIGNAL_REST_API_KEY',
        },
        body: JSON.stringify(notificationData),
      })
        .then((response) => response.json())
        .then((data) => {
          console.log('Notification sent successfully:', data);
        })
        .catch((error) => {
          console.error('Error sending notification:', error);
        });

      // Clear the form
      setEventName('');
      setClubName('');
      setDate('');
      setTime('');
      setDescription('');
      setRegistrationLink('');
      setImage(null);
      setVenue('');
      setSuccessMessage('Event submitted successfully.');
    } catch (error) {
      console.error('Error submitting event:', error);
      setErrorMessage('Failed to submit event.');
    }

    setIsLoading(false); // Set loading state to false (upload complete or failed)
  };

  const handleImageChange = (event) => {
    setImage(event.target.files[0]);
  };

  return (
    <div>
      <Nav />
      <div className='content'>
        <h4 style={{ alignItems: 'center' }}>Add Your Event</h4>
        <form className='formEvent' onSubmit={handleSubmit} encType="multipart/form-data">
          <div className='item'>
            <label htmlFor="eventName">Event Name:</label>
            <input className='input-value' type="text" id="eventName" value={eventName} onChange={(e) => setEventName(e.target.value)} name="eventName" required />
          </div>
          <div className='item'>
            <label htmlFor="clubName">Club Name:</label>
            <input className='input-value' type="text" id="clubName" value={clubName} onChange={(e) => setClubName(e.target.value)} name="clubName" required />
          </div>
          <div className='item'>
            <label htmlFor="date">Date:</label>
            <input className='input-value' type="date" id="date" value={date} onChange={(e) => setDate(e.target.value)} name="date" required />
          </div>
          <div className='item'>
            <label htmlFor="time">Time:</label>
            <input className='input-value' type="time" id="time" value={time} onChange={(e) => setTime(e.target.value)} name="time" required />
          </div>
          <div className='item'>
            <label htmlFor="venue">Venue:</label>
            <input className='input-value' type="text" id="venue" value={venue} onChange={(e) => setVenue(e.target.value)} name="venue" required />
          </div>
          <div className='item' >
            <label htmlFor="description">Description:</label>
            <textarea className='description-value' id="description" value={description} onChange={(e) => setDescription(e.target.value)} name="description" required></textarea>
          </div>
          <div className='item'>
            <label htmlFor="registerLink">Registration Link:</label>
            <input className='input-value' type="url" id="registrationLink" value={registrationLink} onChange={(e) => setRegistrationLink(e.target.value)} name="registertionLink" required />
          </div>
          <div className='item'>
            <label htmlFor="image">Image:</label>
            <input className='input-value' type="file" id="image" name="image" accept=".jpg, .jpeg, .png" onChange={handleImageChange} required />
          </div>

          {isLoading && <p>Uploading...</p>}
          {!isLoading && successMessage && <p>{successMessage}</p>}
          {!isLoading && errorMessage && <p>{errorMessage}</p>}

          <button className='btnxx' type="submit">Submit</button>
        </form>
      </div>
    </div>
  );
}

export default AddEvent;
