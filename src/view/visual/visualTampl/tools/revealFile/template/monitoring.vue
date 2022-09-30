<template>
  <div class="monitoring_wrap">
    <div
      class="monitoringContent"
      v-for="(item,index) in data"
      :key="index"
      @click="clickSelect(item,index)"
    >
    <iframe width=0 height=0 id="url"></iframe>
      <div class="monitoringContent_left">
        <img src="../../../../../../assets/images/cszh/coordinateImg.png" alt />
        <div class="text">
          <h3>{{item.vcName}}</h3>
          <p>{{item.vcAddress}}</p>
        </div>
      </div>

      <div class="monitoringContent_right">
        <img v-if="false" src="../../../../../../assets/images/cszh/monitoring.png" alt />
        <p v-if="false" class="err">离线</p>

        <span @click="preview(item)">
          <img src="../../../../../../assets/images/cszh/monitoring1.png" alt />
          <p>预览</p>
        </span>
      </div>
    </div>

     <!-- 视频预览 -->
     <videoPreview ref="videoPreviewVisiable"></videoPreview>
  </div>
</template>

<script>
import videoPreview from "../../videoPreview";
export default {
  name: "monitoring",
  data() {
    return {
      data: ""
    };
  },
  components:{
    videoPreview,
  },
  methods: {
    clickSelect(item, index) {
      this.$emit("clickSelects", { data: item, ind: index, type: "sp" });
    },
    init(arrData) {
      arrData.forEach(ele => {
        ele.flag = false;
      });
      this.data = arrData;
    },
    preview(obj) {
      this.$refs.videoPreviewVisiable.videoPreview(obj)
    }
  },
  mounted() {}
};
</script>

<style scoped>
h3,
p {
  margin: 0;
  padding: 0;
}
.monitoringContent {
  padding: 28px 35px 28px 15px;
  background: url("../../../../../../assets/images/cszh/bor.png") no-repeat;
  background-size: 100% 100%;
  margin-top: 20px;
  display: flex;
  justify-content: space-between;
}
.monitoringContent_left {
  display: flex;
  align-items: center;
}
.monitoringContent_left > img {
  width: 40px;
  height: 40px;
  margin-right: 13px;
}
.text > h3 {
  font-size: 16px;
  font-weight: 400;
  color: rgba(0, 242, 255, 1);
}
.text > p {
  font-size: 14px;
  font-weight: 300;
  color: rgba(255, 255, 255, 1);
}
.monitoringContent_right {
  font-size: 14px;
  font-weight: 300;
  color: rgba(255, 255, 255, 1);
  cursor: pointer;
}
.monitoringContent_right > img {
  width: 44px;
  height: 40px;
}
.monitoringContent_right > p {
  font-size: 14px;
  font-weight: 300;
  color: rgba(255, 255, 255, 1);
}
.monitoringContent_right > .err {
  font-size: 14px;
  font-weight: 300;
  color: rgba(216, 79, 79, 1);
}
</style>
