import React, { Component } from 'react';

export default class AddColorButton extends Component {
  render() {
    return (
      <div>
        <input type="text" ref="input" />
        <button onClick={() => this.props.actions.addValidateColors(this.refs.input.value)}>Add color</button>
      </div>
    );
  }
}
