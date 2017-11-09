import React from 'react';
import logo from './logo.svg';
import './App.css';

import { Tracer, ExplicitContext, BatchRecorder, jsonEncoder } from 'zipkin';
import wrapFetch from 'zipkin-instrumentation-fetch';
import { HttpLogger } from 'zipkin-transport-http';
const { JSON_V2 } = jsonEncoder;

const zipkinFetch = wrapFetch(fetch, {
  tracer: new Tracer({
    ctxImpl: new ExplicitContext(),
    recorder: new BatchRecorder({
      logger: new HttpLogger({
        endpoint: "http://localhost:9411/api/v2/spans",
        jsonEncoder: JSON_V2,
        fetch,
      }),
    }),
  }),
  serviceName: 'ui',
  remoteServiceName: 'helloapp',
});

class App extends React.Component {

  constructor() {
    super();

    this.state = {
      person: 'Not loaded'
    };

    this.componentWillMount = this.componentWillMount.bind(this);
  }

  componentWillMount() {
    const randomNumber = Math.floor(Math.random() * 10) + 1;
    const url = "https://swapi.co/api/people/" + randomNumber;

    this.setState(() => {
      return {person: url}
    })

    zipkinFetch("http://localhost:8080").then(res => res.json()).then(data => console.log(data));
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
