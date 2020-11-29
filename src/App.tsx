import Landing from './pages/Landing';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

export const App = () => (
  <BrowserRouter>
    <Switch>
      <Route path="/">
        <Landing />
      </Route>
    </Switch>
  </BrowserRouter>
);
