<template>
    <div class="NewGeneral_wrap" >
      <div class="NewGeneralLeft">
        <div class="blueTitle">{{oneNmae}}</div>
        <ul class="NewGeneralLeft_one">
          <li v-for="(item, index) in visCityData" :key="index" >
            <div>{{item.name}}</div>
            <span>{{item.value}}</span>
          </li>
        </ul>
        <div class="NewGeneralLeft_oneZX" >
          <div class="blueTitle">{{NewGeneralLeft_oneZXName}}</div>
          <div style="width: 100%;height: 100%;">
            <brokenLine ref="brokenLine"></brokenLine>
          </div>
        </div>

        <div class="blueTitle" style="margin-bottom: 17px;">{{dataSixTitle}}</div>
        <div style="margin-bottom: 20px;">
          <According ref="According" ></According>
        </div>
        <div style="margin-bottom: 20px;">
          <According ref="AccordingTow" ></According>
        </div>
        <div style="margin-bottom: 20px;">
          <According ref="AccordingThree" ></According>
        </div>

        <div class="blueTitle" style="margin-bottom: 9px">{{dataSevenTitle}}</div>
        <div class="tailAfter">
          <tailAfters ref="tailAfters"></tailAfters>
        </div>
      </div>

      <div class="NewGeneralContent">
        <div class="significant">
          <div class="blueTitle" style="margin-bottom: 9px">{{dataEightTitle}}</div>
          <div style="width: 100%;height: 100%;">
            <significants ref="significants"></significants>
          </div>
        </div>
        <div class="lineChart">

          <div>
            <div class="blueTitle" style="margin-bottom: 10px">{{indicatorNameNine}}</div>
            <div>
              <brokenLineone ref="brokenLineone"></brokenLineone>
            </div>
          </div>

          <div>
            <div class="blueTitle" style="margin-bottom: 10px">{{dataTenTitle}}</div>
            <div>
              <brokenLineTow ref="brokenLineTow"></brokenLineTow>
            </div>
          </div>

          <div>
            <div class="blueTitle" style="margin-bottom: 10px">{{dataElevenTitle}}</div>
            <div>
              <brokenLineThree ref="brokenLineThree"></brokenLineThree>
            </div>
          </div>


        </div>
      </div>

      <div class="NewGeneralRight">
        <div class="blueTitle" style="margin-top: 23px">{{histogramTitle}}</div>
<!--        柱状图-->
        <div class="histograms_wrap" @click="histogramsClick" >
          <div class="histograms">
            <histogram ref="histogram"></histogram>
          </div>
<!--          <ul class="top_across">
            <li><img src="../../assets/images/jb1.png" alt=""><span>充足</span></li>
            <li><img src="../../assets/images/jb2.png" alt=""><span>正常</span></li>
            <li><img src="../../assets/images/jb3.png" alt=""><span>紧张</span></li>
            <li><img src="../../assets/images/jb4.png" alt=""><span>极度紧张</span></li>
          </ul> -->
<!--          <ul class="vertical">
            <li>充足</li>
            <li>正常</li>
            <li>紧张</li>
            <li>极度紧张</li>
          </ul>
          <ul class="bottom_across">
            <li v-for="(item, index) in histogramNameData" :key="index">{{item.name}}</li>
          </ul> -->
        </div>
        <div class="blueTitle" >{{echartsPieTitle}}</div>

        <div style="height: 350px;" >
          <echartsPie ref="echartsPie" ></echartsPie>
        </div>

        <ul class="corresponding" >

          <li v-for="(item, index) in echartsPieNameData" :key="index">
            <img v-if="index==0" src="../../assets/images/1y.png" alt="">
            <img v-if="index==1" src="../../assets/images/2y.png" alt="">
            <img v-if="index==2" src="../../assets/images/3y.png" alt="">
            <div>
              <h5>{{item.percent}}%</h5>
              <p class="oneP">{{item.name}}</p>
            </div>
          </li>

        </ul>
      </div>

    </div>
</template>

