<template>
  <div class="pop_upWindows_Wrap" v-if="wrapFlag" @click.stop.self="wrapFlag = false">
    <div class="pop_upWindows_content_Wrap">
      <div class="pop_upWindows_top">
        查看工单
        <img
          @click="wrapFlag = false"
          src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAUCAYAAACNiR0NAAACV0lEQVQ4T62V3UsUURiHHc2yNO1DTS00pTSwLFDqJlKvxQv7i6OLVEzxoiI0xA+sxC2y3LJM1+cZ35VpXMMLDzzsmTlnfuc979cmVblRKpVqeHUF2qAZGuE87MNv2IYv8Bm2kiT5m5VIsg+IXeC5C27DH9iAbyHkXteb4EYcsszvKqI7ZZ0jQcQu8bIfrsISfFIobwH7zoVwO7898BXese+noqkgm+r4uQ+X4S0U2OAVTxx8U83i9TBCN7zR0iR8docXnTAP+qcB/OB7JeGw0sN1Sz08hFX4oKCOH/QBvKrWPgMDMwPLWVH21/KuDx7ACryGm9ALswp61VaY5sNifOCJj0BnT3mQorF2j+chcLi2EEY84beg4CiTTXhfDgDvLvJsgBT1WpOwDrpGMf2r9Qt8sxsu8KBWBcdTU5PkY5ya/kQKKToAe2AKdcTcay5mM4D9rg0q+JzJCxYN/z+DNRNaX+ljc9DUeBWWecjRYO81HkYVnGDyEkGjmxc0QF5bKw2GlTINumc3J2hwhxUcYzLPBn2UPdFEV8hr/wLXTS1Lcy5E9W860DHS6ZVHmBRiQ1qXvCvnlmJFMChWTjc8zonuRFBMpTQo+qgFymmj3/SZ6WQF6LO1SBvLzkibIs6NtJWlazwoTZtKif2URbuMHyhW0vKw3israq6uwSzcgrvOTyo989A6L2bFcqL6WBdZpgbusPTi1LNrDplTDYR+s4ataRP9f+3LRLZ92S/tNAbvsH1lRLXUBiunabA2h5WKDTbnH620gRow25SRd3jIDzDNTKNjfwEH9BwZTYexTjYAAAAASUVORK5CYII="
          alt=""
        />
      </div>

      <div class="pop_upWindows_bottom">
        <div class="pop_upWindows_bottom_left">
          <el-scrollbar style="width: 100%;height: 100%;">
            <h1 class="hdsd">工单类型</h1>
            <div class="bgr colorpp">
              <!-- {{ datas[datas.length - 1].eventTypeName }} -->
              {{incomeData.eventTypeName}}
            </div>

            <h1 class="hdsd">上报时间</h1>
            <div class="bgr colorpp">
              <!-- {{ datas[datas.length - 1].gmtCreate }} -->
              {{incomeData.gmtCreate}}
            </div>

            <!-- <h1 class="hdsd">工单地点</h1>
            <div class="bgr colorpp">
              {{ datas[datas.length - 1].townName }}
              {{incomeData.townName}}
            </div> -->

            <h1 class="hdsd">工单描述</h1>
            <div class="bgr colorpp liu6">
              <el-scrollbar style="width: 100%;height: 100%;">
                <div>
                  <!-- {{ datas[datas.length - 1].content }} -->
                  {{incomeData.eventDescription}}
                </div>
              </el-scrollbar>
            </div>

            <h1 class="hdsd">工单状态</h1>
            <div class="bgr colorpp">
              <!-- {{ datas[datas.length - 1].gmtCreate }} -->
              {{
                incomeData.status==1?'待核实':
                incomeData.status==2?'核实中':
                incomeData.status==3?'待处理':
                incomeData.status==4?'处理中':
                incomeData.status==5?'已处理':
                incomeData.status==6?'超出范围':
                incomeData.status==7?'已关闭':'其他'
              }}
            </div>

            <h1 class="hdsd">是否关闭</h1>
            <div class="bgr colorpp">
              <!-- {{ datas[datas.length - 1].gmtCreate }} -->
              {{
                incomeData.isClose==0?'是':
                incomeData.isClose==1?'否':'其他'
              }}
            </div>
            <div
              class="Img_wrap"
              v-if="incomeData.imageUrl != null && incomeData.imageUrl != ''"
            
            >
              <img
                class="BigImg"
                :src="item.indexOf('http')>-1 ? item: backgroundURL + item"
                v-for="(item,index) in incomeData.imageUrl.split(',')" :key="index"
              />
            </div>

            <div
              class="bgr addAudioPlay"
              style="margin-top: 10px;"
              v-if="incomeData.audioUrl != null && incomeData.audioUrl != ''"
            >
              <audio
                style="width: 100%;"
                controls="controls"
                v-for="(item,key) in incomeData.audioUrl.split(',')"
                :key="key"
                :src="item.indexOf('http')>-1?item:`${backgroundURL}/${item}`"
              ></audio>
            </div>

            <!-- <div
              class="bgr addAudioPlay"
              style="margin-top: 10px;"
              v-if="incomeData.audioUrl != null && incomeData.audioUrl != '' && incomeData.audioUrl.indexOf(',') == -1"
            >
              <audio
                style="width: 100%;"
                controls="controls"
              >
                <source
                  :src="backgroundURL+incomeData.audioUrl"
                  type="audio/mpeg"
                />
              </audio>
            </div> -->
            <!-- <div
              class="bgr addAudioPlay"
              style="margin-top: 10px;"
              v-if="
                incomeData.audioUrl ||
                incomeData.audioUrlArr != 0
              "
            >
              <audio
                :src="incomeData.audioUrl"
                v-if="incomeData.audioUrl"
              ></audio>
              <audio
                :src="item"
                v-for="(item, index) in incomeData.audioUrlArr"
                :key="index"
                v-if="incomeData.audioUrlArr != 0"
              ></audio>
            </div> -->
          </el-scrollbar>
        </div>

        <div class="pop_upWindows_bottom_right">
          <el-scrollbar style="width: 100%;height: 100%;">
            <div
              v-for="(item, index) in datas"
              :key="index"
              :class="
                item.eventStatusAfter == 5
                  ? 'pop_upWindows_bottom_right_1'
                  : item.eventStatusAfter == 6
                  ? 'pop_upWindows_bottom_right_3'
                  : 'pop_upWindows_bottom_right_2'
              "
            >
              <div class="divOnes" v-if="item.eventStatusAfter">
                <span>工单状态:</span>
                <span class="spansf1" v-if="item.eventStatusAfter == 5"
                  >已处理</span
                >
                <span class="spansf2" v-if="item.eventStatusAfter == 1"
                  >待核实</span
                >
                <span class="spansf2" v-if="item.eventStatusAfter == 2"
                  >核实中</span
                >
                <span class="spansf2" v-if="item.eventStatusAfter == 3"
                  >待处理</span
                >
                <span class="spansf2" v-if="item.eventStatusAfter == 4"
                  >处理中</span
                >
                <span class="spansf3" v-if="item.eventStatusAfter == 6"
                  >超出范围</span
                >
                <span class="spansf3" v-if="item.eventStatusAfter == 7"
                  >已关闭</span
                >
              </div>
              <div class="divOnes" v-if="item.gmtCreate">
                <span>工单时间:</span>
                <span>{{ item.gmtCreate }}</span>
              </div>
              <div class="divOnes" v-if="item.title">
                <span>事件记录:</span>
                <span>{{ item.title }}</span>
              </div>
              <div class="divOnes" v-if="item.mailContactorName">
                <span>操作人员:</span>
                <span>{{ item.mailContactorName }}</span>
              </div>
              <div class="divOnes" v-if="item.mailContactorMobile">
                <span>联系电话:</span>
                <span>{{ item.mailContactorMobile }}</span>
              </div>
              <div class="divOnes" style="margin: 0;" v-if="item.content">
                <span>操作描述:</span>
                <span>{{ item.content }}</span>
              </div>

              <div class="Img_wrap" style="margin: 0;" v-if="item.imageUrl">
                <!-- v-for="(item,index) in listDataTow" -->
                <img
                  class="BigImg"
                  :data-original="src + item.imageUrl"
                  :src="src + item.imageUrl"
                />
              </div>

              <div
                style="padding: 5px 0;"
                v-if="item.audioUrl || item.audioUrlArr != 0"
              >
                <audio :src="item.audioUrl" v-if="item.audioUrl"></audio>
                <audio
                  :src="ele"
                  v-for="(ele, index) in item.audioUrlArr"
                  :key="index"
                  v-if="item.audioUrlArr != 0"
                ></audio>
              </div>
            </div>
          </el-scrollbar>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import allUrl from "../../assets/api/allApiUrl.js";
