<template>
  <div class="MappingTools_wrap" >
      <div class="MappingToolsBtn" @click="clickMapTools" >地图工具</div>
      <ul class="MappingToolsListBtn animated fadeIn"  v-if="mapTools" >
        <li v-for="(item,index) in mapListBtn" :key='index' :class="item.flag?'xsactive':''" @click="clickTools(item,index)" >{{item.name}}</li>
      </ul>

      <!-- 图层工具 -->
      <!--
        @author tanjinfeng
        @date 2020-12-01
        @description 图层工具、自定义标注、图层历史整合重做
      -->
      <!-- *** 原来的代码 *** -->
      <!-- <ul class="mapTcTools_wrap animated fadeIn" v-if="mapTcToolsFlag&&mapTools" > -->
        <!-- <li  @click="SetCenter" >设置中心点</li> -->
        <!-- <li style="border-left: none;" @click="freeRange" >自由测距</li>
        <li @click="magnify" >图层放大</li>
        <li @click="coverageDel" >图层清理</li>
        <li style="border-left: none;" @click="visNo" >二三维切换</li>
        <li @click="saveCaverage">图层保存</li>
        <li @click="statelliteSwitch">卫星图切换</li>
      </ul> -->
      <!-- *** 修改后的代码 *** -->
      <PaintingPanel
        :map="map"
        :is-active="!!(mapTcToolsFlag && mapTools)"
        class="animated fadeIn"
        ref="PaintingPanel"
        v-show="!!(mapTcToolsFlag && mapTools)"
      />
      <!-- *** 结束 *** -->

      <!-- 数据工具 -->
      <ul class="mapSjTools_wrap animated fadeIn" v-if="mapSjTools&&mapTools" >
        <li @click="mapSerch" >
          <img src="../../../assets/images/maps.png" alt="">
          <p>地图信息检索</p>
        </li>
        <li @click="polygonSerch" >
          <img src="../../../assets/images/map2.png" alt="">
          <p>多边形检索</p>
        </li>
        <!-- <li>
          <img @click="custom" src="../../../assets/images/map3.png" alt="">
          <p @click="custom" >自定义标注</p>
          <img class="cs" src="../../../assets/images/cszh/add.png" @click="addImgd" alt="">
          <img class="delImg" src="../../../assets/images/cszh/add.png" @click="visDel" alt="">
        </li> -->
        <li @click="resources">
          <img src="../../../assets/images/map4.png" alt="">
          <p>图层资源</p>
        </li>
      </ul>
      <!-- 分析工具 -->
      <ul class="mapSjTools_wrap animated fadeIn" v-if="mapFxTools&&mapTools" >
        <li @click="propertiesFlag=!propertiesFlag" >
          <img src="../../../assets/images/map6.png" alt="">
          <p>路径分析</p>
        </li>
      </ul>
      <!-- 地图信息检索 -->
      <div class="serchx_wrap" :style="{top:(types==1?'158px':'225px')}" >
        <serch ref='serch' class=" animated fadeIn"  v-show="polygonSerchFlag||mapSerchFlag" ></serch>
      </div>
      <!--  自定义标注 -->
      <div v-show="customFlag" class="customsBig_wrap animated fadeIn" >
        <customs ref='customs' ></customs>
      </div>
      <!-- 资源 -->
      <div v-show="resourceFlag" class="resourceBig_wrap animated fadeIn"   >
        <resource ref='resource'></resource>
      </div>
      <!-- 路径分析 -->
      <div v-show="propertiesFlag" class="properties_xs animated fadeIn" >
        <properties ref='properties' @closeThat='closeThats' ></properties>
      </div>

      <div class="addImg_wrap" v-if="addImgFlag" >
        <div class="addImg_content" >
          <img  src="../../../assets/images/close.png" @click="addImgFlag=false" alt="">
          <span>名称:</span>
          <input type="text" v-model="iconName" >
        </div>
        <div class="addImg_content" >
          <span>显示图标:</span>
          <div>
            <el-upload
              class="avatar-uploader"
              action=""
              :show-file-list="false"
              list-type="picture"
              :http-request="handleRequest"
              :on-success="handleAvatarSuccess"
              :before-upload="beforeAvatarUpload"
              >
              <img v-if="imageUrl" :src="imageUrl" class="avatar">
              <i v-else class="el-icon-plus avatar-uploader-icon"></i>
            </el-upload>
          </div>
        </div>
        <div class="add_save" @click="add_save" >
          保存
        </div>
      </div>

    <div v-show="UpWindowsFlag">
      <popUpWindows ref="popUpWindows" @clickSaveBtns='clickSaveBtnData' @closeThis='closePopUpWindow' ></popUpWindows>
    </div>
  </div>
