/* eslint-disable react/no-unused-state */
/* eslint-disable no-unused-vars */

import Taro, { Component } from '@tarojs/taro';
import wx from '@tarojs/taro-weapp';
import { View, Text, Button } from '@tarojs/components';
import { getRequestAjax, errMessage } from '../../utils/withAsync';
import amapFile from '../../libs/amap-wx';
import './index.less';

const amapKey = '4f0637a9697346a488bc63b8714eb9a2';

export default class Index extends Component {

  state = {
    data: [],
    canIUse: false
  }

  config = {
    navigationBarTitleText: '天气'
  }

  componentWillMount () {
    
  }

  componentDidMount () {
    // this.initPage();
  }

  componentWillUnmount () { }

  componentDidShow () { }

  componentDidHide () { }

  initPage = () => {
    wx.getSetting({
      success(res) {
        if (res.authSetting['scope.userInfo']) {
          wx.getUserInfo({
            success(res) {
              console.log(res.userInfo)
            }
          })
        }
        if (!res.authSetting['scope.record']) {
          wx.getLocation({
            type: 'wgs84',
            success(res) {
              console.log( res );
            }
          });
        }
      }
    });
  };

  render () {
    const onGotUserInfo = (e) => {
      console.log(e.detail.errMsg)
      console.log(e.detail.userInfo)
      console.log(e.detail.rawData)
    }
    return (
      <View className='index'>
        <open-data type="userAvatarUrl"></open-data>
        <open-data type="userNickName"></open-data>
        <Button
          type="default"
          size="mini"
          className='btn'
          lang="zh_CN">
          退出
        </Button>
        <Button
          type="primary"
          size="mini"
          open-type="getUserInfo"
          lang="zh_CN"
          className='btn'
          bindgetuserinfo={onGotUserInfo}>
          获取用户信息
        </Button>
      </View>
    )
  }
}
