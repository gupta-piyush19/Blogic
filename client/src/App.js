import "./App.css";
import { Switch, Route } from "react-router-dom";
import Navbar from "./components/layout/Navbar";
import Footer from "./components/layout/Footer";
import Register from "./components/auth/Register";
import Login from "./components/auth/Login";
import setAuthToken from "./utils/setAuthToken";
import DraftEditor from "./components/Editor/DraftEditor";
import ViewEditor from "./components/Editor/ViewEditor";
import Blogs from "./components/Pages/Blogs";
import EditEditor from "./components/Editor/EditEditor";
import PrivateRoute from "./components/routing/PrivateRoute";
import Delete from "./components/Pages/Delete";

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
          <Blogs />
        </Route>
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
        <PrivateRoute exact path="/blogs/delete" component={Delete} />
      </Switch>
      <Footer />
    </div>
  );
}

export default App;
