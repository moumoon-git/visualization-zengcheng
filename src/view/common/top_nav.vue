<template>
    <div class="top_nav_wrap">
      <div class="top_nav_wrap_left">
        <realTime></realTime>
      </div>
      <div class="dateSelect" v-if="this.$store.state.type!= 'visual' " >
        <span v-if="this.$store.state.type != 'NewGeneral'&&this.$store.state.type !='barGraph'&&this.$store.state.type !='GarbageClassification'&&this.$store.state.type !='Disputes'" >选择日期</span>
        <!-- <span v-if="this.$store.state.type == 'NewGeneral'" >选择辖区</span> -->
        <!-- <selectCity v-if="this.$store.state.type == 'NewGeneral'" ref="selectCity" @transferID="transferIDs" ></selectCity> -->
        <selectTime v-if="this.$store.state.type != 'NewGeneral'&&this.$store.state.type !='barGraph'&&this.$store.state.type !='GarbageClassification'&&this.$store.state.type !='Disputes'" ></selectTime>
      </div>
      <!-- 
       * @author tanjinfeng
       * @date 2020-09-14
       * @desc 增加垃圾分类页面，修改标题 -->
      <!-- @begin -->
      <h1 class="big_title gc-big-title" v-if="this.$store.state.type == 'GarbageClassification'">垃圾分类精细化管理看板</h1>
      <!-- <h1 class="big_title gc-big-title" v-else-if="this.$store.state.type == 'Disputes'">增城智慧调解</h1> -->
      <!-- <h1 class="big_title gc-big-title" v-else-if="this.$store.state.type == 'conduct'">值班态势动态看板</h1>
      <h1 class="big_title gc-big-title" v-else-if="this.$store.state.type == 'visual'">可视指挥动态看板</h1> -->
      <h1 class="big_title" v-if="this.$store.state.type == 'BasicDataVisual'">基础数据一张图</h1>
      <h1 class="big_title" v-else>{{indicatorName}}</h1>
      <!-- @end -->
<!--      <h1 class="big_title">亦庄疫情防控数据分析系统</h1>-->
<!--      疫情的另一套系统  v-if="this.$store.state.type == 'NewGeneral'" -->
      <div class="situation_wrap" v-if="this.$store.state.type == 'NewGeneral'" >
        <img src="../../assets/images/lb.png" alt="">
        <div class="situation_swiper">
          <div :class="transFromFlag?'transFrom':''" ref="transFrom" :style="{left:transFromFlag ? '-' + leftVal + 'px' :'0'}" >
            {{swiperTitle}}
          </div>
        </div>
        <div class="situation_more" @click="flush" >
          <span>刷新</span>
          <!-- <img src="../../assets/images/rightjt.png" alt=""> -->
        </div>
      </div>

      <div class="warningNavBtn" v-if="this.$store.state.type=='map'">
        <div :class="item.flag?'warningNavBtnActive':''" v-for="(item, index) in warningNavBtnData" :key="index" @click="selectBtns(item)" >{{item.name}}</div>\
      </div>

      <!--
        **
        * @author tanjinfeng
        * @date 2020-09-18
        * @desc 垃圾分类页面通知
        **
      -->
      <div
        class="gc-notice"
        v-if="this.$store.state.type == 'GarbageClassification' || this.$store.state.type == 'Disputes'"
      >
        <img src="../../assets/images/lb.png" alt="">
        <div class="gc-notice__main">
          <div>
            {{swiperTitle}}
          </div>
        </div>
        <div class="gc-notice__more">
          <span>更多动态通报</span>
          <div class="gc-notice__more__btn"></div>
        </div>
      </div>
      <!-- 天气组件 -->
      <!-- 注释原因：增城要对接自己的气象数据 -->
      <!-- <WeatherUtility v-if="$store.state.type === 'visual' || $store.state.type === 'hwvisual' || $store.state.type === 'BasicDataVisual'"  /> -->
      <Weather v-if="$store.state.type === 'visual' || $store.state.type === 'hwvisual' || $store.state.type === 'BasicDataVisual'" />
    </div>
</template>

