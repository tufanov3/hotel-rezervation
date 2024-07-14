import React, { useEffect, useState } from 'react';
import './roome-list.css';

export const RoomeList = () => {
  const [rooms, setRooms] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch('http://localhost:3001/rooms')
      .then(response => {
        if (Array.isArray(response.data.rooms)) {
          setRooms(response.data.rooms);
        } else {
          throw new Error('Data format is incorrect');
        }
      })
      .catch(error => {
        console.error('Error fetching rooms:', error);
        setError(error.message);
      });
  }, []);

  if (error) {
    return <div>Error fetching rooms: {error}</div>;
  }

  return (
    <div>
      <h1>Available Rooms</h1>
      <ul>
        {rooms.map(room => (
          <li key={room._id}>
            <h2>{room.name}</h2>
            <p>{room.description}</p>
            <p>Price: ${room.price}</p>
            <img src={room.image} alt={room.name} />
          </li>
        ))}
      </ul>
    </div>
  );
};
