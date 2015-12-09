import React, { Component } from 'react';
import Dropzone from 'react-dropzone';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import classnames from 'classnames';

import AddColorButton from '../components/AddColorButton';

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
        </div>
        <button onClick={this.props.actions.validateImages}>validate</button>
        {this.props.images.length > 0 && this.props.isInvalid ? <span>指定カラーが含まれています</span> : null}
        {this.props.images.length > 0 && this.props.isInvalid === false ? <span>OK!</span> : null}
        <AddColorButton actions={this.props.actions} />
        <p>チェックする色</p>
        <ul className="validate-colors">
          {this.props.validateColors.map((color, i) => <li key={i}>{color} <button onClick={() => this.props.actions.deleteValidateColors(i)}>x</button></li>)}
        </ul>
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
