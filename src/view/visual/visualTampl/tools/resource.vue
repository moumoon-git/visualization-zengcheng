<template>
  <div class="resource_wrap">
    <ul class="resource_ul">
      <li
        v-for="(item, index) in dataList"
        :key="index"
        :class="[{ expand: isMonitorExpand },
                { sbssExpand: isSBSSExpand }]"
      >
        <img
          @click="checked(item, index)"
          :src="item.flag ? item.activeImg : item.img"
          alt=""
        />
        <span @click="expand(item)"> {{ item.name }} </span>
      </li>
    </ul>

    <resourceTeam ref="team"></resourceTeam>
    <resourceArticle ref="article"></resourceArticle>
    <resourceArea ref="area"></resourceArea>
    <resourceProtectTarget ref="protectTarget"></resourceProtectTarget>
    <!-- 视频预览 -->
    <videoPreview ref="videoPreviewVisiable"></videoPreview>
    <!-- 应急物资弹窗 -->
    <EmergencyResourcesDialog ref="EmergencyResourcesDialog"/>
    <!-- 出租屋弹框 -->
    <Rental ref="Rental"/>

    <!-- 消防站 -->
    <resourceXFZ ref="xfz" />
    <!-- 实有人口 -->
    <resourceSBSSPerson ref="sbssPerson" />
    <!-- 实有房屋 -->
    <resourceSBSSHouse ref="sbssHouse" />
    <!-- 网格事件 -->
    <resourceWgsj ref="wgsj" />
  </div>
</template>

<script>
import allUrl from "../../../../assets/api/allApiUrl";
import videoPreview from "./videoPreview";

import resourceTeam from "./resourceViewDialog/yjdw";
import resourceArticle from "./resourceViewDialog/yjwz";
import resourceArea from "./resourceViewDialog/bncs";
import resourceProtectTarget from "./resourceViewDialog/fhmb";

import resourceXFZ from "./resourceViewDialog/xfz";
import resourceSBSSPerson from "./resourceViewDialog/sbssPerson";
import resourceSBSSHouse from "./resourceViewDialog/sbssHouse";
import resourceWgsj from "./resourceViewDialog/wgsj";

import Rental from './Rental/Rental' // 出租屋弹框

