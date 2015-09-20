function isNull(val) {
  return val === null || val === void 0;
}

function formEscape(val) {
  const str = !isNull(val) ? val.toString() : '';

  return str.split('').map(ch => {
    if (/[0-9a-zA-Z]/.test(ch)) { return ch; }
    if (ch === ' ') { return '+'; }

    return '%' + ch.charCodeAt(0).toString(16);
  }).join('');
}

function toFormData(data) {
  return Object.keys(data)
    .map(key => formEscape(key) + '=' + formEscape(data[key]))
    .join('&');
}

export function ajaxRequest({ url, data, method = 'GET' }) {
  const normMethod = method.toUpperCase();

  const request = new XMLHttpRequest();
  request.open(normMethod, url, true);

  const promise = new Promise((resolve, reject) => {
    request.addEventListener('load', function handleLoad() { resolve(this); });
    request.addEventListener('error', function handleError() { reject(this); });
  });

  if (normMethod === 'POST' && data) {
    const formData = toFormData(data);

    request.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded; charset=UTF-8');
    request.send(formData);
  } else {
    request.send();
  }

  return promise.then(xhr => {
    if (xhr.status < 200 || xhr.status >= 400) {
      throw xhr;
    }

    return JSON.parse(xhr.response);
  });
}

import chatStore, { Message } from './Models/Chat';
export function log(message) {
  chatStore.addMessage(new Message({
    time: Date.now(),
    text: message,
    className: 'message--info',
  }));
}
export function warn(message) {
  chatStore.addMessage(new Message({
    time: Date.now(),
    text: message,
    className: 'message--warn',
  }));
}
export function error(message) {
  chatStore.addMessage(new Message({
    time: Date.now(),
    text: message,
    className: 'message--error',
  }));
}
