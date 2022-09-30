<template>
    <div class="chart_Wrap">
      <div class="underlineTitle">{{title}}</div>
      <div class="chart_content">
        <div id="chart"></div>
        <div class="numerical_wrap">

          <div class="numerical_list_wrap" v-for="(item, index) in data" :key="index" >
            <div :class="'Colour'+(index+1)" :style="{ [`--color_${ index + 1 }`]: colorList[index] }"></div>
            <p>{{item.name}}</p>
            <span>{{item.percent}}%</span>
          </div>

        </div>
      </div>
    </div>
</template>

<script>
    export default {
        name: "chart",
        data () {
            return{
               title:'',
               data:[{name:'',percent:''}],
               colorList: ['red','red','red','red','red','red','red','red','red','red','red','red','red','red','red','red','red','red','red','red',]
            }
        },
        mounted() {

        },
        methods:{
            init (data,title) {
              /**
               * @author tanjinfeng
               * @date 2020-11-26
               * @description 初始化随机颜色
               */
              (arr => {
                let colorList = []
                arr.forEach(e => {
                  colorList.push(`rgb(${ parseInt(Math.random() * 255, 10)}, ${ parseInt(Math.random() * 255, 10)}, ${ parseInt(Math.random() * 255, 10)})`)
                })
                this.colorList = colorList
              })(data)

                this.title = title
                this.data = data
                this.percentage(this.data)
                this.drawLine('chart',this.data,'')
            },
            drawLine (eleName,data,text) {
                let that = this
                // 基于准备好的dom，初始化echarts实例
                let ele = that.$echarts.init(document.getElementById(eleName))
                let obj = {
                  color: this.colorList,
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
                        // {
                        //     type: 'pie',
                        //     radius: ['49.2%', '50%'],
                        //     center:['50%','55%'],
                        //     avoidLabelOverlap: false,
                        //     hoverAnimation:false,
                        //     silent: true,
                        //     data: [{value: 335, name: ''}],
                        //     labelLine: {show: false},
                        //     itemStyle: {
                        //         emphasis: {
                        //             shadowBlur: 10,
                        //             shadowOffsetX: 0,
                        //             shadowColor: 'rgba(0, 0, 0, 0.5)'
                        //         },
                        //         normal:{
                        //             // color:function(params) {
                        //             //     //自定义颜色
                        //             //     var colorList = ['#2F45AA'];
                        //             //     return colorList[params.dataIndex]
                        //             // }
                        //         }
                        //     }
                        // },
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
                                        fontSize: 20,
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
                                    // color: function(params) {
                                    //     var colorList = [
                                    //         {c1: 'rgba(16, 134, 250, 0.55)',c2:'rgba(4, 157, 255, 1)'},
                                    //         {c1: 'rgba(137, 234, 98, 0.55)',c2:'rgba(163, 229, 71, 1)'},
                                    //         {c1: 'rgba(83, 191, 249, 0.55)',c2:'rgba(131, 217, 255, 1)' },
                                    //         {c1: 'rgba(252, 204, 107, 0.55)',c2:'rgba(252, 215, 92, 1)'},
                                    //         {c1: 'rgba(90, 211, 253, 0.55)',c2:'rgba(68, 129, 235, 1)' },
                                    //         {c1: 'rgba(255, 140, 121, 0.55)',c2:'rgba(228, 153, 139, 1)'},
                                    //         {c1: 'rgba(130, 255, 204, 0.55)',c2:'rgba(70, 208, 237, 1)'},
                                    //         {c1: 'rgba(237, 139, 255, 0.55)',c2: 'rgba(209, 67, 201, 1)'},
                                    //         {c1: 'rgba(255, 207, 118, 0.55)',c2:'rgba(254, 176, 10, 1)' },
                                    //         {c1: 'rgba(254, 152, 61, 0.55)',c2: 'rgba(254, 102, 10, 1)'}
                                    //     ]
                                    //     return new that.$echarts.graphic.LinearGradient(1, 0, 0, 0, [{ //颜色渐变函数 前四个参数分别表示四个位置依次为左、下、右、上
                                    //         offset: 0,
                                    //         color: colorList[params.dataIndex].c1
                                    //     }, {
                                    //         offset: 1,
                                    //         color: colorList[params.dataIndex].c2
                                    //     }])
                                    // },
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
                  if(ele.value !=0 ){
                    if(index == data.length-1){
                      ele.percent = Math.round((100 - count)*100)/100
                    }else {
                      ele.percent = Math.round((ele.value/values)*10000)/100
                      count += ele.percent
                    }
                  }else {
                    ele.percent = 0
                  }
                })
            }
        }
    }
</script>

<style scoped lang="scss">
.chart_Wrap>.underlineTitle{
  background: url("../../../assets/images/xs.png")no-repeat;
  background-position: 14px 0;
  margin-bottom: 6px;
}
.chart_content{
  display: flex;
  padding: 0 10px;
  box-sizing: border-box;
}
.chart_content>div:nth-child(1){
  width: 200px;
  height: 200px;
}
.chart_content>div:nth-child(2){
  flex: 1;
}
.numerical_wrap{

}
.numerical_list_wrap{
  display: flex;
  align-items: center;
  margin-bottom: 6px;
}
.numerical_list_wrap>div{
  width:18px;
  height:18px;
  margin-right: 7px;
}
.numerical_list_wrap>p{
  color:#9AC9E7;
  font-size: 16px;
  margin: 0;
  margin-right: 4px;
}
.numerical_list_wrap>span{
  font-size:16px;
  font-weight:400;
  color:rgba(255,255,255,1);
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

/*
 * @author tanjinfeng
 * @date 2020-11-26
 * @description 样式修改
 */
.numerical_wrap {
  max-height: 220px;
  overflow-y: auto;
  &::-webkit-scrollbar { width: 0; }
}

.numerical_list_wrap {
  & > div:first-child {
    flex-shrink: 0;
    width: 18px;
    height: 18px;
    border-radius: 20px;
    background: 0;
    position: relative;
    // 中心圆点
    &:after {
      content: '';
      display: block;
      width: 6px;
      height: 6px;
      border-radius: 6px;
      position: absolute;
      left: 6px;
      top: 6px;
    }
  }

  @for $i from 1 through 100 {
    .Colour#{$i} {
      border: 2px solid var(--color_#{$i});
      &::after {
        background: var(--color_#{$i});
      }
    }
  }
}

</style>
