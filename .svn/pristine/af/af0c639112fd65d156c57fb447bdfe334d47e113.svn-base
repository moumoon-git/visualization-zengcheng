<template>
  <div class="reveal_wrap">
    <div class="eventList_big_wrap" v-show="flag==0">
      <eventList ref="eventList" @clickEventId="clickEventId"></eventList>
    </div>

    <!--<div class="plan_big_wrap" v-show="flag==1">
      <plan ref="plan"></plan>
    </div>-->

    <div class="resourcesSearch_big_wrap" v-show="flag==2">
      <resourcesSearch ref="resourcesSearch"></resourcesSearch>
    </div>

    <div class="task-management" v-show="flag==6">
      <taskManagement ref="taskManagement"></taskManagement>
    </div>
    
    <!-- 2020-11-02 tanjinfeng 删除队伍轨迹 -->
    <!-- <div class="team-route" v-show="flag==3">
      <teamRoute ref="teamRoute"></teamRoute>
    </div> -->

    <div class="coverage_big_wrap" v-show="flag==4">
      <el-scrollbar style="height: 100%;">
        <coverage ref="coverage"></coverage>
      </el-scrollbar>
    </div>
  </div>
</template>

<script>
import eventList from "./revealFile/eventList";
import plan from "./revealFile/plan";
import resourcesSearch from "./revealFile/resourcesSearch";
import coverage from "./revealFile/coverage";
import taskManagement from "./revealFile/taskManagement/taskManagement";
import teamRoute from "./revealFile/teamRoute/teamRoute";

export default {
  name: "reveal",
  data() {
    return {
      flag: 0,
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
      if (data == 0) {
        this.$refs.eventList.flag = 0;
        this.$refs.eventList.page = 1;
        this.$refs.eventList.getList(1);
        // this.$refs.eventList.addEventList(
        //   "eventList_ul_wrap",
        //   "page",
        //   "getList"
        // );
      }
      // else if (data == 1) {
      //   console.log(this.eventList.typeId);
      //   this.$refs.plan.getlistTree(this.eventList.typeId);
      // }
      else if (data == 4) {
        this.$refs.coverage.getAllCav();
      }

      // 退出任务管理时清空
      if(data !== 6) {
        this.$refs.taskManagement.clearMap();
        this.$refs.taskManagement.selectedWorkId = -1;
        this.$refs.taskManagement.workDetail = {};
        this.$refs.taskManagement.displaySwitch = 0;
      }
      // 退出队伍轨迹时清空
      if(data !== 3) {
        // this.$refs.teamRoute.clearMap();
        // this.$refs.teamRoute.selectedId = -1;
        // this.$refs.teamRoute.displaySwitch = 0;
      }
    },
    initAddEvent() {
      this.$refs.eventList.addEventList("eventList_ul_wrap", "page", "getList");
    },
    initMaps(map) {
      this.map = map;
      this.$refs.resourcesSearch.initMap(map);
      this.$refs.eventList.initMap(map);
      this.$refs.coverage.initMap(map);
      this.$refs.taskManagement.initMap(map);
      // this.$refs.teamRoute.initMap(map);
    }
  },
  mounted() {},
  components: {
    eventList,
    plan,
    resourcesSearch,
    coverage,
    taskManagement,
    teamRoute
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
