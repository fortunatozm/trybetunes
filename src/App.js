import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Album from './pages/Album';
import Favorites from './pages/Favorites';
import Login from './pages/Login';
import NotFound from './pages/NotFound';
import Profile from './pages/Profile';
import ProfileEdit from './pages/ProfileEdit';
import Search from './pages/Search';

class App extends React.Component {
  render() {
    return (
      <BrowserRouter>
        <Switch>
          <Route
            path="/album/:id"
            render={ (props) => (<Album
              { ...props }
            />) }
          />
          <Route path="/favorites" component={ Favorites } />
          <Route
            exact
            path="/"
            render={ (props) => (<Login
              { ...props }
            />) }
          />
          <Route path="/profile/edit" component={ ProfileEdit } />
          <Route
            exact
            path="/profile"
            render={ (props) => (<Profile
              { ...props }
            />) }
          />
          <Route
            path="/search"
            render={ (props) => (<Search
              { ...props }
            />) }
          />
          <Route path="*" component={ NotFound } />
        </Switch>
      </BrowserRouter>
    );
  }
}

export default App;
