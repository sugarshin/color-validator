import React, { Component } from 'react';
import Dropzone from 'react-dropzone';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import classnames from 'classnames';

import * as rootActions from '../actions';

const mapStateToProps = state => ({ ...state });

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(rootActions, dispatch)
});

class App extends Component {
  render() {
    return (
      <div className="app">
        <Dropzone onDrop={this.props.actions.receiveImages} />
        <div className="preivew-image">
          {this.props.images.map((image, i) => (
            <div key={i}>
              <img src={image.preview} />
              <button onClick={() => this.props.actions.deleteImage(i)}>x</button>
            </div>
          ))}
          {this.props.didInvalidate ? <p>ファイル形式が画像じゃないですね</p> : null}
        </div>
        <button onClick={this.props.actions.validateImageColor}>validate</button>
        {this.props.images.length > 0 && this.props.isInvalid ? <span>指定カラーが含まれています</span> : null}
        {this.props.images.length > 0 && this.props.isInvalid === false ? <span>OK!</span> : null}
        <div className="color-input-container">
          <input type="text" ref="colorInput" />
          <button onClick={() => this.props.actions.addValidateColors(this.refs.colorInput.value)}>Add color</button>
        </div>
        <p>チェックする色</p>
        <ul className="validate-colors">
          {this.props.validateColors.map((color, i) => <li key={i}>{color} <button onClick={() => this.props.actions.deleteValidateColors(i)}>x</button></li>)}
        </ul>
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
