import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

class AlbumPreview extends Component {
  render() {
    const { album } = this.props;
    const { artworkUrl100, artistName, collectionName, collectionId } = album;

    return (
      <div>
        <Link
          to={ `/album/${collectionId}` }
          data-testid={ `link-to-album-${collectionId}` }
        >
          <img src={ artworkUrl100 } alt={ collectionName } />
        </Link>
        <p>{ collectionName }</p>
        <p>{ artistName }</p>
      </div>
    );
  }
}

AlbumPreview.propTypes = {
  album: PropTypes.shape({
    artistName: PropTypes.string.isRequired,
    artworkUrl100: PropTypes.string.isRequired,
    collectionName: PropTypes.string.isRequired,
    collectionId: PropTypes.number.isRequired,
  }).isRequired,
};

export default AlbumPreview;
