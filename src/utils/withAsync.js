/* eslint-disable no-unused-vars */
/* eslint-disable import/prefer-default-export */

import wx from '@tarojs/taro-weapp';
import { type } from 'os';

Promise.prototype.finally = function (callback) {
  let P = this.constructor;
  return this.then(
    value  => P.resolve(callback()).then(() => value),
    reason => P.resolve(callback()).then(() => { throw reason })
  );
};

export function errMessage(mes, callBack) {
  wx.showModal({
    title: '出错啦',
    content: mes,
    showCancel: false,
    confirmText: '稍后重试',
    success(res) {
      if (res.confirm) {
        console.log('用户点击确定')
        if ( callBack && typeof callBack === 'function' ) {
          callBack();
        }
      } else if (res.cancel) {
        console.log('用户点击取消')
      }
    }
  });
}

export function getRequestAjax( url, params ) {
  wx.showLoading({
    title: '加载中',
    mask: true
  });
  return new Promise(( resolve, reject ) => {
    wx.request({
      url: url,
      data: {
        ...params
      },
      success(res) {
        resolve( res );
      },
      fail(err) {
        console.log(err)
        reject( err );
      }
    });
  });
};
