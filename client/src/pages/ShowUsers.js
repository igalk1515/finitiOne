import React, { Component } from 'react';

class ShowUsers extends Component {
  constructor() {
    super();
    this.state = {
      users: [],
    };
  }

  // Assume this function fetches the users from the server
  componentDidMount() {
    // Fetch the users and update the state
    // this.setState({ users: fetchedUsers });
  }

  render() {
    return (
      <div>
        <h1>Users</h1>
        <ul>
          {this.state.users.map((user, index) => (
            <li key={index}>
              {user.name} - {user.email}
            </li>
          ))}
        </ul>
      </div>
    );
  }
}

export default ShowUsers;
