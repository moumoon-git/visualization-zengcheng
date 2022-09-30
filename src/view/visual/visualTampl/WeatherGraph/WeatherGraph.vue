<template>
  <div class="weather-graph-wrapper">
    <div class="close" @click="close"></div>
    <div class="header">
      <div class="top">
        <div class="left">
          <span class="address">{{ daily.AREA }}</span>
          <span class="area">{{ townName }}</span>
        </div>
        <div class="right">
          <div class="commonWeather">
            <span>今天：{{ daily.MINT }}°C~{{ daily.MAXT }}°C</span>
            <span>{{ WDirection }}</span>
            <span>{{ WSpeed }}</span>
          </div>
          <div class="date">
            <span>{{ getDate() }}</span>
            <span>农历{{ getLunarCalendar() }}</span>
          </div>
        </div>
      </div>

      <div class="middle">
        <div class="temperature">{{ realTemperature || temperature }}</div>
      </div>

      <div class="buttom">
        <span>湿度: {{ daily.MINRH2M }}.0% ~ {{ daily.MAXRH2M }}.0%</span>
      </div>
      
      <el-button type="text" class="switch-button" @click="handleShowRainfullAnalysisDialog">
        网格天气实况
      </el-button>
    </div>
    <div class="footer">
      <div class="weather-week">
        <span title="一周天气预报"></span>
        <div class="list-wrap">
          <div
            v-for="(item, index) in aWeekDayArr"
            class="list-item"
            :key="index"
          >
            <div>
              {{ item.day }}
            </div>
            <div>
              {{ item.date }}
            </div>
            <div class="description">
              {{ new Date().getHours() > 12 ? item.L12WEATHER : item.F12WEATHER }}
            </div>
            <div class="windPower">
              <div>{{ new Date().getHours() > 12 ? windDirection[Number(item.L12WINDD)] : windDirection[Number(item.F12WINDD)] }}</div>
              <div>
                <span class="windIcon"></span> {{ new Date().getHours() > 12 ? windSpeed[item.L12WINDS] : windSpeed[item.F12WINDS]  }}
              </div>
            </div>
          </div>
          <LineChart
            style="
              width: 135%;
              height: 250px;
              position: absolute !important;
              left: -21%;
              top: 84px;
            "
            :yData="yData"
            :xData="xData"
          ></LineChart>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import useHook from './assets/js/useHook';
const { getLunarCalendar, getDate, zeroFilling } = useHook();
import { windSpeed, windDirection } from '../../../../assets/js/weather';
import LineChart from './components/LineChart/LineChart.vue';
import Axios from 'axios';
import Vue from 'vue';
import Bus from '@/utils/bus.js';
export default {
  name: 'WeatherGraph',
  components: {
    LineChart,
  },
  data() {
    return {
      townName: Vue.cookie.get('townName'), // 所属镇街
      windSpeed: windSpeed,
      windDirection: windDirection,
      aWeekDayArr: [],
      daily: {
        AREA: '', // 广州区名称
        MINRH2M: '', // 最小相对湿度
        MAXRH2M: '', // 最大相对湿度
        F12WINDS: '', // 前12小时风速
        L12WINDS: '', // 后12小时风速
        MINT: 0, // 最低温度
        MAXT: 0, // 最高温度
        F12WEATHER: '', // 前12小时天气现象描述
        L12WEATHER: '', // 后12小时天气现象描述
        RAIN: 0, // 雨量
        F12WINDD: '', // 前12小时风向
        L12WINDD: '', // 后12小时风向
        RTIME: '', // 发布时间
        FTIME: 24, // 预报时次
        day: '',
        date: '',
      },
      zeroFilling: zeroFilling,
      getDate: getDate,
      getLunarCalendar: getLunarCalendar,
      weekend: ['周日', '周一', '周二', '周三', '周四', '周五', '周六'],
      WDirection: '', // 风向
      WSpeed: '', // 风速
      realTemperature: 0,
    };
  },
  computed: {
    temperature() {
      const tem = this.daily.MINT + this.daily.MAXT;
      return tem % 2 > 0 ? Number(tem / 2).toFixed(1) : tem / 2;
    },
    xData() {
      if (this.aWeekDayArr.length > 0) {
        return this.aWeekDayArr.map((el) => el.day);
      } else {
        return [];
      }
    },
    yData() {
      if (this.aWeekDayArr.length > 0) {
        return this.aWeekDayArr
          ? [
              this.aWeekDayArr.map((el) => el.MINT),
              this.aWeekDayArr.map((el) => el.MAXT),
            ]
          : [];
      } else {
        return [];
      }
    },
  },
  mounted() {
    this.getWeather();
    this.getGridLive();
  },
  methods: {
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
              HORTAIRRT, // 2米高温度，单位
            } = response[0]
            this.realTemperature = HORTAIRRT.toFixed(0)
          }
        } else {
          this.$message.error(`获取天气失败`);
        }
      });
    },
    /**
     * @description 获取风的数据
     */
    getWind() {
      if (new Date().getHours() > 12) {
        // 后12小时风速
        this.WDirection = windDirection[Number(this.daily.L12WINDD)];
        this.WSpeed = windSpeed[this.daily.L12WINDS];
      } else {
        // 前12小时风速
        this.WDirection = windDirection[Number(this.daily.F12WINDD)];
        this.WSpeed = windSpeed[this.daily.F12WINDS];
      }
    },
    /**
     * @description 关闭弹窗
     */
    close() {
      Bus.$emit('showWeatherGraph', false);
    },
    /**
     * @description 获取7天天气
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
      Axios(data)
        .then((data) => {
          if (data.data.code === 0) {
            const res = data.data.data;
            if (res && res.length > 0) {
              this.aWeekDayArr = res.filter((el) => el.AREA === '增城区');
              this.aWeekDayArr = this.aWeekDayArr.map((el) => {
                const timestamp =
                  el.FTIME - 24 < 0
                    ? new Date().getTime() - 24 * 60 * 60 * 1000
                    : new Date().getTime() + (el.FTIME - 24) * 60 * 60 * 1000;
                if (el.FTIME === 24) {
                  this.daily = el;
                }
                return {
                  ...el,
                  timestamp: timestamp,
                  date: `${new Date(timestamp).getMonth() + 1} / ${zeroFilling(new Date(
                    timestamp
                  ).getDate())} `,
                  day: this.weekend[new Date(timestamp).getDay()],
                };
              });
              this.getWind()
            }
          } else {
            this.$message.error(`获取天气失败`);
          }
        })
        .catch((error) => {
          this.$message.error(`获取天气失败`);
        });
    },
    
    /**
     * @description 显示降雨分析弹窗
     */
    handleShowRainfullAnalysisDialog() {
      Bus.$emit('showWeatherGraph', false);
      Bus.$emit('showRainfullAnalysisDialog', true)
    }
  },
};
</script>

