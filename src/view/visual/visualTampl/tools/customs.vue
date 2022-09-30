<template>
  <div class="custom_wrap">

    <ul class="custom_ul">
      <li v-for="(item,index) in listData" :key="index" @click="addMarker(item)" >
        <img :src="item.img" alt="">
        <img v-show="delImgFlag" src="../../../../assets/images/cszh/delete1.png" @click.stop="delImg(item,index)" class="delImg_dl" alt="">
        <p>{{item.name}}</p>
      </li>
    </ul>

    <ul class="operate" >
      <li @click="drowCircle" >
        <img src="../../../../assets/images/cszh/y.png" alt="">
      </li>
      <li @click="drowRectangle" >
        <img src="../../../../assets/images/cszh/j.png" alt="">
      </li>
      <li @click="drowLine" >
        <img src="../../../../assets/images/cszh/x.png" alt="">
      </li>
      <li @click="addMarc" >
        <img src="../../../../assets/images/cszh/d.png" alt="">
      </li>
      <li @click="saveMap" >保存</li>
    </ul>

    <addAreax @addAreax_dl='addAreax_dls' ref="addAreax"></addAreax>
  </div>
</template>

<script>
  import allUrl from "../../../../assets/api/allApiUrl";
  import addAreax from "../../../warning/addArea/addAreax";
  export default{
    name:'customs',
    data () {
      return {
        url:window.SITE_CONFIG['baseUrl'].substr(0,window.SITE_CONFIG['baseUrl'].lastIndexOf('/')),
        map:'',       //地图
        circleInd:0,  //圆的公用下标
        circleData:[],//要进行编辑圆的数组
        overCirData:[],//编辑完成的圆
        overCirTextData:[],//编辑完成的文本
        overCir:{},
        overOne:true, //限制编辑对象
        circle:'',    //正在操作的原

        rectangleInd:0, //矩形的公用下标
        recData:[],//要进行编辑圆的数组
        overRecData:[],//编辑完成的
        overRecTextData:[],//编辑完成的
        overRec:{},   //刚编辑完的矩形
        overTow:true, //限制编辑对象
        rectang:'',   // 正在操作的原

        lineInd:0, //线的公用下标
        lineData:[],//要进行编辑圆的数组
        overlineData:[],//编辑完成的
        overlineTextData:[],//编辑完成的
        overline:{},   //刚编辑完的线
        overThree:true, //限制编辑对象
        line:'',   // 正在操作的原

        addAreaxData:[], //区域的数据
        drowType:0,   //是否正在绘画 0为空  1为圆 2为矩形 3为线 4为区域
        WininfoFlag:true,
        winInNum:0,
        infoWindow:'',

        mackInd:0,   // 图标小标
        mackData:[],  //要进行编辑
        mackTextData:[], // 图标数据
        overmackData:[],  //完成编辑的图标
        overForu:true, //限制编辑对象
        mack:'',   // 正在操作
        delImgFlag:false, // 显示删除图标

        saveMaps:{},//保存时的数据

        listData:[
          // {
          //   name:'指挥中心',
          //   img:require('../../../../assets/images/cszh/zh.png')
          // },
          // {
          //   name:'安置点',
          //   img:require('../../../../assets/images/cszh/az.png')
          // },
          // {
          //   name:'物资库',
          //   img:require('../../../../assets/images/cszh/wz.png')
          // },
          // {
          //   name:'物资发放',
          //   img:require('../../../../assets/images/cszh/wz2.png')
          // },
          // {
          //   name:'应急厕所',
          //   img:require('../../../../assets/images/cszh/wc.png')
          // },
          // {
          //   name:'安防人员',
          //   img:require('../../../../assets/images/cszh/af.png')
          // },
          // {
          //   name:'应急供电',
          //   img:require('../../../../assets/images/cszh/gd.png')
          // },
          // {
          //   name:'应急通讯',
          //   img:require('../../../../assets/images/cszh/yj.png')
          // },
          // {
          //   name:'灭火器',
          //   img:require('../../../../assets/images/cszh/mh.png')
          // },
          // {
          //   name:'停车场',
          //   img:require('../../../../assets/images/cszh/tc.png')
          // },
          // {
          //   name:'医疗点',
          //   img:require('../../../../assets/images/cszh/yl.png')
          // },
          // {
          //   name:'禁止通行',
          //   img:require('../../../../assets/images/cszh/jz.png')
          // },
          // {
          //   name:'排污口',
          //   img:require('../../../../assets/images/cszh/pw.png')
          // },
          // {
          //   name:'垃圾堆',
          //   img:require('../../../../assets/images/cszh/lj.png')
          // },
          // {
          //   name:'避难场所',
          //   img:require('../../../../assets/images/cszh/bn.png')
          // },
          // {
          //   name:'急救站',
          //   img:require('../../../../assets/images/cszh/jj.png')
          // },

          // {
          //   name:'直升机',
          //   img:require('../../../../assets/images/cszh/zs.png')
          // },
          // {
          //   name:'水井',
          //   img:require('../../../../assets/images/cszh/sj.png')
          // },
          // {
          //   name:'危险源',
          //   img:require('../../../../assets/images/cszh/wx.png')
          // },
          // {
          //   name:'供水点',
          //   img:require('../../../../assets/images/cszh/gs.png')
          // }
        ]
      }
    },
    methods:{
      loaderData () {
        this.overCirData = []
        this.overRecData = []
        this.overlineData = []
        this.overmackData = []
        this.addAreaxData = []
        this.overCirTextData = []
        this.overRecTextData = []
        this.overlineTextData = []
        this.mackTextData = []
        this.circleInd = 0
        this.rectangleInd = 0
        this.lineInd = 0
        this.mackInd = 0
        this.$refs.addAreax.loader()
      },
      initMaps(map) {
        this.map = map
        console.log(map)
      },
      getAllIcon () {
        let data ={...allUrl.selectAll,data:{}}
        this.apix(data).then((res)=>{
            this.listData = res.data
            // console.log(this.url)
        })
        .catch((err)=>{
            console.log(err)
        })
      },
      //  模板
      mb (title='',mack='',type='',ind='',lng,lat) {
          var infoWindows =`<div class="winInfos" >
                            <img class="close_winInfo_dl" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAUCAYAAACNiR0NAAACV0lEQVQ4T62V3UsUURiHHc2yNO1DTS00pTSwLFDqJlKvxQv7i6OLVEzxoiI0xA+sxC2y3LJM1+cZ35VpXMMLDzzsmTlnfuc979cmVblRKpVqeHUF2qAZGuE87MNv2IYv8Bm2kiT5m5VIsg+IXeC5C27DH9iAbyHkXteb4EYcsszvKqI7ZZ0jQcQu8bIfrsISfFIobwH7zoVwO7898BXese+noqkgm+r4uQ+X4S0U2OAVTxx8U83i9TBCN7zR0iR8docXnTAP+qcB/OB7JeGw0sN1Sz08hFX4oKCOH/QBvKrWPgMDMwPLWVH21/KuDx7ACryGm9ALswp61VaY5sNifOCJj0BnT3mQorF2j+chcLi2EEY84beg4CiTTXhfDgDvLvJsgBT1WpOwDrpGMf2r9Qt8sxsu8KBWBcdTU5PkY5ya/kQKKToAe2AKdcTcay5mM4D9rg0q+JzJCxYN/z+DNRNaX+ljc9DUeBWWecjRYO81HkYVnGDyEkGjmxc0QF5bKw2GlTINumc3J2hwhxUcYzLPBn2UPdFEV8hr/wLXTS1Lcy5E9W860DHS6ZVHmBRiQ1qXvCvnlmJFMChWTjc8zonuRFBMpTQo+qgFymmj3/SZ6WQF6LO1SBvLzkibIs6NtJWlazwoTZtKif2URbuMHyhW0vKw3israq6uwSzcgrvOTyo989A6L2bFcqL6WBdZpgbusPTi1LNrDplTDYR+s4ataRP9f+3LRLZ92S/tNAbvsH1lRLXUBiunabA2h5WKDTbnH620gRow25SRd3jIDzDNTKNjfwEH9BwZTYexTjYAAAAASUVORK5CYII=" ></img>
                            <div class="winInfo_content"><span>名称：</span><input class="name_dl" style="height: 20px;" value="${title}" type="text"></div>
                            <div class="winInfo_content"><span>描述：</span><textarea class="mack_dl" value="${mack}" cols="30" rows="5">${mack}</textarea></div>
                            <div lng='${lng}' lat='${lat}' type='${type}' inds='${ind}' class="determine_dl">确定</div>
                        </div>`
          return infoWindows
      },
      // 事件绑定
      elements () {
          const _that = this
          let close_winInfo = document.getElementsByClassName('close_winInfo_dl')[0]
          let determine_dl = document.getElementsByClassName('determine_dl')[0]
          let name_dl = document.getElementsByClassName('name_dl')[0]
          let mack_dl = document.getElementsByClassName('mack_dl')[0]
          close_winInfo.onclick = function (e) {
              _that.infoWindow.close()
          }
          determine_dl.onclick = function (e) {
              let type = this.getAttribute('type')
              let inds = this.getAttribute('inds')
              let lng = this.getAttribute('lng')
              let lat = this.getAttribute('lat')
              if (type == 'cir') {
                if (!_that.overCirTextData[inds]) {
                  let text = _that.addtext(name_dl.value,[lng,lat],type,inds,mack_dl.value)
                  console.log(text,_that.overCirTextData[inds])
                  _that.overCirTextData.push(text)
                  _that.overCirTextData[inds].setDraggable(false)
                }else{
                  _that.overCirTextData[inds].setText(name_dl.value)
                  _that.overCirTextData[inds].setDraggable(false)
                  _that.overCirTextData[inds].Ce.mack = mack_dl.value
                }
              }else if (type == 'rec') {
                if (!_that.overRecTextData[inds]) {
                  let text = _that.addtext(name_dl.value,[lng,lat],type,inds,mack_dl.value)
                  _that.overRecTextData.push(text)
                  _that.overRecTextData[inds].setDraggable(false)
                }else{
                  _that.overRecTextData[inds].setText(name_dl.value)
                  _that.overRecTextData[inds].setDraggable(false)
                  _that.overRecTextData[inds].Ce.mack = mack_dl.value
                }
              }else if (type == 'line') {
                if (!_that.overlineTextData[inds]) {
                  let text = _that.addtext(name_dl.value,[lng,lat],type,inds,mack_dl.value)
                  _that.overlineTextData.push(text)
                  _that.overlineTextData[inds].setDraggable(false)
                }else{
                  _that.overlineTextData[inds].setText(name_dl.value)
                  _that.overlineTextData[inds].setDraggable(false)
                  _that.overlineTextData[inds].Ce.mack = mack_dl.value
                }
              }else if (type == 'mack') {
                if (!_that.mackTextData[inds]) {
                  let text = _that.addtext(name_dl.value,[lng,lat],type,inds,mack_dl.value)
                  _that.mackTextData.push(text)
                  console.log(_that.mackTextData,inds,_that.mackTextData[inds])
                  _that.mackTextData[inds].setDraggable(false)
                }else{
                  _that.mackTextData[inds].setText(name_dl.value)
                  _that.mackTextData[inds].setDraggable(false)
                  _that.mackTextData[inds].Ce.mack = mack_dl.value
                }
              }
              _that.infoWindow.close()
          }
      },
      // 创建信息窗体
      addWininfo () {
        //实例化信息窗体
        var infoWindow = new AMap.InfoWindow({
            position: [116.396923,39.918203],
            isCustom: true,
            offset: new AMap.Pixel(0, -35)
        });
        this.infoWindow = infoWindow
      },
      //添加文本
      addtext (text,center,type,ind,mack){
          // 创建纯文本标记   type cir圆 rec矩形 line线
          const _that = this
          var text = new AMap.Text({
              text,
              anchor:'center', // 设置文本标记锚点
              draggable:true,
              cursor:'pointer',
              style:{
                  'background-color': 'transparent',
                  'text-align': 'center',
                  'font-size': '20px',
                  'color': 'blue',
                  'border':'none'
              },
              position: center,
              type,
              ind,
              mack
          });
          text.setMap(this.map);
          AMap.event.addListener(text, "dragend", function(e) {
                if (this.Ce.type == 'mack') {
                  _that.drowType=4
                  _that.mackTextData[this.Ce.ind] = this
                }else if (this.Ce.type == 'Cir') {
                  _that.drowType=1
                  _that.overCirTextData[this.Ce.ind] = this
                }else if (this.Ce.type == "line") {
                  _that.drowType=3
                  _that.overlineTextData[this.Ce.ind] = this
                }else if (this.Ce.type == 'Rec') {
                  _that.drowType=2
                  _that.overRecTextData[this.Ce.ind] = this
                }
          })
          AMap.event.addListener(text, "dblclick", function(e) {
                // console.log(this.getText(),this.Ce.mack)
                let infoWindows = _that.mb(this.getText(),this.Ce.mack,this.Ce.type,this.Ce.ind,this.getPosition().lng,this.getPosition().lat)
                //打开窗体
                _that.infoWindow.setContent(infoWindows)
                _that.infoWindow.setPosition(this.getPosition())
                _that.infoWindow.open(_that.map);
                _that.elements()
                this.setDraggable(true)
          })
          AMap.event.addListener(text, "dblclick", function(e) {
            // _that.map.remove(this)
          })
          return text
      },
      setText (type,ind,center) {
        const _that = this
        // 文本标记
        let infoWindows = this.mb('','',type,ind,center.lng,center.lat)
        //打开窗体
        this.infoWindow.setContent(infoWindows)
        this.infoWindow.setPosition([center.lng,center.lat])
        this.infoWindow.open(this.map);
        setTimeout(()=>{
            // 绑定事件
            _that.elements()
        },300)
      },

      saveMap () {
        // console.log(this.drowType)
        //判断圆
        if (this.drowType==1) {
          if (this.circle&&!this.overOne) {
            this.circle.close()
            this.overOne = true
          }
          // 是新增还是修改
          if (!this.overCirData[this.overCir.target.Ce.ind]) {
            let e = this.overCir
            this.overCirData.push({radius:e.target.Ce.radius,center:e.target.Ce.center})
          }else{
            let e = this.overCir
            this.overCirData[e.target.Ce.ind] = {radius:e.target.Ce.radius,center:e.target.Ce.center}
          }
          this.saveMaps.CirData = []
          this.saveMapData(this.overCirData,this.overCirTextData,this.saveMaps.CirData,'Cir')
        }else if (this.drowType==2) {
          // 判断矩形
          if (this.rectang&&!this.overTow) {
            this.rectang.close()
            this.overTow = true
          }
          // 是新增还是修改
          if (!this.overRecData[this.overRec.target.Ce.ind]) {
            let e = this.overRec
            this.overRecData.push({southwest:e.target.Ce.bounds.southwest,northeast:e.target.Ce.bounds.northeast})
          }else{
            let e = this.overRec
            this.overRecData[e.target.Ce.ind] = {southwest:e.target.Ce.bounds.southwest,northeast:e.target.Ce.bounds.northeast}
          }
          this.saveMaps.RecData = []
          this.saveMapData(this.overRecData,this.overRecTextData,this.saveMaps.RecData,'Rec')
        }else if (this.drowType==3) {
          // 判断线
          if (this.line&&!this.overThree) {
            this.line.close()
            this.overThree = true
          }
          // 是新增还是修改
          if (!this.overlineData[this.overline.target.Ce.ind]) {
            let e = this.overline
            this.overlineData.push({path:e.target.Ce.path})
          }else{
            let e = this.overline
            this.overlineData[e.target.Ce.ind] = {path:e.target.Ce.path}
          }
          this.saveMaps.lineData = []
          this.saveMapData(this.overlineData,this.overlineTextData,this.saveMaps.lineData,'line')
        }else if (this.drowType==4) {
          if (this.mack&&!this.overForu) {
            this.overForu = true
          }
          this.mack.setDraggable(false)
          // 是新增还是修改
          if (!this.overmackData[this.mack.Ce.ind]) {
            let e = this.mack
            this.overmackData.push({iconId:e.Ce.id,position:e.Ce.position})
          }else{
            let e = this.mack
            this.overmackData[e.Ce.ind] = {iconId:e.Ce.id,position:e.Ce.position}
          }
          this.saveMaps.mackData = []
          this.saveMapData(this.overmackData,this.mackTextData,this.saveMaps.mackData,'mack')
        }
        console.log(this.saveMaps)
        this.overOne = true
        this.overTow = true
        this.overThree = true
        this.overForu = true
        this.drowType = 0
      },
      saveMapData (data,textData,updata,type) {
        if (data.length!=0&&textData!=0) {
          data.forEach((ele,index)=>{
            let obj = {
              type,
              ele,
              name:textData[index]['Ce'].text,
              remark:textData[index]['Ce'].mack,
              textPosition:textData[index]['Ce'].position
            }
            if (ele) {
              for (let key in ele) {
                  obj[key] = ele[key]
              }
            }
            delete obj.ele
            updata.push(obj)
          })
        }
      },
      // 创建圆
      creationCircle (center,R,type=2,ind) {
         const _that = this
         var circle = new AMap.Circle({
                center: center,
                radius: R, //半径
                borderWeight: 3,
                strokeColor: "#FF33FF",
                strokeOpacity: 1,
                strokeWeight: 6,
                strokeOpacity: 0.2,
                fillOpacity: 0.4,
                strokeStyle: 'dashed',
                strokeDasharray: [10, 10],
                // 线样式还支持 'dashed'
                fillColor: '#1791fc',
                zIndex: 50,
                ind:ind
            })
            circle.setMap(this.map)
            // 缩放地图到合适的视野级别
            if (type==1) {
              this.map.setFitView([ circle ])
            }
            var circleEditor = new AMap.CircleEditor(this.map, circle)
            circleEditor.on('end', function(e) {
                _that.overCir = e
            })
            this.drowType = 1
            return {circle,circleEditor}
      },
      // 编辑圆
      drowCircleOpen (ele) {
        this.circle = ele
        ele.open()
        this.overOne = false
        this.drowType = 1
      },
      // 画圆
      drowCircle () {
        this.$store.commit('center','')
          if (!this.isDrow()) {
            return
          }
          const _that = this
          var center = this.map.getCenter(); //获取当前地图中心位置
          this.setText('cir',this.circleInd,center)
          let obj = this.circleInd == 0?this.creationCircle([center.lng,center.lat],500,1,this.circleInd):this.creationCircle([center.lng,center.lat],500,1,this.circleInd)
          this.circleInd+=1
          this.overCir = {target:obj.circle}
          this.circleData.push(obj.circleEditor)
          // 监听圆的事件
          AMap.event.addListener(obj.circle, "dblclick", function(e) {
            _that.overTow = false
            _that.overThree = false
            _that.overForu = false
            if (_that.overOne&&!_that.overTow&&!_that.overThree&&!_that.overForu) {
              _that.drowCircleOpen(_that.circleData[this.Ce.ind])
            }
          })
          AMap.event.addListener(obj.circle, "rightclick", function(e) {
            if (_that.circleData.length-1 == this.Ce.ind &&_that.overCirData.length-1 != this.Ce.ind) {
              _that.circleData.splice(this.Ce.ind,1,[])
              _that.map.remove(this)
              _that.drowType = 0
              if (_that.overCirTextData[this.Ce.ind]) {
                _that.map.remove(_that.overCirTextData[this.Ce.ind])
                _that.overCirTextData.splice(this.Ce.ind,1,[])
              }
            }else if(_that.drowType == 0){
              _that.overCirData.splice(this.Ce.ind,1,[])
              _that.circleData.splice(this.Ce.ind,1,[])
              _that.map.remove(this)
              if (_that.overCirTextData[this.Ce.ind]) {
                _that.map.remove(_that.overCirTextData[this.Ce.ind])
                _that.overCirTextData.splice(this.Ce.ind,1,[])
              }
            }else{
              _that.$message({
                showClose: true,
                message: '要对其它的图形进行操作,请先保存当前图形',
                type: 'warning'
              });
            }

          })
      },
      // 创建矩形
      creationRectangle (center,type=2,ind) {
        const _that = this
        var southWest = new AMap.LngLat(center.one.lng,center.one.lat)
        var northEast = new AMap.LngLat(center.tow.lng,center.tow.lat)
        var bounds = new AMap.Bounds(southWest, northEast)
        var rectangle = new AMap.Rectangle({
            bounds: bounds,
            strokeColor:'#FF33FF',
            strokeWeight: 6,
            strokeOpacity:0.5,
            strokeDasharray: [30,10],
            // strokeStyle还支持 solid
            strokeStyle: 'dashed',
            fillColor:'#1791fc',
            fillOpacity:0.5,
            cursor:'pointer',
            zIndex:50,
            ind
        })
        rectangle.setMap(this.map)
        // 缩放地图到合适的视野级别
        if (type==1) {
          this.map.setFitView([ rectangle ])
        }
        var rectangleEditor = new AMap.RectangleEditor(this.map, rectangle)
        rectangleEditor.on('end', function(e) {
            _that.overRec = e
        })
        this.drowType = 2
        return {rectangle,rectangleEditor}
      },
      // 编辑矩形
      drowRectangleOpen (ele) {
        this.rectang = ele
        ele.open()
        this.overTow = false
        this.drowType = 2
      },
      // 画矩形
      drowRectangle () {
        this.$store.commit('center','')
        if (!this.isDrow()) {
          return
        }
        const _that = this
        var center = this.map.getCenter(); //获取当前地图中心位置
        this.setText('rec',this.rectangleInd,center)
        let obj = {
          one:{
            lng:center.lng-0.03,
            lat:center.lat-0.02
          },
          tow:{
            lng:center.lng+0.03,
            lat:center.lat+0.02
          }
        }
        let ele = this.rectangleInd == 0?this.creationRectangle(obj,1,this.rectangleInd):this.creationRectangle(obj,1,this.rectangleInd)
        this.recData.push(ele.rectangleEditor)
        this.overRec = {target:ele.rectangle},
        this.rectangleInd+=1
        AMap.event.addListener(ele.rectangle, "dblclick", function(e) {
          _that.overOne = false
          _that.overThree = false
           _that.overForu = false
          if (_that.overTow&&!_that.overOne&&!_that.overThree&&!_that.overForu) {
            _that.drowRectangleOpen(_that.recData[this.Ce.ind])
          }
        })
        AMap.event.addListener(ele.rectangle, "rightclick", function(e) {
          if (_that.recData.length-1 == this.Ce.ind &&_that.overRecData.length-1 != this.Ce.ind) {
            _that.recData.splice(this.Ce.ind,1,[])
            _that.map.remove(this)
            _that.drowType = 0
            if (_that.overRecTextData[this.Ce.ind]) {
              _that.map.remove(_that.overRecTextData[this.Ce.ind])
              _that.overRecTextData.splice(this.Ce.ind,1,[])
            }
          }else if(_that.drowType == 0){
            _that.overRecData.splice(this.Ce.ind,1,[])
            _that.recData.splice(this.Ce.ind,1,[])
            _that.map.remove(this)
            if (_that.overRecTextData[this.Ce.ind]) {
              _that.map.remove(_that.overRecTextData[this.Ce.ind])
              _that.overRecTextData.splice(this.Ce.ind,1,[])
            }
          }else{
            _that.$message({
              showClose: true,
              message: '要对其它的图形进行操作,请先保存当前图形',
              type: 'warning'
            });
          }

        })
      },
     // 创建画线
     creationLine(path,type=2,ind){
       const _that = this
       var polyline = new AMap.Polyline({
               path: path,
               isOutline: true,
               outlineColor: '#ffeeff',
               borderWeight: 0,
               strokeColor: "#3366FF",
               strokeOpacity: 1,
               strokeWeight: 8,
               // 折线样式还支持 'dashed'
               strokeStyle: "solid",
               // strokeStyle是dashed时有效
               strokeDasharray: [10, 5],
               lineJoin: 'round',
               lineCap: 'round',
               zIndex: 50,
               ind
           })
           polyline.setMap(this.map)
           // 缩放地图到合适的视野级别
           if (type == 1) {
             this.map.setFitView([ polyline ])
           }
           var polyEditor = new AMap.PolyEditor(this.map, polyline)
           polyEditor.on('end', function(e) {
               _that.overline = e
           })
           this.drowType = 3
           return {polyline,polyEditor}
     },
     // 编辑画线
     drowLineOpen(ele){
        this.line = ele
        ele.open()
        this.overThree = false
        this.drowType = 3
     },
     // 画线
      drowLine () {
        if (!this.isDrow()) {
          return
        }
        const _that = this
        var center = this.map.getCenter(); //获取当前地图中心位置
        this.setText('line',this.lineInd,center)
        let arr = [[center.lng+0.02,center.lat],[center.lng-0.02,center.lat]]
        let ele = this.creationLine(arr,1,this.lineInd)
        this.lineData.push(ele.polyEditor)
        this.overline = {target:ele.polyline},
        this.lineInd+=1
        AMap.event.addListener(ele.polyline, "dblclick", function(e) {
          _that.overOne = false
          _that.overTow = false
          _that.overForu = false
          if (_that.overThree&&!_that.overOne&&!_that.overTow&&!_that.overForu) {
            _that.drowLineOpen(_that.lineData[this.Ce.ind])
          }
        })
        AMap.event.addListener(ele.polyline, "rightclick", function(e) {
          if (_that.lineData.length-1 == this.Ce.ind &&_that.overlineData.length-1 != this.Ce.ind) {
            _that.lineData.splice(this.Ce.ind,1,[])
            _that.map.remove(this)
            if (_that.overlineTextData[this.Ce.ind]) {
              _that.map.remove(_that.overlineTextData[this.Ce.ind])
              _that.overlineTextData.splice(this.Ce.ind,1,[])
            }
            _that.drowType = 0
          }else if(_that.drowType == 0){
            _that.overlineData.splice(this.Ce.ind,1,[])
            _that.lineData.splice(this.Ce.ind,1,[])
            _that.map.remove(this)
            if (_that.overlineTextData[this.Ce.ind]) {
              _that.map.remove(_that.overlineTextData[this.Ce.ind])
              _that.overlineTextData.splice(this.Ce.ind,1,[])
            }
          }else{
            _that.$message({
              showClose: true,
              message: '要对其它的图形进行操作,请先保存当前图形',
              type: 'warning'
            });
          }

        })
      },
      // 画区域
      addMarc () {
        this.$store.commit('center','')
        this.$refs.addAreax.addMarcker(this.map,1)
      },
      addAreax_dls (data) {
        this.addAreaxData = data
      },
      addMarker(item) {
          if (!this.isDrow()) {
            return
          }
          const _that =this
          let mack =this.mackers(item,this.mackInd)
          var center = this.map.getCenter();
          this.setText('mack',this.mackInd,center)
          this.mackInd+=1
          this.mack = mack
          this.mackData.push(mack)
          AMap.event.addListener(mack, "dblclick", function(e) {
            _that.overOne = false
            _that.overTow = false
            _that.overThree = false
            if (_that.overForu&&!_that.overOne&&!_that.overTow&&!_that.overThree) {
              this.setDraggable(true)
              _that.mack = this
              console.log(this)
              _that.drowType = 4
            }
          })
          AMap.event.addListener(mack, "rightclick", function(e) {
            if (_that.overmackData.length-1 != this.Ce.ind &&_that.mackData.length-1 == this.Ce.ind ) {
              _that.mackData.splice(this.Ce.ind,1,[])
              _that.map.remove(this)
              _that.drowType = 0
              if (_that.mackTextData[this.Ce.ind]) {
                _that.map.remove(_that.mackTextData[this.Ce.ind])
                _that.mackTextData.splice(this.Ce.ind,1,[])
              }
            }else if (_that.drowType == 0) {
              _that.overmackData.splice(this.Ce.ind,1,[])
              _that.mackData.splice(this.Ce.ind,1,[])
              _that.map.remove(this)
              if (_that.mackTextData[this.Ce.ind]) {
                _that.map.remove(_that.mackTextData[this.Ce.ind])
                _that.mackTextData.splice(this.Ce.ind,1,[])
              }
            }else{
              _that.$message({
                showClose: true,
                message: '要对其它的图形进行操作,请先保存当前图形',
                type: 'warning'
              });
            }
          })
      },
      mackers (item,ind){
        var center = this.map.getCenter();
        let marker = new AMap.Marker({
            icon: item.img,
            position: [center.lng,center.lat],
            offset: new AMap.Pixel(-13, -30),
            draggable:true,
            ind,
            id:item.id
        });
        marker.setMap(this.map);
        this.drowType = 4
        return marker
      },
      // 查看是否在编辑状态
      isDrow () {
        if (this.drowType == 0) {
          return true
        }else{
          this.$message({
            showClose: true,
            message: '您有正在编辑的图形,请先保存',
            type: 'warning'
          });
          return false
        }
      },
      // 删除图标
      delImg (item,index) {
        // 设置全局状态为空
        this.$store.commit('center','')
        console.log(item)
        let data ={...allUrl.deleteIcon,data:this.qs.stringify({
          id:item.id
        })}
        this.apix(data).then((res)=>{
            console.log(res)
            this.getAllIcon()
        })
        .catch((err)=>{
            console.log(err)
        })
      }
    },
    mounted() {
        this.addWininfo()
        this.getAllIcon()
    },
    components:{
        addAreax
    }
  }
