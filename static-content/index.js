import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import injectTapEventPlugin from 'react-tap-event-plugin';
import './css/main.css';

injectTapEventPlugin();

ReactDOM.render(
  <App />,
  document.getElementById('root')
);
