import React from 'react';
// import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import searchAlbumsAPI from '../services/searchAlbumsAPI';
import Isload from '../components/Isload';
import Input from '../components/Input';

class Search extends React.Component {
  constructor() {
    super();
    this.state = {
      isDisable: true,
      nomeArt: '',
      isLoad: false,
      titleName: '',
      musicAr: [],
      secNegative: '',
    };
    this.hendleChangeS = this.hendleChangeS.bind(this);
    this.hendleClickS = this.hendleClickS.bind(this);
  }

  hendleClickS() {
    const { nomeArt } = this.state;
    const secN = 'Nenhum álbum foi encontrado';
    this.setState({
      isLoad: true }, async () => {
      const data = await searchAlbumsAPI(nomeArt);
      this.setState({
        nomeArt: '',
        isLoad: false,
        musicAr: data,
        titleName: `Resultado de álbuns de: ${nomeArt}`,
        secNegative: secN,
      });
    });
  }

  hendleChangeS(prevName) {
    this.setState({
      nomeArt: prevName.target.value,
    }, () => {
      const NAME_LENGTH = 2;
      const { nomeArt } = this.state;
      if (nomeArt.length >= NAME_LENGTH) {
        this.setState({
          isDisable: false,
        });
      } else {
        this.setState({
          isDisable: true,
        });
      }
    });
  }

  render() {
    const { nomeArt, isDisable, isLoad, musicAr, titleName, secNegative } = this.state;
    console.log(this.props);
    return (
      <div data-testid="page-search">
        <Input
          isDisable={ isDisable }
          hendleClickS={ this.hendleClickS }
          hendleChangeS={ this.hendleChangeS }
          nomeArt={ nomeArt }
        />
        { isLoad ? <Isload /> : (
          <div>
            <h2>{ titleName }</h2>
            { musicAr.length < 1 ? secNegative : (musicAr.map((musica) => (
              <div key={ Math.random() }>
                <img src={ musica.artworkUrl100 } alt={ musica.collectionName } />
                <p>
                  { musica.collectionName }
                </p>
                <p>
                  { musica.artistName }
                </p>
                <Link
                  to={ `/album/${musica.collectionId}` }
                  data-testid={ `link-to-album-${musica.collectionId}` }
                >
                  Album
                </Link>
              </div>)))}
          </div>) }
      </div>
    );
  }
}

// Search.propTypes = {
//   history: PropTypes.shape({
//     push: PropTypes.func.isRequired,
//   }).isRequired,
//   musicAr: PropTypes.arrayOf(
//     PropTypes.shape({
//       artistId: PropTypes.number.isRequired,
//       artistName: PropTypes.string.isRequired,
//       collectionId: PropTypes.number.isRequired,
//       collectionName: PropTypes.string.isRequired,
//       collectionPrice: PropTypes.number.isRequired,
//       artworkUrl100: PropTypes.string.isRequired,
//       releaseDate: PropTypes.string.isRequired,
//       trackCount: PropTypes.number.isRequired,
//     }).isRequired,
//   ).isRequired,
// };

export default Search;
