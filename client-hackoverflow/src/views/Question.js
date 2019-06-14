import React, { Component } from 'react'

export default class Question extends Component {
  componentDidMount() {
    const { onSetQuestionForm } = this.props;
    onSetQuestionForm(false);
  }

  render() {
    return (
      <div>
        Ini detail question
      </div>
    )
  }
}
