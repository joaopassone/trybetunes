import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { getUser } from '../services/userAPI';
import Loading from './Loading';

class Header extends Component {
  state = {
    name: null,
  };

  async componentDidMount() {
    const { name } = await getUser();
    this.setState({ name });
  }

  render() {
    const { name } = this.state;

    return (
      <header data-testid="header-component">
        { name ? <p data-testid="header-user-name">{ name }</p> : <Loading /> }
        <Link to="/search" data-testid="link-to-search">Search</Link>
        <Link to="/favorites" data-testid="link-to-favorites">Favorites</Link>
        <Link to="/profile" data-testid="link-to-profile">Profile</Link>
      </header>
    );
  }
}

export default Header;
