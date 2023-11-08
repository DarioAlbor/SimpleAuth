import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Register from './pages/Register';
import Login from './pages/Login';

const AppRouter = () => {
  return (
    <Router>
      <Switch>
        <Route path="/register">
          <Register />
        </Route>
        <Route path="/login">
          <Login />
        </Route>
      </Switch>
    </Router>
  );
};

export default AppRouter;
