import React from 'react';
import { shallow } from 'enzyme';

import { findByTestAttr, storeFactory } from '../../../test/testUtils';
import Input, { UnconnectedInput } from './Input';
import guessedWordsReducer from '../../reducers/guessedWordsReducer';


//testing icinde store olusturulmasi gerekiyor
const setup = (initialState = {}) => {
  const store = storeFactory(initialState);
  const wrapper = shallow(<Input store={store} />).dive();
  return wrapper;
}

describe('render', () => {
  describe('word has not been guessed', () => {
    let wrapper;
    beforeEach(() => {
      const initialState = { success: false };
      wrapper = setup(initialState);
    });
    test('renders component without error', () => {
      const component = findByTestAttr(wrapper, 'component-input');
      expect(component.length).toBe(1);
    });
    test('renders input box', () => {
      const inputBox = findByTestAttr(wrapper, 'input-box');
      expect(inputBox.length).toBe(1);
    });
    test('renders submit button', () => {
      const submitButton = findByTestAttr(wrapper, 'submit-button');
      expect(submitButton.length).toBe(1);
    });
  });

  describe('word has been guesssed', () => {
    let wrapper;
    beforeEach(() => {
      const initialState = { success: true };
      wrapper = setup(initialState);
    });
    test('renderconss component without error', () => {
      const component = findByTestAttr(wrapper, 'component-input');
      expect(component.length).toBe(1);
    });
    test('does not render input box', () => {
      const inputBox = findByTestAttr(wrapper, 'input-box');
      expect(inputBox.length).toBe(0);
    });
    test('does not render submit button', () => {
      const submitButton = findByTestAttr(wrapper, 'submit-button');
      expect(submitButton.length).toBe(0);
    });
  });
});

describe('redux props', () => {
  test('has success piece of state as prop', () => {
    const success = true;
    const wrapper = setup({ success });
    const successProp = wrapper.instance().props.success;
    expect(successProp).toBe(success);
  });

  test('guessWord action creator is a function prop', () => {
    const wrapper = setup();
    const guessWordProp = wrapper.instance().props.guessWord;
    expect(guessWordProp).toBeInstanceOf(Function);
  })
});

describe('guessWord action creator call', () => {
  let guessWordMock;
  let wrapper;
  const guessedWord = 'train';
  // set up mock for guessword
  beforeEach(() => {
    guessWordMock = jest.fn();
    const props = {
      guessWord: guessWordMock,
    }

    //set guessWordMock as the guessWord prop
    wrapper = shallow(<UnconnectedInput {...props} />);

    //add value to input box
    wrapper.instance().inputBox.current = { value: guessedWord };

    const submitButton = findByTestAttr(wrapper, 'submit-button')
    submitButton.simulate('click', {preventDefault() {} });
  });

  test('call guessWord action creator when button is clicked', () => {
    //check to see if mock run
    const guessWordMockCallCount = guessWordMock.mock.calls.length;
    expect(guessWordMockCallCount).toBe(1);
  })
  test('call guessWord with input value as argument', () => {
    //gueesword mock function daki argumentlare ulasmak icin
    const guessWordArg = guessWordMock.mock.calls[0][0]
    expect(guessWordArg).toBe(guessedWord);
  })

  test('input box clears on submit', () => {
    expect(wrapper.instance().inputBox.current.value).toBe('');
  })

})
