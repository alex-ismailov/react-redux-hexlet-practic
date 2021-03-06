import React from 'react';
import Enzyme, { mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import TodoBox from '../TodoBox.jsx';

Enzyme.configure({ adapter: new Adapter() });

test('TodoBox', () => {
  const wrapper = mount(<TodoBox />);
  expect(wrapper.render()).toMatchSnapshot();

  const input = wrapper.find('.todo-form input[type="text"]');
  input.simulate('change', { target: { value: 'My first task' } });
  expect(wrapper.render()).toMatchSnapshot();

  const form = wrapper.find('.todo-form');
  form.simulate('submit');
  expect(wrapper.render()).toMatchSnapshot();

  input.simulate('change', { target: { value: 'second task' } });
  expect(wrapper.render()).toMatchSnapshot();

  form.simulate('submit');
  expect(wrapper.render()).toMatchSnapshot();

  input.simulate('change', { target: { value: 'another task' } });
  expect(wrapper.render()).toMatchSnapshot();

  form.simulate('submit');
  expect(wrapper.render()).toMatchSnapshot();

  input.simulate('change', { target: { value: 'another task' } });
  expect(wrapper.render()).toMatchSnapshot();

  form.simulate('submit');
  expect(wrapper.render()).toMatchSnapshot();

  const buttons = wrapper.find('button[type="button"]');
  buttons.at(2).simulate('click');
  expect(wrapper.render()).toMatchSnapshot();

  buttons.at(1).simulate('click');
  expect(wrapper.render()).toMatchSnapshot();

  buttons.at(0).simulate('click');
  expect(wrapper.render()).toMatchSnapshot();

  input.simulate('change', { target: { value: 'one more time!' } });
  expect(wrapper.render()).toMatchSnapshot();

  form.simulate('submit');
  expect(wrapper.render()).toMatchSnapshot();
});
