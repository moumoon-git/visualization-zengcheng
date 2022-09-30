<template>
  <div class="weather-utility">
    <div
      v-if="weatherToday"
      class="weather-utility__today"
      @mouseenter="drawBrokenLine"
    >
      <i :class="['weather-utility__today__icon', `weather-utility__icon--${weatherCode(weatherToday.weather)}`]" />
      <div class="weather-utility__today__row">
        <span class="weather-utility__today__temperature weather-utility__gradient">{{ weatherToday.temperature }}℃</span>
        <span>
          <div>{{ weatherToday.city }}</div>
          <div style="white-space: nowrap;">{{ weatherToday.weather }}</div>
        </span>
      </div>
      <div class="weather-utility__today__row">
        <span>湿度：{{ weatherToday.humidity }}%</span>
        <span>{{ weatherToday.windDirection }}风{{ weatherToday.windPower }}级</span>
      </div>
    </div>
    <div v-else>加载中</div>
    <div
      v-if="weatherForecast"
      class="weather-utility__window"
    >
      <div class="weather-utility__window__title">最近4天天气状况</div>
      <div class="weather-utility__window__content">
        <div
          v-for="(forecast, forecastIndex) in weatherForecast"
          :key="`${weatherForecast.adcode}_${forecastIndex}`"
          class="weather-utility__window__content__item"
        >
          <div>{{ forecastIndex === 0 ? '今天' : forecast.week }}</div>
          <div>{{ forecast.date }}</div>
          <div :class="`weather-utility__icon--${weatherCode(forecast.dayWeather)}`" />
          <div :title="forecast.dayWeather">{{ forecast.dayWeather }}</div>
          <div>{{ forecast.dayTemp }}℃</div>
          <div>{{ forecast.nightTemp }}℃</div>
        </div>
        <div ref="dayTemp" />
        <div ref="nightTemp" />
      </div>
    </div>
  </div>
</template>

<script>
import echarts from 'echarts';

export default {
  name: 'WeatherUtility',
  data() {
    return {
      /**
       * @description 今日天气
       * @property
       * city 城市
       * weather 天气
       * temperature 温度
       * windDirection 风向
       * windPower 风力
       * humidity 湿度
       */
      weatherToday: null,
      // 预报天气
      weatherForecast: null,
    };
  },
  mounted() {
    // 轮询等待高德地图实例加载完毕
    const timer = setInterval(async () => {
      if (window.map) {
        // 地图移动结束时查询地图中心点所在城市的天气
        window.map.on('moveend', async () => {
          // 1. 初始化显示结果
          this.weatherToday = null;
          this.weatherForecast = null;
          // 2. 获取所在城市
          const cityName = await this.getCityName();
          // 3. 获取天气
          if (cityName) {
            this.getWeather(cityName);
          }
        });
        clearInterval(timer);
      }
    }, 100);
  },
  methods: {
    /**
     * @description 获取地图中心点所在城市
     * @return {Promise(String)} 城市名
     */
    getCityName() {
      const center = window.map.getCenter();
      const geocoder = new AMap.Geocoder();
      return new Promise((resolve, reject) => {
        geocoder.getAddress(center, (status, result) => {
          if (status === 'complete') {
            if (result && result.regeocode && result.regeocode.addressComponent) {
              // 城市代码
              const cityName = result.regeocode.addressComponent.city;
              resolve(cityName);
            }
          }
          else if (status === 'error') {
            this.$message.error(`无法获取地图中心地理位置，错误信息：${result}`);
            reject();
          } else if (status === 'no_data') {
            this.$message.error('查询地图中心地理位置为空');
            reject();
          }
        });
      });
    },
    /**
     * @description 查询天气
     * @param {String} cityName 城市代码
     */
    getWeather(cityName) {
      const weather = new AMap.Weather();
      // 查询实时天气信息
      weather.getLive(cityName, (errorStatus, result) => {
        // 查询成功
        if (errorStatus === null) {
          this.weatherToday = result;
        } else {
          this.$message.error(`查询实时天气失败，错误信息：${errorStatus}`);
        }
      });
      // 查询未来4天天气预报
      weather.getForecast(cityName, (errorStatus, result) => {
        // 查询成功
        if (errorStatus === null) {
          this.weatherForecast = result.forecasts;
          this.weatherForecast.forEach((forecast) => {
            switch (forecast.week) {
              case '0': {
                forecast.week = '周日';
                break;
              }
              case '1': {
                forecast.week = '周一';
                break;
              }
              case '2': {
                forecast.week = '周二';
                break;
              }
              case '3': {
                forecast.week = '周三';
                break;
              }
              case '4': {
                forecast.week = '周四';
                break;
              }
              case '5': {
                forecast.week = '周五';
                break;
              }
              case '6': {
                forecast.week = '周六';
                break;
              }
            }
          });
          setTimeout(() => {
            this.drawBrokenLine()
          }, 1);
        } else {
          this.$message.error(`查询预报天气失败，错误信息：${errorStatus}`);
        }
      });
    },
    /**
     * @description 根据天气返回对应控制样式的编号
     * @param {String} weather 天气
     * @return {Number} 天气编号
     */
    weatherCode(weather) {
      if (weather.includes('雪')) {
        return 5;
      }
      if (weather.includes('雷')) {
        return 6;
      }
      if (weather.includes('雨') && weather.includes('大')) {
        return 4;
      }
      if (weather.includes('雨')) {
        return 3;
      }
      if (weather === '晴') {
        return 1;
      }
      if (weather === '阴' || weather === '多云') {
        return 2;
      }
      if (weather.includes('雾') || weather === '霾') {
        return 7;
      }
      if (weather.includes('沙')) {
        return 8;
      }
      if (weather.includes('龙卷')) {
        return 9;
      }
    },
    /**
     * @description 绘制折线
     */
    drawBrokenLine() {
      if (this.weatherForecast) {
        const dayGraph = echarts.init(this.$refs.dayTemp);
        const nightGraph = echarts.init(this.$refs.nightTemp);
        const option = {
          // 坐标系定位
          grid: {
            left: '0px',
            right: '0px',
            top: '5px',
            bottom: '5px',
          },
          // x轴隐藏
          xAxis:{
            data:['day1', 'day2', 'day3', 'day4'],
            show: false,
          },
          // y轴隐藏
          yAxis:{
            show: false,
          },
        };
        dayGraph.setOption({
          color: '#F1556E',
          series: [{
            type: 'line',
            data: this.weatherForecast.map((forecast) => forecast.dayTemp),
          }],
          ...option,
        });
        nightGraph.setOption({
          color: '#489FF8',
          series: [{
            type: 'line',
            data: this.weatherForecast.map((forecast) => forecast.nightTemp),
          }],
          ...option,
        });
        this.$nextTick(() => {
          dayGraph.resize();
          nightGraph.resize();
        });
      }
    },
  },
};
</script>

