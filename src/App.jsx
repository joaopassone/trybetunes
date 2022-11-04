import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Album from './pages/Album';
import Favorites from './pages/Favorites';
import Login from './pages/Login';
import NotFound from './pages/NotFound';
import Profile from './pages/Profile';
import ProfileEdit from './pages/ProfileEdit';
import Search from './pages/Search';

import searchAlbumsAPI from './services/searchAlbumsAPI';

class App extends React.Component {
  state = {
    searchArtistInput: '',
    isSearchButtonDisabled: true,
    isSearching: false,
  };

  onSearchButtonClick = async () => {
    const { searchArtistInput } = this.state;
    this.setState({
      searchArtistInput: '',
      isSearching: true,
    });
  };

  verifySearchArtistInput = (name) => {
    const checkLength = (name.length <= 1);

    this.setState(() => ({
      isSearchButtonDisabled: checkLength,
    }));
  };

  onInputChange = ({ target }) => {
    const { name, value } = target;

    this.setState(() => ({
      [name]: value,
    }));

    if (name === 'searchArtistInput') this.verifySearchArtistInput(value);
  };

  render() {
    return (
      <Switch>
        <Route exact path="/" component={ Login } />
        <Route
          path="/search"
          render={ (props) => (
            <Search
              { ...props }
              { ...this.state }
              onInputChange={ this.onInputChange }
            />) }
        />
        <Route path="/album/:id" render={ (props) => <Album { ...props } /> } />
        <Route path="/favorites" component={ Favorites } />
        <Route exact path="/profile" component={ Profile } />
        <Route path="/profile/edit" component={ ProfileEdit } />
        <Route path="/:any" render={ (props) => <NotFound { ...props } /> } />
      </Switch>
    );
  }
}

export default App;
