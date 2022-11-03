import React from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import Loading from './components/Loading';
import Album from './pages/Album';
import Favorites from './pages/Favorites';
import Login from './pages/Login';
import NotFound from './pages/NotFound';
import Profile from './pages/Profile';
import ProfileEdit from './pages/ProfileEdit';
import Search from './pages/Search';

import { createUser } from './services/userAPI';

class App extends React.Component {
  state = {
    loginNameInput: '',
    isLoginButtonDisabled: true,
    isLoading: false,
    isLogged: false,
  };

  onEnterButtonClick = () => {
    const { loginNameInput } = this.state;

    this.setState(() => ({
      isLoading: true,
    }), async () => {
      await createUser({ name: loginNameInput });
      this.setState({
        isLoading: false,
        isLogged: true,
      });
    });
  };

  verifyLoginNameInput = (name) => {
    const checkLength = (name.length <= 2);

    this.setState(() => ({
      isLoginButtonDisabled: checkLength,
    }));
  };

  onInputChange = ({ target }) => {
    const { name, value } = target;

    this.setState(() => ({
      [name]: value,
    }));

    if (name === 'loginNameInput') this.verifyLoginNameInput(value);
  };

  render() {
    const { isLoading, isLogged } = this.state;

    return (
      <>
        { isLoading ? <Loading />
          : (
            <Switch>
              <Route exact path="/">
                { isLogged ? <Redirect to="/search" />
                  : (
                    <Login
                      onInputChange={ this.onInputChange }
                      onEnterButtonClick={ this.onEnterButtonClick }
                      { ...this.state }
                    />) }
              </Route>
              <Route path="/search" component={ Search } />
              <Route path="/album/:id" render={ (props) => <Album { ...props } /> } />
              <Route path="/favorites" component={ Favorites } />
              <Route exact path="/profile" component={ Profile } />
              <Route path="/profile/edit" component={ ProfileEdit } />
              <Route path="/:any" render={ (props) => <NotFound { ...props } /> } />
            </Switch>
          ) }
      </>
    );
  }
}

export default App;
