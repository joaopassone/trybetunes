import React, { Component } from 'react';
import AlbumPreview from '../components/AlbumPreview';
import Header from '../components/Header';
import Loading from '../components/Loading';
import searchAlbumsAPI from '../services/searchAlbumsAPI';

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
      <form>
        <label htmlFor="search-artist-input">
          Nome da Banda ou Artista
          <input
            type="text"
            name="searchArtistInput"
            id="search-artist-input"
            value={ searchArtistInput }
            onChange={ this.onInputChange }
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
          Pesquisar
        </button>
      </form>
    );

    return (
      <div data-testid="page-search">
        <Header />
        { isSearching ? <Loading /> : searchForm }
        { albums ? <p>{ `Resultado de álbuns de: ${artist}` }</p> : null }
        { albums ? albums
          .map((album) => <AlbumPreview album={ album } key={ album.collectionId } />)
          : null }
        { albums && albums.length === 0 ? <p>Nenhum álbum foi encontrado</p> : null }
      </div>
    );
  }
}

export default Search;
