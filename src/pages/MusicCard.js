import React from 'react';
import PropTypes from 'prop-types';
import Isload from '../components/Isload';
import { addSong, removeSong } from '../services/favoriteSongsAPI';

class MusicCard extends React.Component {
  constructor() {
    super();
    this.state = {
      albumCheck: false,
      carregando: false,
    };
    this.clickCheck = this.clickCheck.bind(this);
  }

  async clickCheck({ target }) {
    const { mMusica, pegarFavorito } = this.props;
    const valor = target.checked;
    if (!valor) {
      this.setState({
        carregando: true,
      });
      await removeSong(mMusica);
      await pegarFavorito();
      this.setState({
        albumCheck: false,
        carregando: false,
      });
    } else {
      this.setState({
        albumCheck: true,
        carregando: true,
      });
      await addSong(mMusica);
      await pegarFavorito();
      this.setState({
        carregando: false,
      });
    }
  }

  render() {
    const { mMusica, favoritadas } = this.props;
    const { albumCheck, carregando } = this.state;
    console.log(favoritadas);
    console.log(mMusica);
    if (!favoritadas) {
      return <span>Não tem música favorita</span>;
    }
    return (
      <>
        <span>
          { mMusica.trackName }
        </span>
        <audio data-testid="audio-component" src={ mMusica.previewUrl } controls>
          <track kind="captions" />
          O seu navegador não suporta o elemento
          <code>audio</code>
        </audio>
        <label htmlFor="favorita">
          Favorita
          <input
            type="checkbox"
            checked={ favoritadas.includes(mMusica.trackName) ? true : albumCheck }
            onClick={ this.clickCheck }
            id="favorita"
            data-testid={ `checkbox-music-${mMusica.trackId}` }
          />
          {carregando ? <Isload /> : undefined}
        </label>
        <br />
      </>
    );
  }
}

MusicCard.propTypes = {
  mMusica: PropTypes.shape().isRequired,
  favoritadas: PropTypes.arrayOf(PropTypes.object).isRequired,
  pegarFavorito: PropTypes.func.isRequired,
};

export default MusicCard;