<script>
    import realTime from './top_time/realTime'
    import selectTime from './top_time/selectTime'
    import selectCity from "./selectCity/selectCity";
    import allUrl from "../../assets/api/allApiUrl";
    import bus from "../../assets/js/bus";
    import WeatherUtility from './WeatherUtility/WeatherUtility';
    import Weather from './Weather/Weather';

    export default {
        name: "top_nav",
        data (){
          return{
              warningNavBtnData:[],
              transFromFlag:false,
              leftVal:'',
              intervalName:'',
              indicatorName:'社会治理数据分析系统',
              swiperTitle:'',
              type: this.$store.state.type
          }
        },
        methods:{
            flush () {
              bus.$emit('flushs','')
            },
            selectBtns (item) {
                    for (let i = 0; i<this.warningNavBtnData.length;i++) {
                        this.warningNavBtnData[i].flag = false
                    }
                    item.flag = true
                    this.$store.commit('selectBtn',item.type)
            },
            getBtnArray () {
                    if (this.$store.state.btnArray.length!=0) {
                        let BtnData = this.$store.state.btnArray
                        let btnData = []
                        /**
                         * @author tanjinfeng
                         * @desc 改为固定顺序，没有则不显示：1-人员、2-车辆、3-小区、4-学校。
                         */
                        // *****原来的代码*****
                        // BtnData.forEach(function (ele,index) {
                        //     let obj = {}
                        //     if (index==0) {
                        //         obj.flag = true
                        //     }else{
                        //         obj.flag = false
                        //     }
                        //     obj.type = ele
                        //     obj.ind = index
                        //     if (ele == 'car') {
                        //         obj.name = '车辆'
                        //     }else if (ele == 'human') {
                        //         obj.name = '人员'
                        //     }else if (ele == 'school') {
                        //         obj.name = '学校'
                        //     }else if (ele == 'estate') {
                        //         obj.name = '小区'
                        //     }
                        //     btnData.push(obj)
                        //     //   if (ele == 'estate') {
                        //     //     obj.name = '疫情'
                        //     //     btnData.push(obj)
                        //     //     obj.flag = true
                        //     //   }
                        // })
                        // this.warningNavBtnData = btnData
                        // this.$store.commit('selectBtn',btnData[0].type)
                        // *****修改的代码******
                        if (BtnData.indexOf('human') > -1) {
                          btnData.push({
                            flag: false,
                            name: '人员',
                            type: 'human',
                            ind: 0
                          })
                        }
                        if (BtnData.indexOf('car') > -1) {
                          btnData.push({
                            flag: false,
                            name: '车辆',
                            type: 'car',
                            ind: 0
                          })
                        }
                        if (BtnData.indexOf('estate') > -1) {
                          btnData.push({
                            flag: false,
                            name: '小区',
                            type: 'estate',
                            ind: 0
                          })
                        }
                        if (BtnData.indexOf('school') > -1) {
                          btnData.push({
                            flag: false,
                            name: '学校',
                            type: 'school',
                            ind: 0
                          })
                        }
                        btnData.forEach((e, index) => {
                          e.ind = index
                        })
                        if(btnData[0]) {
                          btnData[0].flag = true
                          this.warningNavBtnData = btnData
                          this.$store.commit('selectBtn',btnData[0].type)
                        }
                        // ******结束******
                    }
            },
            isXinCOMD () {
              if(this.$store.state.type == 'NewGeneral'){
                this.setTime() // 滚动动画
              }
            },
            setTime () {
              const _that = this
              setTimeout(()=>{
                _that.transFromFlag = true
                // console.log(_that.$refs.transFrom)
                _that.leftVal = _that.$refs.transFrom.offsetWidth
                _that.setInte(20000) // 动画18秒 加 2秒
                // console.log('开始')
              },2000)
            },
            setInte (time) {
              const _that = this
              this.intervalName = setInterval(()=>{
                _that.transFromFlag = false
                clearInterval(_that.intervalName)
                _that.setTime()
                // console.log('结束')
              },time)
            },
            getCity () {
              let data = allUrl.cityList,s={params:{

                }}
              Object.assign(data,s) // 合并对象, 只是把参数搞成对象形式 {}
              this.apix(data)
                .then((res)=>{
                  // console.log(res)
                  this.$store.commit('townId',res.list[0].id)
                  this.$refs.selectCity.init(res.list)
                })
                .catch((err)=>{
                  console.log(err)
                })
                console.log(this.type)
                /**
                 * @author tanjinfeng
                 * @date 2020-11-25
                 * @description 矛盾纠纷看板的标题名改为后台获取
                 */
                // *** 新增的代码 ***
                if (this.type === 'Disputes') {
                  this.apix({
                    method: 'get',
                    url: '/sys/config/infoByKey?key=ZHTJ'
                  }).then(res => {
                    if (res.code === 0) {
                      document.getElementsByTagName('title')[0].innerHTML = res.config.paramValue
                      this.indicatorName = res.config.paramValue
                    }
                  })
                }
                // *** 结束 ***
              let datas = allUrl.newVisualization,ss={params:{
                  townId:this.$store.state.townId,
                  indicatorType: (this.type=="conduct" || this.type=="NewGeneral")?-99:(this.type=="map"?-100:((this.type=="visual" || this.type=="barGraph")?-101:undefined))
                }}
              Object.assign(datas,ss) // 合并对象, 只是把参数搞成对象形式 {}
              this.apix(datas)
                .then((res)=>{
                  console.log(res)
                  if (res.data) {
                    this.indicatorName = res.data.indicatorName
                    document.getElementsByTagName('title')[0].innerHTML = res.data.indicatorName //设置网页标题
                  }
                })
                .catch((err)=>{
                  console.log(err)
                })
            },
            transferIDs (item) {
                // console.log(item)
                this.$store.commit('townId',item)
            },
            getSwiperTitle () {
              let data = allUrl.newVisualization,s={params:{
                  townId:this.$store.state.townId,
                  indicatorType: 3
                }}
              Object.assign(data,s) // 合并对象, 只是把参数搞成对象形式 {}
              this.apix(data)
                .then((res)=>{
                  // console.log(res)
                  this.swiperTitle = res.data.indicatorName
                })
                .catch((err)=>{
                  console.log(err)
                })
            },
            street () {
                let data = allUrl.userInfo,s={params:{}}
                Object.assign(data,s) // 合并对象, 只是把参数搞成对象形式 {}
                this.apix(data)
                .then((res)=>{
                    sessionStorage.street = JSON.stringify({log:res.platform.longitude,lat:res.platform.latitude})
                })
                .catch((err)=>{
                    console.log(err)
                })
            }
        },
        mounted() {
           this.getBtnArray()
           this.isXinCOMD()
           this.getSwiperTitle()
           this.getCity()
           this.street()
           // this.$store.commit('type','barGraph')
           if (this.$store.state.type) {

           }
        },
        components:{
            realTime,
            selectTime,
            selectCity,
            WeatherUtility,
            Weather,
        }
    }
