import { Landing } from './pages/Landing';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import { Home } from './pages/Home';
import { Login } from './pages/Login';
import { Signup } from './pages/Signup';
import { Profile } from './pages/Profile';
import { Mission } from './pages/Mission';
import { NotFound } from './pages/NotFound';

export const App = () => (
  <BrowserRouter>
    <Switch>
      <Route path="/home">
        <Home />
      </Route>
      <Route path="/mission/:missionId">
        <Mission />
      </Route>
      <Route path="/profile/:username">
        <Profile />
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
      <Route path="/" exact>
        <Landing />
      </Route>
      <Route>
        <NotFound />
      </Route>
    </Switch>
  </BrowserRouter>
);
