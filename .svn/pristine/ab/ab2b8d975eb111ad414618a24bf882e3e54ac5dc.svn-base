<template>
    <div class="right_content_top_right_wrap">
<!--      上-->
      <div class="right_content_top_right_top_wrap">

        <div class="right_top_wrap" v-for="(item, index) in allmyChartData" :key="index">
          <div class="Charts_wrap">
            <div :id="'myChart'+index" class="Charts"  ></div>
            <div class="ChartsDataWrap">
              <div class="ChartsDataWrapDiv" v-for="(lists, indexss) in item " :key="indexss">
                <div :class="'Colour'+(indexss % 10 + 1)"></div>
                {{lists.name}}
              </div>
            </div>
          </div>

          <div class="right_top_target_wrap" v-if="indexs<3" v-for="(list, indexs) in item " :key="indexs">
            <div class="everything">
              <div class="everythingdiv" :class="'Colour'+(indexs % 10 + 1)" ></div>
              <span class="everythingOne">{{list.name}}</span>
            </div>

          </div>
        </div>



      </div>

    </div>
</template>

<script>
  import allUrl from "../../../assets/api/allApiUrl";
    export default {
        name: "right_content_top_right",
        data () {
            return{
                myChart:'',
                allData:['','','',''],
                allmyChartData:[],
                piechartTitle: '车辆预警智能',
            }
        },
        methods:{
            getSchoolAndXq (type) {
                let data = allUrl.selectGdblSchoolAndCompany,s={params:{
                        platformTypeId:type,
                        startTime:this.$store.state.startTime,
                        endTime:this.$store.state.endTime
                    }}
                Object.assign(data,s) // 合并对象, 只是把参数搞成对象形式 {}
                return this.apix(data)
                    // .then((res)=>{
                    //   return resolve(res)
                    //     // if (type == 5) {
                    //     // //    物业

                    //     // }else if (type == 6) {
                    //     // //    小区
                    //     //     this.allData[2]= res.data
                    //     //     this.percentage(this.allData[2])
                    //     // }
                    // })
                    // .catch((err)=>{
                    //     console.log(err)
                    // })
            },
            gethuamnData () {
                let data = allUrl.selectGdblhuman,s={params:{
                        startTime:this.$store.state.startTime,
                        endTime:this.$store.state.endTime
                    }}
                Object.assign(data,s) // 合并对象, 只是把参数搞成对象形式 {}
                return this.apix(data)
                // this.apix(data)
                //     .then((res)=>{
                //       return resolve(res)
                //         // this.allData[0]= res.data
                //         // this.percentage(this.allData[0])
                //     })
                //     .catch((err)=>{
                //         console.log(err)
                //     })
            },
            getCarData () {
                let data = allUrl.selectGdblcar,s={params:{
                        startTime:this.$store.state.startTime,
                        endTime:this.$store.state.endTime
                    }}
                Object.assign(data,s) // 合并对象, 只是把参数搞成对象形式 {}
                return this.apix(data)
                    // .then((res)=>{
                    //   return resolve(res)
                    //     // this.allData[1]= res.data
                    //     // this.percentage(this.allData[1])
                    //     // this.allmyChartData = this.allData
                    // })
                    // .catch((err)=>{
                    //     console.log(err)
                    // })
            },
            RenderTheChart (data) {
                const _that = this
                data.forEach(function (ele,index) {
                    setTimeout(()=>{
                        if (index == 0) {
                            _that.drawLine('myChart'+index , ele,'人脸识别智能')
                        }else if (index == 1) {
                            _that.drawLine('myChart'+index , ele, _that.piechartTitle)
                        }else if (index == 2) {
                            _that.drawLine('myChart'+index , ele,'校园及周边安全')
                        }else if (index ==3) {
                            _that.drawLine('myChart'+index , ele,'物业小区安全')
                        }
                    },10)
                })
            },
            drawLine (eleName,data,text) {
                console.log(eleName,data,text)
                let that = this
                // 基于准备好的dom，初始化echarts实例
                let ele = that.$echarts.init(document.getElementById(eleName))
                let obj = {
                    title: {
                        // text: '某站点用户访问来源',
                        text,
                        x: 'center',
                        textStyle:{
                            color:'#fff',
                            fontWeight: 400,
                            fontSize: 16
                        }
                    },
                    series: [
                        {
                            type: 'pie',
                            radius: ['49.2%', '50%'],
                            center:['50%','55%'],
                            avoidLabelOverlap: false,
                            hoverAnimation:false,
                            silent: true,
                            data: [{value: 335, name: ''}],
                            labelLine: {show: false},
                            itemStyle: {
                                emphasis: {
                                    shadowBlur: 10,
                                    shadowOffsetX: 0,
                                    shadowColor: 'rgba(0, 0, 0, 0.5)'
                                },
                                normal:{
                                    color:function(params) {
                                        //自定义颜色
                                        var colorList = ['#2F45AA'];
                                        return colorList[params.dataIndex]
                                    }
                                }
                            }
                        },
                        {
                            name: '访问来源',
                            type: 'pie',
                            radius: ['50%', '70%'],
                            avoidLabelOverlap: false,
                            // hoverAnimation:false,
                            // silent: true,
                            center:['50%','55%'],
                            label: {
                                normal: {
                                    show: false,
                                    position: 'center'
                                },
                                emphasis: {
                                    show: true,
                                    textStyle: {
                                        fontSize: 14,
                                        fontWeight: 'bold',
                                        color:'#5B9DDF'
                                    }
                                }
                            },
                            labelLine: {
                                normal: {
                                    show: true
                                }
                            },
                            data,
                            itemStyle: {
                                emphasis: {
                                    shadowBlur: 10,
                                    shadowOffsetX: 0,
                                    shadowColor: 'rgba(0, 0, 0, 0.5)'
                                },
                                normal: {
                                    color: function(params) {
                                        var colorList = [
                                            {c1: 'rgba(16, 134, 250, 0.55)',c2:'rgba(4, 157, 255, 1)'},
                                            {c1: 'rgba(137, 234, 98, 0.55)',c2:'rgba(163, 229, 71, 1)'},
                                            {c1: 'rgba(83, 191, 249, 0.55)',c2:'rgba(131, 217, 255, 1)' },
                                            {c1: 'rgba(252, 204, 107, 0.55)',c2:'rgba(252, 215, 92, 1)'},
                                            {c1: 'rgba(90, 211, 253, 0.55)',c2:'rgba(68, 129, 235, 1)' },
                                            {c1: 'rgba(255, 140, 121, 0.55)',c2:'rgba(228, 153, 139, 1)'},
                                            {c1: 'rgba(130, 255, 204, 0.55)',c2:'rgba(70, 208, 237, 1)'},
                                            {c1: 'rgba(237, 139, 255, 0.55)',c2: 'rgba(209, 67, 201, 1)'},
                                            {c1: 'rgba(255, 207, 118, 0.55)',c2:'rgba(254, 176, 10, 1)' },
                                            {c1: 'rgba(254, 152, 61, 0.55)',c2: 'rgba(254, 102, 10, 1)'},
                                            {c1: 'rgba(154, 152, 61, 0.55)',c2: 'rgba(154, 102, 10, 1)'},
                                            {c1: 'rgba(254, 52, 61, 0.55)',c2: 'rgba(254, 52, 10, 1)'}
                                        ]
                                        return new that.$echarts.graphic.LinearGradient(1, 0, 0, 0, [{ //颜色渐变函数 前四个参数分别表示四个位置依次为左、下、右、上
                                            offset: 0,
                                            color: colorList[params.dataIndex % 10].c1
                                        }, {
                                            offset: 1,
                                            color: colorList[params.dataIndex % 10].c2
                                        }])
                                    },
                                    label:{
                                        show: true,
                                        formatter: '{d}%'
                                    },
                                    labelLine :{show:true}
                              }
                            }
                        }
                    ]
                }
                // 绘制图表
                ele.setOption(obj);
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
            },
            /**
             * @method
             * @desc 初始化，请求数据，内容是原本mounted中的，提取出来作为一个方法，父组件日期更改时调用
             * @author tanjinfeng
             * @date 2020-10-14
             */
            init() {
              const _that = this
              Promise.all([this.getSchoolAndXq(5),this.getSchoolAndXq(6),this.gethuamnData(),this.getCarData(), this.getPiechartTitle()]).then((res)=>{
                let all = res
                this.allData[3]= all[0].data
                this.percentage(this.allData[3])
                this.allData[2]= all[1].data
                this.percentage(this.allData[2])
                this.allData[0]= all[2].data
                this.percentage(this.allData[0])
                this.allData[1]= all[3].data
                this.percentage(this.allData[1])
                this.allmyChartData = this.allData
                _that.RenderTheChart(_that.allData)
                // console.log(res)
                _that.$forceUpdate()
              }).catch((err)=>{
                console.log(err)
              })
            },

            /**
             * @author tanjinfeng
             * @date 2020-12-15
             * @description 获取饼图标题
             */
            getPiechartTitle() {
              return new Promise((resolve) => {
                this.apix(`${window.SITE_CONFIG.baseUrl}/sys/config/infoByKey?key=VIEW_CITY_PLATFORM`)
                  .then(res => {
                    let piechartTitle = '车辆预警智能';
                    if (res.code === 0 && typeof res.config.paramValue === 'string') {
                      const platformIdSet = res.config.paramValue.split(',');
                      if (platformIdSet.includes(String(this.$store.state.platformId))) {
                        piechartTitle = '违规预警智能';
                      }
                    }
                    this.piechartTitle = piechartTitle;
                    resolve();
                  });
              })
            },
        },
        mounted () {
          /*
            const _that = this
            Promise.all([this.getSchoolAndXq(5),this.getSchoolAndXq(6),this.gethuamnData(),this.getCarData()]).then((res)=>{
              let all = res
              this.allData[3]= all[0].data
              this.percentage(this.allData[3])
              this.allData[2]= all[1].data
              this.percentage(this.allData[2])
              this.allData[0]= all[2].data
              this.percentage(this.allData[0])
              this.allData[1]= all[3].data
              this.percentage(this.allData[1])
              this.allmyChartData = this.allData
              _that.RenderTheChart(_that.allData)
              // console.log(res)
            }).catch((err)=>{
              console.log(err)
            })
          */
          this.init();
        }
    }
