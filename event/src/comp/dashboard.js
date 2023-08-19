import React, { useState, useEffect } from 'react';
import Oneline from './oneline';
import { db } from '../firebase';
import { collection, onSnapshot } from 'firebase/firestore';

const Dashboard = () => {
  const [upcomingEvents, setUpcomingEvents] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const eventCol = collection(db, 'events');
    const unsubscribe = onSnapshot(eventCol, (snapshot) => {
      const eventList = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
      const upcomingEventsList = eventList.filter((event) => new Date(event.date) > new Date());
      setUpcomingEvents(upcomingEventsList);
      setIsLoading(false);
    });
    return unsubscribe;
  }, []);

  upcomingEvents.sort((a, b) => new Date(a.date) - new Date(b.date));

  return (
    <div className="dashboard">
      {isLoading ? (
        <div style={{ textAlign: 'center', marginBottom: '3%' }}>Loading...</div>
      ) : ( upcomingEvents.length > 0 ? (
        <div className="dashboard-contents">
          {upcomingEvents.map((event) => (
            <Oneline key={event.id} event={event} />
          ))}
        </div>
      ) : (
        <div style={{ textAlign: 'center', marginBottom: '3%' }}>No upcoming events for now. Stay tuned!</div>
      )
      )}

    </div>
  );
};

export default Dashboard;
