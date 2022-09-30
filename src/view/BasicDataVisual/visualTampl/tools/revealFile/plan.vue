<template>
  <div class="emergency-plan">
    <header>
      <span>预案名称</span>
      <el-select
        v-model="seleVal"
      >
        <el-option
          v-for="item in allPlanList"
          :key="item.id"
          :label="item.name"
          :value="item.id"
        />
      </el-select>
    </header>
    <ul>
      <li
        v-for="(item, index) in tabList"
        :key="index"
        :class="{ 'emergency-plan__tab--active': item.flag }"
        @click="clickTab(index)"
      >
        {{ item.name }}
      </li>
    </ul>
    <!-- 预案信息 -->
    <PlanInfo
      v-show="tabList[0].flag"
      :form-data="formData"
    />
    <!-- 预案文档 -->
    <div v-show="tabList[1].flag" style="height: 555px;">
      <viewer v-if="imgSrc">
        <img
          :src="imgSrc"
          style="max-height: 100%; max-width: 100%; cursor: zoom-in;"
          alt
          :key="imgSrc"
        >
      </viewer>
      <iframe v-else style="width: 100%;height: 100%;display: block;box-sizing: border-box;border: 0;outline: 0;" :src="ifranmSrc" />
    </div>
    <!-- 预案任务下达 -->
    <PlanMissionRelease
      v-show="tabList[2].flag"
      :event-data="$parent.data"
      :form-data="formData"
    />
  </div>
</template>

<script>
import allUrl from "../../../../../assets/api/allApiUrl";
// 预案信息
import PlanInfo from './PlanInfo/PlanInfo';
// 预案任务下达
import PlanMissionRelease from './PlanMissionRelease/PlanMissionRelease';

export default {
  components: {
    PlanInfo,
    PlanMissionRelease,
  },
  name: "plan",
  data() {
    return {
      tabList: [
        { name: '预案信息', flag: true },
        { name: '预案文档', flag: false },
        { name: '预案任务下达', flag: false },
      ],
      ifranmSrc: "",
      allPlanList: [],
      defaultProps: {
        children: "rpIncidentUnitEntityList",
        label: "name"
      },
      seleVal: "",
      data: [],
      eventId: 0,
      // 图片url
      imgSrc: '',
      // 预案详情信息
      formData: {},
    };
  },
  methods: {
    clickTab(item) {
      this.tabList.forEach(ele => {
        ele.flag = false;
      });
      this.tabList[item].flag = true;
    },
    getPlanList(data) {
      this.allPlanList = data.rpIncidentPlanEntitys;
      this.seleVal = this.allPlanList[0].id;
    },
  },
  watch: {
    seleVal(newVal) {
      let data = {
        ...allUrl.getOneAndLink,
        params: {
          id: newVal
        }
      };
      this.apix(data)
        .then(res => {
          this.eventId = res.data.eventId;
          if (res.code == 0) {
            // 预案详情信息
            this.formData = res.data;
            this.data = res.data.incidentMailgroup;
            this.clickTab(0);
            if (res.data.document && res.data.document.url) {
              if (res.data.document.url.toLowerCase().includes('.pdf')) {
                // pdf
                this.ifranmSrc = res.data.document.url
                this.imgSrc = ''
              } else if (
                res.data.document.url.toLowerCase().includes('.jpg')
                || res.data.document.url.toLowerCase().includes('.jpeg')
                || res.data.document.url.toLowerCase().includes('.png')
                || res.data.document.url.toLowerCase().includes('.bmp')
              ) {
                // 图片
                this.ifranmSrc = ''
                this.imgSrc = res.data.document.url
              } else {
                // office文档
                if (res.data.document.url.includes('http')){
                  this.ifranmSrc = `https://view.officeapps.live.com/op/view.aspx?src=${res.data.document.url}`;
                } else {
                  this.ifranmSrc = `https://view.officeapps.live.com/op/view.aspx?src=${ window.SITE_CONFIG.cloudUrl + res.data.document.url}`;
                }
                this.imgSrc = ''
              }
            }
          } else {
            this.$message.error(res.msg);
          }
        })
        .catch(err => {
          console.log(err);
        });
    }
  }
};
</script>

<style lang="scss">
.emergency-plan {
  width: 100%;
  height: 655px;
  & > header {
    height: 60px;
    line-height: 60px;
    color: #FFFFFF;
    font-size: 20px;
    padding-left: 13px;
    letter-spacing: 3px;
    display: flex;
    align-items: center;
    .el-select {
      margin-left: 15px;
      position: relative;
      height: 26px;
      line-height: 26px;
      // 四角
      @mixin corner {
        content: '';
        display: block;
        position: absolute;
        width: 6px;
        height: 7px;
        background: no-repeat center/100% 100% transparent;
      }
      .el-input__inner {
        width: 412px;
        height: 26px;
        background: rgba(6, 44, 93, .4);
        border: 1px solid transparent;
        border-radius: 0;
        color: #00F2FF;
        text-overflow: ellipsis;
      }
      &::before {
        @include corner;
        top: 0px;
        left: 0px;
        background-image: url('./img/corner_tl.png');
      }
      &::after {
        @include corner;
        top: 0px;
        right: 0px;
        background-image: url('./img/corner_tr.png');
      }
      .el-input::before {
        @include corner;
        bottom: 0px;
        left: 0px;
        background-image: url('./img/corner_bl.png');
      }
      .el-input::after {
        @include corner;
        bottom: 0px;
        right: 0px;
        background-image: url('./img/corner_br.png');
      }
      .el-input__icon {
        line-height: 26px;
      }
    }
  }
  & > ul {
    list-style: none;
    margin: 0 0 7px 0;
    padding: 0;
    background: rgba(23, 68, 122, .52);
    height: 36px;
    width: 100%;
    li {
      display: inline-block;
      color: #3F92FE;
      width: 92px;
      height: 43px;
      font-size: 14px;
      text-align: center;
      box-sizing: border-box;
      padding-top: 8px;
      transition: all .3s;
      cursor: pointer;
      font-weight: bold;
      user-select: none;
      &:hover {
        color: #FFFFFF;
      }
      &.emergency-plan__tab--active {
        color: #FFFFFF;
        text-shadow: 0 0 5px rgba(0, 242, 255, .6);
        background: no-repeat center/100% 100% url('data:image/png;base64,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');
      }
    }
  }
}
</style>
