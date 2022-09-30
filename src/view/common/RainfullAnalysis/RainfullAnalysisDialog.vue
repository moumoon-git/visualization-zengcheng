<template>
  <div v-if="showRainfullAnalysisDialog" class="weather-dialog">
    <div
      :class="
        'weather-dialog__tips ' +
        (isClickSetMarker ? '' : 'weather-dialog__tips--right')
      "
    >
      <template v-if="isClickSetMarker">
        <img src="./assets/svg/warning.svg" alt="" />
        <span class="tips">拖拽地图，查看增城区任意位置天气信息</span>
      </template>
      <img
        src="./assets/svg/close.svg"
        alt=""
        class="close"
        @click="handleClose"
      />
    </div>

    <div class="weather-dialog__location">
      <span class="location">{{ address }}</span>
    </div>

    <template v-if="realtime.HORTAIRRT && realtime.HORWINDDRT">
      <div class="weather-dialog__temperature">
        <div>
          <span class="temperature">{{ realtime.HORTAIRRT || '' }}</span>
          <span class="symbol">°C</span>
        </div>
      </div>

      <div class="weather-dialog__desription">
        <span class="wind-level"
          >{{ realtime.HORWINDDRT || '' }}风
          {{ realtime.HORWINDRT || '' }}</span
        >
        <span style="margin-right: 10px">{{
          `湿度${(realtime.HORQAIRRT * 100).toFixed(1)}%`
        }}</span>
        <div>过去1小时雨量{{ realtime.HORPRERT }}毫米</div>
      </div>
    </template>
    <div v-else class="weather-dialog__temperature">
      <span class="empty">暂无数据</span>
    </div>
  </div>
</template>

<script>
import Vue from 'vue';
import Axios from 'axios';
import { getWindDirection, getWindLevel } from '../../../assets/js/weather.js';
import LonLatT from '@/utils/LonLatTransform.js';
import { res } from '@/view/common/Weather/assets/gridWeatherTestData.js';
import Bus from '@/utils/bus.js';
export default {
  name: 'RainfullAnalysisDialog',
  props: {
    // 是否点击地图进行落点
    isClickSetMarker: {
      type: Boolean,
      default: true,
    },
  },
  data() {
    return {
      testArr: res,
      getWindDirection: getWindDirection,
      getWindLevel: getWindLevel,
      realtime: {
        HORPRERT: 0, // 过去1小时雨量，单位：千克/平方米
        HORWINDDRT: 0, // 10米高风向，单位：度
        LONGITUDE: 0, // 格点经度
        HORPRENRT: null,
        HORTAIRRT: 0, // 2米高温度，单位：摄氏度
        HORWINDRT: 0, // 10米高风速，单位：M/S
        LATITUDE: 0, // 格点纬度
        HORQAIRRT: 0, // 2米高湿度比
      },
      showRainfullGraph: false,
      // 温度
      temperature: 0,
      showRainfullAnalysisDialog: false,
      list: [],
      address: '',
      map: '',
      GDPositionPicker: null,
    };
  },
  computed: {},
  watch: {
    showRainfullAnalysisDialog: {
      handler(newVal) {
        if (newVal) {
          // 拖拽选址
          AMapUI.loadUI(['misc/PositionPicker'], (PositionPicker) => {
            const positionPicker = new PositionPicker({
              mode: 'dragMap', // 设定为拖拽地图模式，可选'dragMap'、'dragMarker'，默认为'dragMap'
              map: this.map, // 依赖地图对象
              iconStyle: {
                // 自定义外观
                url: require('./assets/svg/mapIcon_rain.svg'), // 图片地址
                size: [40, 80], // 要显示的点大小，将缩放图片
                ancher: [40, 40], // 锚点的位置，即被size缩放之后，图片的什么位置作为选中的位置
              },
            });
            this.GDPositionPicker = positionPicker;
            // 拖拽选址回调方法
            this.PositionPickerCallback(positionPicker);
            // 开始拖拽
            positionPicker.start();
          });
        }
      },
      deep: true,
      immediate: true,
    },
  },
  mounted() {
    this.getGridLive();
    Bus.$off('showRainfullAnalysisDialog');
    Bus.$on('showRainfullAnalysisDialog', (data) => {
      this.showRainfullAnalysisDialog = data;
    });
    // 测试数据
    // this.list = this.testArr.data;
    // const lon = Vue.cookie.get('longitude');
    // const lat = Vue.cookie.get('latitude');
    // this.formaterData(lon, lat);
  },
  methods: {
    /**
     * @description 高德转天地图
     */
    GDTrTDT(lng, lat) {
      return new Promise((resolve, reject) => {
        const data = LonLatT.LonLatTransform(`${`${lng},${lat}`}`, 'GD').split(
          ','
        );
        const obj = {
          longitude: Number(data[0]),
          latitude: Number(data[1]),
        };
        resolve(obj);
      });
    },
    initMap(map) {
      this.map = map;
    },
    /**
     * @descriptio 拖拽选址回调方法
     */
    PositionPickerCallback(positionPicker) {
      positionPicker.on('success', async (positionResult) => {
        console.log('拖拽成功：', positionResult);
        // 高德转天地图经纬度
        this.address = positionResult.address;
        const transFromLonLat = await this.GDTrTDT(
          positionResult.position.lng,
          positionResult.position.lat
        );
        console.log('高德转天地图经纬度', transFromLonLat);
        this.formaterData(transFromLonLat.longitude, transFromLonLat.latitude);
      });
      positionPicker.on('fail', (positionResult) => {
        console.log('拖拽失败：', positionResult);
        loading.value = false;
      });
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
          this.list = data.data.data;
          if (this.list.length > 0) {
            const lon = Vue.cookie.get('longitude');
            const lat = Vue.cookie.get('latitude');
            this.formaterData(lon, lat);
          }
        } else {
          this.$message.error(`获取天气失败`);
        }
      });
    },
    /**
     * @description 封装数据
     */
    formaterData(lon, lat) {
      const lon1 = Number(`${Number(lon).toFixed(2)}5`);
      const lat1 = Number(`${Number(lat).toFixed(2)}5`);
      console.log('list:', this.list);
      const response = this.list
        .filter((el) => el.LONGITUDE === lon1)
        .filter((el) => el.LATITUDE === lat1);
      console.log('response:', response);
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
        } = response[0];
        const windLevel = getWindLevel(HORWINDRT * 3.6);
        this.realtime = {
          HORPRERT, // 过去1小时雨量，单位：千克/平方米
          HORWINDDRT: getWindDirection(HORWINDDRT).direction, // 10米高风向，单位：度
          LONGITUDE, // 格点经度
          HORPRENRT,
          HORTAIRRT: HORTAIRRT.toFixed(0), // 2米高温度，单位：摄氏度
          HORWINDRT: `${windLevel.level}级`, // 10米高风速，单位：M/S  换算成km/h
          LATITUDE, // 格点纬度
          HORQAIRRT, // 2米高湿度比
        };
      } else {
        this.$message({
          type: 'warning',
          message: '暂不支持查看当前区域的天气信息',
        });
        Object.assign(this.realtime, this.$options.data.call(this).realtime);
      }
    },
    /**
     * @description 关闭弹窗
     */
    handleClose() {
      this.GDPositionPicker.stop();
      this.showRainfullAnalysisDialog = false;
    },
  },
  beforeDestroy() {
    this.handleClose();
    Bus.$off('showRainfullAnalysisDialog');
  },
};
</script>

<style lang="scss">
@import './assets/css/rainfullAnalysisDialog.scss';
</style>
