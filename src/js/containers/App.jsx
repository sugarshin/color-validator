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
        <div className="preivew-image" style={{
          position: 'absolute',
          top: 10,
          left: 230
        }}>
          {this.props.images.map((image, i) => <img key={i} src={image.preview} />)}
        </div>
        <button onClick={this.props.actions.validateImages}>validate</button>
        {this.props.hasImage && this.props.isInvalid ? <span>指定カラーが含まれています</span> : null}
        {this.props.hasImage && this.props.isInvalid === false ? <span>OK!</span> : null}
        <div>
          <input type="text" onBlur={ev => this.props.actions.addValidateColors(ev.target.value)} />
        </div>
        <p>チェックする色</p>
        <ul style={{float: 'left'}}>
          {this.props.validateColors.map((color, i) => <li key={i}>{color} <button onClick={() => this.props.actions.deleteValidateColors(i)}>x</button></li>)}
        </ul>
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
