import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import MusicCard from '../components/MusicCard';
import getMusics from '../services/musicsAPI';
import Loading from '../components/Loading';
import { getFavoriteSongs } from '../services/favoriteSongsAPI';

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
    musics.splice(0, 1);

    const albumPage = (
      <>
        <p data-testid="artist-name">{ artistName }</p>
        <p data-testid="album-name">{ collectionName }</p>
        { musics.map((music) => (
          <MusicCard
            music={ music }
            key={ music.trackName }
            { ...this.state }
            onFavoritesUpdate={ () => {} }
          />
        )) }
      </>
    );

    return (
      <div data-testid="page-album">
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
