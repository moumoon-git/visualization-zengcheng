<template>
  <div class="resourcesSearch_wrap">
    <div class="header_dl">
      <select
        v-model="selectVal"
        style="width: 95px; margin-right: 34px; margin-left: 0"
        class="plan_select"
      >
        <option
          v-for="(item, index) in listData"
          :key="index"
          :value="item.value"
        >
          {{ item.name }}
        </option>
      </select>
      <select v-model="selectVal1" class="plan_select" style="width: 113px">
        <option
          v-for="(item, index) in listData1"
          :key="index"
          :value="item.value"
        >
          {{ item.name }}
        </option>
      </select>

      <input type="text" v-model="inpVal" class="inp_dl" />

      <button class="inp_button" @click="serchBtns">搜索</button>
    </div>

    <div class="list_Wrap_dl_Hash">
      <el-scrollbar style="height: 100%">
        <div v-show="flag == 0">
          <troopslist
            ref="troopslist"
            @clickSelects="clickSelects"
          ></troopslist>
        </div>

        <div v-show="flag == 1">
          <productionList
            ref="productionList"
            @clickSelects="clickSelects"
          ></productionList>
        </div>

        <div v-show="flag == 2">
          <take ref="take" @clickSelects="clickSelects"></take>
        </div>

        <div v-show="flag == 3">
          <entrench ref="entrench" @clickSelects="clickSelects"></entrench>
        </div>

        <div v-show="flag == 4">
          <monitoring
            ref="monitoring"
            @clickSelects="clickSelects"
          ></monitoring>
        </div>
      </el-scrollbar>
    </div>
    <!--
      * @author tanjinfeng
      * @date 2020-11-24
      * @description 新增落点点击弹窗
    -->
    <!-- *** 新增的代码 *** -->
    <resourceTeam ref="team"></resourceTeam>
    <resourceArea ref="area"></resourceArea>
    <resourceProtectTarget ref="protectTarget"></resourceProtectTarget>
    <videoPreview ref="videoPreviewVisiable"></videoPreview>
    <EmergencyResourcesDialog ref="EmergencyResourcesDialog"/>
    <!-- *** 结束 *** -->
  </div>
</template>

<script>
import allUrl from "../../../../../assets/api/allApiUrl";
import troopslist from "./template/troopslist";
import productionList from "./template/productionList";
import monitoring from "./template/monitoring";
import take from "./template/take";
import entrench from "./template/entrench";

/**
 * @author tanjinfeng
 * @date 2020-11-24
 * @description 新增落点点击弹窗
 */
// *** 新增的代码 ***
import resourceTeam from "../resourceViewDialog/yjdw";
import resourceArea from "../resourceViewDialog/bncs";
import resourceProtectTarget from "../resourceViewDialog/fhmb";
import videoPreview from "../videoPreview";
import EmergencyResourcesDialog from '../resourceViewDialog/EmergencyResourcesDialog';
// *** 结束 ***

