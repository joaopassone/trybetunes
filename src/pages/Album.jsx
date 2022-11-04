import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import MusicCard from '../components/MusicCard';
import getMusics from '../services/musicsAPI';
import Loading from '../components/Loading';

class Album extends Component {
  state = {
    albumInfo: [],
    artistName: '',
    collectionName: '',
    hasAPIResult: false,
  };

  async componentDidMount() {
    const { match } = this.props;
    const { params } = match;
    const { id } = params;

    const albumInfo = await getMusics(id);
    const { artistName, collectionName } = albumInfo[0];

    this.setState(() => ({ albumInfo, artistName, collectionName, hasAPIResult: true }));
  }

  render() {
    const { albumInfo, artistName, collectionName, hasAPIResult } = this.state;
    const musics = [...albumInfo];
    musics.splice(0, 1);

    return (
      <div data-testid="page-album">
        <Header />
        { hasAPIResult
          ? (
            <>
              <p data-testid="artist-name">{ artistName }</p>
              <p data-testid="album-name">{ collectionName }</p>
              { musics
                .map((music) => (
                  <MusicCard
                    music={ music }
                    key={ music.trackName }
                    { ...this.state }
                  />
                )) }
            </>
          )
          : <Loading /> }
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
