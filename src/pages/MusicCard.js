import React from 'react';
import PropTypes from 'prop-types';

class MusicCard extends React.Component {
  constructor() {
    super();

    this.state = {

    };
  }

  render() {
    const { mMusica } = this.props;
    console.log(mMusica);
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
            id="favorita"
            data-testid={ `checkbox-music-${mMusica.trackId}` }
          />
        </label>
        <br />
      </>
    );
  }
}

MusicCard.propTypes = {
  mMusica: PropTypes.shape.isRequired,
};

export default MusicCard;
