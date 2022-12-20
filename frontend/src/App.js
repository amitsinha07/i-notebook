import "./App.css";
import Home from "./components/Home";
import Navbar from "./components/Navbar";
import About from "./components/About";
import { NoteState } from "./context/NoteState";
import { BrowserRouter, Routes, Route } from "react-router-dom";
//import Alert from "./components/Alert";

function App() {
  return (
    <NoteState>
      <BrowserRouter>
        <Navbar />
        {/* <Alert message={"I Love JavaScript"}/> */}
        <div className="container">
          <Routes>
            <Route exact path="/" element={<Home />} />
            <Route exact path="/about" element={<About />} />
          </Routes>
        </div>
        
      </BrowserRouter>
    </NoteState>
  );
}

export default App;
