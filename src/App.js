import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  getSecretWord,

}
  from './actions';
import './App.css';

import GuessedWords from './components/GuessWords/GuessWords';
import Congrats from './components/Congrats/Congrats';

export class UnconnectedApp extends Component {

  componentDidMount() {
    // get the secret word
    this.props.getSecretWord();
  }

  render() {
    return (
      <div data-test="app-component" className="container">
        <h1>Jotto</h1>
        <div>The secret word is {this.props.secretWord}</div>
        <Congrats success={this.props.success} />
        <GuessedWords guessedWords={this.props.guessedWords} />
      </div>
    );
  }
}

const mapStateToProps = ({ success, guessedWords, secretWord }) => {
  return { success, guessedWords, secretWord }
}

const actions = {
  getSecretWord
}

export default connect(mapStateToProps, actions)(UnconnectedApp);
