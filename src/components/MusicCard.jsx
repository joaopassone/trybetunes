import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { addSong, removeSong } from '../services/favoriteSongsAPI';
import Loading from './Loading';

class MusicCard extends Component {
  state = {
    onLoading: false,
    checked: false,
  };

  componentDidMount() {
    const { music, favoriteSongs } = this.props;
    const match = favoriteSongs.find(({ trackId }) => trackId === music.trackId);

    if (match) {
      this.setState({ checked: true });
    }
  }

  onFavoriteCheck = ({ target }) => {
    const { music, onFavoritesUpdate } = this.props;

    this.setState({ onLoading: true }, async () => {
      if (target.checked) await addSong(music);
      else await removeSong(music);
      this.setState({ onLoading: false, checked: target.checked });
      onFavoritesUpdate();
    });
  };

  render() {
    const { music } = this.props;
    const { trackName, previewUrl, trackId } = music;
    const { onLoading, checked } = this.state;

    const card = (
      <>
        <span>{ trackName }</span>
        <audio data-testid="audio-component" src={ previewUrl } controls>
          <track kind="captions" />
          O seu navegador não suporta o elemento
          {' '}
          <code>audio</code>
          .
        </audio>
        <label
          htmlFor={ `checkbox-music-${trackId}` }
          data-testid={ `checkbox-music-${trackId}` }
        >
          <input
            type="checkbox"
            name={ `checkboxMusic${trackId}` }
            id={ `checkbox-music-${trackId}` }
            onClick={ this.onFavoriteCheck }
            onChange={ () => {} }
            checked={ checked }
          />
          Favorita
        </label>
      </>
    );

    return (
      <div>
        { onLoading ? <Loading /> : card }
      </div>
    );
  }
}

MusicCard.defaultProps = {
  favoriteSongs: [],
};

MusicCard.propTypes = {
  favoriteSongs: PropTypes.arrayOf(PropTypes.shape({
    music: PropTypes.shape({
      trackName: PropTypes.string,
      previewUrl: PropTypes.string,
      trackId: PropTypes.number,
    }),
  })),
  music: PropTypes.shape({
    trackName: PropTypes.string.isRequired,
    previewUrl: PropTypes.string.isRequired,
    trackId: PropTypes.number.isRequired,
  }).isRequired,
  onFavoritesUpdate: PropTypes.func.isRequired,
};

export default MusicCard;
