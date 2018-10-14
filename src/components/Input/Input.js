import React, { Component } from 'react';
import { connect } from 'react-redux';

import { guessWord } from '../../actions';

export class UnconnectedInput extends Component {
   
  constructor(props) {
    super(props);
    this.inputBox = React.createRef();
  }

   buttonSubmit = (event) => {
     //dont submit form
     event.preventDefault();
  
   const guessedWord = this.inputBox.current.value;
   if (guessedWord && guessedWord.length > 0) {
     this.props.guessWord(guessedWord)
   }
   this.inputBox.current.value = '';
  }

  render() {
    const contents = this.props.success
    ? null
    : (
      <form className="form-inline">
        <input
          data-test="input-box"
          className="mb-2 mx-sm-3"
          id="word-guess"
          type="text"
          placeholder="enter guess"
          ref={this.inputBox }
        />
        <button
          onClick={this.buttonSubmit}
          data-test="submit-button"
          type="submit"
          className="btn btn-primary mb-2" >
        </button>
      </form>
    )
    return (
      <div data-test="component-input">
        { contents }
      </div>
    );
  }

}

const mapStateToProps = ({ success }) => {
  return { success }
}



export default connect(mapStateToProps, { guessWord })(UnconnectedInput);