<script>
  import According from "./NewGeneralTemp/According";
  import AccordingTow from "./NewGeneralTemp/According";
  import AccordingThree from "./NewGeneralTemp/According";
  import tailAfters from "./NewGeneralTemp/tailAfters";
  import brokenLine from "./NewGeneralTemp/brokenLine"; // 折线图
  import brokenLineone from "./NewGeneralTemp/brokenLine"; // 折线图
  import brokenLineTow from "./NewGeneralTemp/brokenLine"; // 折线图
  import brokenLineThree from "./NewGeneralTemp/brokenLine"; // 折线图
  import bus from "../../assets/js/bus";
  import echartsPie from "./NewGeneralTemp/echartsPie";
  import significants from "./NewGeneralTemp/significants";
  import allUrl from "../../assets/api/allApiUrl";
  import histogram from "./NewGeneralTemp/histogram";
    export default {
        name: "NewGeneral",
        data () {
          return {
            visCityData:[],
            colorData:[['#e59360','#d79a23'],['#e16484','#da7279'],['#005bea','#0095eb'],['#666666','#999999'],['#7ed1dc','#3bcdd0']],
            histogramNameData:[],
            histogramTitle: '',
            echartsPieNameData:[],
            oneNmae:'',
            echartsPieTitle:'',
            NewGeneralLeft_oneZXName: '',
            indicatorNameNine: '',
            dataElevenTitle:'',
            dataTenTitle:'',
            dataSixTitle:'',
            dataSevenTitle:'',
            dataEightTitle:'',

            flag:true,   //更新
            num:0        //计时
          }
        },
      methods:{
        histogramsClick() {
          let des = sessionStorage.search.split('&')
          let str = des[2].split('=')
          let x = str.splice(1,1,'barGraph')
          des[2] = str.join('=')
          sessionStorage.search = des.join('&')
          this.$router.push({path:'/barGraph'})
        },
        getCity () {
          let data = allUrl.newVisualization,s={params:{
            townId:this.$store.state.townId,
              indicatorType:4
            }}
          Object.assign(data,s) // 合并对象, 只是把参数搞成对象形式 {}
          this.apix(data)
            .then((res)=>{
              console.log(res)
              if (res.list) {
                let array = []
                this.oneNmae = res.data.indicatorName
                res.list[0].forEach((ele,index) => {
                  let obj = {
                    name:ele,
                    value:Number(res.list[1][index])
                  }
                  array.push(obj)
                })
                if (array.length>19) {
                  array = array.slice(0,19)
                }
                console.log(array)
                this.visCityData = array
              }
                //
            })
            .catch((err)=>{
              console.log(err)
            })
        },
        infuseBrokenLine () {
          let data = allUrl.newVisualization,s={params:{
              townId:this.$store.state.townId,
              indicatorType:5
            }}
          Object.assign(data,s) // 合并对象, 只是把参数搞成对象形式 {}
          this.apix(data)
            .then((res)=>{
              // console.log(res)
              if (res.data) {
                this.NewGeneralLeft_oneZXName = res.data.indicatorName
              }
              let colorData = [this.colorData[0],this.colorData[1]]
              let obj = this.zx(res,colorData)
              this.infusebrokenLineCom('brokenLine','brokenLine',obj.legendData,obj.xAxisData,obj.seriesData)
            })
            .catch((err)=>{
              console.log(err)
            })
        },
        zx (res,colorData) {
          let msg = res
          let xAxisData = []
          let legendData = []
          let obj = {}
          if (msg.list) {
            xAxisData = msg.list[0]
            msg.list[1].forEach((ele,index)=>{
              let list = JSON.parse(ele)
              if (index == 0) {
                list.forEach((ele,index)=>{
                  legendData.push(list[index].name)
                })
                legendData.forEach((ele,index)=>{
                  obj[index] = []
                })
              }
              legendData.forEach((ele,index)=>{
                obj[index].push(list[index].data)
              })
            })
          }
          let seriesData = []
          legendData.forEach((ele,index)=>{
            let objs = {
              name: ele,
              type: 'line',
              stack: '总量',
              data: obj[index],
              smooth: true,
              itemStyle : {
                normal:{
                  color:colorData[index][0], //改变折线点的颜色
                  borderColor : colorData[index][1],
                  borderWidth : 4
                }
              }
            }
            seriesData.push(objs)
          })
          return {legendData,xAxisData,seriesData}
        },
        infusebrokenLineCom (eleName,refsEle,legendData,xAxisData,seriesData) {
          let obj = {
            legendData,
            xAxisData,
            seriesData
          }
          // console.log(this.$refs[refsEle])
          this.$refs[refsEle].init(eleName,obj)
        },
        dataSix () {
          let data = allUrl.newVisualization,s={params:{
              townId:this.$store.state.townId,
              indicatorType:6
            }}
          Object.assign(data,s) // 合并对象, 只是把参数搞成对象形式 {}
          this.apix(data)
            .then((res)=>{
              // console.log(res)
              this.dataSixTitle = res.data.indicatorName
              if (res.list) {
                let array = []
                res.list[0].forEach((ele,index) => {
                  let obj = {
                    name:ele,
                    value:Number(res.list[1][index])
                  }
                  array.push(obj)
                })
                let towArr = []
                let threeArr = []
                array.forEach((ele,index)=>{
                  if (index<6) {
                    if (towArr.length>1) {
                      towArr = []
                    }
                    towArr.push(ele)
                    if ( towArr.length == 2 ) {
                      threeArr.push(towArr)
                    }
                  }
                })
                this.$refs.According.init(threeArr[0])
                this.$refs.AccordingTow.init(threeArr[1])
                this.$refs.AccordingThree.init(threeArr[2])
              }
            })
            .catch((err)=>{
              console.log(err)
            })
        },
        dataSeven () {
          let data = allUrl.newVisualization,s={params:{
              townId:this.$store.state.townId,
              indicatorType:7
            }}
          Object.assign(data,s) // 合并对象, 只是把参数搞成对象形式 {}
          this.apix(data)
            .then((res)=>{
              // console.log(res)
              this.dataSevenTitle = res.data.indicatorName
              if (res.list) {
                let array = []
                res.list[0].forEach((ele,index) => {
                  let obj = {
                    name:ele,
                    value:Number(res.list[1][index])
                  }
                  array.push(obj)
                })
                this.$refs.tailAfters.init(array.slice(0,4))
              }
            })
            .catch((err)=>{
              console.log(err)
            })
        },
        dataEight () {
          let data = allUrl.newVisualization,s={params:{
              townId:this.$store.state.townId,
              indicatorType:8
            }}
          Object.assign(data,s) // 合并对象, 只是把参数搞成对象形式 {}
          this.apix(data)
            .then((res)=>{
              // console.log(res)
              this.dataEightTitle = res.data.indicatorName
              if (res.list) {
                let array = []
                res.list[0].forEach((ele,index) => {
                  let obj = {
                    name:ele,
                    value:Number(res.list[1][index])
                  }
                  array.push(obj)
                })
                this.$refs.significants.init(array)
              }
            })
            .catch((err)=>{
              console.log(err)
            })
        },
        dataNine () {
          let data = allUrl.newVisualization,s={params:{
              townId:this.$store.state.townId,
              indicatorType:9
            }}
          Object.assign(data,s) // 合并对象, 只是把参数搞成对象形式 {}
          this.apix(data)
            .then((res)=>{
              // console.log(res)
              let colorData = [this.colorData[0],this.colorData[1],this.colorData[2]]
              let obj = this.zx(res,colorData)
              this.indicatorNameNine = res.data.indicatorName
              this.infusebrokenLineCom('brokenLineone','brokenLineone',obj.legendData,obj.xAxisData,obj.seriesData)
            })
            .catch((err)=>{
              console.log(err)
            })
        },
        dataTen () {
          let data = allUrl.newVisualization,s={params:{
              townId:this.$store.state.townId,
              indicatorType:10
            }}
          Object.assign(data,s) // 合并对象, 只是把参数搞成对象形式 {}
          this.apix(data)
            .then((res)=>{
              // console.log(res)
              this.dataTenTitle = res.data.indicatorName
              let colorData = [this.colorData[0],this.colorData[1],this.colorData[2]]
              let obj = this.zx(res,colorData)
              this.infusebrokenLineCom('brokenLineTow','brokenLineTow',obj.legendData,obj.xAxisData,obj.seriesData)
            })
            .catch((err)=>{
              console.log(err)
            })
        },
        dataEleven () {
          let data = allUrl.newVisualization,s={params:{
              townId:this.$store.state.townId,
              indicatorType:11
            }}
          Object.assign(data,s) // 合并对象, 只是把参数搞成对象形式 {}
          this.apix(data)
            .then((res)=>{
              // console.log(res)
              this.dataElevenTitle = res.data.indicatorName
              let colorData = [this.colorData[3],this.colorData[4]]
              let obj = this.zx(res,colorData)
              this.infusebrokenLineCom('brokenLineThree','brokenLineThree',obj.legendData,obj.xAxisData,obj.seriesData)
            })
            .catch((err)=>{
              console.log(err)
            })
        },
        dataTwelve () {
          let data = allUrl.newVisualization,s={params:{
              townId:this.$store.state.townId,
              indicatorType:12
            }}
          Object.assign(data,s) // 合并对象, 只是把参数搞成对象形式 {}
          this.apix(data)
            .then((res)=>{
              this.histogramTitle = res.data.indicatorName
              if (res.list) {
                let array = []
                res.list[0].forEach((ele,index) => {
                  let obj = {
                    name:ele,
                    count:res.list[1][index]
                  }
                  array.push(obj)
                })
                console.log(array)
                this.histogramNameData = array
                this.$refs.histogram.init(array)
              }
            })
            .catch((err)=>{
              console.log(err)
            })
        },
        dataThirteen () {
          let data = allUrl.newVisualization,s={params:{
              townId:this.$store.state.townId,
              indicatorType:13
            }}
          Object.assign(data,s) // 合并对象, 只是把参数搞成对象形式 {}
          this.apix(data)
            .then((res)=>{
              // console.log(res)
              this.echartsPieTitle = res.data.indicatorName
              if (res.list) {
                let array = []
                res.list[0].forEach((ele,index) => {
                  let obj = {
                    name:ele,
                    value:Number(res.list[1][index])
                  }
                  array.push(obj)
                })
                this.echartsPieNameData = this.percentage(array)
                this.$refs.echartsPie.init(array)
              }
            })
            .catch((err)=>{
              console.log(err)
            })
        },
        percentage (data) {
          const _that = this
          let values = 0
          data.forEach(function (ele,index) {
            values+=ele.value
          })
          let count = 0
          data.forEach(function (ele,index) {
            if(index == data.length-1){
              ele.percent = Math.round((100 - count)*100)/100
            }else {
              ele.percent = Math.round((ele.value/values)*10000)/100
              count += ele.percent
            }
          })
          return data
          // console.log(this.data)
        },
        devAllFun () {
            this.infuseBrokenLine()
            this.getCity()
            this.dataSix()
            this.dataSeven()
            this.dataEight()
            this.dataNine()
            this.dataTen()
            this.dataEleven()
            this.dataTwelve()
            this.dataThirteen()
        },
        updata (){
          const _that = this
          if (_that.flag) {
            let data = allUrl.updateData,s={params:{}}
            Object.assign(data,s) // 合并对象, 只是把参数搞成对象形式 {}
            data.baseURL = window.SITE_CONFIG['baseUrl2']
            this.apix(data)
              .then((res)=>{
                if (res.code == 0) {
                  let setIn = setInterval(()=>{
                    _that.num+=1
                    if (_that.num>=60) {
                      _that.flag = true
                      clearInterval(setIn)
                    }
                  },1000)
                  this.devAllFun()
                  this.flag = false
                }
              })
              .catch((err)=>{
                console.log(err)
              })
           }
        }
      },
      mounted() {
        this.devAllFun()
        const _that = this
        bus.$off('flushs')
        bus.$on('flushs',(res)=>{
            // console.log('刷新')
            _that.updata()
        })
        setInterval(()=>{
          _that.updata()
        },60000*5)
      },
      components:{
        According,
        AccordingTow,
        AccordingThree,
        tailAfters,
        brokenLine,
        brokenLineone,
        brokenLineTow,
        brokenLineThree,
        histogram,
        significants,
        echartsPie
      },
      computed:{
        townId () {
          return this.$store.state.townId
        }
      },
      watch:{
        townId: function (newValue) {
          // console.log(newValue)
          this.devAllFun()
        }
      }
    }
