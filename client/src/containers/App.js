import "./App.css";
import { Routes, Route } from "react-router-dom";
import Landing from "../components/Landing/Landing";
import Home from "../components/Home/Home";
import Card from "../components/Card/Card";
// import Cards from "../components/Cards/Cards";
import Details from "../components/Details/Details";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/home" element={<Home />} />
        <Route path="/card" element={<Card id={1} name="Bulbasaur" />} />
        <Route path="/:id" element={<Details />} />
      </Routes>
    </div>
  );
}

export default App;
