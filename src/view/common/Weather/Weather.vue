<template>
  <div class="weather-dec-box">
    <WeatherWarning
      :show="isShowWarningList"
      class="left"
      @close="isShowWarningList = false"
      @open="isShowWarningList = true"
    />
    <!-- <div :class="[`${skyIcon.icon}-bg`, 'icon']"></div> -->
    <div class="right" @click="showWeatherGraph">
      <div class="top">
        <!-- <span>{{ temperature + '℃' }}</span> -->
        <!-- <span class="wind-level">{{ wind }}</span> -->
        <span>{{ daily.HORTAIRRT + '℃' }}</span>
        <span class="wind-level">{{ daily.HORWINDDRT }}风{{ daily.HORWINDRT }}</span>
      </div>
      <div class="bottom">
        <span style="margin-right:10px">{{`湿度${(daily.HORQAIRRT * 100).toFixed(1)}%`}}</span>
        <span>过去1小时雨量{{ daily.HORPRERT }}毫米</span>
        <!-- <span class="name">{{ skyIcon.name }}</span> -->
        <!-- <span>{{
          daily.RAIN > 0 ? `降水${daily.RAIN}mm/h` : weatherRange
        }}</span> -->
      </div>
    </div>
  </div>
</template>

<script>
import Vue from 'vue';
import Bus from '@/utils/bus.js';
import { windSpeed, windDirection, getWindDirection, getWindLevel } from '../../../assets/js/weather.js';
import WeatherWarning from '../WeatherWarning/WeatherWarning.vue';
import Axios from 'axios';

export default {
  name: 'Weather',
  components: {
    WeatherWarning,
  },
  data() {
    return {
      getWindDirection: getWindDirection,
      getWindLevel: getWindLevel,
      daily: {
        // AREA: '', // 广州区名称
        // MINRH2M: '', // 最小相对湿度
        // MAXRH2M: '', // 最大相对湿度
        // F12WINDS: '', // 前12小时风速
        // L12WINDS: '', // 后12小时风速
        // MINT: 0, // 最低温度
        // MAXT: 0, // 最高温度
        // F12WEATHER: '', // 前12小时天气现象描述
        // L12WEATHER: '', // 后12小时天气现象描述
        // RAIN: 0, // 雨量
        // F12WINDD: '', // 前12小时风向
        // L12WINDD: '', // 后12小时风向
        // RTIME: '', // 发布时间
        // FTIME: 24, // 预报时次

        HORPRERT: 0, // 过去1小时雨量，单位：千克/平方米
        HORWINDDRT: 0, // 10米高风向，单位：度
        LONGITUDE: 0, // 格点经度
        HORPRENRT: null,
        HORTAIRRT: 0, // 2米高温度，单位：摄氏度
        HORWINDRT: 0, // 10米高风速，单位：M/S
        LATITUDE: 0, // 格点纬度
        HORQAIRRT: 0, // 2米高湿度比
      },
      skyIcon: {
        icon: '',
        name: '',
      },
      isShowWarningList: false,
      wind: '', // 风
      timer: null, // 定时器
    };
  },
  computed: {
    temperature() {
      if (this.daily.MINT || this.daily.MAXT) {
        const tem = this.daily.MINT + this.daily.MAXT;
        return tem % 2 > 0 ? Number(tem / 2).toFixed(1) : tem / 2;
      } else {
        return 0;
      }
    },
    // icon() {
    //   return require(`./assets/svg/weather/${icon}.svg`);
    // },
    precipitation() {
      if (this.daily.MINRH2M || this.daily.MAXRH2M) {
        const pre = this.daily.MINRH2M + this.daily.MAXRH2M;
        return pre % 2 > 0 ? Number(pre / 2).toFixed(2) : pre / 2;
      } else {
        return 0;
      }
    },
    weatherRange() {
      return this.daily.MINT + '~' + this.daily.MAXT + '℃';
    },
  },
  mounted() {
    // this.getWeather();
    // this.timer = setInterval(() => {
    //   this.wind = this.getWind()
    // }, 1000 * 60 * 30)
    
    this.getGridLive();
    // 一小时更新一次
    this.timer = setInterval(() => {
      this.getGridLive();
    }, 1000 * 60 * 60)
  },
  beforeDestroy() {
    clearInterval(this.timer)
  },
  methods: {
    /**
     * @description 获取风的数据
     */
    getWind() {
      if (new Date().getHours() > 12) {
        // 后12小时风速
        const direction = windDirection[Number(this.daily.L12WINDD)];
        const level = windSpeed[this.daily.L12WINDS];
        return `${direction} ${level}`;
      } else {
        // 前12小时风速
        const direction = windDirection[Number(this.daily.F12WINDD)];
        const level = windSpeed[this.daily.F12WINDS];
        return `${direction} ${level}`;
      }
    },
    /**
     * @description 网格实况融合（1KM）查询接口
     */
    getGridLive() {
      let data = {
        url: window.SITE_CONFIG['baseUrl'] + '/weather/gridLive',
        method: 'get',
        headers: {
          token: this.$store.state.token,
          'Content-Type': 'application/json; charset=UTF-8',
        },
      };
      Axios(data).then((data) => {
        if (data.data.code === 0) {
          const lon = Vue.cookie.get('longitude');
          const lat = Vue.cookie.get('latitude');
          const lon1 = Number(`${Number(lon).toFixed(2)}5`)
          const lat1 = Number(`${Number(lat).toFixed(2)}5`)
          const response = data.data.data.filter((el) => el.LONGITUDE === lon1).filter((el) => el.LATITUDE === lat1)
          if (response.length > 0) {
            const {
              HORPRERT, // 过去1小时雨量，单位：千克/平方米
              HORWINDDRT, // 10米高风向，单位：度
              LONGITUDE, // 格点经度
              HORPRENRT,
              HORTAIRRT, // 2米高温度，单位：摄氏度
              HORWINDRT, // 10米高风速，单位：M/S
              LATITUDE, // 格点纬度
              HORQAIRRT, // 2米高湿度比
            } = response[0]
            // 测试数据
            // } = {
            //   HORPRERT: 0,
            //   HORWINDDRT: 3.85,
            //   LONGITUDE: 114.015,
            //   HORPRENRT: null,
            //   HORTAIRRT: 28.02,
            //   HORWINDRT: 1.69,
            //   LATITUDE: 23.625,
            //   HORQAIRRT: 0.02
            // }
            const windLevel = getWindLevel(HORWINDRT * 3.6)
            this.daily = {
              HORPRERT, // 过去1小时雨量，单位：千克/平方米
              HORWINDDRT: getWindDirection(HORWINDDRT).direction, // 10米高风向，单位：度
              LONGITUDE, // 格点经度
              HORPRENRT,
              HORTAIRRT: HORTAIRRT.toFixed(0), // 2米高温度，单位：摄氏度
              HORWINDRT: `${windLevel.level}级`, // 10米高风速，单位：M/S  换算成km/h
              LATITUDE, // 格点纬度
              HORQAIRRT, // 2米高湿度比
            }
          }
        } else {
          this.$message.error(`获取天气失败`);
        }
      });
    },
    /**
     * @description 获取天气数据
     */
    getWeather() {
      let data = {
        url: window.SITE_CONFIG['baseUrl'] + '/weather/sevenDay/forecast',
        method: 'get',
        headers: {
          token: this.$store.state.token,
          'Content-Type': 'application/json; charset=UTF-8',
        },
      };
      Axios(data).then((data) => {
        if (data.data.code === 0) {
          if (data.data.data && data.data.data.length > 0) {
            const res = data.data.data.filter((el) => el.AREA === '增城区');
            console.log('增城区天气数据：', res);
            res.forEach((el) => {
              if (el.FTIME === 24) {
                this.daily = el;
              }
            });
            this.wind = this.getWind()
          }
        } else {
          this.$message.error(`获取天气失败`);
        }
      });
    },
    showWeatherGraph() {
      Bus.$emit('showWeatherGraph', true);
      this.isShowWarningList = false;
    },
  },
};
</script>