<style lang="scss">
.weather-utility {
  position: absolute;
  right: 15px;
  top: -5px;
  height: 80px;
  // 渐变色
  &__gradient {
    color: #7D1EFF;
    background: -webkit-linear-gradient(-90deg, #7D1EFF 30%, #1CC5FF);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
  }
  // 天气图标
  $weather-list: 
    '晴',
    '阴',
    '小雨',
    '大雨',
    '雪',
    '雷阵雨',
    '雾',
    '沙',
    '龙卷'
  ;
  @each $weather in $weather-list {
    &__icon--#{index($weather-list, $weather)} {
      background: no-repeat center/100% 100% url(./img/#{$weather}.png);
    }
  }
  &:hover &__window {
    display: block;
  }
  // 实时天气
  &__today {
    color: #2286F6;
    font-size: 14px;
    width: 160px;
    height: 70px;
    position: relative;
    cursor: default;
    user-select: none;
    &__icon {
      position: absolute;
      left: -15px;
      top: 0px;
      width: 65px;
      height: 85px;
      transform: translateX(-100%);
    }
    &__row {
      display: flex;
      align-items: center;
      & > span:first-child {
        flex: 1;
      }
    }
    &__temperature {
      font-size: 36px;
      font-weight: bold;
    }
  }
  // 天气预报
  &__window {
    display: none;
    width: 400px;
    background: #031131;
    border: 1px solid rgba(0, 23, 63, .3);
    position: absolute;
    right: -15px;
    top: 80px;
    box-shadow: 0px 5px 20px rgba(0, 0, 0, .3);
    overflow: hidden;
    &:after {
      content: '';
      display: block;
      position: absolute;
      height: 30px;
      background: linear-gradient(0deg, rgba(5, 91, 197, 0.603), transparent);
      bottom: -15px;
      width: 100%;
      border-radius: 0;
      border-top-left-radius: 100%;
      border-top-right-radius: 100%;
    }
    &__title {
      color: #C7D6EC;
      font-size: 14px;
      height: 28px;
      line-height: 28px;
      padding-left: 18px;
      background: linear-gradient(to right, rgba(16, 51, 114, 1) 70%, transparent);
    }
    &__content {
      display: flex;
      height: 370px;
      color: #99C9E7;
      &__item {
        flex: 1;
        text-align: center;
        cursor: pointer;
        position: relative;
        z-index: 1;
        // 间隔线
        &:not(:last-child)::after {
          content: '';
          display: block;
          position: absolute;
          top: 40px;
          right: 0;
          width: 1px;
          height: 280px;
          background: rgba(21, 61, 150, 0.45);
        }
        &:hover {
          background: linear-gradient(to bottom, transparent 10%, rgba(5, 91, 197, 0.3), transparent 60%);
          & > div:nth-child(-n+2) {
            color: #7D1EFF;
            background: -webkit-linear-gradient(-90deg, #7D1EFF 30%, #1CC5FF);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
          }
          & > div:nth-child(5) {
            color: #F15774;
          }
          & > div:nth-child(6) {
            color: #489FF8;
          }
        }
        & > div:first-child {
          margin: 37px 0 12px;
        }
        & > div:nth-child(3) {
          width: 30px;
          height: 40px;
          margin: 18px auto 0;
        }
        & > div:nth-child(4) {
          overflow: hidden;
          width: 100%;
          white-space: nowrap;
          text-overflow: ellipsis;
        }
        & > div:nth-child(5),
        & > div:nth-child(6) {
          color: #CACFD8;
          font-size: 14px;
        }
        & > div:nth-child(5) {
          margin: 37px auto 60px;
        }
      }
      & > div:last-child {
        position: absolute;
        width: 100%;
        height: 25px;
        bottom: 75px;
      }
      & > div:nth-last-child(2) {
        position: absolute;
        width: 100%;
        height: 25px;
        bottom: 100px;
      }
    }
  }
}
</style>
