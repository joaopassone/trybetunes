import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { addSong, removeSong } from '../services/favoriteSongsAPI';
import '../Styles/MusicCard.css';
import heart from '../imgs/heart.png';
import heartF from '../imgs/heart-filled.png';

class MusicCard extends Component {
  state = {
    onLoading: 'notLoading',
    checked: false,
  };

  componentDidMount() {
    const { music, favoriteSongs } = this.props;
    const match = favoriteSongs.find(({ trackId }) => trackId === music.trackId);

    if (match) {
      this.setState({ checked: true });
    }
  }

  onFavoriteCheck = async ({ target }) => {
    const { music, onFavoritesUpdate } = this.props;

    this.setState({ onLoading: 'Loading' }, async () => {
      if (target.checked) await addSong(music);
      else await removeSong(music);
      this.setState({ onLoading: 'notLoading', checked: target.checked });
      onFavoritesUpdate();
    });
  };

  render() {
    const { music } = this.props;
    const { trackName, previewUrl, trackId } = music;
    const { onLoading, checked } = this.state;

    const card = (
      <div className="music-card-div">
        <span><strong>{ trackName }</strong></span>
        <div className="audio-heart-div">
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
              key={ onLoading }
            />
            { checked ? <img src={ heartF } alt="" /> : <img src={ heart } alt="" /> }
          </label>
        </div>
      </div>
    );

    return (
      <div>
        { card }
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
