import React from 'react';
import Header from '../components/Header';

class Search extends React.Component {
  constructor() {
    super();
    this.state = {
      isDisable: true,
      nome: '',
    };
    this.hendleChangeH = this.hendleChangeH.bind(this);
  }

  hendleChangeH(prevName) {
    this.setState({
      nome: prevName.target.value,
    }, () => {
      const NAME_LENGTH = 2;
      const { nome } = this.state;
      if (nome.length >= NAME_LENGTH) {
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
    const { isDisable } = this.state;
    return (
      <div data-testid="page-search">
        <Header />
        <input onChange={ this.hendleChangeH } data-testid="search-artist-input" />
        <button disabled={ isDisable } type="button" data-testid="search-artist-button">
          Pesquisar
        </button>
      </div>
    );
  }
}

export default Search;
