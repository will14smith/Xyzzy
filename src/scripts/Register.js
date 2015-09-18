import React from 'react';

import { AjaxOperation, AjaxResponse, ErrorCodeText } from './constants';
import dispatcher from './dispatcher';

import sendRegister from './Actions/Register';

export default class Register extends React.Component {
  constructor() {
    super();
    this.state = {};
  }

  componentDidMount() {
    this._handleError = data => this.handleError(data);
    dispatcher.on(`${AjaxOperation.REGISTER}Error`, this._handleError);
  }

  componentWillUnmount() {
    dispatcher.off(`${AjaxOperation.REGISTER}Error`, this._handleError);
  }


  handleSubmit(e) {
    e.preventDefault();

    const name = React.findDOMNode(this.refs.name).value.trim();

    sendRegister({ name });
  }
  handleError(data) {
    const errorCode = data[AjaxResponse.ERROR_CODE];
    const errorMessage = ErrorCodeText[errorCode];

    this.setState({
      error: errorMessage,
    });
  }

  render() {
    const form = (<div className="card">
      <form onSubmit={e => this.handleSubmit(e)}>
        <label>Register: </label>
        <input type="text" placeholder="Nickname" ref="name" />
        <input type="submit" value="Register" />
      </form>
    </div>);

    if (!this.state.error) {
      return form;
    }
    return (<div>
      <div className="card card--error">{this.state.error}</div>
      {form}
    </div>);
  }
}
