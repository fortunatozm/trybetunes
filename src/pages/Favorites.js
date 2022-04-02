import React from 'react';
import Header from '../components/Header';
import { getFavoriteSongs } from '../services/favoriteSongsAPI';
import MusicCard from './MusicCard';
import Isload from '../components/Isload';
import { getUser } from '../services/userAPI';

class Favorites extends React.Component {
  constructor() {
    super();
    this.state = {
      mFavorites: [],
      nameFavorites: [],
      isload: false,
      isloadUser: false,
      data: {},
    };
    this.getFavorite = this.getFavorite.bind(this);
    this.removeFavorito = this.removeFavorito.bind(this);
    this.getuser = this.getuser.bind(this);
  }

  componentDidMount() {
    this.getFavorite();
    this.getuser();
  }

  async getuser() {
    this.setState({
      isloadUser: true,
    });
    const dados = await getUser();
    this.setState({
      isloadUser: false,
      data: dados,
    });
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
    const { mFavorites, nameFavorites, isload, isloadUser, data } = this.state;
    if (isload) {
      return <Isload />;
    }
    return (
      <div data-testid="page-favorites">
        <Header
          isload={ isloadUser }
          data={ data }
        />
        { mFavorites === undefined ? undefined : (
          mFavorites.map((mFavorit) => (
            <MusicCard
              key={ mFavorit.trackId }
              mMusica={ mFavorit }
              favoritadas={ nameFavorites }
              pegarFavorito={ this.removeFavorito }
            />
          ))) }
      </div>
    );
  }
}

export default Favorites;