</script>

<style scoped lang="less">
.top_nav_wrap{
  height: 75px;
  width: 100%;
  background: url("../../assets/images/title.png") no-repeat;
  background-size: 100% 100%;
  padding: 18px 0 0 21px;
  box-sizing: border-box;
  position: relative;
}
.top_nav_wrap_left{
  float: left;
}
.big_title{
  color: #fff;
  margin: auto;
  text-align: center;
  font-size: 42px;
  letter-spacing: 4px;
  font-weight: 500;
  // width: 440px;
  width: 600px;
  font-family: 'Pang';
}
.dateSelect{
  color: #fff;
  float: left;
}
.dateSelect>span{
  font-size: 14px;
  font-family: "Arial Black";
  color: #BECBF1;
  margin-left: 15px;
}
.warningNavBtn{
  position: absolute;
  bottom: -5px;
  right: 15px;
  width: 523px;
  height: 40px;
  display: flex;
  align-items: center;
}
.warningNavBtn>div{
  padding: 5px;
  width:112px;
  height:31px;
  background: url("../../assets/images/btn.png")no-repeat;
  background-size: 100% 100%;
  margin-right: 25px;
  font-size:16px;
  color:rgba(153,201,231,1);
  text-align: center;
  line-height: 31px;
  cursor: pointer;
}
.warningNavBtn>.warningNavBtnActive{
  background: url("../../assets/images/btn1.png")no-repeat;
  background-size: 100% 100%;
}
.warningNavBtn>div:last-child{
  margin: 0;
}
.situation_wrap{
  position: absolute;
  top: 0;
  right: 0;
  width: 543px;
  height: 36px;
  display: flex;
  align-items: center;
}
.situation_wrap>img{
  width: 19px;
  height: 16px;
  margin-right: 11px;
}
.situation_swiper{
  width:348px;
  height:17px;
  line-height: 1;
  font-size:16px;
  font-weight:400;
  color:rgba(190,203,241,1);
  overflow: hidden;
  margin-right: 20px;
  position: relative;
}
.situation_swiper>div{
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  white-space: nowrap;
}
.transFrom{
  transition: 18s linear;
  /*animation: goTransFrom 8s linear infinite;*/
}
@keyframes goTransFrom {
  0%{left: 0;visibility: visible;}
  10%{left: 0;visibility: visible;}
  99%{left: -115%;visibility: hidden;}
  100%{left: 0;visibility: hidden;}
}
.situation_more{
  display: flex;
  align-items: center;
  position: relative;
  cursor: pointer;
  padding: 5px;
  border-radius: 4px;
  border: 1px solid #2E78C7;
}
.situation_more>span{
  font-size:14px;
  font-weight:400;
  color:rgba(22,142,239,1);
  line-height: 1;
}
.situation_more>img{
  width: 8px;
  height: 16px;
  margin-left: 9px;
}
.situation_more:before{
  content:'';
  position: absolute;
  top: -4px;
  left: -7px;
  width: 2px;
  height: 26px;
  background: url("../../assets/images/ruaoids.png")no-repeat;
  background-size: 100% 100%;
}
/**
 * @author tanjinfeng
 * @date 2020-09-18
 * @desc 垃圾分类页面
 */
