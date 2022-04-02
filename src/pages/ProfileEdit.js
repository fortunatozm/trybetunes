import React from 'react';
import Header from '../components/Header';
import { getUser } from '../services/userAPI';

class ProfileEdit extends React.Component {
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
    return (
      <div data-testid="page-profile-edit">
        <Header
          isload={ isload }
          data={ data }
        />
      </div>
    );
  }
}

export default ProfileEdit;
