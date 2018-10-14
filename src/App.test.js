import React from 'react';
import { shallow } from 'enzyme';

import ReactDOM from 'react-dom';
import { findByTestAttr, storeFactory} from '../test/testUtils';

import App, {UnconnectedApp} from './App';

const initialState = {
  guessedWords: [{ guessedWord: 'train', letterMatchCount: 3 }],
  success: true,
  secretWord : 'party'
};

const setup = (initialState={}) => {
  const store = storeFactory(initialState);
  return shallow(<App store={store}/>).dive();
}


describe('App component', () => {
  let wrapper;
  beforeEach(() => {
    wrapper = setup(initialState);
  })
  test('renders without crashing', () => {
    const component = findByTestAttr(wrapper, 'app-component');
    expect(component.length).toBe(1);
  });
});

describe('redux props', () => {
  let wrapper;
  beforeEach(() => {
    wrapper = setup(initialState);
  })
  test('has success piece of state as prop',() => {
    const successProp  =  wrapper.instance().props.success;
    expect(successProp).toBe(initialState.success);
  });
  test('has guessedWords piece of state as prop',() => {
    const guessedWords = wrapper.instance().props.guessedWords;
    expect(guessedWords).toBe(initialState.guessedWords);
  });
  test('has secretWord piece of state as prop',() => {
    const secretWordProps = wrapper.instance().props.secretWord;
    expect(secretWordProps).toBe(initialState.secretWord);
  });
  test('`getSecretWord` action creator is a function on the props', () => {
    const getSecretWordProp = wrapper.instance().props.getSecretWord;
    expect(getSecretWordProp).toBeInstanceOf(Function);
  });
})

test('getSecretWord runs on App mount', () => {
    const getSecretWordMock = jest.fn();
    //prop typelari gecmek icin yaptik
    const props = {
      getSecretWord: getSecretWordMock,
      success: false,
      guessedWord: [],
    }
    //setup app component with getSecretWordMock as the getSecretWord prop
    const wrapper = shallow (<UnconnectedApp {...props} />)

    //run lifecyle method
    wrapper.instance().componentDidMount();

    //check to see if mock ran
    const getSecretWordCallCount = getSecretWordMock.mock.calls.length;
    expect(getSecretWordCallCount).toBe(1);
})
