import React, { useEffect, useState } from 'react';
import './roome-list.css';

export const RoomeList = () => {
  const [rooms, setRooms] = useState([]);

  useEffect(() => {
    fetch('http://localhost:5000/rooms')
      .then(response => response.json())
      .then(data => setRooms(data))
      .catch(error => console.error('Error fetching rooms:', error));
  }, []);

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
