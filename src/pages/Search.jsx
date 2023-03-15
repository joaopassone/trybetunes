import React, { Component } from 'react';
import AlbumPreview from '../components/AlbumPreview';
import Header from '../components/Header';
import Loading from '../components/Loading';
import searchAlbumsAPI from '../services/searchAlbumsAPI';
import '../Styles/Search.css';

class Search extends Component {
  state = {
    searchArtistInput: '',
    isSearchButtonDisabled: true,
    isSearching: false,
    albums: null,
    artist: '',
  };

  onInputChange = ({ target }) => {
    const { name, value } = target;

    this.setState({
      [name]: value,
      isSearchButtonDisabled: (value.length <= 1),
    });
  };

  onSearchButtonClick = async () => {
    const { searchArtistInput } = this.state;
    const artist = searchArtistInput;

    this.setState({
      searchArtistInput: '',
      isSearching: true,
      isSearchButtonDisabled: true,
      artist,
    });

    const albums = await searchAlbumsAPI(artist);

    this.setState({
      albums,
      isSearching: false,
    });
  };

  render() {
    const { searchArtistInput, isSearchButtonDisabled,
      isSearching, albums, artist } = this.state;

    const searchForm = (
      <form className="search-form">
        <label htmlFor="search-artist-input">
          <input
            type="text"
            name="searchArtistInput"
            id="search-artist-input"
            value={ searchArtistInput }
            onChange={ this.onInputChange }
            placeholder="Busque o nome do Artista"
            data-testid="search-artist-input"
          />
        </label>
        <button
          type="button"
          name="searchArtistButton"
          id="search-artist-button"
          onClick={ this.onSearchButtonClick }
          disabled={ isSearchButtonDisabled }
          data-testid="search-artist-button"
        >
          <i className="fi fi-br-search" />
        </button>
      </form>
    );

    return (
      <div data-testid="page-search" className="search-div">
        <Header />
        { isSearching ? <Loading /> : searchForm }
        { albums && (
          <p className="search-p">
            { 'Resultado de álbuns de: ' }
            <strong>{ artist }</strong>
          </p>) }
        <div className="album-div">
          { albums && albums
            .map((album) => <AlbumPreview album={ album } key={ album.collectionId } />) }
        </div>
        { albums && albums.length === 0
          && <p className="search-p">Nenhum álbum foi encontrado</p> }
      </div>
    );
  }
}

export default Search;
