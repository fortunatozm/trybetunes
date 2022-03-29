import PropTypes from 'prop-types';
import React from 'react';
import Header from '../components/Header';
import getMusics from '../services/musicsAPI';

class Album extends React.Component {
  constructor() {
    super();
    this.state = {

    };
    this.recebeMusic = this.recebeMusic.bind(this);
  }

  async recebeMusic() {
    const { match: { params: { id } } } = this.props;
    const musicas = await getMusics(id);
    return musicas;
  }

  render() {
    return (
      <div data-testid="page-album">
        <Header />
        {/* <section>
          { this.recebeMusic() }
        </section> */}
        {/* { console.log(...this.recebeMusic()) } */}
      </div>
    );
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
