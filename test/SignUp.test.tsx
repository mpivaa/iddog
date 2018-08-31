import * as React from 'react';
import { mount } from 'enzyme';
import { SignUp } from '@app/auth';
import Setup, { store, fetchMock } from '@test/setup';

test('SignUp renders correctly', () => {
  const component = mount(
    <Setup>
      <SignUp />
    </Setup>
  );

  expect(component.render()).toMatchSnapshot();
});

test('Shows an error when email is not valid', (done) => {
  fetchMock.once('end:signup', {
    status: 404,
    body: { error: { message: 'Some error' }}
  });

  const component = mount(
    <Setup>
      <SignUp />
    </Setup>
  );

  component.find('input').simulate('change', {
    target: { value: 'invalid-email' }
  });

  component.find('form').simulate('submit');

  setTimeout(() => {
    expect(store.getState()).toMatchSnapshot();
    expect(component.render()).toMatchSnapshot();
    fetchMock.restore();
    done();
  }, 100);
});

test('Sets token and show feed when authorized', (done) => {
  fetchMock.once('end:signup', {
    user: { token: 'xyz' }
  });

  const component = mount(
    <Setup>
      <SignUp />
    </Setup>
  );

  component.find('input').simulate('change', {
    target: { value: 'valid@email.com' }
  });

  component.find('form').simulate('submit');

  setTimeout(() => {
    expect(store.getState().auth).toMatchSnapshot();
    expect(store.getState().router.location.pathname).toBe('/feed');
    fetchMock.restore();
    done();
  }, 100);
});
