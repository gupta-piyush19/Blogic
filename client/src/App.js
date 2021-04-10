import "./App.css";
import { Switch, Route } from "react-router-dom";
import Navbar from "./components/layout/Navbar";
import Footer from "./components/layout/Footer";

function App() {
  return (
    <div className="App">
      <Navbar />
      <h1>Intro To BLOGIC</h1>
      <Footer />
    </div>
  );
}

export default App;
