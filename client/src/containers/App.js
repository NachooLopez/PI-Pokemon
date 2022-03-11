import "./App.css";
import { Routes, Route } from "react-router-dom";
import Landing from "../components/Landing/Landing";
import Home from "../components/Home/Home";
import Details from "../components/Details/Details";
import Create from "../components/Create/Create";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/landing" element={<Landing />} />
        <Route path="/home" element={<Home />} />
        <Route path="/pokemons/:id" element={<Details />} />
        <Route path="/create" element={<Create />} />
      </Routes>
    </div>
  );
}

export default App;
