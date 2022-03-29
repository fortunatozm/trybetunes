import PropTypes from 'prop-types';
import React from 'react';
import Header from '../components/Header';
import getMusics from '../services/musicsAPI';
import MusicCard from './MusicCard';

class Album extends React.Component {
  constructor() {
    super();
    this.state = {
      mMusicas: [],
      mMusicas2: [],
    };
    this.recebeMusic = this.recebeMusic.bind(this);
  }

  componentDidMount() {
    this.recebeMusic();
  }

  async recebeMusic() {
    const { match: { params: { id } } } = this.props;
    const musicas = await getMusics(id);
    const copyMusic = [...musicas];
    const pElement = copyMusic.shift();
    this.setState({
      mMusicas: copyMusic,
      mMusicas2: pElement,
    });
  }

  render() {
    const { mMusicas, mMusicas2 } = this.state;
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
              key={ mMusica.trackNumber }
              mMusica={ mMusica }
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
