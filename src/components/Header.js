import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import Isload from './Isload';

class Header extends React.Component {
  render() {
    const { isload, data } = this.props;
    if (isload) {
      return <Isload />;
    }
    return (
      <header data-testid="header-component">
        <h4 data-testid="header-user-name">
          { data.name }
        </h4>
        <Link to="/search" data-testid="link-to-search">Search</Link>
        <Link to="/favorites" data-testid="link-to-favorites">Favorites</Link>
        <Link to="/profile" data-testid="link-to-profile">Profile</Link>
      </header>
    );
  }
}

Header.propTypes = {
  isload: PropTypes.bool.isRequired,
  data: PropTypes.shape().isRequired,
};

export default Header;
