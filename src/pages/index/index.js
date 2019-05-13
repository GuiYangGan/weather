/* eslint-disable react/no-unused-state */
/* eslint-disable no-unused-vars */

import Taro, { Component } from '@tarojs/taro';
import wx from '@tarojs/taro-weapp';
import { View, Text } from '@tarojs/components';
import { getRequestAjax, errMessage } from '../../utils/withAsync';
import './index.less';

export default class Index extends Component {

  state = {
    data: []
  }

  config = {
    navigationBarTitleText: '天气'
  }

  componentWillMount () {
    
  }

  componentDidMount () {
    this.getData();
  }

  componentWillUnmount () { }

  componentDidShow () { }

  componentDidHide () { }

  getData = () => {
    getRequestAjax( 'https://free-api.heweather.net/s6/weather/now', {
      location: '无锡',
      key: 'weather'
    }).then((data) => {
      console.log(data)
      this.setState({ data });
    }).catch((err) => {
      console.log(err)
      errMessage( err.errMsg );
    }).finally(() => {
      wx.hideLoading();
    });
  };

  render () {
    return (
      <View className='index'>
        <Text>Hello world!</Text>
      </View>
    )
  }
}
