/* eslint-disable */
import React from 'react';
import App from './view/App.js';
import Store from './store';

import './style.css';

const Game = (props) => <App {...props} store={Store} />

export { Game }
