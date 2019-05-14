/* eslint-disable react/no-unused-state */
/* eslint-disable no-unused-vars */

import Taro, { Component } from '@tarojs/taro';
import wx from '@tarojs/taro-weapp';
import { View, Text, Image } from '@tarojs/components';
import { getRequestAjax, errMessage } from '../../utils/withAsync';
import amapFile from '../../libs/amap-wx';
import './index.less';

const amapKey = '4f0637a9697346a488bc63b8714eb9a2';

export default class Index extends Component {

  state = {
    weatherInfo: {},
    basic: {},
    update: {},
    userInfo: {}
  }

  config = {
    navigationBarTitleText: '天气'
  }

  componentWillMount () {
    
  }

  componentDidMount () {
    const _this = this;
    wx.checkSession({
      success(res) {
        _this.initPage();
        // session_key 未过期，并且在本生命周期一直有效
      },
      fail() {
        // session_key 已经失效，需要重新执行登录流程
        wx.login({
          success(res) {
            if (res.code) {
              // 发起网络请求
              wx.request({
                url: 'https://api.weixin.qq.com/sns/jscode2session',
                data: {
                  appid: 'wxeba507174da77153',
                  secret: 'bb8e4fa8433c8cab61871bf368d68627',
                  js_code: res.code,
                  grant_type: 'authorization_code'
                },
                success(res) {
                  console.log( res )
                  _this.initPage();
                },
                fail(err) {
                  console.log(err)
                  errMessage(err);
                }
              })
            } else {
              console.log('登录失败！' + res.errMsg)
              errMessage('登录失败！' + res.errMsg);
            }
          }
        });
      }
    });
  }

  componentWillUnmount () { }

  componentDidShow () { }

  componentDidHide () { }

  initPage = () => {
    const _this = this;
    wx.getSetting({
      success(res) {
        // if (res.authSetting['scope.userInfo']) {
        //   wx.getUserInfo({
        //     success(res) {
        //       _this.setState({ userInfo: res.userInfo });
        //       console.log(res.userInfo)
        //     }
        //   })
        // }
        if (!res.authSetting['scope.record']) {
          wx.getLocation({
            type: 'wgs84',
            success(res) {
              _this.getWeatherData( res );
            },
            fail(err) {
              errMessage(err);
            }
          });
        }
      }
    });
  };

  getWeatherData = res => {
    getRequestAjax( 'https://free-api.heweather.net/s6/weather/now', {
      location: `${res.longitude},${res.latitude}`,
      // location: '无锡',
      key: '72613825608142b3ae8890a8b98e04fc'
    }).then(({ data }) => {
      console.log(data.HeWeather6[0])
      this.setState({
        weatherInfo: data.HeWeather6[0].now,
        basic: data.HeWeather6[0].basic,
        update: data.HeWeather6[0].update
      })
    }).catch(err => {
      console.log(err)
      errMessage( err );
    }).finally(() => {
      wx.hideLoading();
    });
    // this.map = new amapFile.AMapWX({
    //   key:amapKey
    // });
    // this.map.getWeather({
    //   success: function(data){
    //     //成功回调
    //     console.log(data)
    //   },
    //   fail: function(info){
    //     //失败回调
    //     console.log(info)
    //     errMessage(info.errMsg);
    //   }
    // });
  };

  render () {
    const {
      basic, update, weatherInfo
    } = this.state;
    console.log(weatherInfo.cond_code)
    return (
      <View className='index'>
        <View className='user'>
          <open-data
            style="height:36px;width:36px;display:inline-block;"
            type="userAvatarUrl" />
          <open-data  
            style="font-size:14px;margin-left:16px;"
            type="userNickName" />
        </View>
        <View className='title'>
          <Text className='city'>{basic.parent_city}</Text>
          <Text className='time'>{update.loc || ''}更新</Text>
        </View>
        <View className='info'>
          <Text>温度：{weatherInfo.tmp}℃</Text>
          <Text>
            实况：
            {weatherInfo.cond_code ?
              <image src={`../../../assets/${weatherInfo.cond_code}.png`} />
              : null
            }
            {weatherInfo.cond_txt}
          </Text>
          <Text>风向：{weatherInfo.wind_dir}</Text>
          <Text>风力：{weatherInfo.wind_sc}</Text>
          <Text>风速：{weatherInfo.wind_spd}公里/小时</Text>
          <Text>能见度：{weatherInfo.vis}公里</Text>
        </View>
      </View>
    )
  }
}
