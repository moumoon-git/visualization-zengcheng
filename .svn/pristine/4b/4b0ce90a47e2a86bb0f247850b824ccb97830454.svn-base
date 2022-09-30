<template>
    <div class="histogram_Wrap">
      <div id="echartsHistogram"></div>
    </div>
</template>

<script>
    export default {
        name: "histogram",
        data () {
          return{
            data:[]
          }
        },
      methods:{
          init (data) {
            console.log(data)
            this.data = data
            this.drwHistogram('echartsHistogram',data)
          },
          drwHistogram (eleName,data) {
            const _that = this
            let numData = [],nameData=[]
            if (data.length!=0) {
              data.forEach((ele,index)=>{
                if (index<10) {
                  numData.push(ele.count)
                  nameData.push(ele.name)
                }
              })
            }
            let ele = this.$echarts.init(document.getElementById(eleName))
            let option = {
                tooltip: {
                    trigger: 'axis',
                    axisPointer: {            // 坐标轴指示器，坐标轴触发有效
                        type: 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
                    }
                },
                grid: {
                    top:'8%',
                    left: '3%',
                    right: '4%',
                    bottom: '3%',
                    containLabel: true
                },
                xAxis: [
                {
                    type: 'category',
                    position:'bottom',
                    offset:15,
                        data: nameData,
                        axisTick: {
                            show:false, //隐藏坐标轴的刻度
                        },
                        axisLabel: {
                          interval:0,
                          textStyle:{
                            color:'#99C9E7',  //坐标的字体颜色
                            fontSize: '12',//字体大小
                          },
                        formatter: function(val) {
                            var strs = val.split(''); //字符串数组
                            var str = ''
                            for(var i = 0, s; s = strs[i++];) { //遍历字符串数组
                                str += s;
                                if(!(i % 2)) str += '\n'; //按需要求余
                            }
                            return str
                            }
                        },
                        axisLine:{
                          show:false //隐藏坐标轴
                        },
                    }
                ],
                yAxis: [
                    {
                        type: 'value',
                        axisLine:{
                          show:false, //隐藏坐标轴
                          lineStyle:{
                            color:'#2C5CA9',  //坐标轴的颜色
                          }
                        },
                        //设置网格线颜色
                        splitLine: {
                            show: true,
                            lineStyle:{
                               color: ['rgba(255,255,255,.1)'],
                               width: 1,
                               type: 'solid'
                          }
                    　　},
                        axisTick:{
                          show:false, //隐藏坐标轴的刻度
                        },
                        axisLabel: {
                          textStyle:{
                            color:'#99C9E7',  //坐标的字体颜色
                            fontSize: '12',//字体大小
                          },
                        }
                    },

                ],
                series: [
                    {
                        name: '',
                        type: 'bar',
                        barWidth: '25',
                        barMaxWidth: '25',
                        label: {
                            show: true,
                            position: 'top',
                            color:'#4fa9fe',
                            fontSize:12
                        },
                        data: numData,
                        itemStyle: {
                          normal: {
                              color: new _that.$echarts.graphic.LinearGradient(
                                  0, 0, 0, 1,
                                  [
                                      {offset: 0, color: '#4489E6'},              //柱图渐变色
                                      {offset: 1, color: '#64C8CA'},                   //柱图渐变色
                                  ]
                              )
                          }
                      }
                    }
                ]
            };
            ele.setOption(option);
          }
      },
      mounted() {

      }
    }
</script>

<style scoped>
.histogram_Wrap{
  width: 100%;
  height: 100%;
}
.histogram_Wrap>div{
  width: 100%;
  height: 100%;
}
</style>
