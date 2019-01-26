import React from 'react'
import { hydrate } from 'react-dom'
import App from '../shared/App';

hydrate(
  <App data={window.__INITIAL_DATA__} arrayPropr={window.__INITIAL_ARRAY__} arrayFromFetch={window.__INITIAL_ARRAYFETCH__} />,
  document.getElementById('app')
);