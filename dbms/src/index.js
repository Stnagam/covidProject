import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import CountryListClass from './countryList';

export default class TestClass extends React.Component {
  constructor(props) {
    super(props);
    this.state = { myString: ''}
  }

  componentDidMount() {
    this.TestClass();
  }

  TestClass() {
    console.log("12345");
    fetch('/test',
    {
      method: 'GET',
      mode: 'cors',
      header:{
        'Accept': 'application/json, text/plain, */*'
      }
    }).then(response => response.json())
  .then(data => console.log(data));
  }

  render() {
    return (
      <div>
        {this.state.myString}
      </div>
    );
  }
}

ReactDOM.render(
  <React.StrictMode>
    <App />
    <CountryListClass />
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
