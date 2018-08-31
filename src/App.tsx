import * as React from 'react';
import { SignUp } from '@app/auth';
import { Feed } from '@app/feed';
import { getLocation, PrivRoute } from '@app/router';
import { State } from '@app/store';
import { Layout } from '@app/ui';
import { connect } from 'react-redux';
import { Redirect, Route, Switch } from 'react-router-dom';

export function App() {
  return (
    <Layout>
      <Switch>
        <Route path="/signup" component={SignUp} />
        <PrivRoute path="/feed" component={Feed} />
        <Redirect from="/" to="/feed" />
      </Switch>
    </Layout>
  );
}

const mapState = (state: State) => ({
  location: getLocation(state),
});

export default connect(mapState)(App as React.SFC);
