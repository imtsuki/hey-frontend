import { Landing } from './pages/Landing';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import { Home } from './pages/Home';
import { Login } from './pages/Login';
import { Signup } from './pages/Signup';
import { Profile } from './pages/Profile';

export const App = () => (
  <BrowserRouter>
    <Switch>
      <Route path="/home">
        <Home />
      </Route>
      <Route path="/profile">
        <Profile />
      </Route>
      <Route path="/login">
        <Login />
      </Route>
      <Route path="/signup">
        <Signup />
      </Route>
      <Route path="/">
        <Landing />
      </Route>
    </Switch>
  </BrowserRouter>
);
