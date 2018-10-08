import React from 'react';
import { shallow } from 'enzyme';
import { findByTestAttr, checkProps } from '../../../test/testUtils';
import GuessedWords from './GuessWords';

const defaultProps = {
  guessedWords: [{ guessedWord: 'train', letterMatchCount: 3 }],
};

/**
 * Factoey function to create a ShallowWrapper for GuessWords Component
 * @function setup
 * @param  {Object} props Component props spesific to this setup
 * @return {ShalowWrapper}
 */

const setup = (props={}) => {
  const setupProps = { ...defaultProps, ...props };
  return shallow(<GuessedWords {...setupProps}/>)
}

test('does not throw warning with expected props', () => {
  checkProps(GuessedWords, defaultProps)
});


describe('if there are no words guessed', () => {
  //her test icinde ortak kullanilan methidlar oldugu icin beforeEach kullanildi
  let wrapper
  beforeEach(() => {
    wrapper = setup({ guessedWords: [] });
  });

  test('renders without error', () => {
    const component = findByTestAttr(wrapper, 'component-guessed-words');
    // console.log('component.length', component.length);
    expect(component.length).toBe(1);
  });

  test('renders instructions to guess a word',() => {
   const instructions = findByTestAttr(wrapper,'guess-instructions');
   expect(instructions.text().length).not.toBe(0);

  })
});

describe('if there are words guessed', () => {

});
