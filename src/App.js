import { Routes, Route } from "react-router-dom";
import { Header, HotelList } from "./components";
import "./App.css";

function App() {
  return (
    <div className="App">
      <Header />
      <HotelList />
      <Routes>
        <Route />
        <Route />
        <Route />
        <Route />
      </Routes>
    </div>
  );
}

export default App;
