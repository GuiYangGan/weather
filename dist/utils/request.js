"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; /* eslint-disable no-unused-vars */
/* eslint-disable import/prefer-default-export */

exports.getRequestAjax = getRequestAjax;

var _index = require("../npm/@tarojs/taro-weapp/index.js");

var _index2 = _interopRequireDefault(_index);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function getRequestAjax(url, params) {
  return new Promise(function (resolve, reject) {
    _index2.default.request({
      url: url,
      data: _extends({}, params),
      success: function success(res) {
        resolve(res);
      },
      fail: function fail(err) {
        reject(err);
      }
    });
  });
};