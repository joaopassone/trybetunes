import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Header from '../components/Header';

class Search extends Component {
  render() {
    const { onInputChange, searchArtistInput, isSearchButtonDisabled } = this.props;

    return (
      <div data-testid="page-search">
        <Header />
        <form>
          <label htmlFor="search-artist-input">
            Nome da Banda ou Artista
            <input
              type="text"
              name="searchArtistInput"
              id="search-artist-input"
              value={ searchArtistInput }
              onChange={ onInputChange }
              data-testid="search-artist-input"
            />
          </label>
          <button
            type="button"
            name="searchArtistButton"
            id="search-artist-button"
            disabled={ isSearchButtonDisabled }
            data-testid="search-artist-button"
          >
            Pesquisar
          </button>
        </form>
      </div>
    );
  }
}

Search.propTypes = {
  onInputChange: PropTypes.func.isRequired,
  searchArtistInput: PropTypes.string.isRequired,
  isSearchButtonDisabled: PropTypes.bool.isRequired,
};

export default Search;
