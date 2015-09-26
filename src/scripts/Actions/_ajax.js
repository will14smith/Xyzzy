import { AjaxRequest, AjaxResponse } from '../constants';
import { ajaxRequest as ajax } from '../utils';
import { dispatch } from '../dispatcher';

class Request {
  constructor(op) {
    this._data = {};
    this._data[AjaxRequest.OP] = op;
  }

  get op() { return this._data[AjaxRequest.OP]; }

  get serial() { return this._data[AjaxRequest.SERIAL]; }
  set serial(value) { this._data[AjaxRequest.SERIAL] = value; }

  get(key) { return this._data[key]; }

  // internal
  _set(key, value) {
    this._data[key] = value;
  }

  toObject() {
    return this._data;
  }
}

const pending = {};
let serialCounter = 0;

export default class Builder {
  constructor(op) {
    this._hasRun = false;

    this._request = new Request(op);
  }

  with(key, value) {
    this._assertNotRun();

    this._request._set(key, value);

    return this;
  }

  run() {
    this._assertNotRun();
    this._hasRun = true;

    this._request.serial = serialCounter++;
    Builder.addPending(this._request);

    const reqRaw = this._request.toObject();
    const reqData = {};
    Object.keys(reqRaw).forEach(key => {
      const item = reqRaw[key];
      if (typeof item === 'object') {
        reqData[key] = JSON.stringify(item);
      } else {
        reqData[key] = item;
      }
    });

    return ajax({
      method: 'POST',
      url: '/zy/AjaxServlet',
      data: reqData,
    }).then(data => {
      if (data[AjaxResponse.ERROR] === true) {
        return dispatch('ajaxError', data);
      }

      return dispatch('ajaxResponse', data);
    }, data => dispatch('ajaxError', data));
  }

  _assertNotRun() {
    if (this._hasRun === true) {
      throw new Error('This request has already run.');
    }
  }

  static getPending(serial) {
    return pending[serial];
  }
  static addPending(request) {
    pending[request.serial] = request;
  }
  static removePending(serial) {
    delete pending[serial];
  }
}
