<template>
  <div class="reveal_wrap">
    <div class="eventList_big_wrap" v-show="flag==1">
      <gridDistribution ref="gridDistribution" :overlayersList="overlayersList" :checkComprehensive="checkComprehensive"></gridDistribution>
    </div>

    <div class="task-management" v-show="flag==2">
      <gridEvents ref="gridEvents" :checkComprehensive="checkComprehensive"></gridEvents>
    </div>
  </div>
</template>

<script>
// import eventList from "./gridTypeFile/eventList";
// import plan from "./gridTypeFile/plan";
// import coverage from "./gridTypeFile/coverage";
import gridDistribution from "../gridTypeFile/gridDistribution";
import gridEvents from "../gridTypeFile/gridEvents";
// import teamRoute from "./gridTypeFile/teamRoute/teamRoute";

export default {
  name: "reveal",
  props:["checkComprehensive","overlayersList"],
  data() {
    return {
      flag: 1,
      map: "",
      eventList: ""
    };
  },
  methods: {
    clickEventId(item) {
      this.eventList = item;
      console.log("点击", item);
    },
    initFlag(data) {
      this.flag = data;
    },
    initAddEvent() {
      this.$refs.eventList.addEventList("eventList_ul_wrap", "page", "getList");
    },
    initMaps(map) {
        console.log('map: ', map);
      this.map = map;
      this.$refs.gridDistribution.initMap(map);
      this.$refs.gridEvents.initMap(map)
    }
  },
  mounted() {},
  components: {
    gridDistribution,
    gridEvents,
  }
};
</script>

<style scoped>
.reveal_wrap {
  height: 100%;
  background: rgba(11, 30, 75, 0.8);
}
.plan_big_wrap {
  height: 100%;
}
.resourcesSearch_big_wrap {
  height: 100%;
}
.coverage_big_wrap {
  height: 100%;
}
.coverage_big_wrap /deep/ .el-scrollbar__wrap {
  overflow-x: hidden;
}
</style>
