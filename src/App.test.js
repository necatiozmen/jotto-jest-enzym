import React from 'react';
// import Enzyme from 'enzym';
// import EnzymeAdapter from 'enzyme-adapter-react-16';
import ReactDOM from 'react-dom';
import App from './App';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<App />, div);
  ReactDOM.unmountComponentAtNode(div);
});
