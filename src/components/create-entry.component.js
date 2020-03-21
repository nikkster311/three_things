import React, { Component } from 'react';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";

export default class CreateEntry extends Component {
  constructor(props) {
    super(props);

    this.onChangeUsername = this.onChangeUsername.bind(this);
    this.onChangeEntry1 = this.onChangeEntry1.bind(this);
    this.onChangeEntry2 = this.onChangeEntry2.bind(this);
    this.onChangeEntry3 = this.onChangeEntry3.bind(this);
    this.onChangeDate = this.onChangeDate.bind(this);
    this.onSubmit = this.onSubmit.bind(this);

    this.state = {
      username: "",
      entry1: "",
      entry2: "",
      entry3: "",
      date: new Date(),
      users: []
    }
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

  onChangeEntry1(e) {
    this.setState({
      entry1: e.target.value
    });
  }

  onChangeEntry2(e) {
    this.setState({
      entry2: e.target.value
    });
  }

  onChangeEntry3(e) {
    this.setState({
      entry3: e.target.value
    });
  }

  onChangeDate(date) {
    this.setState({
      date: date
    });
  }
  onSubmit(e) {
    e.preventDefault();
    const entry = {
      username: this.state.username,
      entry1: this.state.entry1,
      entry2: this.state.entry2,
      entry3: this.state.entry3,
      date: this.state.date
    }

    console.log(entry)

    window.location = '/';
  }

  render() {
    return(
      <div>
        <h3>Create new entry</h3>
        <form onSubmit={this.onSubmit}>

        <div className="form-group">
          <label>Username: </label>
          <select ref="userInput" required className="form-control"
            value={this.state.username}
            onChange={this.onChangeUsername}>
            {
              this.state.users.map((user) => {
                return <option key={user} value={user}>{user}</option>;
              })
            }
          </select>
        </div>
        <div className="form-group">
          <label>One good thing that happened today was: </label>
          <input type="text" required className="form-control"
            value={this.state.entry1}
            onChange={this.onChangeEntry1}
          />
        </div>

        <div className="form-group">
          <label>A second good thing to happen today was:</label>
          <input type="text" required className="form-control"
            value={this.state.entry2}
            onChange={this.onChangeEntry2}
          />
        </div>

        <div className="form-group">
          <label>And a final good thing: </label>
          <input type="text" className="form-control" required
            value={this.state.entry3}
            onChange={this.onChangeEntry3}
          />
        </div>

        <div className="form-group">
          <label>Date: </label>
          <div>
            <DatePicker
              selected={this.state.date}
              onChange={this.onChangeDate}
            />
          </div>
        </div>

        <div className="form-group">
          <input type="submit" onClick={this.onSubmit} value="Create Entry" className="btn btn-primary" />
        </div>

        </form>
      </div>
    )
  }
};
