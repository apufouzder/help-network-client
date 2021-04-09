import './App.css';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import Home from './components/Home/Home';
import Events from './components/Events/Events';
import AdminPanel from './components/AdminPanel/AdminPanel';
// import Header from './components/Header/Header';
import { createContext, useState } from 'react';
import RegistrationForm from './components/RegistrationForm/RegistrationForm';
import PrivateRoute from './components/PrivateRoute/PrivateRoute';
import Login from './components/Login/Login';

export const UserContext = createContext()

function App() {
  const [loggedInUser, setLoggedInUser] = useState({});
  return (
    <UserContext.Provider value={[loggedInUser, setLoggedInUser]}>
      <Router>

        <Switch>
          <Route path="/home">
            <Home />
          </Route>

          <PrivateRoute path="/events">
            <Events />
          </PrivateRoute>


          <PrivateRoute path="/admin">
            <AdminPanel />
          </PrivateRoute>

          <PrivateRoute path="/registration-form">
            <RegistrationForm />
          </PrivateRoute>

          <Route exact path="/">
            <Home />
          </Route>

          <Route exact path="/login">
            <Login />
          </Route>

          <Route path="*">
            <h1>Page Not Found</h1>
          </Route>

        </Switch>
      </Router>
    </UserContext.Provider>
  );
}

export default App;