</template>

<script>
  import serch from './tools/serch'
  import customs from './tools/customs'
  import resource from './tools/resource'
  import properties from './tools/properties'
  import allUrl from "../../../assets/api/allApiUrl";
  import popUpWindows from "./tools/revealFile/template/popUpWindows";
  import PaintingPanel from './tools/PaintingPanel/PaintingPanel'

  export default{
    name:'MappingTools',
    props: ['wx'],
    data () {
      return {
        mapTools:false,   //地图工具
        imageUrl: '',
        addImgFlag:false,
        middleEle:'',
        iconName:'',
        UpWindowsFlag:false,
        mapListBtn:[
          {name:'图层工具',flag:false},
          {name:'数据工具',flag:false},
          {name:'分析工具',flag:false}
        ], //地图工具的按钮
        mapTcToolsFlag:false,    // 图层工具
        mapSjTools:false,        // 数据工具
        mapFxTools:false,        // 分析工具
        map:'',
        polygonSerchFlag :false,   //多边形检索
        mapSerchFlag :false,       //地图信息检索
        customFlag : false,        //自定义标注
        resourceFlag:false,        //资源
        propertiesFlag:false,      //路径分析
        types:1,                   // 1地图信息  2是多边形
        mapControlbar:1,            // 地图控件
        magnifyFlag:true,           //拉框放大的锁
        magnifyEle:'',              //拉框放大的元素
        choice:'x',                 // 0中心点  1自由测距  2图层放大  3图层清理 4二三维切换
        rulerFlag:true,             //自由测距
        rulerEle:'',                //自由测距的元素
        SetCenterFlag:true,         //设置中心点
        setCententMackFlag:true,          //是否已经设置过mack
        setCententMackEle:'',          //设置中心点mack 标签
        isWx: true, // 当前是卫星图图层
      }
    },
    methods:{
      initMap (map) {
        this.map = map
        console.log(map,this.map)
        this.$refs.serch.initMaps(map)
        this.$refs.customs.initMaps(map)
        this.$refs.resource.initMaps(map)
        this.$refs.properties.initMaps(map)
      },
      allFlagFalse(){
        this.mapSjTools = false
        this.mapTcToolsFlag = false
        this.mapFxTools = false
        this.polygonSerchFlag = false
        this.mapSerchFlag = false
        this.customFlag = false
        this.resourceFlag = false
        this.propertiesFlag = false
        this.choices()
      },
      addImgd () {
        this.addImgFlag=true
        this.imageUrl = ''
        this.iconName = ''
      },
      closePopUpWindow () {
        this.UpWindowsFlag = false
      },
      // 点击了保存
      clickSaveBtnData (data) {
        let allData = this.$refs.customs.saveMaps
        let addAreaxData = this.$refs.customs.addAreaxData
        this.UpWindowsFlag = !this.UpWindowsFlag
        // console.log(allData,addAreaxData,data,this.map.getCenter())
        let layers = []
        for (let key in allData) {
          allData[key].forEach((ele,index)=>{
            let obj = {
              name:"",
              position:"",
              textSize:"",
              fillColor:"",
              fillOpacity:"",
              type:"",
              path:"",
              radius:"",
              iconId:"",
              remark:""
            }
            if (ele.type == "mack" ) {
              obj.type = ele.type
              obj.name = ele.name
              obj.remark = ele.remark
              obj.iconId = ele.iconId
              obj.position = ele.textPosition
              obj.path = ele.position
            }else if(ele.type == "Rec" ) {
              obj.type = ele.type
              obj.name = ele.name
              obj.remark = ele.remark
              obj.position = ele.textPosition
              obj.path = [ele.southwest,ele.northeast]
            }else if(ele.type == "Cir" ) {
              obj.type = ele.type
              obj.name = ele.name
              obj.remark = ele.remark
              obj.position = ele.textPosition
              obj.path = ele.center
              obj.radius = ele.radius
            }else if(ele.type == "line" ) {
              obj.type = ele.type
              obj.name = ele.name
              obj.remark = ele.remark
              obj.position = ele.textPosition
              obj.path = ele.path
            }
            layers.push(obj)
          })
        }
        addAreaxData.forEach((ele,index)=>{
          let obj = {
            name:ele.title,
            position:ele.position,
            textSize:ele.size,
            fillColor:ele.fillColor,
            fillOpacity:ele.fillOpacity,
            type:'area',
            path:ele.path,
            radius:"",
            iconId:"",
            remark:"",
            textColor:ele.color
          }
          layers.push(obj)
        })
        console.log(layers)
        let datas = {...allUrl.LayerSave,
        data:this.qs.stringify({
          name:data.inpval,
          level:'',
          longitude:this.map.getCenter().lng,
          latitude:this.map.getCenter().lat,
          remark:data.remarck,
          layers:JSON.stringify(layers)
        })}
        this.apix(datas).then((res)=>{
            // console.log(res)
            this.$message({
              message: '保存成功',
              type: 'success'
            });
            this.map.clearMap()
            this.$refs.customs.loaderData()
        })
        .catch((err)=>{
            console.log(err)
        })
      },
      saveCaverage () {
        this.UpWindowsFlag = !this.UpWindowsFlag
      },
      clickMapTools(){
        this.allFlagFalse()
        this.mapTools = !this.mapTools
      },
      clickTools (item,index) {
        this.$store.commit('center','')
        for (let i=0;i<this.mapListBtn.length;i++) {
            this.mapListBtn[i].flag = false
        }
        item.flag = true
        this.allFlagFalse()
        if (index==0) {
          this.mapTcToolsFlag = !this.mapTcToolsFlag
        }else if (index == 1) {
          this.mapSjTools = !this.mapSjTools
        }else if (index == 2) {
          this.mapFxTools = !this.mapFxTools
        }
      },
      // 点击了多边形
      polygonSerch () {
        this.types = 2
        this.$refs.serch.uptypes(2)
        this.resourceFlag = false
        this.mapSerchFlag = false
        this.customFlag = false
        this.propertiesFlag = false
        this.polygonSerchFlag = !this.polygonSerchFlag
        this.loading()
      },
      mapSerch (){
        this.types = 1
        this.$refs.serch.uptypes(1)
        this.customFlag = false
        this.polygonSerchFlag = false
        this.resourceFlag = false
        this.propertiesFlag = false
        this.mapSerchFlag = !this.mapSerchFlag
        this.loading()
      },
      // 点击了自定义标注
      custom () {
        this.mapSerchFlag = false
        this.polygonSerchFlag = false
        this.resourceFlag = false
        this.propertiesFlag = false
        this.customFlag = !this.customFlag
        this.loading()
        if (this.$refs.customs) {
          this.$refs.customs.loaderData()
        }
      },
      resources () {
        this.mapSerchFlag = false
        this.polygonSerchFlag = false
        this.customFlag = false
        this.propertiesFlag = false
        this.resourceFlag = !this.resourceFlag
        this.loading()
      },
      // 初始化地图
      loading () {
       if (this.map) {
        //  this.map.clearMap()
       }
      },
      handleRequest (param) {
        let fileObj = param.file;
        // FormData 对象
        let form = new FormData();
        // 文件对象
        form.append("file", fileObj);
        let self = this
        let data = allUrl.mailImages,s={data:form}
        console.log(data)
        data.header = {
           "Content-Type": 'multipart/form-data'
        }
        Object.assign(data,s) // 合并对象, 只是把参数搞成对象形式 {}
        this.apix(data).then((res)=>{
            // console.log(res)
            this.middleEle = res.url
        })
        .catch((err)=>{
            console.log(err)
        })
      },
      handleAvatarSuccess(res, file) {
        this.imageUrl = URL.createObjectURL(file.raw);
        console.log(file.raw)
      },
      beforeAvatarUpload(file) {
        // console.log(file)
      	this.imageUrl = URL.createObjectURL(file);
      },
      add_save () {
        this.addImgFlag = false
        // this.iconName
        // this.middleEle
        if (!this.iconName||!this.middleEle) {
          if (!this.iconName) {
            this.$message({
              message: '请输入图标名字',
              type: 'warning'
            });
          }else if (!this.middleEle) {
            this.$message({
              message: '请选择图片',
              type: 'warning'
            });
          }
          return
        }
        let data = allUrl.iconSave,s={params:{
          name:this.iconName,
          imgUrl:this.middleEle,
          orderNum:1
        }}
        Object.assign(data,s) // 合并对象, 只是把参数搞成对象形式 {}
        this.apix(data).then((res)=>{
            this.middleEle = ''
            this.$refs.customs.getAllIcon()
        })
        .catch((err)=>{
            console.log(err)
        })
      },
      closeThats () {
        this.propertiesFlag = false
      },
      visDel () {
        if (!this.customFlag) {
          this.customFlag = !this.customFlag
        }
        this.$refs.customs.delImgFlag = !this.$refs.customs.delImgFlag
      },
      // 图层清理
      coverageDel () {
        this.map.clearMap();
        this.choices()
      },
      // 添加3d控制组件
      twoTabThree () {
        const _that = this
        // this.map.setvViewMode('3D')
        let controlBar = new AMap.ControlBar({
          showZoomBar:false,
          showControlButton:true,
          position:{
            left:'330px',
            top:'80px'
          }
        })
        this.map.addControl(controlBar)
      },
      // 控制3d组件
      visNo () {
        if (this.mapControlbar == 1 ) {
          this.twoTabThree()
        }
        this.mapControlbar += 1
        let ele = document.getElementsByClassName('amap-controlbar')[0]
        let vis = ele.style.display
        if (!vis) {
          this.choice = 4
          ele.style.display = 'block'
        }else if(vis == 'none') {
          this.choice = 4
          ele.style.display = 'block'
        }else if(vis == 'block') {
          ele.style.display = 'none'
          this.choice=='x'
        }
      },
      // 拉框放大
      magnify () {
        if (this.magnifyFlag) {
          var mouseTool = new AMap.MouseTool(this.map);
            mouseTool.rectZoomIn({
            strokeColor:'#80d8ff',
            fillColor:'#80d8ff',
            fillOpacity:0.3
            //同 Polygon 的 Option 设置
          });
          this.magnifyEle = mouseTool
          this.choice = 2
          this.magnifyFlag = false
        }else{
          this.magnifyEle.close(true)//关闭
          this.magnifyFlag = true
          this.choice=='x'
        }
      },
      // 自由测距
      freeRange () {
        if (this.rulerFlag) {
          let ruler = this.establishObj()
          this.rulerEle = ruler
          this.rulerEle.turnOn();
          this.rulerFlag = false
          this.choice==1
        }else {
          this.rulerEle.turnOff();
          this.rulerFlag = true
          this.choice=='x'
        }
      },
      // 创建自由测距的对象
      establishObj () {
        //自定义样式
          var startMarkerOptions= {
              icon: new AMap.Icon({
                  size: new AMap.Size(19, 31),//图标大小
                  imageSize:new AMap.Size(19, 31),
                  image: "https://webapi.amap.com/theme/v1.3/markers/b/start.png"
              })
          };
          var endMarkerOptions = {
              icon: new AMap.Icon({
                  size: new AMap.Size(19, 31),//图标大小
                  imageSize:new AMap.Size(19, 31),
                  image: "https://webapi.amap.com/theme/v1.3/markers/b/end.png"
              }),
              offset: new AMap.Pixel(-9, -31)
          };
          var midMarkerOptions = {
              icon: new AMap.Icon({
                  size: new AMap.Size(19, 31),//图标大小
                  imageSize:new AMap.Size(19, 31),
                  image: "https://webapi.amap.com/theme/v1.3/markers/b/mid.png"
              }),
              offset: new AMap.Pixel(-9, -31)
          };
          var lineOptions = {
              strokeStyle: "solid",
              strokeColor: "#FF33FF",
              strokeOpacity: 1,
              strokeWeight: 2
          };
          var rulerOptions = {
              startMarkerOptions: startMarkerOptions,
              midMarkerOptions:midMarkerOptions,
              endMarkerOptions: endMarkerOptions,
              lineOptions: lineOptions
          };
          let ruler = new AMap.RangingTool(this.map, rulerOptions);
          return ruler
      },
      // 设置中心点
      SetCenter () {
        if (this.SetCenterFlag) {
          this.map.on('click', this.showInfoClick);
          this.SetCenterFlag = false
          this.choice = 0
        }else{
          this.map.off('click', this.showInfoClick);
          this.SetCenterFlag = true
          this.choice = 'x'
        }
      },
      showInfoClick (e) {
        if (this.setCententMackFlag ) {
          var marker = this.creationMack([e.lnglat.getLng(),e.lnglat.getLat()])
          marker.setMap(this.map);
          this.setCententMackEle = marker
          this.setCententMackFlag = false
        }else{
          this.setCententMackEle.setPosition([e.lnglat.getLng(),e.lnglat.getLat()])
        }
      },
      creationMack (position) {
         // 创建一个 Icon
        var startIcon = new AMap.Icon({
            // 图标尺寸
            size: new AMap.Size(25, 34),
            // 图标的取图地址
            image: '//a.amap.com/jsapi_demos/static/demo-center/icons/poi-marker-default.png',
            // 图标所用图片大小
            imageSize: new AMap.Size(25, 34),
            // 图标取图偏移量
            imageOffset: new AMap.Pixel(0, 0)
        });
        // 将 icon 传入 marker
        let marker = new AMap.Marker({
            icon: startIcon,
            position,
            offset: new AMap.Pixel(-13, -30)
        });
        return marker
      },
      // 初始化
      choices () {
        if (this.choice==0) {
          if (!this.SetCenterFlag&&!this.setCententMackFlag) {
            this.map.off('click', this.showInfoClick);
            if (this.setCententMackEle) {
                this.setCententMackEle.setMap(null);
                this.setCententMackEle = null;
                this.setCententMackFlag = true
            }
            this.SetCenterFlag = true
          }
        }else if (this.choice==1) {
          if (!this.rulerFlag&&this.rulerEle) {
            this.rulerEle.turnOff();
          }
        }else if (this.choice==2) {
          if (!this.magnifyFlag&&this.magnifyEle) {
            this.magnifyEle.close(true)//关闭
          }
        }else if (this.choice==3) {
          // 清楚图层不需要
        }else if (this.choice==4) {
          let ele = document.getElementsByClassName('amap-controlbar')[0]
          ele.style.display = 'none'
        }
        this.choice = 'x'
      },
      // 卫星图切换
      statelliteSwitch() {
        this.isWx?this.map.remove(this.wx):this.map.add(this.wx)
        this.isWx = !this.isWx
      }
    },
    components:{
      serch,
      customs,
      resource,
      properties,
      popUpWindows,
      PaintingPanel
    },
    mounted () {

    },
    watch:{
      propertiesFlag(newVal){
        if (newVal) {
          this.map.clearMap();
          this.$refs.properties.clearData()
        }
      },
      customFlag (newVal) {
        if (!newVal) {
          this.$refs.customs.delImgFlag = false
        }else{
          this.$refs.customs.drowType = 0
        }
      },
      polygonSerchFlag (newVal) {
        if (newVal) {
          // 清楚
          this.map.on('mousedown', this.loading);
        }else{
          this.map.off('mousedown', this.loading);
          this.$refs.serch.mouseTool.close(true)
        }
      }
    }
  }
