import React, { useState, useEffect } from 'react';
import Smallcard from './smallcard';
// import { getDatabase, ref, onValue } from "firebase/database";
import { db } from '../firebase';
import {  collection, onSnapshot } from "firebase/firestore";
import './css/eventlist.css'

const EventList = () => {

  const [upcomingEvents, setUpcomingEvents] = useState([]);
  const [pastEvents, setPastEvents] = useState([]);
  const [isLoading, setIsLoading] = useState(true);


  useEffect(() => {
    const eventCol = collection(db, "events");
    const unsubscribe = onSnapshot(eventCol, (snapshot) => {
      const eventList = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
      const upcomingEventsList = eventList.filter((event) => new Date(event.date) > new Date());
      const pastEventsList = eventList.filter((event) => new Date(event.date) < new Date());
      setUpcomingEvents(upcomingEventsList);
      setPastEvents(pastEventsList);
      setIsLoading(false);
    });
    return unsubscribe;
  }, []);

  upcomingEvents.sort((a, b) => new Date(a.date) - new Date(b.date));
  pastEvents.sort((a, b) => new Date(b.date) - new Date(a.date));
  
  return (
    <div className='eventlist-main'>
     {isLoading ? (
        // Show loading indicator or image
        <div style={{ textAlign: 'center', marginTop: '3%' }}>Loading...</div>
        ) : (
        <div>
      <h2 className='event-heading'>Upcoming Events</h2>
      {upcomingEvents.map((event) => (
        <Smallcard key={event.id} event={event}  />
        ))}
 
      <h2 className='heading-2'>Past Events</h2>
      {pastEvents.map((event) => (
        <Smallcard key={event.id} event={event}  />
      ))}
      </div>
      )}
       
    </div>
  );
};

export default EventList;
