import React, { useState, useEffect } from 'react'
import Bigcard from './bigcard'
// import './smallcard.js'
// { EventName ,EventDate , EventVenue , EventPhoto}
import { useParams } from 'react-router-dom';
import { doc, getDoc } from "firebase/firestore";
import { db } from '../firebase';
const Fullevent = () => {
  const { id } = useParams();
  const [event, setEvent] = useState(null);

  useEffect(() => {
    const getEventData = async () => {
      const eventRef = doc(db, 'events', id);
      const eventData = await getDoc(eventRef);
      setEvent({ id: eventData.id, ...eventData.data() });
    };

    getEventData();
  }, [id]);


  return (
    <div>
    {event ? (
      <Bigcard event={event} />
    ) : (
      <div style={{ textAlign: 'center', marginTop: '3%' }}>Loading event details...</div>
    )}
  </div>
  )
}

export default Fullevent