</script>

<style scoped>
.right_content_top_right_wrap{
  width: 100%;
  height: 100%;
}
.right_content_top_right_top_wrap{
  flex: 1;
  display: flex;
  flex-wrap: wrap;
}
.right_content_top_right_top_wrap>div{
  width: 184px;
  margin-bottom: 20px;
}
.right_top_wrap{
  width: 100%;
  display: flex;
  flex-direction: column;
  position: relative;
}
.right_top_target_wrap>div:last-child{
  margin: 0;
}
.everything{
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  padding-left: 35px;
  margin-bottom: 13px;
  align-items: center;
}
.everythingdiv{
  width: 18px;
  height: 18px;
  margin-right: 2px;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
}
.everythingOne{
  color: #9AC9E7;
  font-size: 16px;
  margin: 0 5px;
}
.everythingTwo{
  color: #FFFFFF;
  font-size: 16px;
}
.Charts{
  width: 100%;
  height: 180px;
  position: relative;
}
.ChartsDataWrap{
  width: 230px;
  max-height: 500px;
  overflow: auto;
  position: absolute;
  top: 180px;
  left: -20px;
  right: 0;
  margin: auto;
  z-index: 999;
  display: none;
  background: url("../../../assets/images/hoverKK.png")no-repeat;
  background-size: 100% 100%;
  padding: 10px;
  box-sizing: border-box;
}
.ChartsDataWrapDiv>div{
  width: 18px;
  height: 18px;
  margin-right: 10px;
}
.ChartsDataWrapDiv{
  color: rgba(154, 201, 231, 1);
  padding: 5px 0;
  display: flex;
  align-items: center;
}
.Charts_wrap:hover .ChartsDataWrap{
  display: block;
}
.Colour1{
  background: url("../../../assets/images/1.png")no-repeat;
  background-size: 100% 100%;
}
.Colour2{
  background: url("../../../assets/images/2.png")no-repeat;
  background-size: 100% 100%;
}
.Colour3{
  background: url("../../../assets/images/3.png")no-repeat;
  background-size: 100% 100%;
}
.Colour4{
  background: url("../../../assets/images/4.png")no-repeat;
  background-size: 100% 100%;
}
.Colour5{
  background: url("../../../assets/images/5.png")no-repeat;
  background-size: 100% 100%;
}
.Colour6{
  background: url("../../../assets/images/6.png")no-repeat;
  background-size: 100% 100%;
}
.Colour7{
  background: url("../../../assets/images/7.png")no-repeat;
  background-size: 100% 100%;
}
.Colour8{
  background: url("../../../assets/images/8.png")no-repeat;
  background-size: 100% 100%;
}
.Colour9{
  background: url("../../../assets/images/9.png")no-repeat;
  background-size: 100% 100%;
}
.Colour10{
  background: url("../../../assets/images/10.png")no-repeat;
  background-size: 100% 100%;
}


</style>