import Viewer from "viewerjs";

export default {
  name: "pop_upWindows",
  data() {
    return {
      wrapFlag: false,
      src: window.SITE_CONFIG["cloudUrl"],
      datas: [
        {
          eventTypeName: "",
          gmtCreate: "",
          townName: "",
          content: "",
          eventStatusAfter: "",
          title: "",
          mailContactorName: "",
          mailContactorMobile: "",
          imageUrl: "",
          audioUrl: ""
        }
      ],
      listData: [
        {
          bkgPicUrl:
            "http://61.144.78.235:8991/alarm_images/people/2019-11-10/1573352936305-4204.png",
          bkgPicMinUrl:
            "http://61.144.78.235:8991/alarm_images/people/2019-11-10/1573352936305-4204_min.png"
        },
        {
          bkgPicUrl:
            "http://61.144.78.235:8991/alarm_images/people/2019-11-10/1573352936305-4204.png",
          bkgPicMinUrl:
            "http://61.144.78.235:8991/alarm_images/people/2019-11-10/1573352936305-4204_min.png"
        },
        {
          bkgPicUrl:
            "http://61.144.78.235:8991/alarm_images/people/2019-11-10/1573352936305-4204.png",
          bkgPicMinUrl:
            "http://61.144.78.235:8991/alarm_images/people/2019-11-10/1573352936305-4204_min.png"
        },
        {
          bkgPicUrl:
            "http://61.144.78.235:8991/alarm_images/people/2019-11-10/1573352936305-4204.png",
          bkgPicMinUrl:
            "http://61.144.78.235:8991/alarm_images/people/2019-11-10/1573352936305-4204_min.png"
        }
      ],
      listDataTow: [
        {
          bkgPicUrl:
            "http://61.144.78.235:8991/alarm_images/people/2019-11-10/1573352936305-4204.png",
          bkgPicMinUrl:
            "http://61.144.78.235:8991/alarm_images/people/2019-11-10/1573352936305-4204_min.png"
        },
        {
          bkgPicUrl:
            "http://61.144.78.235:8991/alarm_images/people/2019-11-10/1573352936305-4204.png",
          bkgPicMinUrl:
            "http://61.144.78.235:8991/alarm_images/people/2019-11-10/1573352936305-4204_min.png"
        }
      ],
      incomeData: {
        eventTypeName: "",
        gmtCreate: "",
        townName: "",
        content: "",
        eventStatusAfter: "",
        title: "",
        mailContactorName: "",
        mailContactorMobile: "",
        imageUrl: "",
        audioUrl: ""
      },
      backgroundURL: window.SITE_CONFIG['cloudUrl'],
    };
  },
  mounted() {
    this.$nextTick(() => {
      this.$viewer();
    });
  },
  methods: {
    init(item, flagType) {
      console.log('display this', item)
      this.incomeData = item;
      const _that = this;
      // this.$store.state.selectBtn == 'estate'
      let data = allUrl.chaByDataSource,
        s = {
          params: {
            flagType: flagType,
            platformId: 0,
            dataSourceId: item.id
          }
        };
      Object.assign(data, s); // 合并对象, 只是把参数搞成对象形式 {}
      this.apix(data)
        .then(res => {
          this.wrapFlag = true;
          if (res.list != 0) {
            this.datas = res.list;
            setTimeout(() => {
              // 设置图片路径 用require()转换成base64
              let play = require("../../assets/images/play.png"),
                stop = require("../../assets/images/stop.png"),
                trumpet = require("../../assets/images/trumpet.png"),
                ziyuan = require("../../assets/images/ziyuan.png");
              let getAllAudio = document.getElementsByTagName("audio");
              let obj = {
                play,
                stop,
                trumpet,
                ziyuan
              };
              Array.from(getAllAudio).forEach(ele => {
                let audio = new _that.$AddTamplat.AddTamplat(
                  ele.parentNode,
                  ele.src,
                  obj
                );
                audio.addIncident();
              });
            });
          }
          console.log(this.datas);
        })
        .catch(err => {
          console.log(err);
        });
    }
  },
  watch: {
    datas: function(newVlue) {
      this.$nextTick(() => {
        this.$viewer();
      });
    }
  }
};
</script>

