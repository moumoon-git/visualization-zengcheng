// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from "vue";
Vue.prototype.$window = window
import ElementUI from "element-ui";
import "element-ui/lib/theme-chalk/index.css";
Vue.use(ElementUI);
// import "@/element-ui";
import App from "./App";
import router from "./router";
import api from "./assets/api/api";
// 电话拨接 全局挂载使用
import callPhone from './assets/js/callPhone'
Vue.prototype.callPhone = callPhone
// 创建会议 全局挂载使用
import createMeeting from './assets/js/createMeeting'
Vue.prototype.createMeeting = createMeeting
import VueCookie from 'vue-cookie'            // api: https://github.com/alfhen/vue-cookie
Vue.use(VueCookie)
// 挂载全局
import httpRequest from '@/utils/httpRequest' // api: https://github.com/axios/axios
import { isAuth } from '@/utils'
Vue.prototype.$http = httpRequest // ajax请求方法
Vue.prototype.isAuth = isAuth     // 权限方法
//引入vuex
import store from "./store";
import VueAMap from 'vue-amap'
import Qs from "qs";
Vue.prototype.qs = Qs;
import echarts from "echarts";
import "echarts-liquidfill";
Vue.prototype.$echarts = echarts;

import viewer from "./assets/js/viewer";
Vue.prototype.$viewer = viewer;
import animate from "animate.css";
// 引入audio插件的js
import AddTamplat from "./view/test/audioPlugin.js";
Vue.prototype.$AddTamplat = AddTamplat;

Vue.config.productionTip = false;
Vue.prototype.apix = api;
import Viewer from "v-viewer";
import "viewerjs/dist/viewer.css";
Vue.use(Viewer);
Vue.use(VueAMap);
// 高德地图初始化
VueAMap.initAMapApiLoader({
  key: '1a4636d76aab717a3a560d3307d40fcf',
  plugin: ['AMap.Scale', 'AMap.OverView', 'AMap.ToolBar', 'AMap.Geocoder', 'AMap.MapType', 'AMap.PlaceSearch', 'AMap.Autocomplete', 'Geolocation', 'AMap.DistrictSearch'],
  uiVersion: '1.0', // ui库版本，不配置不加载,
  v: '1.4.4'
});
Viewer.setDefaults({
  Options: {
    inline: true,
    button: true,
    navbar: true,
    title: true,
    toolbar: true,
    tooltip: true,
    movable: true,
    zoomable: true,
    rotatable: true,
    scalable: true,
    transition: true,
    fullscreen: true,
    keyboard: true,
    url: "data-source"
  }
});
/* eslint-disable no-new */

new Vue({
  el: "#app",
  store,
  router,
  components: { App },
  template: "<App/>",
  render: function(createElement) {
    // 可视化不同于后台系统,所以path存在于存储中，进入和刷新都是读取location 和 sessionStorage中的内容
    let Base64 = require("js-base64").Base64;
    // 获取跳转路径  进行重定向  location.href.substr(location.href.indexOf('?')+1)
    let blodStr = "";
    if (location.href.indexOf("?") != -1) {
      let str = location.href.substring(
        location.href.indexOf("?") + 1,
        location.href.lastIndexOf("#")
      );
      blodStr = decodeURIComponent(Base64.decode(str));
      sessionStorage.search = decodeURIComponent(
        Base64.decode(
          location.href.substring(
            location.href.indexOf("?") + 1,
            location.href.lastIndexOf("#")
          )
        )
      );
      let sevreUrl =
        location.href.substring(0, location.href.indexOf("?")) + "#/";
      location.replace(sevreUrl);
      return;
    }
    if (
      "-ms-scroll-limit" in document.documentElement.style &&
      "-ms-ime-align" in document.documentElement.style
    ) {
      window.addEventListener(
        "hashchange",
        () => {
          var currentPath = window.location.hash.slice(1);
          if (this.$route.path !== currentPath) {
            this.$router.push(currentPath);
          }
        },
        false
      );
    }
    return createElement(App);
  }
});
