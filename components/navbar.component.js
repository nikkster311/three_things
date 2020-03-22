import React, { Component } from 'react';
import { Link } from 'react-router-dom';


export default class Navbar extends Component{
  constructor(props){
    super(props);
    this.state = { menu: false };
    this.toggleMenu = this.toggleMenu.bind(this);
  }

  toggleMenu(){
    this.setState({ menu: !this.state.menu })
  }

  render() {

    const show = (this.state.menu) ? "show" : "";

    return (
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark default-color">
        <Link to ="/" className="navbar-brand" >Three Things</Link>
        <button className="navbar-toggler" type="button" onClick={this.toggleMenu}
          aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className={"collapse navbar-collapse " + show} id="navbarNav">
          <ul className="navbar-nav">
            <li className="nav-item active">
              <Link to ="/" className="nav-link">Home <span className="sr-only">(current)</span></Link>
            </li>
            <li className="nav-item">
              <Link to ="/user" className="nav-link">Create User</Link>
            </li>
            <li className="nav-item">
              <Link to ="/create" className="nav-link">Create Entry</Link>
            </li>
          </ul>
        </div>
      </nav>
)}};
