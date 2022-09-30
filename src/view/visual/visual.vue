<template>
  <div class="visual_wrap" >
    <!-- 地图 -->
    <div class="visual_content" id="content" ></div>
    <!--  地图工具 -->
    <div class="MappingTools" >
      <MappingTools ref='MappingTools' :wx="wx" v-on:integratedGridHandle="integratedGridHandle" v-on:integratedGridPopup="integratedGridPopup" v-on:getOverlayers="getOverlayers"></MappingTools>
    </div>
    <!-- 业务工具 -->
    <div ref="business_wrap" class="business_wrap" v-show="businessFlag" >
      <business ref='business' ></business>
    </div>
    <img
      :class="{'right-fold':rightShow!==1}"
      @click="rightToggle"
      class="right-close-button"
      v-show="businessFlag"
      src="data:image/png;base64,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"
      alt="收缩按钮"
    >
    <!-- 事件管理 -->
    <div class="eventManagement" @click="eventManagements" v-if="type=='visual'">事件管理</div>

     <!-- 综合网格 -->
    <div ref="integratedGrid_wrap" class="integratedGrid_wrap" v-if="integratedGridFlag" >
      <integratedGrid ref="integratedGrid" :checkComprehensive="checkComprehensive" :overlayersList="overlayersList" />
    </div>
    <img
      :class="{'right-fold':rightShowGrid!==1}"
      @click="rightToggleGrid"
      class="right-close-button"
      v-show="integratedGridFlag"
      src="data:image/png;base64,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"
      alt="收缩按钮"
    >
    <!-- 实时天气弹窗 -->
    <RealtimeWeatherDialog
      ref="realtimeWeatherDialogRef"
      :isClickSetMarker="true"
      class="rainfullAnalysis"
    />
  </div>
</template>