<style lang="scss" scoped>
.weather-dec-box {
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  position: absolute;
  right: 15px;
  top: 0px;
  height: 100%;
  color: #defdff;
  .icon {
    margin-right: 10px;
    width: 40px;
    height: 40px;
    background-size: 100%;
  }
  $icon-list: sunny, night, day_cloudy, night_cloudy, cloudy, LIGHT_HAZE,
    MODERATE_HAZE, HEAVY_HAZE, sprinkle, moderate_rain, heavyRain, stormRain,
    FOG, lightSnow, moderateSnow, heavySnow, stormSnow, dust, sand, WIND;
  @each $icon in $icon-list {
    // mask遮罩上色
    .#{$icon}-mask::before {
      display: inline-block;
      width: inherit;
      height: inherit;
      background: currentColor;
      mask: no-repeat center/100% url(./assets/svg/weather/#{$icon}.svg);
      color: inherit;
      content: '';
    }
    // background原色
    .#{$icon}-bg::before {
      display: inline-block;
      width: inherit;
      height: inherit;
      background: no-repeat center/100% url(./assets/svg/weather/#{$icon}.svg);
      color: inherit;
      content: '';
    }

    // background 透明图标
    .#{$icon}-transparent::before {
      display: inline-block;
      width: inherit;
      height: inherit;
      background: no-repeat
        center/100%
        url(./assets/svg/transparentWeather/#{$icon}.svg);
      color: inherit;
      content: '';
    }
  }
  .left {
  }
  .right {
    color: #defdff;
    display: flex;
    flex-direction: column;
    justify-content: center;
    div {
    }
    .top {
      display: flex;
      flex-wrap: nowrap;
      align-items: center;
      .wind-level {
        white-space: nowrap;
        margin-left: 10px;
      }
    }
    .bottom {
      display: flex;
      flex-wrap: nowrap;
      align-items: center;
      .name {
        margin-right: 5px;
      }
    }
  }
}
</style>