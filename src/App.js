import React from 'react';
import logo from './logo.svg';
import './App.css';
import { Link } from 'react-router-dom'

class App extends React.Component{
  constructor (props) {
    super(props)
    this.state = {
        currentUser: null
    };
  }
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <p>
            Edit <code>src/App.js</code> and save to reload.
            <Link to="/sobre">Ir para a página sobre \o/</Link>
          </p>
          <a
            className="App-link"
            href="https://reactjs.org"
            target="_blank"
            rel="noopener noreferrer"
          >
            Learn React
          </a>
        </header>
      </div>
    );
  }
}

export default App;