</script>

<style scoped>
.NewGeneral_wrap{
  flex: 1;
  overflow: hidden;
  width: 100%;
  min-height: 942px;
  height: 100%;
  padding: 9px 27px 25px;
  box-sizing: border-box;
  display: flex;
}
.NewGeneralLeft{
  width: 408px;
  margin-right: 14px;
  overflow-x: hidden;
}
.NewGeneralContent{
  width: 1025px;
}
.significant{
  width: 730px;
  height: 570px;
  margin: auto;
  margin-top: 23px;
  position: relative;
  margin-bottom: 64px;
  /*background: rgba(0,0,0,.5);*/
}
.significant>div:nth-child(1){
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  z-index: 999;
}
.NewGeneralRight{
  width: 416px;
}
.NewGeneralLeft_one{
  list-style: none;
  padding: 0;
  height: 84px;
  margin: 11px 0 26px;
  background: url("../../assets/images/psd4.png")no-repeat;
  background-size: 100% 100%;
  display: flex;
}
.NewGeneralLeft_one>li{
  padding-top: 6px;
  box-sizing: border-box;
  flex: 1;
  display: flex;
  justify-content: center;
  flex-direction: column;
  position: relative;
  overflow: hidden;
}
.NewGeneralLeft_one>li:before{
  content: '';
  position: absolute;
  top: 0;
  right: 0;
  height: 100%;
  width: 1px;
  background: url("../../assets/images/xian.png")no-repeat;
  background-size: 100% 100%;
}
.NewGeneralLeft_one>li:last-child:before{
  display: none;
}
.NewGeneralLeft_one>li>div{
  margin: 0 auto;
  writing-mode: vertical-lr;/*从左向右 从右向左是 writing-mode: vertical-rl;*/
  writing-mode: tb-lr;/*IE浏览器的从左向右 从右向左是 writing-mode: tb-rl；*/
  font-size:16px;
  font-weight:400;
  color:rgba(230,231,232,1);
}
.NewGeneralLeft_one>li>span{
  font-size:28px;
  background-clip: text;
  -webkit-background-clip: text;
  text-align: center;
  display: inline-block;
  -webkit-text-fill-color: transparent;
  font-family: 'DCM';
  color: #99C9E7;
  background-image: -webkit-gradient(linear, 0 0, 0 bottom, from(#99C9E7), to(#99C9E7));
}
.NewGeneralLeft_one>li:nth-child(1)>span{
  color: #E54BF2;
  background-image: -webkit-gradient(linear, 0 0, 0 bottom, from(#F192B2), to(#E54BF2));
}
.NewGeneralLeft_oneZX{
  height: 254px;
  position: relative;
  margin-bottom: 17px;
}
.NewGeneralLeft_oneZX>div:nth-child(1){
  position: absolute;
  width: 100%;
  top: 0;
  left: 0;
}
.tailAfter{
  height: 167px;
}

.lineChart{
  height: 308px;
  display: flex;
}
.lineChart>div{
  flex: 1;
  display: flex;
  flex-direction: column;
  margin-left: 25px;
}
.lineChart>div:first-child{
  margin: 0;
}
.lineChart>div>div:nth-child(2){
  flex: 1;
}

.histograms_wrap{
  width: 100%;
  height: 400px;
  position: relative;
  margin-bottom: 28px;
  /*background: green;*/
}
.histograms{
  width: 100%;
  height: 425px;
  position: absolute;
  top: 0;
  right: 10px;
}
.histograms_wrap>ul{
  display: flex;
  margin: 0;
}
.histograms_wrap>ul>li{
  margin: 0;
  list-style: none;
}
.top_across{
  position: absolute;
  top: 0;
  right: 10px;
  font-size:14px;
  font-weight:400;
  color:rgba(51,105,191,1);
}
.top_across>li{
  margin-left: 17px !important;
}
.top_across>li>img{
  width: 14px;
  height: 10px;
  margin-right: 8px;
}

.bottom_across{
  position: absolute;
  bottom: 25px;
  right: 0;
  width: 381px;
}
.bottom_across>li{
  flex: 1;
  text-align: center;
  font-size:16px;
  font-weight:normal;
  color:rgba(98,132,159,1);
}

.vertical{
  position: absolute;
  left: -82px;
  bottom: 60px;
  flex-direction: column;
  justify-content: space-between;
  align-items: flex-end;
  height: 277px;
  font-size:16px;
  font-weight:normal;
  color:rgba(22,142,239,1);
}
.corresponding{
  width:341px;
  height:81px;
  background:rgba(72,159,248,.12);
  margin: auto;
  padding: 0;
  list-style: none;
  display: flex;
  align-items: center;
}
.corresponding>li{
  flex: 1;
  display: flex;
  align-items: flex-start;
  justify-content: center;
  height: 44px;
}
.corresponding>li>img{
  width: 20px;
  height: 20px;
  margin-right: 9px;
  margin-top: 5px;
}
.corresponding>li>div>h5{
  margin: 0 !important;
  font-size:32px;
  font-family:DCM;
  font-weight:500;
  color:rgba(255,255,255,1);
  line-height: 1;
}
.corresponding>li>div>p{
  margin: 0 !important;
  font-size:14px;
  font-weight:normal;
}
.oneP{
  color:#3F99E2 ;
}
.TowP{
  color:#6AE7B1 ;
}
.ThreeP{
  color:#F9D563 ;
}




</style>
