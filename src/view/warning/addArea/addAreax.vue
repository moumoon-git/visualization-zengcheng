<template>
  <div>

  </div>
</template>

<script>
  export default {
    name: "addAreax",
    data() {
      return {
        map: '',
        polyEditor: '',
        flag: true,
        trianglePos: '',
        markerFlag: '',
        polyEditorFlag: true,
        //实体
        marker: '',
        polygon: '',
        contentPos: '', // 中心点位置
        upDataText: '', // 文本ele
        textContent: '', //文本内容
        fontsize: '16', //文本字体大小
        fontcolor: '#ff0000', //文本颜色

        allTextMackers: [], //所有的macker
        index: 0, //公共数量
        ind: 0, //公共下标
        addFlag: false, //点击了添加
        polygonData: [] ,//polygon的数据
        polyEditorData:[],
        type:0     //
      }
    },
    methods: {
      // 初始化
      loader () {
        this.polyEditor=''
        this.flag=true
        this.trianglePos=''
        this.markerFlag=''
        this.polyEditorFlag=true
        this.marker=''
        this.polygon=''
        this.contentPos=''
        this.upDataText=''
        this.textContent=''
        this.fontsize='16'
        this.fontcolor='#ff0000'
        this.allTextMackers=[]
        this.index=0
        this.ind=0
        this.addFlag=false
        this.polygonData=[]
        this.polyEditorData=[]
        this.type=0
      },
      //maker标记
      addMarckerData(position, image, ind) {
        const _that = this
        var marker = new AMap.Marker({
          position: position,
          // icon:image,
          styles: {
            icon: {
              image: image,
              size: [25, 34], //图标的原始大小
              ancher: [8, 16], //锚点，图标原始大小下锚点所处的位置，相对左上角
              imageOffset: [-13, -30],
              //可缺省，当使用精灵图时可用，标示图标在整个图片中左上角的位置
              imageSize: [25, 34],
              //可缺省，当使用精灵图时可用，整张图片的大小
              fitZoom: 14, //最合适的级别，在此级别下显示为原始大小
              scaleFactor: 2, //地图放大一级的缩放比例系数
              maxScale: 2, //最大放大比例
              minScale: 1 //最小放大比例
            }
          },
          offset: new AMap.Pixel(-13, -30),
          // 设置是否可以拖拽
          draggable: true,
          cursor: 'move',
          ind: ind
          // 设置拖拽效果
        });
        return marker
      },
      //监听maker的双击事件  构建覆盖物
      addMarcker(map,type=0) {
        this.type = type
        this.map = map
        const _that = this
        let marker = this.addMarckerData(map.getCenter(),
          '//a.amap.com/jsapi_demos/static/demo-center/icons/poi-marker-default.png', _that.index)
        AMap.event.addListener(marker, "dblclick", function(e) {
          let obj = {
            log: this.getPosition().lng,
            lat: this.getPosition().lat
          }
          _that.contentPos = [this.getPosition().lng, this.getPosition().lat]
          let path = []
          for (let i = 0; i < 3; i++) {
            if (i == 0) {
              console.log(obj.log, obj.lat, [obj.log, obj.lat + 0.01])
              path.push([obj.log, obj.lat + 0.01])
            } else if (i == 1) {
              path.push([obj.log - 0.01, obj.lat - 0.01])
            } else {
              path.push([obj.log + 0.01, obj.lat - 0.01])
            }
          }
          _that.trianglePos = path[2]
          
          e.target.Qe? null: e.target.Qe = e.target.Ce
          _that.setContent(map, path, e.target.Qe.ind)
          this.hide()
        });
        _that.index++
        if (this.flag) {
          marker.setMap(map);
          this.addFlag = true
          this.flag = false
        } else {
          this.$message({
            message: '已创建坐标点，请先完成创建区域块',
            type: 'warning'
          })
        }
      },
      // 获取坐标插旗子
      flags(pos, ind) {
        const _that = this
        // 创建一个 icon
        let marker = ''
        var endIcon = ''
        if (!this.markerFlag) {
          const _that = this
          // 创建一个 icon
          marker = this.addMarckerData(pos, '', ind)
          endIcon = new AMap.Icon({
            size: new AMap.Size(25, 34),
            image: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAACGklEQVRYR+2XTWvUQBjHn5ndbi09SPEieha9+B0WL+1Fv4EfwYOgFqQiehFERMSDoFRplfYgWtO8TKFoRNA9ePSgRREqXoRuspm8bbOZ8Qm44ME6k2ygBzeQU2ae34//TJ5kCOzzRXT47Xb7gOu6qc7YsmOUAqdnZ89OUvoolfKSydjtsgDVeC2BI62JpYOU+tvZ4CcX4qrF2KqqsO5zbYEbhw/BVj+De91emAnZiaW8su44HV3QXuNKCQyLuGEMix6HBiH3B5RetizLqypSSaCADfB+6vHwbZTIPsB1y3FuVZGoLDCEbe9msORx7/sg7yZSnjcdZ72MyMgCQ1gnTmHZD8JMkvehEOcYY591RGoTKGAS7xc+l2s8JkDITUxjXiVRq0AB6+UCVnrcexelM1TKY8bGxpd/SdQq8DyIsrVeOIHAu7TVWjAMg9eVwCL2geZexV5HCaz6YSyF2IwpvWjb9pYKPHyum8BfBT6mfXjih0GQi68RvgHYmN7ogkcS6OY5PNwJ4m+7GW45ecFmbKUsuLLAss/BjZIE2/ECfpzuYCFRFV7M016CU9NTzQI+02g88Ai5Zprmj1HApRKYbjYeTxFwdwTMG7b9oQ6wtsCZubnjmPErjPtoneCyAi9R4MR+CnxCAeV+qSKoLPp7CcYC4wTGCfzvCRDyDP/vTlZpNKo5ykZUFMDDaRMPp8VRoPZLS6B26h8FfwE3QjEww6jF/wAAAABJRU5ErkJggg==',
            imageOffset: [-13, -30],
            imageSize: [25, 34]
          });
        } else {
          marker = this.markerFlag
        }
        marker.setIcon(endIcon)
        AMap.event.addListener(marker, "dblclick", function(e) {
          _that.createInfoWindow(_that.map, marker.getPosition())
        });
        marker.setDraggable(false)
        marker.setMap(this.map);
        this.markerFlag = marker
      },
      setFlag(data, ind) {
        const _that = this
        let marker = this.markerFlag
        marker.setPosition(data)
        AMap.event.addListener(marker, "dblclick", function(e) {
          // console.log('打开出窗体222222222222222222',_that.addFlag,this)
          if (_that.addFlag) {
            _that.createInfoWindow(_that.map, marker.getPosition())
          } else {
            _that.upDataText = _that.allTextMackers[_that.ind]
            _that.upDataText.setDraggable(true)
            let datas = _that.polygonData[_that.ind]
            let data = {
              title: datas.textData.title,
              fillOpacity:datas.polygonData.fillOpacity,
              fillColor: datas.polygonData.fillColor,
              color: datas.textData.color,
              size: datas.textData.size
            }
            _that.createInfoWindow(_that.map, marker.getPosition(), data)
          }
        });
        this.markerFlag.show()
      },
      //设置覆盖物
      setContent(map, path, ind) {
        const _that = this
        let paths = path
        var polygon = new AMap.Polygon({
          path: paths,
          strokeColor: "rgba(0,0,0,.5)", //线条颜色
          strokeWeight: 1, //线条宽度
          strokeOpacity: 0.2, //线条透明度
          fillOpacity: 0.4, //覆盖物透明度
          fillColor: '#1791fc', // 覆盖物颜色
          zIndex: 50, // 覆盖物显示层级
          ind: ind
        })
        // 引入多边形编辑器插件
        let polyEditor = new AMap.PolyEditor(map, polygon)
        this.polyEditorData.push(polyEditor)
        polygon.on('dblclick', function(e) {
          // 数据兼容性处理
          this.Qe? null: this.Qe = this.Ce
          if (_that.polyEditorFlag) {
            _that.ind = this.Qe.ind
            if (!_that.markerFlag) {
              _that.flags(_that.trianglePos, this.Qe.ind)
            } else {
              _that.setFlag(this.Qe.path[this.Qe.path.length - 1], this.Qe.ind)
            }
            _that.polyEditor = _that.polyEditorData[this.Qe.ind]
            _that.polyEditor.open();
            _that.polyEditorFlag = false
            _that.flag = false
            _that.polygon = polygon
          }
        });
        polygon.on('change', function(event) {
          // 数据兼容性处理
          event.target.Qe? null: event.target.Qe = event.target.Ce
          if (_that.markerFlag) {
            _that.markerFlag.setPosition(event.target.Qe.path[event.target.Qe.path.length - 1])
            _that.trianglePos = event.target.Qe.path[event.target.Qe.path.length - 1]
          }
        });
        map.add(polygon)
        //缩放地图到合适的视野级别
        map.setFitView([polygon])
      },
      setText(map,data){
        const _that = this
        // 创建纯文本标记
        var marker = new AMap.Marker({ //添加自定义点标记
          map: _that.map,
          position: contentPos, //基点位置
          draggable: true, //是否可拖动
          content: '', //自定义点标记覆盖物内容
          zIndex: 10000
        });
        var endIcon = new AMap.Icon({
          size: new AMap.Size(25, 34),
          image: '',
          imageOffset: [1, 1],
          imageSize: [1, 1]
        });
        marker.setIcon(endIcon)
        marker.setLabel({
          offset: new AMap.Pixel(20, 20), //设置文本标注偏移量
          content: `<div style="text-align:center;white-space:nowrap;background:transparent;color:${data.color};font-size:${data.size}px;">${data.title}</div>`, //设置文本标注内容
          direction: 'center' //设置文本标注方位
        });
        marker.setMap(map);
      },
      //构建自定义信息窗体
      createInfoWindow(map, pos, data = '') {
        const _that = this
        let infoWindowContent = data ? _that.templae(data) : _that.templae()
        var infoWindow = new AMap.InfoWindow({
          position: pos,
          isCustom: true, //使用自定义窗体
          offset: new AMap.Pixel(0, -15),
          content: infoWindowContent
        });
        infoWindow.open(map, pos);
        _that.polyEditor.close()
        _that.polyEditorFlag = false
        setTimeout(() => {
          _that.infoWindowEle()
          if (_that.addFlag) {
            _that.addTextMaker(_that.contentPos)
          }
        }, 100)

        //关闭信息窗体
        infoWindow.on('close', function() {

        });
      },
      // 窗体模板
      templae(data = {title: '',fillOpacity: 0.4,fillColor: '#1791fc',color: '#ff0000',size: 16}) {
        let infoWindowContent =
          `<div class="InfoWindow_dl" >
                    <div class="closeInfoWindow_dl"></div>
                    <div class="InfoWindow_div_dl"><span>名称</span><input class="nameEle_dl" type="text" value="${data.title}" ></div>
                    <div class="InfoWindow_div_dl"><span>填充透明度</span><input type="text" class="opacity_dl" value="${data.fillOpacity*100}" ><input class="opacity_dl_range" type="range" value="${data.fillOpacity*100}" ></div>
                    <div class="InfoWindow_div_dl"><span>填充颜色</span><input class="colorFile_dl" type="color" value="${data.fillColor}" ><input class="colorFileupdata_dl" style="width: 40px" type="text" value="${data.fillColor}" ></div>
                    <div class="InfoWindow_div_dl"><span>文字颜色</span><input class="colorFont_dl"  type="color" value="${data.color}" ><input class="colorFontupdata_dl" style="width: 40px"  type="text" value="${data.color}" ></div>
                    <div class="InfoWindow_div_dl"><span>文字大小</span><input class="font_dl" type="text" value="${data.size}" ></div>
                    <div class="InfoWindow_div_dl" style="justify-content: center"><button class="save_dl" >保存</button><button class="remove_dl">移除</button></div>
                 </div>`;
        return infoWindowContent
      },
      // 窗体
      infoWindowEle() {
        const _that = this
        //关闭事件
        let closeInfoWindow_dl = document.getElementsByClassName('closeInfoWindow_dl')[0]
        //名称
        let nameEle_dl = document.getElementsByClassName('nameEle_dl')[0]
        //填充透明度
        let opacity_dl = document.getElementsByClassName('opacity_dl')[0]
        //滑竿
        let opacity_dl_range = document.getElementsByClassName('opacity_dl_range')[0]
        //填充颜色
        let colorFile_dl = document.getElementsByClassName('colorFile_dl')[0]
        //文字颜色
        let colorFont_dl = document.getElementsByClassName('colorFont_dl')[0]
        //文字大小
        let font_dl = document.getElementsByClassName('font_dl')[0]
        let colorFileupdata_dl = document.getElementsByClassName('colorFileupdata_dl')[0]
        let colorFontupdata_dl = document.getElementsByClassName('colorFontupdata_dl')[0]

        let save_dl = document.getElementsByClassName('save_dl')[0]
        let remove_dl = document.getElementsByClassName('remove_dl')[0]

        closeInfoWindow_dl.onclick = function() {
          _that.map.clearInfoWindow();
        }
        opacity_dl.oninput = function(e) {
          if (this.value >= 100) {
            this.value = 100
          }
          let num = this.value / 100
          //覆盖物透明度
          _that.polygon.setOptions({
            fillOpacity: num,
          })
          this.nextElementSibling.value = this.value
        }
        opacity_dl_range.oninput = function(e) {
          let num = this.value / 100
          //覆盖物透明度
          _that.polygon.setOptions({
            fillOpacity: num,
          })
          this.previousElementSibling.value = this.value
        }
        colorFile_dl.onchange = function(e) {
          //覆盖物颜色
          _that.polygon.setOptions({
            fillColor: this.value,
          })
          this.nextElementSibling.value = this.value
        }
        colorFileupdata_dl.onblur = function(e) {
          //覆盖物颜色
          _that.polygon.setOptions({
            fillColor: this.value,
          })
          this.previousElementSibling.value = this.value
        }
        colorFontupdata_dl.onblur = function(e) {
          //覆盖物颜色
          _that.fontcolor = this.value
          _that.upDataText.setLabel({
            offset: new AMap.Pixel(20, 20), //设置文本标注偏移量
            content: `<div style="text-align:center;white-space:nowrap;background:transparent;color:${_that.fontcolor};font-size:${_that.fontsize}px; ">${_that.textContent}</div>`, //设置文本标注内容
            direction: 'center' //设置文本标注方位
          });
          this.previousElementSibling.value = this.value
        }
        nameEle_dl.oninput = function(e) {
          _that.textContent = this.value
          _that.upDataText.setLabel({
            offset: new AMap.Pixel(20, 20), //设置文本标注偏移量
            content: `<div style="text-align:center;white-space:nowrap;background:transparent;color:${_that.fontcolor};font-size:${_that.fontsize}px;">${this.value}</div>`, //设置文本标注内容
            direction: 'center' //设置文本标注方位
          });
        }
        colorFont_dl.onchange = function(e) {
          //字体颜色
          _that.fontcolor = this.value
          _that.upDataText.setLabel({
            offset: new AMap.Pixel(20, 20), //设置文本标注偏移量
            content: `<div style="text-align:center;white-space:nowrap;background:transparent;color:${_that.fontcolor};font-size:${_that.fontsize}px; ">${_that.textContent}</div>`, //设置文本标注内容
            direction: 'center' //设置文本标注方位
          });
          this.nextElementSibling.value = this.value
        }
        font_dl.oninput = function(e) {
          //字体大小
          _that.fontsize = this.value
          _that.upDataText.setLabel({
            offset: new AMap.Pixel(20, 20), //设置文本标注偏移量
            content: `<div style="text-align:center;white-space:nowrap;background:transparent;color:${_that.fontcolor};font-size:${_that.fontsize}px;">${_that.textContent}</div>`, //设置文本标注内容
            direction: 'center' //设置文本标注方位
          });
        }
        save_dl.onclick = function(e) {
            _that.flag = true
            _that.markerFlag.hide()
            _that.map.clearInfoWindow();
            _that.upDataText.setDraggable(false)
            _that.polyEditorFlag = true
            // 数据兼容性处理
            _that.upDataText.Qe? null: _that.upDataText.Qe = _that.upDataText.Ce
            _that.polygon.Qe? null: _that.polygon.Qe = _that.polygon.Ce
            let lebol = _that.upDataText.Qe.label?_that.upDataText.Qe.label.content:''
            let obj = {
              id:_that.ind,
              path: _that.polygon.Qe.path,
              fillColor: _that.polygon.Qe.fillColor,
              fillOpacity: _that.polygon.Qe.fillOpacity,
              color: lebol.substr(lebol.indexOf('color:') + 6, 7),
              title: lebol.substr(lebol.indexOf('>') + 1, (lebol.lastIndexOf('<')) - (lebol.indexOf('>') + 1)),
              size: lebol.substr(lebol.indexOf('size') + 5, (lebol.lastIndexOf(';')) - (lebol.indexOf('size') + 7)),
              position:_that.upDataText.Qe.position
            }
            if (_that.addFlag) {
              _that.polygonData.push(obj)
              _that.allTextMackers.push(_that.upDataText)
            } else {
              _that.polygonData[_that.ind] = obj
              console.log(_that.allTextMackers[_that.ind], _that.polygonData[_that.ind])
            }
            _that.addFlag = false
            if (_that.type == 1) {
              _that.$emit('addAreax_dl',_that.polygonData)
            }
            console.log(JSON.stringify(_that.polygonData))
            // console.log(_that.polygon.getPath())
          },
          remove_dl.onclick = function() {
            _that.map.remove(_that.polygon);
            _that.map.remove(_that.upDataText);
            _that.flag = true
            _that.markerFlag.hide()
            _that.map.clearInfoWindow();
            _that.polyEditorFlag = true
            _that.addFlag = false
            _that.polygonData.splice(_that.ind,1)
          }
      },
      // 文字
      addTextMaker(contentPos) {
        const _that = this
        // 创建纯文本标记
        var marker = new AMap.Marker({ //添加自定义点标记
          map: _that.map,
          position: contentPos, //基点位置
          draggable: true, //是否可拖动
          content: '', //自定义点标记覆盖物内容
          zIndex: 10000
        });
        var endIcon = new AMap.Icon({
          size: new AMap.Size(25, 34),
          image: '',
          imageOffset: [1, 1],
          imageSize: [1, 1]
        });
        marker.setIcon(endIcon)
        // marker.setDraggable(true)
        this.upDataText = marker
      }
    }
  }
