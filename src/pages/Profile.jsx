import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import Loading from '../components/Loading';
import { getUser } from '../services/userAPI';
import '../Styles/Profile.css';

class Profile extends Component {
  state = {
    onLoading: false,
    user: {},
  };

  componentDidMount() {
    this.setState({ onLoading: true }, async () => {
      const user = await getUser();
      this.setState({ onLoading: false, user });
    });
  }

  render() {
    const { user, onLoading } = this.state;
    const { name, email, image, description } = user;

    const page = (
      <div className="profile-page">
        <h2>Profile</h2>
        <img src={ image } alt="user" data-testid="profile-image" />
        <p className="profile-name">{ name }</p>
        <p className="profile-info">{ email }</p>
        <p className="profile-info">{ description }</p>
        <Link to="/profile/edit">Editar perfil</Link>
      </div>
    );

    return (
      <div data-testid="page-profile">
        <Header />
        { onLoading ? <Loading /> : page }
      </div>
    );
  }
}

export default Profile;
