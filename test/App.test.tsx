import * as React from 'react';
import * as renderer from 'react-test-renderer';
import { App } from '@app/App';
import Setup from '@test/setup';

test('App renders without errors', () => {
  const component = renderer.create(
    <Setup>
      <App />
    </Setup>
  );

  const tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});