</script>

<style>
  .InfoWindow_dl {
    width: 346px;
    height: 283px;
    background: url("../../../assets/images/tk.png")no-repeat;
    background-size: 100% 100%;
    position: relative;
    padding: 13px 50px 13px 16px;
    box-sizing: border-box;
    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
  }

  .InfoWindow_dl>div:last-child {
    margin: 0;
  }

  .closeInfoWindow_dl {
    position: absolute;
    right: 17px;
    top: 9px;
    width: 20px;
    height: 20px;
    background: url("../../../assets/images/close.png")no-repeat;
    background-size: 100% 100%;
    cursor: pointer;
  }

  .InfoWindow_div_dl {
    display: flex;
    align-items: center;
    height: 30px;
    margin-bottom: 10px;
  }

  .InfoWindow_div_dl>span {
    display: block;
    min-width: 84px;
    text-align: right;
    margin-right: 15px;
    font-size: 16px;
    font-weight: 400;
    color: rgba(154, 201, 231, 1);
  }

  .InfoWindow_div_dl>input {
    height: 25px;
    background: transparent;
    border: 1px solid rgba(50, 139, 234, 1);
    border-radius: 3px;
    outline: none;
    padding-left: 8px;
    box-sizing: border-box;
    color: #FFFFFF;
  }

  .InfoWindow_div_dl>input:last-child {
    flex: 1;
  }

  .opacity_dl {
    width: 46px;
    margin-right: 6px;
  }

  .colorFile_dl,
  .colorFont_dl {
    width: 28px;
    height: 28px;
    border-radius: 3px;
    margin-right: 6px;
    border: none !important;
  }

  .InfoWindow_dl input[type="color"i] {
    padding: 0;
    cursor: pointer;
  }

  .InfoWindow_dl input[type="range"] {
    /*-webkit-box-shadow: 0 1px 0 0px #424242, 0 1px 0 #060607 inset, 0px 2px 10px 0px black inset, 1px 0px 2px rgba(0, 0, 0, 0.4) inset, 0 0px 1px rgba(0, 0, 0, 0.6) inset;*/
    margin-top: 2px;
    background-color: #7D9EED;
    border-radius: 15px;
    width: 400px;
    -webkit-appearance: none;
    height: 6px;
    border: none;
    padding: 0;
  }

  .InfoWindow_dl input[type="range"]::-webkit-slider-thumb {
    -webkit-appearance: none;
    cursor: pointer;
    margin-top: 6px;
    height: 14px;
    width: 14px;
    transform: translateY(-4px);
    background: none repeat scroll 0 0 #328BEA;
    border-radius: 15px;
    /*-webkit-box-shadow: 0 -1px 1px black inset;*/
  }

  .InfoWindow_div_dl>button {
    background: url("../../../assets/images/buttons.png")no-repeat;
    background-size: 100% 100%;
    width: 70px;
    height: 30px;
    border: none;
    color: #11B8FE;
    outline: none;
    cursor: pointer;
  }

  .InfoWindow_div_dl>button:nth-child(1) {
    margin-right: 20px;
  }

  .amap-marker-label {
    padding: 0 !important;
    border: none;
    background: none !important;
  }
</style>
