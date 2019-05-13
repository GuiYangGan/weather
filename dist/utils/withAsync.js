'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; /* eslint-disable no-unused-vars */
/* eslint-disable import/prefer-default-export */

exports.errMessage = errMessage;
exports.getRequestAjax = getRequestAjax;

var _index = require('../npm/@tarojs/taro-weapp/index.js');

var _index2 = _interopRequireDefault(_index);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

Promise.prototype.finally = function (callback) {
  var P = this.constructor;
  return this.then(function (value) {
    return P.resolve(callback()).then(function () {
      return value;
    });
  }, function (reason) {
    return P.resolve(callback()).then(function () {
      throw reason;
    });
  });
};

function errMessage(mes, callBack) {
  _index2.default.showModal({
    title: '出错啦',
    content: mes,
    showCancel: false,
    confirmText: '稍后重试',
    success: function success(res) {
      if (res.confirm) {
        console.log('用户点击确定');
        if (callBack && typeof callBack === 'function') {
          callBack();
        }
      } else if (res.cancel) {
        console.log('用户点击取消');
      }
    }
  });
}

function getRequestAjax(url, params) {
  _index2.default.showLoading({
    title: '加载中',
    mask: true
  });
  return new Promise(function (resolve, reject) {
    _index2.default.request({
      url: url,
      data: _extends({}, params),
      success: function success(res) {
        resolve(res);
      },
      fail: function fail(err) {
        console.log(err);
        reject(err);
      }
    });
  });
};