import {} from 'babelify/polyfill';

import React from 'react';
import Root from './Root';

import dispatcher from './dispatcher';
import { init as initHandlers } from './handlers';

initHandlers(dispatcher);

React.render(
  <Root />,
  document.body
);
