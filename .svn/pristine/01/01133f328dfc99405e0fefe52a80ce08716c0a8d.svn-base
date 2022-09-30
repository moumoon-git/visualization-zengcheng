<template>
  <div class="coverage_wrap">

      <div class="coverage_content" v-for="(item,index) in data" @click="renderx(item)" :key='index' >
        <div class="titleWrap" >
          {{item.name}}
        </div>
        <div class="text_content">
          <el-scrollbar style="height: 100%;">
            {{item.remark}}
          </el-scrollbar>
        </div>
        <div class="handleBtn">
          <div class="dlbtnImg" @click.stop="open(item)" ></div>
          <div class="bjbtnImg" @click.stop="zKpopWindow(item)" ></div>
        </div>
      </div>


      <div v-show="UpWindowsFlag" >
        <popUpWindows ref='popUpWindows' @closeThis='closePopUpWindow' @clickSaveBtns='clickSaveBtn' ></popUpWindows>
      </div>

  </div>
</template>

<script>
  import allUrl from "../../../../../assets/api/allApiUrl";
  import popUpWindows from './template/popUpWindows'
  export default{
    name:'coverage',
    data () {
      return {
        UpWindowsFlag:false,
        data:'',
        map:'',
        graph:''
      }
    },
    methods:{
      initMap (map) {
        this.map = map
      },
      closePopUpWindow () {
        this.UpWindowsFlag = false
      },
      zKpopWindow (item) {
        this.$refs.popUpWindows.init(item)
        this.UpWindowsFlag = true
      },
      renderx (item) {
        this.graph = item
        this.getAssign(item)
      },
      getAllCav () {
        let data={...allUrl.selectAllLayer,params:{}}
        this.apix(data)
        .then((res)=>{
          // console.log(res.data)
          this.data = res.data
        })
        .catch((err)=>{
          console.log(err)
        })
      },
      getAssign (item) {
        let data={...allUrl.selectAllGraphics,params:{
          layerId:item.id
        }}
        this.apix(data)
        .then((res)=>{
          console.log(res.data)
          this.map.clearMap()
          this.render(res.data)
        })
        .catch((err)=>{
          console.log(err)
        })
      },
      // 渲染
      render (data) {
        if (data.length!=0) {
           data.forEach(ele=>{
             // 先渲矢量图形，再渲染文字
             // 查看是否是区域块图形
             if (ele.type == 'area') {
                this.drawArea(ele)
             }else if (ele.type == 'line'){
                this.drawLine(ele)
             }else if (ele.type == 'Rec'){
                this.drawRec(ele)
             }else if (ele.type == 'Cir'){
                this.drawCir(ele)
             }else if (ele.type == 'mack'){
                this.drawMack(ele)
             }

             this.foundText(ele)
           })
        }
      },
      // 绘制区域快
      drawArea(ele){
        let arr = JSON.parse(ele.path)
        let path = []
        if (arr.length!=0) {
          arr.forEach(ele=>{
            let Arrays = [ele.lng,ele.lat]
            path.push(Arrays)
          })
        }
        var polygon = new AMap.Polygon({
          path,
          strokeWeight: 0, //线条宽度
          strokeOpacity: 0, //线条透明度
          fillOpacity: Number(ele.fillOpacity), //覆盖物透明度
          fillColor: ele.fillColor, // 覆盖物颜色
          zIndex: 50 // 覆盖物显示层级
        })
        console.log(polygon,path)
        this.map.add(polygon)
      },
      //绘制线形
      drawLine (ele) {
        var polyline = new AMap.Polyline({
            path: JSON.parse(ele.path),
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
            zIndex: 50
        })
        polyline.setMap(this.map)
      },
      // 绘制圆形
      drawCir (ele) {
        let center = JSON.parse(ele.path)
        var circle = new AMap.Circle({
               center:[center.lng,center.lat] ,
               radius: JSON.parse(ele.radius), //半径
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
               zIndex: 50
           })
           circle.setMap(this.map)
      },
      // 绘制矩形
      drawRec (ele) {
        let center = JSON.parse(ele.path)
        var southWest = new AMap.LngLat(center[0].lng,center[0].lat)
        var northEast = new AMap.LngLat(center[1].lng,center[1].lat)
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
            zIndex:50
        })
        rectangle.setMap(this.map)
      },
      // 绘制图标
      drawMack (ele) {
        let urlStr = window.SITE_CONFIG['baseUrl']
        let url = '47.113.114.122:22122'
        console.log(urlStr.substr(0,urlStr.lastIndexOf('/')))
        let center = JSON.parse(ele.path)
        let marker = new AMap.Marker({
            icon: url+ele.iconUrl,
            position: [center.lng,center.lat],
            offset: new AMap.Pixel(-13, -30),
            draggable:false
        });
        marker.setMap(this.map);
      },
      // 创建文字
      foundText(ele){
        let center = JSON.parse(ele.position)
        var text = new AMap.Text({
            text:ele.name,
            anchor:'center', // 设置文本标记锚点
            draggable:true,
            cursor:'pointer',
            style:{
                'background-color': 'transparent',
                'text-align': 'center',
                'font-size': ele.textSize?ele.textSize:'20px',
                'color': ele.textColor?ele.textColor:'blue',
                'border':'none'
            },
             position: [center.lng,center.lat]
        });
        text.setMap(this.map);
      },
      // 保存
      clickSaveBtn (data) {
        let datas = {...allUrl.LayerSave,
        data:this.qs.stringify({
          id:this.graph.id,
          name:data.inpval,
          level:'',
          longitude:this.graph.longitude,
          latitude:this.graph.latitude,
          remark:data.remarck
        })}
        this.apix(datas).then((res)=>{
            this.$message({
              message: '保存成功',
              type: 'success'
            });
            // 刷新列表
            this.getAllCav()
        })
        .catch((err)=>{
            console.log(err)
        })
        this.UpWindowsFlag = false
      },
      // 删除
      delLayer(item) {
        let datas = {...allUrl.LayerDelete,
        data:this.qs.stringify({
          id:item.id
        })}
        this.apix(datas)
        .then((res)=>{
          this.$message({
            type: 'success',
            message: '删除成功!'
          });
          this.getAllCav()
        })
        .catch((err)=>{
            console.log(err)
        })
      },
      open(item) {
        const _that = this
        this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          _that.delLayer(item)
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });
        });
      }
    },
    mounted () {
      this.getAllCav()
    },
    components:{
      popUpWindows
    }
  }
