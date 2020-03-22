import React, { Component } from 'react';
import axios from 'axios';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";

export default class EditEntry extends Component {
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
    axios.get("http://localhost:5000/entries/"+this.props.match.params.id)
      .then(res => {
        this.setState({
          username: res.data.username,
          entry1: res.data.entry1,
          entry2: res.data.entry2,
          entry3: res.data.entry3,
          date: new Date(res.data.date)
        })
      })
      .catch((err) => {
        console.log(err);
      })

    axios.get('http://localhost:5000/users/')
      .then(res => {
        if (res.data.length > 0) {
          this.setState({
            users: res.data.map(user => user.username),
          })
        }
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

    var text = "Remember, the small things count. Did you enjoy a quiet moment? Did something make you smile? Did you find peace in something?";
    console.log(entry)
    var entryLengths = [entry.entry1.length, entry.entry2.length, entry.entry3.length]
    console.log(entryLengths)

    if (entryLengths.includes(0)) {
      alert(text);  //if any of the entries are empty, post an alert
    } else {
      //if no entries are empty, send to server

    axios.post("http://localhost:5000/entries/update/" + this.props.match.params.id, entry)
      .then(res => console.log(res.data));

      window.location = "/";
  }}

  render() {
    return (
      <div>
        <h3>Edit Entry</h3>
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
          <input type="submit" onClick={this.onSubmit} value="Edit Entry" className="btn btn-primary" />
        </div>

        </form>
      </div>
    )
  }
}
