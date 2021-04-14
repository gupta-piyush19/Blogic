import "./App.css";
import { Switch, Route } from "react-router-dom";
import Navbar from "./components/layout/Navbar";
import Footer from "./components/layout/Footer";
import Register from "./components/auth/Register";
import Login from "./components/auth/Login";
import setAuthToken from "./utils/setAuthToken";
import DraftEditor from "./components/Editor/DraftEditor";

if (localStorage.token) {
  setAuthToken(localStorage.token);
}

function App() {
  return (
    <div className="App">
      <Navbar />
      <Switch>
        <Route exact path="/">
          <h1>BLOGIC</h1>
        </Route>
        <Route exact path="/new">
          <DraftEditor />
        </Route>
        <Route exact path="/register">
          <div className="main-app">
            <Register />
          </div>
        </Route>
        <Route exact path="/login">
          <div className="main-app">
            <Login />
          </div>
        </Route>
      </Switch>
      <Footer />
    </div>
  );
}

export default App;
