<template>
  <div class="WeatherWarning">
    <img
      v-if="warningList.length > 0"
      :src="require(`./images/warningImages/${this.warningList[0].img}.jpg`)"
      alt=""
      @click="handleToggle"
    />
    <template v-if="show">
      <div v-if="warningList.length > 0" class="warning-list-box">
        <ul class="list">
          <li v-for="(item, index) in warningList" :key="index" class="item">
            <div class="item-left">
              <img
                v-viewer
                :src="require(`./images/warningImages/${item.img}.jpg`)"
                alt=""
              />
            </div>
            <div class="item-right">
              <span :style="{ color: warningColor[item.sign - 1] }"
                >{{ item.name }}{{ signOptions[item.sign - 1] }}预警</span
              >
              <span class="date">发布时间：{{ item.date }}</span>
              <span class="description">{{ item.description }}</span>
            </div>
          </li>
        </ul>
      </div>
    </template>
  </div>
</template>

<script>
import Vue from 'vue';
import Axios from 'axios';
import { warningSignDescription, signOptions, streetList, warningColor } from './assets/js/warning';
import { addZero, formaterTime } from '@/utils/common.js';
export default {
  name: 'WeatherWarning',
  props: {
    show: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      addZero: addZero,
      formaterTime: formaterTime,
      // 预警等级的含义
      warningSignDescription: warningSignDescription,
      // 预警信号级别
      signOptions: signOptions,
      // 增城区街道
      streetList: streetList,
      // 预警信号对应的颜色
      warningColor: warningColor,
      // 定时器
      timer: null,
      // 预警列表
      warningList: [],
      townName: Vue.cookie.get('townName'), // 所属镇街
    };
  },
  mounted() {
    this.getWarning();
    this.timer = setInterval(() => {
      this.getWarning();
    }, 1000 * 60 * 60);
  },
  beforeDestroy() {
    clearInterval(this.timer);
  },
  methods: {
    /**
     * @description 过滤平台所属镇街的预警
     */
    getTownWarning(data) {
      if (this.townName.indexOf('增城区') > -1) {
        return data.filter((el) => el.STATION === '增城');
      } else {
        const filterTown = this.streetList.filter(
          (el) => this.townName.indexOf(el) > -1
        );
        return data.filter((el) => el.STATION.indexOf(filterTown[0]) > -1);
      }
    },
    /**
     * @description 切换
     */
    handleToggle() {
      if (this.show) {
        this.$emit('close');
      } else {
        this.$emit('open');
      }
    },
    /**
     * @description 封装数据
     */
    formatData(data) {
      data.forEach((el) => {
        if (el.HAZE_SIG) {
          const date = new Date(el.HAZE_DATE);
          this.warningList.push({
            name: '灰霾',
            sign: Number(el.HAZE_SIG),
            img: `HAZE_${Number(el.HAZE_SIG)}`,
            date: this.formaterTime(date),
            station: el.STATION,
            description: this.warningSignDescription.HAZE[Number(el.HAZE_SIG)],
          });
        }
        if (el.COLD_SIG) {
          const date = new Date(el.COLD_DATE);
          this.warningList.push({
            name: '寒冷',
            sign: Number(el.COLD_SIG),
            img: `COLD_${Number(el.COLD_SIG)}`,
            date: this.formaterTime(date),
            station: el.STATION,
            description: this.warningSignDescription.COLD[Number(el.COLD_SIG)],
          });
        }
        if (el.HIGHTEM_SIG) {
          const date = new Date(el.HIGHTEM_DATE);
          this.warningList.push({
            name: '高温',
            sign: Number(el.HIGHTEM_SIG),
            img: `HIGHTEM_${Number(el.HIGHTEM_SIG)}`,
            date: this.formaterTime(date),
            station: el.STATION,
            description:
              this.warningSignDescription.HIGHTEM[Number(el.HIGHTEM_SIG)],
          });
        }
        if (el.RAIN_SIG) {
          const date = new Date(el.RAIN_DATE);
          this.warningList.push({
            name: '大雨',
            sign: Number(el.RAIN_SIG),
            img: `RAIN_${Number(el.RAIN_SIG)}`,
            date: this.formaterTime(date),
            station: el.STATION,
            description: this.warningSignDescription.RAIN[Number(el.RAIN_SIG)],
          });
        }
        if (el.BIGFOG_SIG) {
          const date = new Date(el.BIGFOG_DATE);
          this.warningList.push({
            name: '大雾',
            sign: Number(el.BIGFOG_SIG),
            img: `BIGFOG_${Number(el.BIGFOG_SIG)}`,
            date: this.formaterTime(date),
            station: el.STATION,
            description:
              this.warningSignDescription.BIGFOG[Number(el.BIGFOG_SIG)],
          });
        }
        if (el.TDWIND_SIG) {
          const date = new Date(el.TDWIND_DATE);
          this.warningList.push({
            name: '雷雨大风',
            sign: Number(el.TDWIND_SIG),
            img: `TDWIND_${Number(el.TDWIND_SIG)}`,
            date: this.formaterTime(date),
            station: el.STATION,
            description:
              this.warningSignDescription.TDWIND[Number(el.TDWIND_SIG)],
          });
        }
        if (el.FIRE_SIG) {
          const date = new Date(el.FIRE_DATE);
          this.warningList.push({
            name: '森林火灾',
            sign: Number(el.FIRE_SIG),
            img: `FIRE_${Number(el.FIRE_SIG)}`,
            date: this.formaterTime(date),
            station: el.STATION,
            description: this.warningSignDescription.FIRE[Number(el.FIRE_SIG)],
          });
        }
        if (el.TYPHOON_SIG) {
          const date = new Date(el.TYPHOON_DATE);
          this.warningList.push({
            name: '台风',
            sign: Number(el.TYPHOON_SIG),
            img: `TYPHOON_${Number(el.TYPHOON_SIG)}`,
            date: this.formaterTime(date),
            station: el.STATION,
            description:
              this.warningSignDescription.TYPHOON[Number(el.TYPHOON_SIG)],
          });
        }
        if (el.HAIL_SIG) {
          const date = new Date(el.HAIL_DATE);
          this.warningList.push({
            name: '冰雹',
            sign: Number(el.HAIL_SIG),
            img: `HAIL_${Number(el.HAIL_SIG)}`,
            date: this.formaterTime(date),
            station: el.STATION,
            description: this.warningSignDescription.HAIL[Number(el.HAIL_SIG)],
          });
        }
        if (el.ROADICE_SIG) {
          const date = new Date(el.ROADICE_DATE);
          this.warningList.push({
            name: '道路结冰',
            sign: Number(el.ROADICE_SIG),
            img: `ROADICE_${Number(el.ROADICE_SIG)}`,
            date: this.formaterTime(date),
            station: el.STATION,
            description:
              this.warningSignDescription.ROADICE[Number(el.ROADICE_SIG)],
          });
        }
      });
      // 根据预警等级从高到低排序
      this.warningList.sort((a, b) => b.sign - a.sign);
    },
    /**
     * @description 获取预警数据
     */
    getWarning() {
      this.warningList = [];
      let data = {
        url: window.SITE_CONFIG['baseUrl'] + '/weather/warningSign',
        method: 'get',
        headers: {
          token: this.$store.state.token,
          'Content-Type': 'application/json; charset=UTF-8',
        },
      };
      Axios(data).then((data) => {
        if (data.data.code === 0) {
          const res = data.data.data;
          if (res) {
            // 1、过滤出增城区的预警
            const filterData = res.filter((item) => item.COUNTRY === '增城区');
            if (filterData.length > 0) {
              // 2、过滤当前平台所属镇街的预警
              const filterData2 = this.getTownWarning(filterData);
              if (filterData2.length > 0) {
                // 3、封装数据
                this.formatData(filterData2);
              }
            }
          }
        } else {
          this.$message.error(`获取预警失败`);
        }
      });
    },
  },
};
</script>

<style lang="scss" scoped>
@import './assets/styles/WeatherWarning.scss';
</style>