</script>

<style scoped>
.coverage_wrap{
  height: 100%;
  padding: 15px 25px;
  box-sizing: border-box;
}
.coverage_wrap /deep/ .el-scrollbar__wrap{
  overflow-x: hidden;
}
.coverage_content{
  overflow: hidden;
  height:186px;
  background: url('../../../../../assets/images/cszh/bor.png')no-repeat;
  background-size: 100% 100%;
  margin-bottom: 20px;
}
.titleWrap{
  width:95px;
  height:26px;
  line-height: 26px;
  border:1px solid rgba(255, 255, 255, 0.2);
  font-size:16px;
  font-weight:400;
  color:rgba(0,242,255,1);
  text-align: center;
  margin-top: 5px;
  margin-left: 10px;
}
.text_content{
  margin-top: 10px;
  margin-left: 10px;
  height: 100px;
  font-size:14px;
  font-weight:300;
  color:rgba(255,255,255,1);
  padding: 0 10px;
  box-sizing: border-box;
}
.handleBtn{
  margin-top: 5px;
  border-top: 2px solid rgba(23,60,101,1);
  display: flex;
  justify-content: flex-end;
  padding: 5px 0;
}
.dlbtnImg,.bjbtnImg{
  width:18px;
  height:22px;
  margin-right: 17px;
  margin-left:10px ;
  cursor: pointer;
}
.dlbtnImg{
  background: url('../../../../../assets/images/cszh/dl.png')no-repeat;
  background-size:100% 100% ;
}
.dlbtnImg:hover{
  background: url('../../../../../assets/images/cszh/dl1.png')no-repeat;
  background-size:100% 100% ;
}
.bjbtnImg{
  background: url('../../../../../assets/images/cszh/bj.png')no-repeat;
  background-size:100% 100% ;
}
.bjbtnImg:hover{
  background: url('../../../../../assets/images/cszh/bj1.png')no-repeat;
  background-size:100% 100% ;
}
</style>