</script>

<style scoped>
p,h1,h2,h3,h4,h5,h6,ul,li{
  margin: 0;
  padding: 0;
}
.custom_wrap{
  width:280px;
  background: url('../../../../assets/images/cszh/xs2.png')no-repeat;
  background-size: 100% 100%;
  z-index: 999;
}
.custom_ul{
  list-style: none;
  display: flex;
  flex-wrap: wrap;
}
.custom_ul>li{
  width: 70px;
  display: flex;
  flex-direction: column;
  align-items: center;
  cursor: pointer;
  margin-top: 20px;
  position: relative;
}
.custom_ul>li>.delImg_dl{
  position: absolute;
  top: -10px;
  right: 5px;
  height: 20px;
  width: 20px;
}
.custom_ul>li>p{
  color: #FFFFFF;
  text-align: center;
  font-size:12px;
  margin-top: 5px;
}
.operate{
  list-style: none;
  display: flex;
  margin-top: 20px;
  position: relative;
}
.operate>li{
  margin-left: 10px;
  cursor: pointer;
}
.operate>li:last-child{
  position: absolute;
  right: 5px;
  top: -5px;
  color: #fff;
  font-size: 14px;
  border: 1px solid #fff;
  border-radius: 3px;
  padding: 5px 10px;
  display: flex;
  align-items: center;
}


</style>