export default {
  name: "resourcesSearch",
  data() {
    return {
      flag: 0,
      selectVal: 0,
      selectVal1: 500,
      map: "",
      inpVal: "",
      circlex: "",
      listData: [
        { name: "应急队伍", value: 0 },
        { name: "应急物资", value: 1 },
        /**
         * @author tanjinfeng
         * @date 2020-11-02
         * @desc 避难改为避护
         */
        { name: "避护场所", value: 2 },
        { name: "防护目标", value: 3 },
        { name: "视频监控", value: 4 },
      ],
      listData1: [
        { name: "500米", value: 500 },
        { name: "1000米", value: 1000 },
        { name: "1500米", value: 1500 },
        { name: "自定义", value: "x" },
      ],
      allMackerData: ["", "", "", "", ""],
    };
  },
  methods: {
    /**
     * @author tanjinfeng
     * @date 2020-11-26
     * @description 清空上一次事件的结果
     */
    clearMarker() {
      // 清空覆盖物
      this.map.remove(this.circlex)
      this.allMackerData.forEach(e => {
        this.map.remove(e)
      })

      // 清空搜索列表
      this.$refs.troopslist ? this.$refs.troopslist.data = '' : null
      this.$refs.productionList ? this.$refs.productionList.data = '' : null
      this.$refs.monitoring ? this.$refs.monitoring.data = '' : null
      this.$refs.take ? this.$refs.take.data = '' : null
      this.$refs.entrench ? this.$refs.entrench.data = '' : null
    },
    
    // 地图对象
    initMap(map) {
      const _that = this;
      this.map = map;
    },
    dorwCri(center, radius) {
      /**
       * @author tanjinfeng
       * @date 2020-11-26
       * @description DEBUG：事件切换的时候红圈不会切换
       */
      /* 原来的代码 */
      // if (!this.circlex) {
      //   var circle = new AMap.Circle({
      //     center,
      //     radius, //半径
      //     borderWeight: 0,
      //     strokeWeight: 0,
      //     strokeOpacity: 0.2,
      //     fillOpacity: 0.4,
      //     strokeStyle: "none",
      //     fillColor: "#fb1212",
      //     zIndex: 50,
      //   });
      //   circle.setMap(this.map);
      //   this.circlex = circle;
      // } else {
      //   this.circlex.setRadius(radius);
      // }
      /* 修改后的代码 */
      // 清空上一次的红圈
      if (this.circlex) {
        this.circlex.setMap(null)
      }
      const circle = new AMap.Circle({
        center,
        radius, //半径
        borderWeight: 0,
        strokeWeight: 0,
        strokeOpacity: 0.2,
        fillOpacity: 0.4,
        strokeStyle: "none",
        fillColor: "#fb1212",
        zIndex: 50,
      })
      circle.setMap(this.map);
      this.circlex = circle;
      /* 结束 */
      // 缩放地图到合适的视野级别
      this.map.setFitView([this.circlex]);
    },
    serchBtns() {
      let yiIcon = require("../../../../../assets/images/cszh/jyicon.png");
      let wzIcon = require("../../../../../assets/images/cszh/wzicon.png");
      let bnIcon = require("../../../../../assets/images/cszh/bnicon.png");
      let fhIcon = require("../../../../../assets/images/cszh/fhicon.png");
      /**
       * @author tanjinfeng
       * @date 2020-09-11
       * @desc 修改图标，一共7类
       */
      /////////
      // let spIcon = require('../../../../../assets/images/cszh/spicon.png')
      let spIcon_0 = require("../../../../../assets/images/cszh/spicon_0.png");
      let spIcon_1 = require("../../../../../assets/images/cszh/spicon_1.png");
      let spIcon_2 = require("../../../../../assets/images/cszh/spicon_2.png");
      let spIcon_3 = require("../../../../../assets/images/cszh/spicon_3.png");
      let spIcon_4 = require("../../../../../assets/images/cszh/spicon_4.png");
      let spIcon_5 = require("../../../../../assets/images/cszh/spicon_5.png");
      let spIcon_6 = require("../../../../../assets/images/cszh/spicon_6.png");
      let spIcon = [
        spIcon_0,
        spIcon_1,
        spIcon_2,
        spIcon_3,
        spIcon_4,
        spIcon_5,
        spIcon_6,
      ];
      /////////
      if (
        this.$store.state.center &&
        this.$store.state.center.length != 0 &&
        this.map
      ) {
        let centent = this.$store.state.center;
        let data = {
          ...allUrl.searchSourceByPoint,
          params: {
            x: centent[0],
            y: centent[1],
            radius: this.selectVal1 / 1000,
            title: this.inpVal,
            resoureArea: this.selectVal == 2 ? true : false,
            resoureArticleStorehouse: this.selectVal == 1 ? true : false,
            resoureProtectTarget: this.selectVal == 3 ? true : false,
            resoureTeam: this.selectVal == 0 ? true : false,
            // riskCamera:this.selectVal==4?true:false,
            type: "1",
            /**
             * @modify
             * @desc 修改riskCamera和增加spdyRiskCamera
             * @author tanjinfeng
             * @date 2020.09.09
             */
            /////////
            // riskCamera: false,
            riskCamera: this.selectVal == 4 ? true : false,
            spdyRiskCamera: true,
            /////////
          },
        };
        this.apix(data)
          .then((res) => {
            console.log(res);
            if (this.selectVal == 0) {
              this.$refs.troopslist.init(res.resoureTeam);
            } else if (this.selectVal == 1) {
              this.$refs.productionList.init(res.resoureArticleStorehouse);
            } else if (this.selectVal == 2) {
              this.$refs.take.init(res.resoureArea);
            } else if (this.selectVal == 3) {
              this.$refs.entrench.init(res.resoureProtectTarget);
            } else if (this.selectVal == 4) {
              /**
               * @modify
               * @desc 返回数据字段名改变了
               * @author tanjinfeng
               * @date 2020.09.09
               */
              /////////
              // this.$refs.monitoring.init(res.riskCamera)
              this.$refs.monitoring.init(res.spdyRiskCamera);
              /////////
            }
            // this.selectVal==1?this.$refs.productionList.init(res.resoureArticleStorehouse):''
            this.render(
              this.selectVal == 0 ? true : false,
              res.resoureTeam ? res.resoureTeam : "",
              "allMackerData",
              0,
              yiIcon
            );
            this.render(
              this.selectVal == 1 ? true : false,
              res.resoureArticleStorehouse ? res.resoureArticleStorehouse : "",
              "allMackerData",
              1,
              wzIcon
            );
            this.render(
              this.selectVal == 2 ? true : false,
              res.resoureArea ? res.resoureArea : "",
              "allMackerData",
              2,
              bnIcon
            );
            this.render(
              this.selectVal == 3 ? true : false,
              res.resoureProtectTarget ? res.resoureProtectTarget : "",
              "allMackerData",
              3,
              fhIcon
            );
            this.render(
              this.selectVal == 4 ? true : false,
              res.spdyRiskCamera ? res.spdyRiskCamera : "",
              "allMackerData",
              4,
              spIcon
            );
            this.dorwCri(this.$store.state.center, this.selectVal1);
          })
          .catch((err) => {
            console.log(err);
          });
      } else if (this.$store.state.center.length == 0) {
        this.$message({
          message: "请选择一个事件",
          type: "warning",
        });
      } else if (!this.map) {
        this.$message({
          message: "请刷新后重试",
          type: "warning",
        });
      }
    },
    // 落图渲染
    render(isData, arrData, str, num, imgUrl) {
      if (isData) {
        /**
         * @author tanjinfeng
         * @date 2020-10-28
         * @desc 清空上一次结果
         */
        // ****代码开始****
        if (this[str][num]) {
          this.map.remove(this[str][num]);
        }
        // ****结束******
        this[str][num] = this.forEachData(arrData, imgUrl, num);
      } else if (num == 4) {
        if (this.allMackerData[4]) {
          this.allMackerData[4].setMap(null);
          this.allMackerData[4] = "";
        }
      } else {
        this.map.remove(this[str][num]);
        this[str][num] = "";
      }
    },
    forEachData(data, imgUrl, nums) {
      const _that = this;
      if (data.length != 0) {
        let arrData = [];
        // 创建一个 Icon
        var startIcon = new AMap.Icon({
          // 图标的取图地址
          size: new AMap.Size(40, 40),
          image: imgUrl,
          // 图标所用图片大小
          imageSize: new AMap.Size(40, 40),
          // 图标取图偏移量
          imageOffset: new AMap.Pixel(0, 0),
        });
        if (nums == 4) {
          data.forEach((ele) => {
            ele.lnglat = [ele.x, ele.y];
            // ele.style = 0
          });
          /**
           * @author tanjinfeng
           * @date 2020-09-11
           * @desc 视频icon改为7种
           */
          /////////////////////////
          // let spIconx = require('../../../../../assets/images/cszh/spicon1.png')
          // var style = [{
          //     url:imgUrl,
          //     anchor: new AMap.Pixel(20, 20),
          //     size: new AMap.Size(40, 40)
          // },{
          //     url:spIconx,
          //     anchor: new AMap.Pixel(20, 20),
          //     size: new AMap.Size(40, 40)
          // }];
          var style = [
            // 100高空视频（紫色）
            {
              url: imgUrl[0],
              anchor: new AMap.Pixel(20, 40),
              size: new AMap.Size(40, 53),
            },
            // 101村级视频（淡绿色）
            {
              url: imgUrl[1],
              anchor: new AMap.Pixel(20, 40),
              size: new AMap.Size(40, 53),
            },
            // 0人脸识别（蓝色）
            {
              url: imgUrl[2],
              anchor: new AMap.Pixel(20, 40),
              size: new AMap.Size(40, 53),
            },
            // 1车辆识别（橙色）
            {
              url: imgUrl[3],
              anchor: new AMap.Pixel(20, 40),
              size: new AMap.Size(40, 53),
            },
            // 102社会面视频（深绿色）
            {
              url: imgUrl[4],
              anchor: new AMap.Pixel(20, 40),
              size: new AMap.Size(40, 53),
            },
            // 103派出所（红色）
            {
              url: imgUrl[5],
              anchor: new AMap.Pixel(20, 40),
              size: new AMap.Size(40, 53),
            },
            // 104人脸车辆混合识别（黄色）
            {
              url: imgUrl[6],
              anchor: new AMap.Pixel(20, 40),
              size: new AMap.Size(40, 53),
            },
          ];
          //////////////////////
          var mass = new AMap.MassMarks(data, {
            opacity: 0.8,
            zIndex: 111,
            cursor: "pointer",
            style: style,
          });
          /**
           * @author tanjinfeng
           * @date 2020-11-24
           * @description 新增：视频落点点击弹窗
           */
          // *** 原来的代码 ***
          // var marker = new AMap.Marker({ content: " ", map: this.map });
          // mass.setMap(this.map);
          // mass.setStyle(style);
          // *** 修改后的代码 ***
          var marker = new AMap.Marker({ content: " ", map: this.map });

          mass.on("mouseover", function (e) {
            marker.setPosition(e.data.lnglat);
            marker.setLabel({
              offset: new AMap.Pixel(-5 * e.data.vcName.length, -10),
              content: `<div style="background-color:white;color:gray;padding:6px;border-radius:5px">${e.data.vcName}</div>`,
              direction: "right",
            });
          });
          mass.on("mouseout", function (e) {
            marker.setPosition(e.data.lnglat);
            marker.setLabel(null);
          });

          mass.setMap(this.map);
          mass.setStyle(style);

          mass.on("click", e => {
            console.log(this.$refs, e.data)
            this.$refs.videoPreviewVisiable.videoPreview(e.data);
          });
          // *** 结束 ***

          return mass;
        } else {
          data.forEach((ele) => {
            if (ele.longitude && ele.latitude) {
              let obj = {
                icon: startIcon,
                position: [ele.longitude, ele.latitude],
              };
              let marker = new AMap.Marker({
                map: _that.map,
                icon: obj.icon,
                position: obj.position,
                offset: new AMap.Pixel(-20, -40),
                zIndex: 9999,
              });

              /**
               * @author tanjinfeng
               * @date 2020-11-24
               * @description 新增落点点击弹窗
               */
              // *** 新增的代码 ***
              marker.on('click', () => {
                if (nums === 0) {
                  // 应急队伍
                  this.$refs.team.init({ resoureTeam: ele })
                } else if (nums === 1) {
                  // 应急物资
                  this.$refs.EmergencyResourcesDialog.initStore(ele)
                } else if (nums === 2) {
                  // 避护场所
                  this.$refs.area.init({ data: [ele] })
                } else if (nums === 3) {
                  // 防护目标
                  this.$refs.protectTarget.init( { ResoureProtectTargetEntity: ele })
                }
              })
              // *** 结束 ***

              arrData.push(marker);
            }
          });
        }
        return arrData;
      } else {
        return "";
      }
    },
    // 自定义功能
    open() {
      this.$prompt("请输入数字", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        inputPattern: /^\d{1,8}$/,
        inputErrorMessage: "格式不正确,请输入8位数的数字",
      })
        .then(({ value }) => {
          this.listData1.push({ name: value + "米", value });
          this.selectVal1 = value;
        })
        .catch(() => {});
      let ele = document.getElementsByClassName("el-message-box")[0];
      document.getElementsByClassName("el-message-box__title")[0].style.color =
        "#fff";
      document.getElementsByClassName(
        "el-message-box__content"
      )[0].style.color = "#fff";
      document.getElementsByClassName("el-input__inner")[0].style.color =
        "#000";
      ele.style.background = "rgba(11, 30, 75, 0.6)";
      ele.style.border = "none";
      ele.style.color = "#fff";
    },
    // 设置中心点并放大
    clickSelects(item) {
      let yiIcon = require("../../../../../assets/images/cszh/jyicon1.png");
      let wzIcon = require("../../../../../assets/images/cszh/wzicon1.png");
      let bnIcon = require("../../../../../assets/images/cszh/bnicon1.png");
      let fhIcon = require("../../../../../assets/images/cszh/fhicon1.png");
      let spIcon = require("../../../../../assets/images/cszh/spicon1.png");
      console.log(this.allMackerData, item);
      if (item.type != "sp") {
        this.map.setCenter([item.data.longitude, item.data.latitude]);
        // this.map.setZoom(19)
        this.loaderIng();
      }
      let obj = {
        // 图标的取图地址
        size: new AMap.Size(40, 40),
        image: "",
        // 图标所用图片大小
        imageSize: new AMap.Size(40, 40),
        // 图标取图偏移量
        imageOffset: new AMap.Pixel(0, 0),
      };
      if (item.type == "dw") {
        obj.image = yiIcon;
        let startIcon = new AMap.Icon(obj);
        this.allMackerData[0][item.ind].setIcon(startIcon);
      } else if (item.type == "wz") {
        obj.image = wzIcon;
        let startIcon = new AMap.Icon(obj);
        this.allMackerData[1][item.ind].setIcon(startIcon);
      } else if (item.type == "bn") {
        obj.image = spIcon;
        let startIcon = new AMap.Icon(obj);
        this.allMackerData[2][item.ind].setIcon(bnIcon);
      } else if (item.type == "fh") {
        obj.image = spIcon;
        let startIcon = new AMap.Icon(obj);
        this.allMackerData[3][item.ind].setIcon(fhIcon);
      } else if (item.type == "sp") {
        this.allMackerData[4]["Qe"]
          ? null
          : (this.allMackerData[4]["Qe"] = this.allMackerData[4]["Ce"]);
        let data = Array.from(
          this.allMackerData[4]["Qe"]["dataSources"]
        ).filter(function (ele) {
          ele.style = 0;
          ele.lnglat = [ele.x, ele.y];
          return ele;
        });
        this.allMackerData[4].setData(data);
        this.allMackerData[4]["Qe"]["dataSources"][item.ind].style = 1;
      }
    },
    // 初始化macker图标
    loaderIng() {
      let yiIcon = require("../../../../../assets/images/cszh/jyicon.png");
      let wzIcon = require("../../../../../assets/images/cszh/wzicon.png");
      let bnIcon = require("../../../../../assets/images/cszh/bnicon.png");
      let fhIcon = require("../../../../../assets/images/cszh/fhicon.png");
      let spIcon = require("../../../../../assets/images/cszh/spicon.png");
      let data = this.allMackerData;
      data.forEach((ele, ind) => {
        // 创建一个 Icon
        let obj = {
          // 图标的取图地址
          size: new AMap.Size(40, 40),
          image: "",
          // 图标所用图片大小
          imageSize: new AMap.Size(40, 40),
          // 图标取图偏移量
          imageOffset: new AMap.Pixel(0, 0),
        };
        if (ind == 0) {
          obj.image = yiIcon;
        } else if (ind == 1) {
          obj.image = wzIcon;
        } else if (ind == 2) {
          obj.image = bnIcon;
        } else if (ind == 3) {
          obj.image = fhIcon;
        } else if (ind == 4) {
          obj.image = spIcon;
        }
        if (ele.length != 0) {
          ele.forEach((eles, index) => {
            let startIcon = new AMap.Icon(obj);
            eles.setIcon(startIcon);
          });
        }
      });
    },
  },
  mounted() {},
  components: {
    troopslist,
    productionList,
    monitoring,
    take,
    entrench,
    /**
     * @author tanjinfeng
     * @date 2020-11-24
     * @description 新增落点弹窗
     */
    // *** 新增的代码 ***
    resourceTeam,
    resourceArea,
    resourceProtectTarget,
    videoPreview,
    EmergencyResourcesDialog
    // *** 结束 ***
  },
  watch: {
    selectVal(newVal) {
      this.flag = newVal;
    },
    selectVal1(newVal) {
      // 是否为自定义
      if (newVal == "x") {
        this.open();
      }
    },
  },
};
</script>

