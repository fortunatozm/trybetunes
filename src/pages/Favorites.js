import React from 'react';
import Header from '../components/Header';
import { getFavoriteSongs } from '../services/favoriteSongsAPI';
import MusicCard from './MusicCard';
import Isload from '../components/Isload';

class Favorites extends React.Component {
  constructor() {
    super();
    this.state = {
      mFavorites: [],
      nameFavorites: [],
      isload: false,
      // checked: true,
    };
    this.getFavorite = this.getFavorite.bind(this);
    this.removeFavorito = this.removeFavorito.bind(this);
    // this.clickRemove = this.clickRemove.bind(this);
  }

  componentDidMount() {
    this.getFavorite();
  }

  getFavorite() {
    this.setState({
      isload: true,
    }, async () => {
      const favoritas = await getFavoriteSongs();
      if (!favoritas) {
        this.setState({
          mFavorites: [],
          nameFavorites: [],
          isload: false,
        });
      } else {
        const favoriteNames = favoritas.map((favoriteName) => favoriteName.trackName);
        this.setState({
          mFavorites: favoritas,
          nameFavorites: favoriteNames,
          isload: false,
        });
      }
    });
  }

  async removeFavorito() {
    const favoritas = await getFavoriteSongs();
    const newFavorite = favoritas.map((favorita) => favorita.trackName);
    this.setState({
      mFavorites: favoritas,
      nameFavorites: newFavorite,
    });
  }

  render() {
    const { mFavorites, nameFavorites, isload } = this.state;
    // console.log('mFavorites', mFavorites);
    if (isload) {
      return <Isload />;
    }
    return (
      <div data-testid="page-favorites">
        <Header />
        { mFavorites === undefined ? undefined : (
          mFavorites.map((mFavorit) => (
            <MusicCard
              key={ mFavorit.trackId }
              mMusica={ mFavorit }
              favoritadas={ nameFavorites }
              pegarFavorito={ this.removeFavorito }
            />
          ))) }
        {/* <MusicCard
          key={ mFavorit.trackId }
          mMusica={ mFavorit }
          favoritadas={  }
        />
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
                checked={ checked }
                id="favorita"
                data-testid={ `checkbox-music-${fav.trackId}` }
                onClick={ this.clickRemove }
              />
            </label>
            <br />
          </>)) } */}
      </div>
    );
  }
}

export default Favorites;
