import React from 'react';
import Header from '../components/Header';
import { getFavoriteSongs } from '../services/favoriteSongsAPI';
import Isload from '../components/Isload';

class Favorites extends React.Component {
  constructor() {
    super();
    this.state = {
      mFavorit: [],
      isload: false,
    };
    this.getFavorite = this.getFavorite.bind(this);
  }

  componentDidMount() {
    this.getFavorite();
  }

  getFavorite() {
    this.setState({
      isload: true,
    }, async () => {
      const favoritas = await getFavoriteSongs();
      this.setState({
        mFavorit: favoritas,
        isload: false,
      });
    });
  }

  render() {
    const { mFavorit, isload } = this.state;
    if (isload) {
      return <Isload />;
    }
    return (
      <div data-testid="page-favorites">
        <Header />
        { mFavorit.length < 1 ? undefined : mFavorit.map((fav) => (
          <>
            <span>
              { fav.trackName }
            </span>
            <audio data-testid="audio-component" src={ fav.previewUrl } controls>
              <track kind="captions" />
              O seu navegador não suporta o elemento
              <code>audio</code>
            </audio>
            <label htmlFor="favorita">
              Favorita
              <input
                type="checkbox"
                checked="true"
                id="favorita"
                data-testid={ `checkbox-music-${fav.trackId}` }
              />
            </label>
            <br />
          </>)) }
      </div>
    );
  }
}

export default Favorites;
