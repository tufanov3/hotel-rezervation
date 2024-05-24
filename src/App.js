import React from 'react';
import { Routes, Route } from "react-router-dom";
import { Authorization, Register } from "./components/header/log-in";
import { Header, ReservationForm, RoomeList } from "./components";
import "./App.css";

function App() {

  return (
    <div className="App">
        <Header />
        <ReservationForm />
        <Routes>
          <Route path="/authorization" element={<Authorization />} />
          <Route path="/register" element={<Register />} />
        </Routes>
        <RoomeList />
    </div>
  );
}

export default App;
