import React, { Component } from 'react';

export default class CreateUser extends Component {
  constructor(props) {
    super(props);

    this.onChangeUsername = this.onChangeUsername.bind(this);
    this.onSubmit = this.onSubmit.bind(this);

    this.state = { username: "" }
  }

  componentDidMount() {
    this.setState({
      users: ['test user'],
      username: 'test user'
    })
  }

  onChangeUsername(e) {
    this.setState({
      username: e.target.value
    });
  }

  onSubmit(e) {
    e.preventDefault();
    const user = { username: this.state.username }

    console.log(user)

    this.setState({ username: "" })
  }

  render() {
    return(
      <div>
        <h3>Create new entry</h3>
        <form onSubmit={this.onSubmit}>

        <div className="form-group">
          <label>Username: </label>
          <input ref="userInput" required className="form-control"
            value={this.state.username}
            onChange={this.onChangeUsername}/>
        </div>


        <div className="form-group">
          <input type="submit" onClick={this.onSubmit} value="Create Entry" className="btn btn-primary" />
        </div>

        </form>
      </div>
    )
  }
};
