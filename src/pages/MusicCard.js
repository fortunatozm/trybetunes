import React from 'react';
import PropTypes from 'prop-types';
import { addSong } from '../services/favoriteSongsAPI';
import Isload from '../components/Isload';

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
    const { mMusica } = this.props;
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
            checked={ albumCheck }
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
  // albumCheck: PropTypes.bool.isRequired,
};

export default MusicCard;
