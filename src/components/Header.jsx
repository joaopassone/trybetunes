import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { getUser } from '../services/userAPI';
import Loading from './Loading';
import logo from '../imgs/logo.png';
import '../Styles/Header.css';

class Header extends Component {
  state = {
    name: null,
    image: '',
  };

  async componentDidMount() {
    const { name, image } = await getUser();
    this.setState({ name, image });
  }

  render() {
    const { name, image } = this.state;
    let firstName;

    if (name) [firstName] = name.split(' ');

    const page = (
      <header data-testid="header-component">
        <div className="user-info">
          <img src={ image } alt="" />
          <p data-testid="header-user-name">{ `Hi, ${firstName}!` }</p>
        </div>
        <div className="links-div">
          <Link to="/search" data-testid="link-to-search">SEARCH</Link>
          <Link to="/favorites" data-testid="link-to-favorites">FAVORITES</Link>
          <Link to="/profile" data-testid="link-to-profile">PROFILE</Link>
        </div>
        <img src={ logo } alt="logo" className="header-logo" />
      </header>
    );

    return (
      <div>
        { name ? page : <Loading /> }
      </div>
    );
  }
}

export default Header;
