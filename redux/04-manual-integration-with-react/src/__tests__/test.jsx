import React from 'react';
import { createStore } from 'redux';
import Enzyme, { mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import reducers from '../reducers.js';
import App from '../components/App.jsx';
import { updateText, resetText } from '../actions.js';

Enzyme.configure({ adapter: new Adapter() });

test('Store', () => {
  const store = createStore(reducers);

  const vdom = (
    <App
      dispatch={store.dispatch}
      updateText={updateText}
      resetText={resetText}
    />
  );
  const wrapper = mount(vdom);
  store.subscribe(() => {
    const { text } = store.getState();
    wrapper.setProps({ text });
  });

  expect(wrapper.render()).toMatchSnapshot();

  const newTextInput = wrapper.find('input[type="text"]');
  const newTextReset = wrapper.find('button');

  newTextInput.simulate('change', { target: { value: 'na-na' } });
  wrapper.update();
  expect(wrapper.render()).toMatchSnapshot();

  newTextReset.simulate('click');
  expect(wrapper.render()).toMatchSnapshot();

  newTextInput.simulate('change', { target: { value: 'another task' } });
  expect(wrapper.render()).toMatchSnapshot();

  newTextReset.simulate('click');
  expect(wrapper.render()).toMatchSnapshot();
});
