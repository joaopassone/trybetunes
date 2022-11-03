import React, { Component } from 'react';
import { getUser } from '../services/userAPI';
import Loading from './Loading';

class Header extends Component {
  state = {
    name: null,
  }

  componentDidMount = async () => {
    const { name } = await getUser();
    this.setState(() => ({
      name,
    }));
  };

  render() {
    const { name } = this.state;

    return (
      <header data-testid="header-component">
        { name ? <p data-testid="header-user-name">{ name }</p> : <Loading /> }
      </header>
    );
  }
}

export default Header;
