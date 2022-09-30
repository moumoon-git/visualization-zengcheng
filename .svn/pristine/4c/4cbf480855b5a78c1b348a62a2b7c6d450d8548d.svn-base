<template>
  <div style="display: flex">
    <div class='wrapper' v-for="(item, index) in listData" :key="index" >
      <div class="inner " :class="'border'+(index+1)" >
        <div class='chart' :id="'charts'+(index+1)"></div>
        <div class="btmcl">处理率</div>
      </div>
      <div class="btm " :class="'csColor'+(index+1)" >{{item.deCount}} / {{item.allCount}}件</div>
      <div class="btmt">{{item.name}}</div>
    </div>
  </div>
</template>

<script>
    export default {
        name:'cs',
        data () {
            return {
                listData:[{deCount:0,allCount:0,name:''}],
                color:['#67BDFF','#72B3B2','#A678F3','#A678F3','#A678F3']
            }
        },
        mounted () {
            // for (let i=0;i<5;i++){
            //     this.drawChart('charts'+(i+1),this.color[i])
            // }
        },
        methods: {
            init (data) {
              let _that = this
               _that.listData = data
              setTimeout(()=>{
                data.forEach((ele,index)=>{
                  let data = [0,0]
                  if (ele.deCount && ele.allCount) {
                    data = [(ele.deCount/ele.allCount).toFixed(2) , (ele.deCount/ele.allCount).toFixed(2 ) ]
                  }
                  _that.drawChart('charts'+(index+1),_that.color[index],data)
                })
              },10)
            },
            drawChart (eleName,color,data) {
                // 基于准备好的dom，初始化echarts实例
                let chart = this.$echarts.init(document.getElementById(eleName))
                // 绘制图表
                chart.setOption({
                    series: [{
                        type: 'liquidFill',
                        data,
                        // data: [0.07, 0.07],
                        radius: '100%',
                        outline: {
                            show: false
                        },
                        animationDuration: 100,
                        backgroundStyle: {
                            borderColor: '#fff',
                            borderWidth: 1,
                            shadowColor: 'rgba(0, 0, 0, 0.4)',
                            shadowBlur: 20,
                            color, // 水球未到的背景颜色
                            opacity: 0.1
                        },
                        itemStyle: {
                            color, // 水球显示的背景颜色
                            opacity: 1, // 波浪的透明度
                            shadowBlur: 10 // 波浪的阴影范围
                        },
                        label: {
                            normal: {
                                position: ['50%', '50%'],
                                textStyle: {
                                    fontSize: 22,
                                    color: '#fff'
                                }
                            }
                        }
                    }]
                })
            }
        }
    }
</script>

<style scoped>
.wrapper {
  width: 100%;
  min-width: 123px;
  position: relative;
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
}
.inner {
  position: relative;
  width:75px;
  height:75px;
  border-radius: 50%;
  background-size: 100% 100%;
  margin: auto;
}
.border1{
  border: 2px solid #799CE9;
}
.border2{
  border: 2px solid #72B3B2;
}
.border3{
  border: 2px solid #A678F3;
}
.chart {
    width:75px;
    height:75px;
    background-size: 80% 80%;
  }
.btm {
    height: 25px;
    background-size: 100% 100%;
    margin: 12px auto 9px;
    text-align: center;
    color: #fff;
  }
.btmcl{
    display: flex;
    justify-content: center;
    position: absolute;
    left: 0;
    right: 0;
    margin: auto;
    top: 47px;
    font-size:12px;
    color:rgba(214,225,245,1);
  }
.btmt{
  height:24px;
  font-size:16px;
  font-weight:400;
  color:rgba(199,214,236,1);
  background: url("../../../assets/images/ss.png")no-repeat;
  background-size: 100% 100%;
  text-align: center;
  line-height: 24px;
  padding: 1px 5px;
  margin: auto;
}
.csColor1{
  color: #67BDFF;
}
.csColor2{
  color: #72B3B2;
}
.csColor3{
  color: #A678F3;
}
</style>