<style scoped>
select {
  outline: none;
}
.resourcesSearch_wrap {
  height: 100%;
  padding-top: 13px;
  padding-left: 25px;
  display: flex;
  flex-direction: column;
}
.header_dl {
  display: flex;
  align-items: center;
  justify-content: flex-start;
}
.plan_select {
  font-size: 16px;
  font-weight: 400;
  height: 26px;
  color: rgba(0, 242, 255, 1);
  background: url("../../../../../assets/images/cszh/li2.png") no-repeat;
  background-size: 100% 100%;
  border: none;
  line-height: 26px;
}
.plan_select > option {
  background: rgba(11, 30, 75, 0.8);
}
.inp_dl {
  width: 196px;
  height: 25px;
  border: 1px solid rgba(63, 146, 254, 1);
  border-radius: 3px;
  box-sizing: border-box;
  background: transparent;
  font-size: 16px;
  font-weight: 400;
  color: rgba(0, 242, 255, 1);
  outline: none;
  padding-left: 10px;
  margin-left: 10px;
  margin-right: 20px;
}
.inp_button {
  width: 56px;
  height: 25px;
  background: url("../../../../../assets/images/cszh/li2.png") no-repeat;
  background-size: 100% 100%;
  border: none;
  font-size: 16px;
  font-weight: 400;
  color: rgba(0, 242, 255, 1);
  outline: none;
  cursor: pointer;
}
.list_Wrap_dl_Hash {
  flex: 1;
  margin-top: 10px;
  margin-bottom: 10px;
  max-height: 640px;
  height: 640px;
}
.list_Wrap_dl_Hash /deep/ .el-scrollbar__wrap {
  overflow-x: hidden;
}
</style>
