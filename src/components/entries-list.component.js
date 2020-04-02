import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrashAlt } from "@fortawesome/free-solid-svg-icons";
import "../App.css";

const Entry = props => ( //functional react component, therefore doesn't need lifestyle methods
  <div className="card card-background">
    <div className="card-body">
      <p className="card-text">{props.entry.entry1}</p>
      <p className="card-text">{props.entry.entry2}</p>
      <p className="card-text">{props.entry.entry3}</p>
      <h5 className="card-title">{props.entry.username}</h5>
      <p className="card-text"><small className="text-muted">{props.entry.date.substring(0, 10)}</small></p>

      <div className="icons">
        <div className='delete-btn'
          onClick={() => { if (window.confirm('Are you sure you want to delete this entry?')) {
            props.deleteEntry(props.entry._id)}}}>
          <FontAwesomeIcon icon={ faTrashAlt } />
          </div>
        </div>

        <div className="icons">
          <Link to={"/edit/" + props.entry._id}><FontAwesomeIcon icon={ faEdit } /></Link>
        </div>

    </div>
  </div>
)


export default class EntriesList extends Component {
  constructor(props) {
    super(props);

    this.deleteEntry = this.deleteEntry.bind(this);

    this.state = {entries: []};
  }

  componentDidMount() {
    axios.get("http://localhost:5000/entries")
      .then(res => {
        this.setState({entries: res.data})
      })
      .catch((error) => {
        console.log(error);
      })
  }

  deleteEntry(id) {
    axios.delete("http://localhost:5000/entries/" + id)
      .then(res => console.log(res.data));
    this.setState({
      entries: this.state.entries.filter(element => element._id !== id)
    }) //only return items that !== id that we are deleting
  }

  entriesList() {
    return this.state.entries.map(currentEntry => {
      return <Entry entry={currentEntry}
      deleteEntry={this.deleteEntry}
      key={currentEntry._id}/>;
    })
  }

  render() {
    return(

      <div className="card-columns">
            {this.entriesList()}
      </div>



  )}
}
