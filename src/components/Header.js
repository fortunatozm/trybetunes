import React from 'react';
import { Link } from 'react-router-dom';
import { getUser } from '../services/userAPI';
import Isload from './Isload';

class Header extends React.Component {
  constructor() {
    super();
    this.state = {
      isLoad: false,
    };

    this.getName = this.getName.bind(this);
  }

  componentDidMount() {
    this.getName();
  }

  getName() {
    this.setState({
      isLoad: true,
    }, async () => {
      // await getUser();
      const { name } = await getUser();
      console.log(name);
      this.setState({
        isLoad: false,
      });
    });
  }

  render() {
    const { isLoad } = this.state;
    if (isLoad) {
      return <Isload />;
    }
    return (
      <header data-testid="header-component">
        <h4 data-testid="header-user-name">
          {this.getName}
        </h4>
        <Link to="/search" data-testid="link-to-search">Search</Link>
        <Link to="/favorites" data-testid="link-to-favorites">Favorites</Link>
        <Link to="/profile" data-testid="link-to-profile">Profile</Link>
      </header>
    );
  }
}

export default Header;
