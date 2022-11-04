import React, { Component } from 'react';
import Header from '../components/Header';
import Loading from '../components/Loading';
import MusicCard from '../components/MusicCard';
import { getFavoriteSongs } from '../services/favoriteSongsAPI';

class Favorites extends Component {
  state = {
    isLoading: false,
    favoriteSongs: [],
  };

  componentDidMount() {
    this.updateFavoriteSongs();
  }

  updateFavoriteSongs = () => {
    this.setState({ isLoading: true }, async () => {
      const favoriteSongs = await getFavoriteSongs();
      this.setState({ isLoading: false, favoriteSongs });
    });
  };

  onFavoritesUpdate = () => {
    this.updateFavoriteSongs();
  };

  render() {
    const { favoriteSongs, isLoading } = this.state;

    return (
      <div data-testid="page-favorites">
        <Header />
        { isLoading ? <Loading />
          : favoriteSongs.map((music) => (
            <MusicCard
              music={ music }
              key={ music.trackName }
              { ...this.state }
              onFavoritesUpdate={ this.onFavoritesUpdate }
            />)) }
      </div>
    );
  }
}

export default Favorites;
