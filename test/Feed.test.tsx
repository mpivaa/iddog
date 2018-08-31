import * as React from 'react';
import { mount } from 'enzyme';
import { Feed } from '@app/feed';
import Setup, { fetchMock, store } from '@test/setup';

const fixture = {
  husky: {
    category: 'husky',
    list: [
      'https://dog.ceo/api/img/husky/n02110185_10047.jpg',
      'https://dog.ceo/api/img/husky/n02110185_10116.jpg'
    ]
  },
  labrador: {
    category: 'labrador',
    list: [
      'https://dog.ceo/api/img/labrador/n02099712_1150.jpg',
      'https://dog.ceo/api/img/labrador/n02099712_1200.jpg',
      'https://dog.ceo/api/img/labrador/n02099712_1229.jpg'
    ]
  }
};

fetchMock.mock('end:/feed?category=husky', fixture.husky);
fetchMock.mock('end:/feed?category=labrador', fixture.labrador);

test('Feed renders correctly', (done) => {
  const component = mount(
    <Setup>
      <Feed />
    </Setup>
  );

  setTimeout(() => {
    const rendered = component.render();
    expect(rendered).toMatchSnapshot();
    expect(store.getState().feed).toMatchSnapshot();
    done();
  }, 500);
});

test('Set category', (done) => {
  const component = mount(
    <Setup>
      <Feed />
    </Setup>
  );

  expect(component.render()).toMatchSnapshot();

  component.find({ href: '/?category=labrador' })
    .simulate('click', { button: 0 });

  setTimeout(() => {
    expect(component.render()).toMatchSnapshot();
    expect(store.getState().feed).toMatchSnapshot();
    done();
  }, 500);
});

test('Show item', (done) => {
  const component = mount(
    <Setup>
      <Feed />
    </Setup>
  );

  setTimeout(() => {
    component.find('LazyImage').first().props().onClick!({} as any);
    expect(component.render()).toMatchSnapshot();
    expect(store.getState().router.location.search).toMatchSnapshot();
    done();
  }, 500);
});