@keyframes flow {
  0% {transform: translateX(0)}
  10% {transform: translateX(0)}
  100% {transform: translateX(-100%)}
}
// 标题增加霓虹光效果
.gc-big-title {
  font-style: italic;
  text-shadow: 0 0 0.2em lightskyblue;
}
// 右边滚动轮播的通知栏
.gc-notice {
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  right: 0;
  top: 7px;
  width: 550px;
  font-family: 'SourceHanSansCN-Regular';
  font-size: 16px;
  // 喇叭图标
  img {
    width: 19px;
    height: 16px;
    margin-right: 11px;
  }
  // 滚动文字
  &__main {
    flex: 1;
    color: #BECBF1;
    position: relative;
    overflow: hidden;
    height: 25px;
    & > div {
      position: absolute;
      top: 0px;
      animation: flow 15s infinite linear;
      display: inline-block;
      white-space: nowrap;
    }
  }
  // 更多按钮
  &__more {
    user-select: none;
    cursor: pointer;
    border-left: 1px solid rgba(72, 159, 248, .4);
    color: #168EEF;
    padding-left: 15px;
    margin: 0 15px;
    position: relative;
    &__btn {
      display: inline-block;
      width: 10px;
      height: 12px;
      background: no-repeat center/100% 100% url(data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBzdGFuZGFsb25lPSJubyI/PjwhRE9DVFlQRSBzdmcgUFVCTElDICItLy9XM0MvL0RURCBTVkcgMS4xLy9FTiIgImh0dHA6Ly93d3cudzMub3JnL0dyYXBoaWNzL1NWRy8xLjEvRFREL3N2ZzExLmR0ZCI+PHN2ZyB0PSIxNjAwNDA2ODMwODIxIiBjbGFzcz0iaWNvbiIgdmlld0JveD0iMCAwIDEwMjQgMTAyNCIgdmVyc2lvbj0iMS4xIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHAtaWQ9IjMwODAiIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIiB3aWR0aD0iMzIiIGhlaWdodD0iMzIiPjxkZWZzPjxzdHlsZSB0eXBlPSJ0ZXh0L2NzcyI+PC9zdHlsZT48L2RlZnM+PHBhdGggZD0iTTc3OS4xODAxMzIgNDczLjIzMjA0NSAzMjIuMzU0NzU1IDE2LjQwNjY2OGMtMjEuNDEzNzA2LTIxLjQxMzcwNi01Ni4xMjExODItMjEuNDEzNzA2LTc3LjUzNDg4NyAwLTIxLjQxMzcwNiAyMS40MTM3MDYtMjEuNDEzNzA2IDU2LjEyMjIwNSAwIDc3LjUzNDg4N2w0MTguMDU3NDIxIDQxOC4wNTc0MjFMMjQ0LjgxOTg2OCA5MzAuMDU3NDIxYy0yMS40MTM3MDYgMjEuNDEzNzA2LTIxLjQxMzcwNiA1Ni4xMjIyMDUgMCA3Ny41MzQ4ODcgMTAuNzA2ODUzIDEwLjcwNjg1MyAyNC43NTk5MTcgMTYuMDU5NzY3IDM4Ljc2Nzk1NSAxNi4wNTk3NjdzMjguMDYxMTAzLTUuMzUzOTM4IDM4Ljc2Nzk1NS0xNi4wNTk3NjdMNzc5LjE4MDEzMiA1NTAuNzY3OTU1QzgwMC41OTM4MzcgNTI5LjM1NDI1IDgwMC41OTM4MzcgNDk0LjY0NTc1IDc3OS4xODAxMzIgNDczLjIzMjA0NXoiIHAtaWQ9IjMwODEiIGZpbGw9IiMxNjhFRUYiPjwvcGF0aD48L3N2Zz4=);
    }
    &:hover {
      color: lightskyblue;
      .gc-notice__more__btn {
        background-image: url(data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBzdGFuZGFsb25lPSJubyI/PjwhRE9DVFlQRSBzdmcgUFVCTElDICItLy9XM0MvL0RURCBTVkcgMS4xLy9FTiIgImh0dHA6Ly93d3cudzMub3JnL0dyYXBoaWNzL1NWRy8xLjEvRFREL3N2ZzExLmR0ZCI+PHN2ZyB0PSIxNjAwNDA2ODMwODIxIiBjbGFzcz0iaWNvbiIgdmlld0JveD0iMCAwIDEwMjQgMTAyNCIgdmVyc2lvbj0iMS4xIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHAtaWQ9IjMwODAiIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIiB3aWR0aD0iMzIiIGhlaWdodD0iMzIiPjxkZWZzPjxzdHlsZSB0eXBlPSJ0ZXh0L2NzcyI+PC9zdHlsZT48L2RlZnM+PHBhdGggZD0iTTc3OS4xODAxMzIgNDczLjIzMjA0NSAzMjIuMzU0NzU1IDE2LjQwNjY2OGMtMjEuNDEzNzA2LTIxLjQxMzcwNi01Ni4xMjExODItMjEuNDEzNzA2LTc3LjUzNDg4NyAwLTIxLjQxMzcwNiAyMS40MTM3MDYtMjEuNDEzNzA2IDU2LjEyMjIwNSAwIDc3LjUzNDg4N2w0MTguMDU3NDIxIDQxOC4wNTc0MjFMMjQ0LjgxOTg2OCA5MzAuMDU3NDIxYy0yMS40MTM3MDYgMjEuNDEzNzA2LTIxLjQxMzcwNiA1Ni4xMjIyMDUgMCA3Ny41MzQ4ODcgMTAuNzA2ODUzIDEwLjcwNjg1MyAyNC43NTk5MTcgMTYuMDU5NzY3IDM4Ljc2Nzk1NSAxNi4wNTk3NjdzMjguMDYxMTAzLTUuMzUzOTM4IDM4Ljc2Nzk1NS0xNi4wNTk3NjdMNzc5LjE4MDEzMiA1NTAuNzY3OTU1QzgwMC41OTM4MzcgNTI5LjM1NDI1IDgwMC41OTM4MzcgNDk0LjY0NTc1IDc3OS4xODAxMzIgNDczLjIzMjA0NXoiIHAtaWQ9IjMwODEiIGZpbGw9IiM4N2NlZmEiPjwvcGF0aD48L3N2Zz4=);
      }
    }
  }
}
</style>
