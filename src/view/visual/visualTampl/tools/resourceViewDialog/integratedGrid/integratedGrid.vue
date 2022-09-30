<template>
  <div class="businessx_wrap animated fadeIn">
    <div class="top-close-button el-icon-close" @click="hideRight"></div>
    <ul class="business">
      <li
        :class="item.flag?'active':''"
        v-for="(item,index) in tabList"
        :key="index"
        @click="tab(item)"
      >{{item.name}}</li>
    </ul>

    <div class="reveal_bigWrap">
      <reveal ref="reveal" v-bind="$attrs"></reveal>
    </div>
  </div>
</template>

<script>
import reveal from "./gridType/gridType";
export default {
  name: "business",
  data() {
    return {
      tabList: [
        { name: "网格分布", flag: true, index: 1 },
        { name: "网格事件", flag: false, index: 2 },
      ],
      map: "",
    };
  },
  inheritAttrs:false,
  methods: {
    tab(item) {
      this.tabList.forEach(ele => {
        ele.flag = false;
      });
      item.flag = true;
      this.$refs.reveal.initFlag(item.index);
    },
    initMap(map) {
      this.map = map;
      this.$refs.reveal.initMaps(this.map);
    },
    initAddEvents() {
      this.$refs.reveal.initAddEvent();
    },
    hideRight() {
      this.$parent.integratedGridHandle();
      this.$parent.integratedGridClose();
    }
  },
  components: {
    reveal
  }
};
</script>

<style scoped>
.businessx_wrap {
  width: 100%;
  height: 100%;
  z-index: 1;
}
.business {
  height: 66px;
  display: flex;
  margin: 0;
  padding: 0;
  align-items: center;
  list-style: none;
  padding-left: 12px;
  padding-right: 2px;
  box-sizing: border-box;
}
.business > li {
  width: 82px;
  height: 26px;
  font-size: 16px;
  font-weight: 400;
  text-align: center;
  line-height: 26px;
  color: rgba(0, 242, 255, 1);
  margin-right: 10px;
  background: url("../../../../../../assets/images/cszh/li.png") no-repeat;
  background-size: 100% 100%;
  cursor: pointer;
}
.business > .active {
  background: url("../../../../../../assets/images/cszh/li2.png") no-repeat;
  background-size: 100% 100%;
}
.reveal_bigWrap {
  width: 576px;
  height: 700px;
  margin-top: 20px;
  border-radius: 2px;
}
.top-close-button {
  color: white;
  width: 25px;
  height: 26px;
  line-height: 26px;
  text-align: center;
  background: linear-gradient(-40deg,rgba(98,127,236,1),rgba(18,196,200,1));
  border-radius: 50%;
  position: absolute;
  right: -9px;
  top: -9px;
  cursor: pointer;
}
</style>
