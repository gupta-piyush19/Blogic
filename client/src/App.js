import "./App.css";
import { Switch, Route } from "react-router-dom";
import Navbar from "./components/layout/Navbar";
import Footer from "./components/layout/Footer";
import Register from "./components/auth/Register";
import Login from "./components/auth/Login";
import setAuthToken from "./utils/setAuthToken";
import DraftEditor from "./components/Editor/DraftEditor";
import ViewEditor from "./components/Editor/ViewEditor";
import Home from "./components/Pages/Home";
import Blogs from "./components/Pages/Blogs";

if (localStorage.token) {
  setAuthToken(localStorage.token);
}

function App() {
  return (
    <div className="App">
      <Navbar />
      <Switch>
        <Route exact path="/">
          <Home />
        </Route>
        <Route exact path="/blogs">
          <Blogs />
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
        <Route
          exact
          path="/view"
          render={(props) => <ViewEditor {...props} />}
        />
      </Switch>
      <Footer />
    </div>
  );
}

export default App;
