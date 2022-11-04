import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { addSong } from '../services/favoriteSongsAPI';
import Loading from './Loading';

class MusicCard extends Component {
  state = {
    onLoading: false,
    checked: false,
  };

  onFavoriteCheck = ({ target }) => {
    const { music } = this.props;

    if (target.checked) {
      this.setState({ onLoading: true }, async () => {
        await addSong(music);
        this.setState({ onLoading: false, checked: true });
      });
    }
  }

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
            checked={ checked }
          />
          Favorita
        </label>
      </>
    );

    return (
      <>{ onLoading ? <Loading /> : card }</>
    );
  }
}

MusicCard.propTypes = {
  music: PropTypes.shape({
    trackName: PropTypes.string.isRequired,
    previewUrl: PropTypes.string.isRequired,
    trackId: PropTypes.number.isRequired,
  }).isRequired,
};

export default MusicCard;