</script>

<style scoped>
p,h1,h2,h3,h4,h5,h6,ul,li{
  margin: 0;
  padding: 0;
}
.MappingTools_wrap{
  width: 100%;
  display: flex;
  align-items: center;
  position: relative;
}
.MappingToolsBtn{
  user-select: none;
  width:105px;
  height:105px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  background: url('../../../assets/images/cszh/y1.png')no-repeat;
  background-size: 100% 100%;
  padding: 36px ;
  box-sizing: border-box;
  z-index: 999;
  cursor: pointer;
  color: #fff;
}
.MappingToolsListBtn{
  width:283px;
  height:66px;
  display: flex;
  list-style: none;
  margin: 0;
  align-items: center;
  padding: 0;
  padding-left: 10px;
  margin-left: -20px;
  justify-content: space-evenly;
  background: url("../../../assets/images/cszh/xs.png")no-repeat;
  background-size: 100% 100%;
}
.MappingToolsListBtn>li{
  width: 82px;
  text-align: center;
  font-size:16px;
  font-weight:400;
  color:rgba(0,242,255,1);
  cursor: pointer;
  background: url("../../../assets/images/cszh/li.png")no-repeat;
  background-size: 100% 100%;
}
.xsactive{
  background: url("../../../assets/images/cszh/li2.png")no-repeat !important;
  background-size: 100% 100% !important;
}
.mapTcTools_wrap{
  position: absolute;
  margin: 0;
  padding: 0;
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-start;
  align-items: center;
  background:rgba(11,30,75,.8);
  top: 90px;
  left: 83px;
  list-style: none;
  width: 290px;
  border: 1px solid rgba(255,255,255,.5);
}
.mapTcTools_wrap>li{
  width: 96px;
  height: 50px;
  text-align: center;
  line-height: 50px;
  font-size:16px;
  font-weight:300;
  color:rgba(187,235,255,1);
  border-left: 1px solid #0D79FF;
  border-bottom: 1px solid #0D79FF;
  box-sizing: border-box;
  cursor: pointer;
}
.mapSjTools_wrap{
  width: 200px;
  position: absolute;
  left: 25px;
  top: 120px;
  list-style: none;
}
.mapSjTools_wrap>li{
  color: #ACCBEE;
  display: flex;
  align-items: center;
  margin-bottom: 20px;
  cursor: pointer;
}
.mapSjTools_wrap>li>img{
  width:41px;
  height:46px;
}
.mapSjTools_wrap>li>.cs{
  width:20px;
  height:20px;
}
.mapSjTools_wrap>li>.delImg{
  width:20px;
  height:20px;
  margin-left: 5px;
  transform: rotate(45deg);
}
.mapSjTools_wrap>li>p{
  font-size: 14px;
  padding: 8px  23px 8px 20px;
  background: url('../../../assets/images/sx.png')no-repeat;
  background-size:100% 100% ;
  margin-left: -12px;
  width: 90px;
}
.serchx_wrap{
  position: absolute;
  left: 65px;
  width: auto !important;
  background: rgba(11,30,75,.8);
  min-width: 272px;
}
.customsBig_wrap{
  position: absolute;
  top: 290px;
  left: 65px;
}
.resourceBig_wrap{
  position: absolute;
  top: 295px;
  left: 63px;
  z-index: 9999;
}
.addImg_wrap{
  position: fixed;
  top:0;
  left: 0;
  right: 0;
  bottom: 0;
  margin: auto;
  width:389px;
  height:229px;
  background: rgba(11,30,75,.8);
  border-radius: 10px;
  padding: 35px 25px;
  box-sizing: border-box;
}
.addImg_content{
  display: flex;
  position: relative;
}
.addImg_content>img{
  position: absolute;
  right: -10px;
  top: -24px;
  width: 20px;
  height: 20px;
  cursor: pointer;
}
.addImg_content>span{
  display: block;
  width: 28%;
  text-align: right;
  font-size:20px;
  font-weight:300;
  color:rgba(71,224,255,1);
  margin-right: 14px;
}
.addImg_content>input{
  background: transparent;
  border:1px solid rgba(13,121,255,1);
  outline: none;
  color: #fff;
  padding-left: 5px;
}
.addImg_wrap>div:nth-child(1){
  margin-bottom: 30px;
}
.add_save{
  width:76px;
  height:30px;
  border:1px solid rgba(13,121,255,1);
  color:rgba(71,224,255,1);
  line-height: 30px;
  text-align: center;
  margin: auto;
  border-radius: 5px;
  cursor: pointer;
  margin-top: 20px;
}
.properties_xs{
  position: absolute;
  left: 63px;
  top: 159px;
  width:279px;
  background: rgba(11,30,75,.8);
  border:1px solid rgba(168,206,252,1);
  border-radius: 5px;
}


</style>
