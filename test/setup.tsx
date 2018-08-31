import * as React from 'react';
import { App } from '@app/App';
import { history } from '@app/router';
import store from '@app/store';
import { ConnectedRouter } from 'connected-react-router';
import { Provider } from 'react-redux';
import { configure } from 'enzyme';
// @ts-ignore
import Adapter from 'enzyme-adapter-react-16';
// @ts-ignore
import fetchMock from 'fetch-mock';

configure({ adapter: new Adapter() });

export { store, fetchMock };

export const Setup: React.SFC = (props) => {
  return (
    <Provider store={store}>
      <ConnectedRouter history={history}>
        {props.children}
      </ConnectedRouter>
    </Provider>
  );
};

export default Setup;
