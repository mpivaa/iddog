import * as React from 'react';
import { createBrowserHistory } from 'history';
import { parse } from 'query-string';
import { connect } from 'react-redux';
import { Redirect, Route, RouteProps } from 'react-router';
export {
  connectRouter,
  ConnectedRouter,
  routerMiddleware,
  RouterState,
  push,
} from 'connected-react-router';
import { getToken } from '@app/auth';
import { State } from '@app/store';

export const history = createBrowserHistory();

export const getLocation = (state: State) => state.router.location;
export const getQuery = (state: State) => parse(getLocation(state).search);

interface Props extends RouteProps {
  component: React.ComponentClass;
  token: string | null;
}

function DumbPrivRoute({ component: Component, token, ...rest }: Props) {
  return (
    <Route {...rest} render={(props) => (
      token ? (
        <Component {...props} />
      ) : (
        <Redirect to="/signup" />
      )
    )} />
  );
}

const mapProps = (state: State) => ({
  token: getToken(state),
});

export const PrivRoute = connect(mapProps)(DumbPrivRoute);
