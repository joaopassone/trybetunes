import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import Header from '../components/Header';
import Loading from '../components/Loading';
import { getUser, updateUser } from '../services/userAPI';
import '../Styles/ProfileEdit.css';

class ProfileEdit extends Component {
  state = {
    onLoading: false,
    name: '',
    email: '',
    image: '',
    description: '',
    isSaveButtonDisabled: true,
    isSaved: false,
  };

  componentDidMount() {
    this.setState({ onLoading: true }, async () => {
      const user = await getUser();
      const { name, email, image, description } = user;
      this.setState({ onLoading: false, name, email, image, description }, () => {
        this.validateSaveButton();
      });
    });
  }

  validateSaveButton = () => {
    const { name, email, image, description } = this.state;

    const notBlank = name.length * email.length * image.length * description.length !== 0;
    const validEmail = email.match(/^.+@.+$/);

    this.setState({ isSaveButtonDisabled: !(notBlank && validEmail) });
  };

  handleChange = ({ target }) => {
    const { name, value } = target;
    this.setState({ [name]: value }, () => {
      this.validateSaveButton();
    });
  };

  onSaveButtonClick = () => {
    const { name, email, image, description } = this.state;
    this.setState({ onLoading: true }, async () => {
      await updateUser({ name, email, image, description });
      this.setState({ onLoading: false, isSaved: true });
    });
  };

  render() {
    const { onLoading, name, email, image,
      description, isSaveButtonDisabled, isSaved } = this.state;

    const page = (
      <div className="profile-edit-page">
        <h2>Profile Edit</h2>
        <img src={ image } alt="" />
        <form>
          <label htmlFor="edit-input-image">
            Imagem
            <input
              type="text"
              name="image"
              id="edit-input-image"
              value={ image }
              onChange={ this.handleChange }
              data-testid="edit-input-image"
            />
          </label>
          <label htmlFor="edit-input-name">
            Nome
            <input
              type="text"
              name="name"
              id="edit-input-name"
              value={ name }
              onChange={ this.handleChange }
              data-testid="edit-input-name"
            />
          </label>
          <label htmlFor="edit-input-email">
            Email
            <input
              type="text"
              name="email"
              id="edit-input-email"
              value={ email }
              onChange={ this.handleChange }
              data-testid="edit-input-email"
            />
          </label>
          <label htmlFor="edit-input-description">
            Descrição
            <textarea
              name="description"
              id="edit-input-description"
              value={ description }
              onChange={ this.handleChange }
              data-testid="edit-input-description"
            />
          </label>
          <button
            type="button"
            name="editButtonSave"
            id="edit-button-save"
            disabled={ isSaveButtonDisabled }
            onClick={ this.onSaveButtonClick }
            data-testid="edit-button-save"
          >
            Salvar
          </button>
        </form>
      </div>
    );

    return (
      <div data-testid="page-profile-edit">
        <Header />
        { isSaved ? <Redirect to="/profile" /> : null }
        { onLoading ? <Loading /> : page }
      </div>
    );
  }
}

export default ProfileEdit;
