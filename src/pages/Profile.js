import React from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import { getUser } from '../services/userAPI';
import Isload from '../components/Isload';

class Profile extends React.Component {
  constructor() {
    super();
    this.state = {
      isload: false,
      data: {},
    };
    this.getuser = this.getuser.bind(this);
  }

  componentDidMount() {
    this.getuser();
  }

  async getuser() {
    this.setState({
      isload: true,
    });
    const dados = await getUser();
    this.setState({
      isload: false,
      data: dados,
    });
  }

  render() {
    const { isload, data } = this.state;
    console.log(data);
    if (isload) {
      return <Isload />;
    }
    return (
      <div data-testid="page-profile">
        <Header />
        <span>
          <img src={ data.image } alt={ data.name } data-testid="profile-image" />
          <h4>{ data.name }</h4>
          <h4>{ data.email }</h4>
          <h4>{ data.description }</h4>
          <Link to="/profile/edit">Editar perfil</Link>
        </span>
      </div>
    );
  }
}

export default Profile;