<style lang="less">
.weather-graph-wrapper {
  width: 50%;
  height: 100%;
  background: #fff;
  position: absolute;
  right: 0;
  top: 0;
  background: no-repeat url('./assets/images/weather-bg.jpg');
  background-size: auto 100%;
  background-position: 50%;
  z-index: 10;
  overflow: hidden;

  .close {
    z-index: 999;
    display: flex;
    position: absolute;
    right: 26px;
    top: 26px;
    justify-content: center;
    align-items: center;
    border: none;
    border-radius: 100%;
    width: 44px;
    height: 44px;
    outline: none;
    background: none;
    background: no-repeat center/100% 100% url('./assets/images/close.svg');
    box-shadow: 0 0 6px 3px #00c1de inset;
    cursor: pointer;
  }

  .header {
    position: relative;
    width: calc(100% - 150px);
    padding: 15px 35px;
    color: white;
    border-bottom: 1px solid rgba(0, 145, 255, 0.2);
    .top {
      display: grid;
      align-items: center;
      grid-template-columns: auto 1fr;
      .left {
        margin-right: 20px;
        display: flex;
        flex-direction: column;
        .address {
          font-size: 25px;
          color: #56e9ff;
        }
        .area {
          color: #56e9ff;
        }
        .leftBottom {
          display: flex;
          align-items: center;
          font-size: 14px;

          & > * {
            margin-right: 10px;
          }
        }
      }
      .right {
        display: flex;
        justify-content: space-between;
        align-items: flex-end;
        .commonWeather {
          display: grid;

          gap: 15px;
          grid-template-columns: auto auto auto auto;
        }
        .date {
          display: grid;

          gap: 15px;
          grid-template-columns: 1fr 1fr;
        }
      }
    }
    .middle {
      display: flex;
      align-items: flex-start;
      margin-bottom: 30px;
      height: 94px;
      .temperature {
        display: flex;
        align-items: flex-start;
        margin-right: 20px;
        font-size: 78px;

        &::after {
          content: '℃';
          display: block;
          font-size: 24px;
          padding-top: 16px;
        }
      }
      .hourlyWeather {
        display: flex;
        flex-direction: column;
        justify-content: flex-end;
        .hourlyWeather_buttom {
          display: grid;

          gap: 10px;
          grid-template-columns: auto auto auto;
          .icon {
            width: 22px;
            height: 18px;
          }
        }
      }
    }
    .buttom {
      span {
        display: inline-block;
        margin-right: 20px;
        &:last-child {
          margin: 0;
        }
      }
    }
    .switch-button {
      position: absolute;
      bottom: 0;
      right: 0;
          font-size: 16px;
          color: #56e9ff
    }
  }

  .weather-week {
    .list-wrap {
      display: flex;
      margin-top: 20px;
      position: relative;
      .list-item {
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        width: 25%;
        &:hover {
          background: linear-gradient(
            270deg,
            rgba(50, 197, 255, 0.3) 0%,
            rgba(50, 197, 255, 0.6) 100%
          );
        }
        div {
          text-align: center;
          font-size: 14px;
          color: #fff;
          &:nth-child(2) {
            margin-top: 5px;
          }
        }
        .description {
          height: 60px;
          display: flex;
          justify-content: center;
          align-items: center;
        }
        .icon {
          margin: 20px auto 0;
          width: 24px;
          height: 20px;
        }
        .windPower {
          padding-top: 150px;
          div {
            font-size: 12px;
          }
          .windIcon {
            display: inline-block;
            width: 12px;
            height: 12px;
            background: url('./assets/images/windPower-icon.svg') no-repeat;
          }
        }
      }
      .list-item:last-child {
        border-right: none;
      }
    }
  }
}
</style>