import EmergencyResourcesDialog from './resourceViewDialog/EmergencyResourcesDialog'
import bus from '@/utils/bus.js'
export default {
  name: "resource",
  data() {
    return {
      map: "",
      dataList: [
        {
          name: "应急队伍",
          flag: false,
          img: require("../../../../assets/images/cszh/mx.png"),
          activeImg: require("../../../../assets/images/cszh/xz.png"),
        },
        {
          name: "应急物资",
          flag: false,
          img: require("../../../../assets/images/cszh/mx.png"),
          activeImg: require("../../../../assets/images/cszh/xz.png"),
        },
        {
          name: "避护场所",
          flag: false,
          img: require("../../../../assets/images/cszh/mx.png"),
          activeImg: require("../../../../assets/images/cszh/xz.png"),
        },
        {
          name: "防护目标",
          flag: false,
          img: require("../../../../assets/images/cszh/mx.png"),
          activeImg: require("../../../../assets/images/cszh/xz.png"),
        },
        {
          name: "视频监控",
          flag: false,
          img: require("../../../../assets/images/cszh/mx.png"),
          activeImg: require("../../../../assets/images/cszh/xz.png"),
        },
        {
          name: "高空视频",
          flag: false,
          img: require("../../../../assets/images/cszh/mx.png"),
          activeImg: require("../../../../assets/images/cszh/xz.png"),
        },
        {
          name: "村级视频",
          flag: false,
          img: require("../../../../assets/images/cszh/mx.png"),
          activeImg: require("../../../../assets/images/cszh/xz.png"),
        },
        {
          name: "人脸识别视频",
          flag: false,
          img: require("../../../../assets/images/cszh/mx.png"),
          activeImg: require("../../../../assets/images/cszh/xz.png"),
        },
        {
          name: "车辆识别视频",
          flag: false,
          img: require("../../../../assets/images/cszh/mx.png"),
          activeImg: require("../../../../assets/images/cszh/xz.png"),
        },
        {
          name: "社会面视频",
          flag: false,
          img: require("../../../../assets/images/cszh/mx.png"),
          activeImg: require("../../../../assets/images/cszh/xz.png"),
        },
        {
          name: "派出所视频",
          flag: false,
          img: require("../../../../assets/images/cszh/mx.png"),
          activeImg: require("../../../../assets/images/cszh/xz.png"),
        },
        {
          name: "人脸车辆混合识别视频",
          flag: false,
          img: require("../../../../assets/images/cszh/mx.png"),
          activeImg: require("../../../../assets/images/cszh/xz.png"),
        },
        // tanjinfeng 2020-11-16 新增出租屋
        // {
        //   name: "出租屋",
        //   flag: false,
        //   img: require("../../../../assets/images/cszh/mx.png"),
        //   activeImg: require("../../../../assets/images/cszh/xz.png"),
        // },
        {
          name: "四标四实",
          flag: false,
          img: require("../../../../assets/images/cszh/mx.png"),
          activeImg: require("../../../../assets/images/cszh/xz.png"),
        },
        {
          name: "实有人口",
          flag: false,
          img: require("../../../../assets/images/cszh/mx.png"),
          activeImg: require("../../../../assets/images/cszh/xz.png"),
        },
        {
          name: "实有房屋",
          flag: false,
          img: require("../../../../assets/images/cszh/mx.png"),
          activeImg: require("../../../../assets/images/cszh/xz.png"),
        },
        {
          name: "综合网格",
          flag: false,
          index:15,
          img: require("../../../../assets/images/cszh/mx.png"),
          activeImg: require("../../../../assets/images/cszh/xz.png"),
        },
        {
          name: "消防站",
          flag: false,
          img: require("../../../../assets/images/cszh/mx.png"),
          activeImg: require("../../../../assets/images/cszh/xz.png"),
        },
        
      ],
      data: ["", "", "", "", "", "", "", "", "", "", "", "", "","","","","","",],
      mackerData: ["", "", "", "", "", "", "", "", "", "", "", "", ""],
      dataForm: {}, // 应急资源详情
      isMonitorExpand: false, // 左边图层资源的视频是否展开
      isSBSSExpand: false, // 左边图层四标四实是否展开
      currentActiveRentalMarker: '', // 当前选中的出租屋marker
    };
  },
  components: {
    videoPreview,
    resourceTeam,
    resourceArticle,
    resourceArea,
    resourceProtectTarget,
    EmergencyResourcesDialog,
    Rental,
    resourceXFZ,
    resourceSBSSPerson,
    resourceSBSSHouse,
    resourceWgsj,
  },
  methods: {
    initMaps(map) {
      this.map = map;
    },
    checked(item, index) {
      item.flag = !item.flag;
      let data = this.dataList;
      // 应急队伍
      if (index == 0) {
        this.yjdw(item);
      } else if (index == 1) {
        this.yjwz(item);
      } else if (index == 2) {
        this.bncs(item);
      } else if (index == 3) {
        this.fhmb(item);
      }
    //    else if (index == 12) {
    //     // 新增出租屋落点 2020-11-16 tanjinfeng
    //     this.czw(item);
    //   } 
      else if (index == 12 || index == 13 || index == 14) {
        // 新增出租屋落点 2020-11-16 tanjinfeng
        // this.czw(item);
        this.sbss(item);
      } else if (item.index == 15) {
        this.wgsj(item);
      } else if (index == 16) {
        this.xfz(item);
      } else {
        this.spjk(item);
      }
    },

    yjdw(item) {
      if (item.flag) {
        let data = {
          ...allUrl.resoureteam,
          data: {
            teamTypeIds: [],
            search: "",
            page: 1,
            limit: 100000,
          },
        };
        data.header = {
          "Content-Type": "application/json",
        };
        this.apix(data)
          .then((res) => {
            if (res.code == 0) {
              this.data[0] = res.page.list;
              this.render(0);
            }
          })
          .catch((err) => {
            console.log(err);
          });
      } else {
        this.map.remove(this.mackerData[0]);
        // this.mackerData[0].setMap(null);
        this.mackerData[0] = "";
      }
    },

    yjwz(item) {
      if (item.flag) {
        if (this.mackerData[1] && this.mackerData[1].length > 0) {
          this.map.add(this.mackerData[1])
        } else {
          let data = {
            ...allUrl.resourearticle,
            /**
             * @author tanjinfeng
             * @date 2020-11-11
             * @desc 改为post方法
             */
            // ***原来的代码***
            // params: {
            //   resoureArticleStorehouseId: "",
            //   key: "",
            //   page: 1,
            //   limit: 100000,
            // },
            // ***修改的代码***
            data: {
              resoureArticleStorehouseId: "",
              key: "",
              page: 1,
              limit: 100000,
            },
            header: {
              'Content-Type': 'application/json;charset=UTF-8'
            }
            // ***结束***
          };
          this.apix(data)
            .then((res) => {
              if (res.code == 0) {
                // console.log(res.resoureArticleList.list);
                // this.data[1] = res.resoureArticleList.list;
                this.data[1] = res.page.list
                /**
                 * @author
                 * @date 2020-11-03
                 * @desc 应急物资落点渲染重构
                 */
                // *****原来的代码
                // this.render(1);
                // *****修改的代码
                // this.drawEmergencyResources(res.resoureArticleList.list)
                this.drawEmergencyResources(res.page.list)
                // *****结束
              }
            })
            .catch((err) => {
              console.log(err);
            });
        }
      } else {
        this.map.remove(this.mackerData[1]);
        // this.mackerData[1].setMap(null);
        // this.mackerData[1] = "";
      }
    },
    bncs(item) {
      if (item.flag) {
        let data = {
          ...allUrl.resourearea,
          data: {
            areaTypeId: [],
            key: "",
            page: 1,
            limit: 100000,
          },
        };
        data.header = {
          "Content-Type": "application/json",
        };
        this.apix(data)
          .then((res) => {
            // console.log(res)
            if (res.code == 0) {
              // this.data[2] = res.data.list;
              this.data[2] = res.page.list;
              this.render(2);
            }
          })
          .catch((err) => {
            console.log(err);
          });
      } else {
        this.map.remove(this.mackerData[2]);
        // this.mackerData[2].setMap(null);
        this.mackerData[2] = "";
      }
    },
    fhmb(item) {
      if (item.flag) {
        let data = {
          ...allUrl.resoureProtectTarget,
          data: {
            // groupId:[]
            search: "",
            limit: 10000,
            page: 1,
          },
        };
        data.header = {
          "Content-Type": "application/json",
        };
        this.apix(data)
          .then((res) => {
            if (res.code == 0) {
              // this.data[3] = res.data.list;
              this.data[3] = res.page.list;
              this.render(3);
            }
          })
          .catch((err) => {
            console.log(err);
          });
      } else {
        this.map.remove(this.mackerData[3]);
        // this.mackerData[3].setMap(null);
        this.mackerData[3] = "";
      }
    },
    spjk(item) {
      // 视频类型
      const monitorType = ((name) => {
        switch (name) {
          case "视频监控":
            return 0;
            break;
          case "高空视频":
            return 1;
            break;
          case "村级视频":
            return 2;
            break;
          case "人脸识别视频":
            return 3;
            break;
          case "车辆识别视频":
            return 4;
            break;
          case "社会面视频":
            return 5;
            break;
          case "派出所视频":
            return 6;
            break;
          case "人脸车辆混合识别视频":
            return 7;
            break;
        }
      })(item.name);
      // 勾选上的时候
      if (item.flag) {
        let data = {
          ...allUrl.riskcamera,
          data: {
            key: "",
            state: "",
            groupId: [],
            cameraType: "",
            page: 1,
            limit: 100000,
          },
        };
        data.header = {
          "Content-Type": "application/json",
        };
        if (
          // 第一次请求数据
          this.data[5].length === 0
        ) {
          this.apix(data)
            .then((res) => {
              // console.log(res)
              if (res.code == 0) {
                // 将获取的数据按style的值分类
                this.data[5] = res.data.filter((item) => item.style === 0);
                this.data[6] = res.data.filter((item) => item.style === 1);
                this.data[7] = res.data.filter((item) => item.style === 2);
                this.data[8] = res.data.filter((item) => item.style === 3);
                this.data[9] = res.data.filter((item) => item.style === 4);
                this.data[10] = res.data.filter((item) => item.style === 5);
                this.data[11] = res.data.filter((item) => item.style === 6);
                // 勾选全部的时候，将剩下的都渲染和勾选上
                if (monitorType == 0) {
                  for (let i = 5; i < 12; i++) {
                    if (this.dataList[i].flag === false) {
                      this.render(i);
                      this.dataList[i].flag = true;
                    }
                  }
                }
                // 勾选个别的时候，单独渲染
                else {
                  this.render(4 + monitorType);
                }
              }
            })
            .catch((err) => {
              console.log(err);
            });
        }
        // 第二次勾选的时候
        else {
          // 勾选全部的时候，将剩下的都渲染和勾选上
          if (monitorType == 0) {
            for (let i = 5; i < 12; i++) {
              if (this.dataList[i].flag == false) {
                this.render(i);
                this.dataList[i].flag = true;
              }
            }
          }
          // 勾选个别的时候，单独渲染
          else {
            this.render(4 + monitorType);
          }
        }
      }
      // 取消勾选的时候
      else {
        // 全部取消
        if (monitorType == 0) {
          this.mackerData[5].setMap(null);
          this.mackerData[6].setMap(null);
          this.mackerData[7].setMap(null);
          this.mackerData[8].setMap(null);
          this.mackerData[9].setMap(null);
          this.mackerData[10].setMap(null);
          this.mackerData[11].setMap(null);
          this.dataList[5].flag = false;
          this.dataList[6].flag = false;
          this.dataList[7].flag = false;
          this.dataList[8].flag = false;
          this.dataList[9].flag = false;
          this.dataList[10].flag = false;
          this.dataList[11].flag = false;
        }
        // 个别取消
        else {
          this.mackerData[4 + monitorType].setMap(null);
        }
      }

      /* 2020.09.04以前的代码，上面是tanjinfeng修改的
      if (item.flag) {
        let data = {
          ...allUrl.riskcamera,
          data: {
            key: "",
            state: "",
            groupId: [],
            cameraType: "",
            page: 1,
            limit: 100000
          }
        };
        data.header = {
          "Content-Type": "application/json"
        };
        this.apix(data)
          .then(res => {
            // console.log(res)
            if (res.code == 0) {
              this.data[4] = res.data;
              this.render(4);
            }
          })
          .catch(err => {
            console.log(err);
          });
      } else {
        // console.log(this.mackerData[4])
        this.mackerData[4].setMap(null);
        this.mackerData[4] = "";
      } */
    },

    /**
     * @author tanjinfeng
     * @date 2020-11-16
     * @description 出租屋落点
     */
    czw(item) {
      const icon_normal = new AMap.Icon({ // 落点图标
        image: require('../../../../assets/images/cszh/rental-normal.png'),
        size: new AMap.Size(44, 58),
        imageSize: new AMap.Size(44, 58),
      })
      const icon_active = new AMap.Icon({ // 激活的落点图标
        image: require('../../../../assets/images/cszh/rental-active.png'),
        size: new AMap.Size(44, 58),
        imageSize: new AMap.Size(44, 58),
      })

      if (item.flag) { // 勾选
        if (this.data[12].length && this.data[12].length > 0) { // 若数据已存在，则不请求数据，直接显示
          if (this.currentActiveRentalMarker) { // 上一个选中的marker图标变正常
            this.currentActiveRentalMarker.setIcon(icon_normal)
            this.currentActiveRentalMarker = ''
          }
          this.map.add(this.mackerData[12])
        } else { // 请求出租屋列表数据
          this.apix(`${window.SITE_CONFIG['baseUrl']}/renting/rentingAddrinfo/list`).then(response => {
            if (response.code === 0) {
              this.mackerData[12] = []
              this.data[12] = [...response.data]
              this.data[12].forEach(element => {
                // 经纬度存在则绘制marker
                if (element.wzx && element.wzy) {
                  const marker = new AMap.Marker({
                    position: new AMap.LngLat(element.wzx, element.wzy),
                    map: this.map,
                    icon: icon_normal
                  })
                  marker.on('click', () => { // 点击弹窗
                    this.$refs.Rental.init(element) // 弹窗数据初始化
                    if (this.currentActiveRentalMarker) { // 上一个选中的marker图标变正常
                      this.currentActiveRentalMarker.setIcon(icon_normal)
                    }
                    this.currentActiveRentalMarker = marker
                    marker.setIcon(icon_active)
                  })
                  this.mackerData[12].push(marker)
                }
              })
            }
          })
        }
      } else {
        this.$refs.Rental.visible = false // 关闭弹窗
        this.map.remove(this.mackerData[12]) // 清除出租屋落点
      }
    },

    sbss(item) {
      // 四标四实类型
      const monitorType = ((name) => {
        switch (name) {
          case "四标四实":
            return 12;
            break;
          case "实有人口":
            return 13;
            break;
          case "实有房屋":
            return 14;
            break;
        }
      })(item.name);
      var that = this;
      function getPersonList() {
        if(that.data[13].length === 0) { // 第一次请求数据
          that.apix({
          url: '/record/actualpopulation/list',
          method: 'POST',
          header: {
            "Content-Type": "application/json",
          },
          data: {
            page: 1,
            limit: 10000,
            search: '',
            gridId: '',
          },
        })
          .then((res) => {
            console.log('/record/actualpopulation/list res', res);
            if (res.code == 0) {
              that.data[13] = res.page.list;
              that.render(13);
            }
          });
        } else { // 第二次勾选的时候
          that.render(13);
        }
      };
      function getHouseList() {
        if(that.data[14].length === 0) { // 第一次请求数据
           that.apix({
            url: '/record/house/list',
            method: 'POST',
            header: {
              "Content-Type": "application/json",
            },
            data: {
              limit: 10000,
              page: 1,
              search: "",
              gridId: "",
            },
          })
            .then((res) => {
              console.log('/record/house/list res', res);
              if (res.code == 0) {
                that.data[14] = res.page.list;
                that.render(14);
              }
          })
        } else { // 第二次勾选的时候
          that.render(14);
        }
      };
      // 勾选上的时候
      if (item.flag) {
        if (monitorType == 12){
          getPersonList();
          getHouseList();
          // 勾选全部的时候，将剩下的都渲染和勾选上
          this.dataList[13].flag = true;
          this.dataList[14].flag = true;
        }
        if (monitorType == 13){
          getPersonList();
        }
        if (monitorType == 14){
          getHouseList();
        }
      }
      // 取消勾选的时候
      else {
        // 全部取消
        if (monitorType == 12) {
          this.map.remove(this.mackerData[13]);
          this.map.remove(this.mackerData[14]);
          this.mackerData[13] = "";
          this.mackerData[14] = "";
          this.dataList[13].flag = false;
          this.dataList[14].flag = false;
        }
        // 个别取消
        else {
          this.map.remove(this.mackerData[monitorType]);
          this.mackerData[monitorType] = "";
        }
      }
    },
    wgsj(item) {
      this.$emit('integratedGridHandle',item);
      this.$emit("PaintingPanelHandle",item)
      bus.$emit("gridCheck",item)
      if (item.flag) {
        let data = {
          url: '/network/networkEvents/list',
          method: 'POST',
          data: {
            limit: 100000,
            page: 1,
            search: '',
            status: '',
            platformId: '',
            startTime: '',
            endTime: '',
          },
        };
        data.header = {
          "Content-Type": "application/json",
        };
        this.apix(data)
          .then((res) => {
            console.log('/network/networkEvents/list res', res);
            if (res.code == 0) {
              this.data[item.index] = res.data.list;
              this.render(item.index);
            }
          })
          .catch((err) => {
            console.log(err);
          });
      } else {
        this.map.remove(this.mackerData[item.index]);
        this.mackerData[item.index] = "";
      }
    },
    xfz(item) {
      if (item.flag) {
        let data = {
          url: '/firefighting/station/list',
          method: 'POST',
          data: {
            word: '',
          },
        };
        data.header = {
          "Content-Type": "application/json",
        };
        this.apix(data)
          .then((res) => {
            console.log('/firefighting/station/list res', res);
            if (res.code == 0) {
              this.data[16] = res.data;
              this.render(16);
            }
          })
          .catch((err) => {
            console.log(err);
          });
      } else {
        this.map.remove(this.mackerData[16]);
        this.mackerData[16] = "";
      }
    },

    // 获取应急队伍详细信息
    getResourceInfo(type, id) {
      let data = {};
      switch (type) {
        case 0:
          data = {
            url: allUrl.getResourceTeamInfo.url + `/${id}`,
            method: allUrl.getResourceTeamInfo.method,
          };
          break;
        case 1:
          data = {
            url: allUrl.getResourceArticleInfo.url + `/${id}`,
            method: allUrl.getResourceArticleInfo.method,
          };
          break;
        case 2:
          data = {
            ...allUrl.getResourceAreaInfo,
            params: {
              ids: String(id),
            },
          };
          break;
        case 3:
          data = {
            ...allUrl.getProtectTargetInfo,
            params: {
              id: id,
            },
          };
          break;
        case 13:
          data = {
            url: `/record/actualpopulation/info/${id}`,
            method: 'POST'
          };
          break;
        case 14:
          data = {
            url: `/record/house/info/${id}`,
            method: 'POST'
          };
          break;
        case 15:
          data = {
            url: `/network/networkEvents/info/${id}`,
            method: 'GET'
          };
          break;
        case 16:
          data = {
            url: `/firefighting/station/info/${id}`,
            method: 'POST'
          };
          break;
      }

      data.header = {
        "Content-Type": "application/json",
      };
      return new Promise((resolve, reject) => {
        this.apix(data)
          .then((res) => {
            if (res.code == 0) {
              console.log(res);
              resolve(res);
            } else {
              reject(res.msg);
            }
          })
          .catch((err) => {
            reject(err);
          });
      });
    },

    handleData(type, data) {
      // let form = {};
      let resource = "";
      switch (type) {
        case 0:
          // form = data.resoureTeam;
          resource = "team";
          break;
        case 1:
          resource = "article";
          break;
        case 2:
          resource = "area";
          break;
        case 3:
          resource = "protectTarget";
          break;
        case 13:
          resource = "sbssPerson";
          break;
        case 14:
          resource = "sbssHouse";
          break;
        case 15:
          resource = "wgsj";
          break;
        case 16:
          resource = "xfz";
          break;
      }
      console.log("弹窗实例", this.$refs[resource]);
      this.$refs[resource].init(data);
    },
    // 落图渲染
    render(type) {
      let yiIcon = require("../../../../assets/images/cszh/jyicon.png");
      let wzIcon = require("../../../../assets/images/cszh/wzicon.png");
      let bnIcon = require("../../../../assets/images/cszh/bnicon.png");
      let fhIcon = require("../../../../assets/images/cszh/fhicon.png");
      let spIcon_0 = require("../../../../assets/images/cszh/spicon_0.png");
      let spIcon_1 = require("../../../../assets/images/cszh/spicon_1.png");
      let spIcon_2 = require("../../../../assets/images/cszh/spicon_2.png");
      let spIcon_3 = require("../../../../assets/images/cszh/spicon_3.png");
      let spIcon_4 = require("../../../../assets/images/cszh/spicon_4.png");
      let spIcon_5 = require("../../../../assets/images/cszh/spicon_5.png");
      let spIcon_6 = require("../../../../assets/images/cszh/spicon_6.png");
      let spIcon = [
        spIcon_0,
        spIcon_1,
        spIcon_2,
        spIcon_3,
        spIcon_4,
        spIcon_5,
        spIcon_6,
      ];
      let xfzIcon = require("../../../../assets/images/cszh/xfzIcon.png");
      let sbssPersonIcon = require("../../../../assets/images/cszh/sbss-personIcon.png");
      let sbssHouseIcon = require("../../../../assets/images/cszh/sbss-houseIcon.png");
      let wgsjIcon = require("../../../../assets/images/cszh/wgsjIcon.png");
      if (type == 0) {
        this.mackerData[0] = this.forEachData(this.data[0], yiIcon, 0);
      } else if (type == 1) {
        this.mackerData[1] = this.forEachData(this.data[1], wzIcon, 1);
      } else if (type == 2) {
        this.mackerData[2] = this.forEachData(this.data[2], bnIcon, 2);
      } else if (type == 3) {
        this.mackerData[3] = this.forEachData(this.data[3], fhIcon, 3);
      }  else if (type == 13) {
        this.mackerData[type] = this.forEachData(this.data[type], sbssPersonIcon, type);
      } else if (type == 14) {
        this.mackerData[type] = this.forEachData(this.data[type], sbssHouseIcon, type);
      } else if (type == 15) {
        this.mackerData[type] = this.forEachData(this.data[type], wgsjIcon, type);
      } else if (type == 16) {
        this.mackerData[type] = this.forEachData(this.data[type], xfzIcon, type);
      } else {
        this.mackerData[type] = this.forEachData(this.data[type], spIcon, type);
      }
      console.log("地图渲染", this.mackerData, this.data);
    },
    // 点聚合
    polymerization() {},

    forEachData(data, imgUrl, num) {
      // console.log("地图数据", data, num);
      // console.log(data);
      let that = this;
      // let requestApi = "",
      //   _data = data;

      // switch(num){
      //   case 0:
      //     this.getYJDW()

      // }
      if (num == 1) {
        // 创建一个 icon
        var endMarkerList = [];
        var endIcon = new AMap.Icon({
          size: new AMap.Size(40, 40),
          image: imgUrl,
          imageSize: new AMap.Size(40, 40),
          imageOffset: new AMap.Pixel(0, 0),
        });
        if (data.length != 0) {
          data.forEach((ele) => {
            if (
              ele.resoureArticleStorehouse.longitude &&
              ele.resoureArticleStorehouse.latitude
            ) {
              // 将 icon 传入 marker
              var endMarker = new AMap.Marker({
                position: [
                  ele.resoureArticleStorehouse.longitude,
                  ele.resoureArticleStorehouse.latitude,
                ],
                icon: endIcon,
                offset: new AMap.Pixel(-20, -40),
                
              });

              endMarker.on("click", async function (e) {
                try {
                  console.log(e);
                  console.log(ele.id);
                  let _data = await that.getResourceInfo(num, ele.id);
                  console.log("处理过的信息", _data);
                  that.handleData(num, _data);
                } catch (err) {
                  that.$message.error(err);
                  console.log(err);
                }
              });
              endMarker.on("mouseover", function (e) {
                endMarker.setLabel({
                  offset: new AMap.Pixel(-10.5 * ele.name.length, -35),
                  content: `<div style="background-color:white;color:gray;padding:6px;border-radius:5px">${ele.resoureArticleStorehouse.name}</div>`,
                  direction: "right",
                });
              });
              endMarker.on("mouseout", function (e) {
                endMarker.setLabel(null);
              });

              // 将 markers 添加到地图
              endMarkerList.push(endMarker);

              // this.map.add([endMarker]);
            }
          });
        //   console.log("111111111111111", endMarkerList);
          this.map.add(endMarkerList);
          return endMarkerList;
        }
      } else if (
        /**
         * @author tanjinfeng
         * @date 2020.09.10
         * @desc 7种视频监控图标
         */
        num == 5 ||
        num == 6 ||
        num == 7 ||
        num == 8 ||
        num == 9 ||
        num == 10 ||
        num == 11
      ) {
        // this.map.on("zoomstart", this.mapZoomstart);
        // this.map.on("zoomchange", this.mapZoom);
        // this.map.on("zoomend", this.mapZoomend);

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
        var mass = new AMap.MassMarks(data, {
          opacity: 0.8,
          zIndex: 111,
          cursor: "pointer",
          style: style,
        });
        var marker = new AMap.Marker({ content: " ", map: this.map });

        mass.on("mouseover", function (e) {
          marker.setPosition(e.data.lnglat);
          marker.setLabel({
            offset: new AMap.Pixel(-5 * e.data.name.length, -10),
            content: `<div style="background-color:white;color:gray;padding:6px;border-radius:5px">${e.data.name}</div>`,
            direction: "right",
          });
        });
        mass.on("mouseout", function (e) {
          marker.setPosition(e.data.lnglat);
          marker.setLabel(null);
        });

        mass.setMap(this.map);
        mass.setStyle(style);

        mass.on("click", function (e) {
          that.$refs.videoPreviewVisiable.videoPreview(e.data);
        });

        return mass;
      } else {
        // 创建一个 icon
        var endMarkerList = [];
        var endIcon = new AMap.Icon({
          size: new AMap.Size(40, 40),
          image: imgUrl,
          imageSize: new AMap.Size(40, 40),
          imageOffset: new AMap.Pixel(0, 0),
        });
        if (data.length != 0) {
          data.forEach((ele) => {
            if (ele.longitude && ele.latitude) {
              console.log("ele数据", ele);
              // 将 icon 传入 marker
              
              var endMarker = new AMap.Marker({
                position: [ele.longitude, ele.latitude],
                icon: endIcon,
                offset: new AMap.Pixel(-20, -40),
                extData:num==15?{id:ele.id}:undefined
              });

              endMarker.on("click", async function (e) {
                try {
                  console.log(e);
                  console.log(ele.id);
                  let _data = await that.getResourceInfo(num, ele.id);
                  console.log("处理过的信息", _data);
                  that.handleData(num, _data);
                } catch (err) {
                  // this.$message.error(err);
                  console.log(err);
                }
              });

              endMarker.on("mouseover", function (e) {
                console.log("csscscs", num);
                endMarker.setLabel({
                  offset: new AMap.Pixel(-10.5 * (ele.name||ele.eventName).length, -35),
                  content: `<div style="background-color:white;color:gray;padding:6px;border-radius:5px">${ele.name||ele.eventName}</div>`,
                  direction: "right",
                });
              });
              endMarker.on("mouseout", function (e) {
                endMarker.setLabel(null);
              });
              // 将 markers 添加到地图
              // this.map.add([endMarker]);
              endMarkerList.push(endMarker);
            }
          });

          this.map.add(endMarkerList);
          return endMarkerList;
        }
      }
    },
    expand(item) {
      if (item.name === "视频监控") {
        this.isMonitorExpand = !this.isMonitorExpand;
      }
      if (item.name === "四标四实") {
        this.isSBSSExpand = !this.isSBSSExpand;
      }
      if(item.index == 15){
          this.$emit('integratedGridPopup');
          bus.$emit("getOverlays")
      }
    },
    /**
     * @method
     * @author tanjinfeng
     * @desc 绘制应急物资落点
     * @param {Array} raw 后台返回数据
     */
    drawEmergencyResources(raw) {
      // 用来保存落点
      this.mackerData[1] = []
      // 仓库分类
      let factoryName = new Set()
      // 仓库分类后的数据
      let factory = []
      // 把数据按仓库名分类存放
      raw.forEach(item => {
        if (factoryName.has(item.resoureArticleStorehouse.name)) {
          factory.forEach(arr => {
            if (arr[0].resoureArticleStorehouse.name === item.resoureArticleStorehouse.name) {
              arr.push(item)
            }
          })
        }
        else {
          factoryName.add(item.resoureArticleStorehouse.name)
          factory.push([item])
        }
      })
      // 绘制仓库落点
      factory.forEach(arr => {
        if (arr[0].resoureArticleStorehouse.longitude && arr[0].resoureArticleStorehouse.latitude) {
          const marker = new AMap.Marker({
            position: [arr[0].resoureArticleStorehouse.longitude, arr[0].resoureArticleStorehouse.latitude],
            icon: require("../../../../assets/images/cszh/wzicon.png"),
            offset: new AMap.Pixel(-20, -40),
            map: this.map
          })
          // 鼠标悬浮显示仓库名称
          marker.on('mouseover', e => {
            marker.setLabel({
              content: `<div style="background-color:white;color:gray;padding:6px;border-radius:5px">${arr[0].resoureArticleStorehouse.name}</div>`,
              direction: 'top',
            });
          });
          marker.on('mouseout', e => {
            marker.setLabel(null)
          })
          // 点击显示弹窗
          marker.on('click', e => {
            this.$refs.EmergencyResourcesDialog.init(arr)
          })
          this.mackerData[1].push(marker)
        }
      })
    },
    /**
     * @method
     * @desc 关闭网格分布 网格事件弹窗时，清除地图上的网格事件标注
     * @return {null}
    */
    clearMarker(){
        this.dataList[15].flag = false
        this.dataList[15].flag = false
        this.map.remove(this.mackerData[15]);
        this.mackerData[15] = "";
    }
  },
  mounted() {
      // 根据网格事件选中个数显示隐藏标注
      bus.$on("gridEvent",(data)=>{
        this.mackerData[15].map(v=>{
            if (data.find(item=> item == v.getExtData().id)) {
                v.show()
            }else{
                v.hide()
            }
            
        })
      })
      bus.$on("getGridEventDetail",async (id)=>{
        let _data = await this.getResourceInfo(15, id);
        console.log("处理过的信息", _data);
        this.handleData(15, _data);
      })
  },
  destroyed(){
    bus.$off("gridEvent")
  }
};
</script>

<style scoped>
p,
h1,
h2,
h3,
h4,
h5,
h6,
ul,
li {
  margin: 0;
  padding: 0;
}
.resource_wrap {
  background: rgba(11, 30, 75, 0.8);
  user-select: none;
}
.resource_ul {
  list-style: none;
  color: #bbebff;
  font-size: 14px;
  padding: 10px 30px 10px 20px;
}
.resource_ul > li {
  display: flex;
  align-items: center;
}
.resource_ul > li > img {
  margin-right: 14px;
  cursor: pointer;
}
.resource_ul > li:nth-child(n + 6):nth-child(-n + 12) {
  margin-left: 28px;
  display: none;
}
.resource_ul > li:nth-child(n + 14):nth-child(-n + 15) {
  margin-left: 28px;
  display: none;
}
.resource_ul > li:nth-child(n + 6):nth-child(-n + 12).expand {
  display: block;
}
.resource_ul > li:nth-child(n + 14):nth-child(-n + 15).sbssExpand {
  display: block;
}

</style>
