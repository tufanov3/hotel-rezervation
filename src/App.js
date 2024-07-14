import React, { useLayoutEffect } from 'react';
import { Routes, Route } from "react-router-dom";
import { useState } from 'react';
import { Authorization, Register } from "./components/header/log-in";
import { Header, ReservationForm, RoomeList } from "./components";
import "./App.css";

function App() {

  const[data, setData] = useState(null)

  useLayoutEffect(() => {
    fetch('/users')
      .then(res => res.json())
      .then(res => setData(res.message))
      .catch(error => console.error('Error fetching rooms:', error));
  }, []);

  return (
    <div className="App">
        <Header />
        <ReservationForm />
        <Routes>
          <Route path="/authorization" element={<Authorization />} />
          <Route path="/register" element={<Register />} />
        </Routes>
        <RoomeList />
        {
          !data ? 'Loading...' : data
        }
    </div>
  );
}

export default App;
