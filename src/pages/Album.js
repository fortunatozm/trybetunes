import PropTypes from 'prop-types';
import React from 'react';
import Header from '../components/Header';
import getMusics from '../services/musicsAPI';
import { getFavoriteSongs } from '../services/favoriteSongsAPI';
import MusicCard from './MusicCard';

class Album extends React.Component {
  constructor() {
    super();
    this.state = {
      mMusicas: [],
      mMusicas2: [],
      favoritadas: [],
    };
    this.recebeMusic = this.recebeMusic.bind(this);
    this.pegarFavorito = this.pegarFavorito.bind(this);
  }

  componentDidMount() {
    this.recebeMusic();
  }

  // componentDidUpdate() {
  //   this.pegarFavorito();
  // }

  async pegarFavorito() {
    const favoritas = await getFavoriteSongs();
    const nweFavorite = favoritas.map((favorita) => favorita.trackName);
    this.setState({
      favoritadas: nweFavorite,
    });
  }

  async recebeMusic() {
    const { match: { params: { id } } } = this.props;
    const musicas = await getMusics(id);
    const copyMusic = [...musicas];
    const pElement = copyMusic.shift();
    await this.pegarFavorito();
    this.setState({
      mMusicas: copyMusic,
      mMusicas2: pElement,
    });
  }

  render() {
    const { mMusicas, mMusicas2, favoritadas } = this.state;
    return (
      <div data-testid="page-album">
        <Header />
        <section>
          { mMusicas.length > 0 ? (
            <>
              <h2 data-testid="album-name">
                { mMusicas2.collectionName }
              </h2>
              <span data-testid="artist-name">
                { mMusicas2.artistName }
              </span>
            </>) : undefined }

          { mMusicas.map((mMusica) => (
            <MusicCard
              key={ mMusica.trackId }
              mMusica={ mMusica }
              favoritadas={ favoritadas }
              pegarFavorito={ this.pegarFavorito }
            />
          ))}
        </section>
      </div>);
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