<style scoped>
.pop_upWindows_Wrap {
  /* width: 100%;
  height: 100vh; */
  position: fixed;
  z-index: 999;
  top: calc(50vh - 355px);
  left: calc(50vw - 350px);;
  display: flex;
  justify-content: center;
  align-items: center;
}
.pop_upWindows_content_Wrap {
  padding: 7px;
  box-sizing: border-box;
  width: 700px;
  height: 710px;
  background: url("../../assets/images/wrapBrg.png") no-repeat;
  background-size: 100% 100%;
  display: flex;
  flex-direction: column;
}
.pop_upWindows_top {
  position: relative;
  text-align: center;
  font-size: 20px;
  font-weight: normal;
  color: rgba(254, 254, 254, 1);
  margin-top: 5px;
  margin-bottom: 20px;
}
.pop_upWindows_top > img {
  position: absolute;
  top: 6px;
  right: 14px;
  cursor: pointer;
}
.pop_upWindows_bottom {
  flex: 1;
  padding: 0 16px 0 34px;
  display: flex;
}
.pop_upWindows_bottom_left {
  width: 290px;
  height: 620px;
  overflow-y: auto;
}
.pop_upWindows_bottom_right {
  flex: 1;
  height: 620px;
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  position: relative;
}
.pop_upWindows_bottom_right:before {
  content: "";
  position: absolute;
  top: 0;
  left: 18px;
  width: 2px;
  height: 100%;
  background: rgba(40, 119, 215, 1);
  opacity: 0.25;
}
h1 {
  margin: 0;
}
.hdsd {
  font-size: 16px;
  font-weight: normal;
  color: rgba(253, 253, 255, 1);
  margin-bottom: 8px;
  margin-top: 10px;
}
.bgr {
  background: rgba(255, 255, 255, 0.1);
  padding: 12px 13px 12px 17px;
  box-sizing: border-box;
}
.colorpp {
  font-size: 16px;
  font-weight: normal;
  color: rgba(154, 201, 231, 1);
}
.liu6 {
  height: 66px;
}
.pop_upWindows_bottom_right /deep/ .el-scrollbar__view {
  display: flex;
  flex-direction: column;
  align-items: flex-end;
}
.liu6 /deep/ .el-scrollbar__wrap,
.pop_upWindows_bottom_right /deep/ .el-scrollbar__wrap,
.pop_upWindows_bottom_left /deep/ .el-scrollbar__wrap {
  overflow-y: scroll;
  overflow-x: hidden;
}
.liu6 /deep/ .el-scrollbar__bar.is-vertical {
  background: #2877d7;
}
.Img_wrap {
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  margin-top: 14px;
}
.Img_wrap img {
  cursor: pointer;
  width: 140px;
  height: 82px;
  margin-top: 4px;
}
.pop_upWindows_bottom_right_1 {
  width: 307px;
  padding: 8px 6px 15px 14px;
  box-sizing: border-box;
  background: rgba(225, 225, 225, 0.1);
  position: relative;
}
.pop_upWindows_bottom_right_1:before {
  content: "";
  position: absolute;
  top: 10px;
  left: -35px;
  width: 30px;
  height: 30px;
  background: url("../../assets/images/1g.png") no-repeat;
}
.divOnes {
  display: flex;
  margin-bottom: 10px;
}
.divOnes > span:nth-child(1) {
  width: 70px;
  font-size: 16px;
  font-weight: normal;
  color: rgba(255, 255, 255, 1);
}
.divOnes > span:nth-child(2) {
  flex: 1;
  display: block;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  font-size: 16px;
  font-weight: normal;
  color: rgba(255, 255, 255, 1);
  margin-left: 13px;
}
.dian {
  position: relative;
}
.dian:before {
  content: "";
  position: absolute;
  top: 0;
  bottom: 0;
  left: -10px;
  margin: auto;
  width: 4px;
  height: 4px;
  background: rgba(165, 165, 165, 1);
  border-radius: 50%;
}
.pop_upWindows_bottom_right_2 {
  width: 307px;
  margin-top: 14px;
  margin-bottom: 14px;
  position: relative;
}
.pop_upWindows_bottom_right_2:before {
  content: "";
  position: absolute;
  top: 10px;
  left: -35px;
  width: 30px;
  height: 30px;
  background: url("../../assets/images/2g.png") no-repeat;
}
.pop_upWindows_bottom_right_3 {
  width: 307px;
  position: relative;
}
.pop_upWindows_bottom_right_3:before {
  content: "";
  position: absolute;
  top: 10px;
  left: -35px;
  width: 30px;
  height: 30px;
  background: url("../../assets/images/3g.png") no-repeat;
}
.spansf1 {
  color: #40bf98 !important;
}
.spansf2 {
  color: #f7b500 !important;
}
.spansf3 {
  color: #ff8171 !important;
}
</style>
