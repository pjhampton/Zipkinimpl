import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

import { Tracer, ExplicitContext, BatchRecorder, jsonEncoder } from 'zipkin';
import wrapFetch from 'zipkin-instrumentation-fetch';
import { HttpLogger } from 'zipkin-transport-http';

const { JSON_V2 } = jsonEncoder;

class App extends Component {

  constructor() {
    super();
    this.state = {
      person: 'Not loaded',
      fetch: wrapFetch(fetch, {
        tracer: new Tracer({
          ctxImpl: new ExplicitContext(),
          // vvv this doesnt work, we need a recorder vvv
          recorder:  new HttpLogger({
            endpoint: 'http://localhost:9411/api/v1/spans',
            fetch,
          }),
        }),
        remoteServiceName: 'StarWars',
      }),
    }

    this.componentWillMount = this.componentWillMount.bind(this);
  }

  componentWillMount() {
    const randomNumber = Math.floor(Math.random() * 10) + 1;
    this.state.fetch("https://swapi.co/api/people/" + randomNumber)
      .then(response => response.json())
      .then(person => this.setState({
        person: person.name,
      })
      ).catch(e => console.error(e));
  }

  printhello() {
    alert("hello")
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">{this.state.person}</h1>
        </header>
        <button onClick={this.printhello}>Hello!</button>
        <button onClick={this.componentWillMount}>Make request</button>
      </div>
    );
  }
}

export default App;