<script>
  import MappingTools from './visualTampl/MappingTools'
  import business from './visualTampl/business'
  import integratedGrid from "./visualTampl/tools/resourceViewDialog/integratedGrid/integratedGrid";
  import RealtimeWeatherDialog from '../common/RainfullAnalysis/RainfullAnalysisDialog.vue'


  export default{
    name:'visual',
    data () {
      return {
        map:'',
        wx:new AMap.TileLayer.Satellite(),
        businessFlag :false,
        rightShow: 1, // 右边事件管理窗口是否显示
        rightShowGrid: 1, // 右边事件管理窗口是否显示
        loginInfo: '', // 登录用户信息
        type: this.$store.state.type,
        integratedGridFlag: false,
        checkComprehensive: false,
        overlayersList:[]
      }
    },
    methods:{
      /**
       * @method
       * @desc 获取当前登陆用户信息
       */
      getUserInfo() {
          let self = this;
          let request = {
              url: '/sys/user/info',
              method: 'get',
              params:{},
          };
          this.apix(request)
          .then((res)=>{
              // console.log("getUserInfo()获取到当前登陆用户信息：【\n", res, "\n】");
              self.loginInfo = res;
              this.map.panTo([self.loginInfo.platform.longitude, self.loginInfo.platform.latitude]);
          })
          .catch((err)=>{
              console.log("getUserInfo()获取当前登陆用户信息失败！错误信息：【\n", err, "\n】")
          })
      },
      mapLoning () {
         let _that = this
         const map = new AMap.Map('content', {
             //广州
             //  center:[113.309557,23.152476],
             // 济南高新区
              // center:[117.127998, 36.681641],
             // 增城
             center: [113.824713,23.286085],
             zoom:15,
             viewMode:'3D',//开启3D视图,默认为关闭
             buildingAnimation:true,//楼块出现是否带动画
             resizeEnable: true,
             animateEnable: false, // 平移动画
             doubleClickZoom: false, // 禁用双击放大
         });
        //  map.add(this.wx)
        window.map = map;
         this.map = map
         setTimeout(()=>{
            //  let setLogLat = JSON.parse(sessionStorage.street)
            //  _that.map.setZoomAndCenter(11, [setLogLat.log,setLogLat.lat])
         })
         /**
          * @author tanjinfeng
          * @date 2020-12-14
          * @description 增加图层UI控件，切换卫星图、路况图等
          */
         /*** 新增的代码 ***/
         AMapUI.loadUI(
          ['control/BasicControl'],
          BasicControl => {
            // 图层切换控件
            map.addControl(new BasicControl.LayerSwitcher({
                position: 'tl',
                theme: 'layer-switcher',
                baseLayers: [
                  {
                    id: 'tile',
                    enable: false,
                    name: '标准图',
                    layer: new AMap.TileLayer(),
                  },
                  {
                    id: 'satellite',
                    enable: true,
                    name: '卫星图',
                    layer: new AMap.TileLayer.Satellite(),
                  }
                ],
            }))
          }
        )
        /*** 结束 ***/
      },
      // 显示左上角按钮
      eventManagements () {
        this.integratedGridFlag = false
        this.$refs.MappingTools.polygonSerchFlag = false
        this.businessFlag = !this.businessFlag
        if (this.businessFlag) {
          this.$refs.business.initAddEvents()
        }
        this.rightShow = 1;
        this.$refs.business_wrap.style.transform = 'none';
      },
      rightToggle() {
        if(this.rightShow == 1) {
          console.log("right fold..........", this.$refs.business_wrap.style)
          this.$refs.business_wrap.style.transform = 'translateX(800px)'
          this.$refs.business_wrap.style.transition = 'transform 0.5s'
        } else {
          this.$refs.business_wrap.style.transform = 'none'
        }
        this.rightShow = -this.rightShow;
      },
      rightToggleGrid() {
        if(this.rightShowGrid == 1) {
          this.$refs.integratedGrid_wrap.style.transform = 'translateX(800px)'
          this.$refs.integratedGrid_wrap.style.transition = 'transform 0.5s'
        } else {
          this.$refs.integratedGrid_wrap.style.transform = 'none'
        }
        this.rightShowGrid = -this.rightShowGrid;
      },
      integratedGridHandle(item){
          if (item!=undefined) {
              this.checkComprehensive  = item.flag
          }
          this.businessFlag=false;
          this.rightShowGrid=1;
          
      },
      integratedGridPopup(){
        this.integratedGridFlag = true
        if (this.integratedGridFlag) {
            this.$nextTick(()=>{
                this.$refs.integratedGrid.initMap(this.map)
            });
          }
      },
      integratedGridClose(){
          this.integratedGridFlag = false
      },
      getOverlayers(data){
        this.overlayersList = data
      },
    },
    mounted () {
      this.mapLoning()
      this.getUserInfo()
      this.$refs.MappingTools.initMap(this.map)
      this.$refs.business.initMap(this.map)
      this.$refs.realtimeWeatherDialogRef.initMap(this.map)
    },
    components:{
      MappingTools,
      business,
      integratedGrid,
      RealtimeWeatherDialog
    }
  }
</script>

<style scoped>
.visual_wrap{
  flex:1;
  position: relative;
  z-index: 0;
  display: flex;
  min-height: 862px;
  overflow: hidden;
}
.visual_content{
  flex: 1;
}
.MappingTools{
  position: absolute;
  z-index: 999;
  display: flex;
  align-items: center;
  top: 60px;
  left: 42px;
}
.eventManagement{
  position: absolute;
  z-index: 1;
  bottom: 42px;
  left: 42px;
  width:105px;
  height:105px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 36px ;
  box-sizing: border-box;
  cursor: pointer;
  color: #fff;
  background: url("../../assets/images/cszh/dy.png")no-repeat;
  background-size: 100% 100%;
}
.business_wrap{
  /* width:664px; */
  height:66px;
  position: absolute;
  top: 50px;
  right: 40px;
  background: url("../../assets/images/cszh/xs.png")no-repeat;
  background-size: 103% 125%;
  background-position: -10px -8px;
  transition: all .5s;
}
.right-close-button {
  position: absolute;
  right: 0px;
  top: 370px;
  cursor: pointer;
}
.right-fold {
  transform: rotate(180deg);
}
</style>

<style lang="scss">
.amap-ui-control-theme-layer-switcher {
  background: rgba(10, 29, 81, .8);
  box-shadow: 3px 5px 13px 0px #031C3A;
  color: #FFFFFF;
  z-index: 1000;
  cursor: pointer;
}

.integratedGrid_wrap{
  /* width:664px; */
  height:66px;
  position: absolute;
  top: 50px;
  right: 40px;
  background: url("../../assets/images/cszh/xs.png")no-repeat;
  background-size: 103% 125%;
  background-position: -10px -8px;
  transition: all .5s;
}
</style>
