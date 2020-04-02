import React, { Component } from 'react';
import axios from 'axios';

export default class CreateUser extends Component {
  constructor(props) {
    super(props);

    this.onChangeUsername = this.onChangeUsername.bind(this);
    this.onSubmit = this.onSubmit.bind(this);

    this.state = { username: "" }
  }

  // componentDidMount() {
  //   this.setState({
  //     users: ['test user'],
  //     username: 'test user'
  //   })
  // }

  onChangeUsername(e) {
    this.setState({
      username: e.target.value
    });
  }

  onSubmit(e) {
    e.preventDefault();
    const user = { username: this.state.username }
    console.log(user.username.length)
    if (user.username.length > 1) {
      //if username is long enough, send it to the server
      console.log(user)

      axios.post("http://localhost:5000/users/add", user)
        .then(res => console.log(res.data));
        //this connects back to front end

      alert( this.state.username + ' was added !')
      //alert confirming user was added

      this.setState({ username: "" })
    } else { //if not long enough, set an alert
      alert("Please ender a name, at least 2 letters long.");
    }
  }

  render() {
    return(
      <div>
        <h3>Create new user</h3>
        <form onSubmit={this.onSubmit}>

        <div className="form-group">
          <label>Username: </label>
          <input ref="userInput" required className="form-control card-background"
            placeholder="My name is.."
            value={this.state.username}
            onChange={this.onChangeUsername}/>
        </div>


        <div className="form-group">
          <input type="submit" onClick={this.onSubmit} value="Create New User" className="btn btn-primary" />
        </div>

        </form>
      </div>
    )
  }
};
