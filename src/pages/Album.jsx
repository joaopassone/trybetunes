import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import MusicCard from '../components/MusicCard';
import getMusics from '../services/musicsAPI';
import Loading from '../components/Loading';
import { getFavoriteSongs } from '../services/favoriteSongsAPI';
import '../Styles/Album.css';

class Album extends Component {
  state = {
    albumInfo: [],
    artistName: '',
    collectionName: '',
    hasAPIResult: false,
    favoriteSongs: [],
  };

  async componentDidMount() {
    const { match } = this.props;
    const { params } = match;
    const { id } = params;

    const albumInfo = await getMusics(id);
    const { artistName, collectionName } = albumInfo[0];
    const favoriteSongs = await getFavoriteSongs();

    this.setState(() => ({
      albumInfo, artistName, collectionName, hasAPIResult: true, favoriteSongs,
    }));
  }

  render() {
    const { albumInfo, artistName, collectionName, hasAPIResult } = this.state;
    const musics = [...albumInfo];
    const [album] = musics;
    let cover;
    if (album) ({ artworkUrl100: cover } = album);

    musics.splice(0, 1);

    const albumPage = (
      <div className="album-page-div">
        <div className="album-info">
          <img src={ cover } alt="cover" className="album-cover" />
          <p data-testid="album-name" className="album-name-album">
            { collectionName }
          </p>
          <p data-testid="artist-name" className="artist-name-album">
            { artistName }
          </p>
        </div>
        <div className="musics-list">
          { musics.map((music) => (
            <MusicCard
              music={ music }
              key={ music.trackName }
              { ...this.state }
              onFavoritesUpdate={ () => {} }
            />
          )) }
        </div>
      </div>
    );

    return (
      <div data-testid="page-album" className="album-page">
        <Header />
        { hasAPIResult ? albumPage : <Loading /> }
      </div>
    );
  }
}

Album.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
};

export default Album;
