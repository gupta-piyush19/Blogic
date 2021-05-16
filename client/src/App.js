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
import EditEditor from "./components/Editor/EditEditor";
import PrivateRoute from "./components/routing/PrivateRoute";
import UserBlogs from "./components/Pages/UserBlogs";
import ScrollArrow from "./components/layout/ScrollArrow";

if (localStorage.token) {
  setAuthToken(localStorage.token);
}

function App() {
  return (
    <div className="App">
      <Navbar />
      <Switch>
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
        <Route exact path="/">
          <Home />
        </Route>
        <Route
          exact
          path="/blogs/user"
          render={(props) => <UserBlogs {...props} />}
        />
        <PrivateRoute exact path="/blogs/new" component={DraftEditor} />
        <Route
          exact
          path="/blogs/view"
          render={(props) => <ViewEditor {...props} />}
        />
        <Route
          exact
          path="/blogs/edit"
          render={(props) => <EditEditor {...props} />}
        />
      </Switch>
      <ScrollArrow />
      <Footer />
    </div>
  );
}

export default App;
