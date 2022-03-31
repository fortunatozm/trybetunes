import React from 'react';
import PropTypes from 'prop-types';
import Isload from '../components/Isload';
import { addSong } from '../services/favoriteSongsAPI';

class MusicCard extends React.Component {
  constructor() {
    super();
    this.state = {
      albumCheck: false,
      carregando: false,
    };
    this.clickCheck = this.clickCheck.bind(this);
  }

  async clickCheck() {
    const { albumCheck } = this.state;
    if (albumCheck) {
      this.setState({
        albumCheck: false,
      });
    } else {
      this.setState({
        albumCheck: true,
        carregando: true,
      });
      const { mMusica } = this.props;
      await addSong(mMusica);
      this.setState({
        carregando: false,
      });
    }
  }

  render() {
    const { mMusica, favoritadas } = this.props;
    const { albumCheck, carregando } = this.state;
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
  // albumCheck: PropTypes.bool.isRequired,
  mMusica: PropTypes.shape().isRequired,
  favoritadas: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default MusicCard;
