import React from 'react';
import PropTypes from 'prop-types';
import Header from './Header';

class Input extends React.Component {
  render() {
    const { nomeArt, hendleChangeS, hendleClickS, isDisable } = this.props;
    // console.log(isDisable);
    return (
      <>
        <Header />
        <input
          onChange={ hendleChangeS }
          data-testid="search-artist-input"
          value={ nomeArt }
        />
        <button
          disabled={ isDisable }
          type="button"
          data-testid="search-artist-button"
          onClick={ hendleClickS }
        >
          Pesquisar
        </button>
      </>
    );
  }
}

Input.propTypes = {
  hendleChangeS: PropTypes.func.isRequired,
  hendleClickS: PropTypes.func.isRequired,
  isDisable: PropTypes.bool.isRequired,
  nomeArt: PropTypes.string.isRequired,
};

export default Input;
