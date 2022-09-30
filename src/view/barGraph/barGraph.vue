<template>
  <div class="barGraph_wrap">
    <div class="barGraph_title">
      <h5>{{numx}}</h5>
      <p>当前采集总数</p>
    </div>

    <div class="xsoo" >
      <img class="xs" src="../../assets/images/db.png" alt="">
      <img class="syzs" @click="syz" src="../../assets/images/lefts.png" alt="">
      <img class="xyzs" @click="xyz" src="../../assets/images/rights.png" alt="">
      <div id="graph"></div>
    </div>

  </div>
</template>

<script>
import allUrl from "../../assets/api/allApiUrl";
  export default{
    name:'barGraph',
    data(){
      return{
        index:0,
        num:0,
        numx:0,
        allData:[],
        allnamedata:[]
      }
    },
    methods:{
      draLine (numdata,namedata) {
            const _that = this
            let ele = this.$echarts.init(document.getElementById('graph'))
            let option = {
                grid: {
                    left: '3%',
                    right: '4%',
                    bottom: '3%',
                    containLabel: true
                },
            xAxis: [
                {
                    type: 'category',
                    position:'bottom',axisTick: {
                        show:false, //隐藏坐标轴的刻度
                    },
                    axisLabel: {
                      rotate:40,
                      interval:0,
                      textStyle:{
                        color:'#99C9E7',  //坐标的字体颜色
                        fontSize: '14',//字体大小
                      },
                    },
                    axisLine:{
                      show:false //隐藏坐标轴
                    },
                }
            ],
            xAxis: [
                {
                    type: 'category',
                    position:'bottom',
                    offset:15,
                        data: namedata,
                        axisTick: {
                            show:false, //隐藏坐标轴的刻度
                        },
                        axisLabel: {
                          rotate:40,
                          interval:0,
                          textStyle:{
                            color:'#99C9E7',  //坐标的字体颜色
                            fontSize: '18',//字体大小
                          },
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
                            fontSize: '21',//字体大小
                          },
                        }
                    },

                ],
                series: [
                    {
                        name: '',
                        type: 'bar',
                        barWidth: '47',
                        barMaxWidth: '47',
                        label: {
                            show: true,
                            position: 'top',
                            color:'#4fa9fe',
                            fontSize:30
                        },
                        data: numdata,
                                itemStyle: {
                        normal: {
                            color: new _that.$echarts.graphic.LinearGradient(
                                0, 0, 0, 1,
                                [
                                    {offset: 0, color: '#73D7E4'},              //柱图渐变色
                                    {offset: 1, color: '#4B8DBF'},                   //柱图渐变色
                                ]
                            )
                        },
                        emphasis: {
                            color: new _that.$echarts.graphic.LinearGradient(
                                0, 0, 0, 1,
                                [
                                    {offset: 0, color: '#73D7E4'},                  //柱图高亮渐变色
                                    {offset: 1, color: '#4B8DBF'}                   //柱图高亮渐变色
                                ]
                            )
                        }
                    }
                    }
                ]
            };
            ele.setOption(option);
          },
      csf () {
        let data = allUrl.countSumByPlatform,s={params:{}}
        Object.assign(data,s) // 合并对象, 只是把参数搞成对象形式 {}
        this.apix(data)
        .then((res)=>{
          if (res.data.countByPlatform.length!=0){
            this.numx = res.data.sum
            let allData = res.data.countByPlatform
            let numdata=[],namedata=[]
            allData.forEach(ele=>{
              numdata.push(ele.count)
              namedata.push(ele.platformString)
            })
            this.num = numdata.length/10
            let x = 0
            for (let i=0;i<this.num;i++) {
              this.allData.push(numdata.slice(x,x+10))
              this.allnamedata.push(namedata.slice(x,x+10))
              x+=10
            }
            this.draLine(this.allData[0],this.allnamedata[0])
          }

        })
        .catch((err)=>{
            console.log(err)
        })
      },
      title () {
        document.getElementsByClassName('big_title')[0].innerText = '沙河市场数据采集系统'
      },
      syz () {
        if (this.index<=0) {

        }else {
          this.index-=1
          this.draLine(this.allData[this.index],this.allnamedata[this.index])
        }
      },
      xyz () {
        if (this.index+1>=this.num) {

        }else {
          this.index+=1
          this.draLine(this.allData[this.index],this.allnamedata[this.index])
        }
      }
    },
    mounted(){
      const _that = this
      this.title()
      this.csf()
      setInterval(()=>{
        _that.csf()
      },60000)
    }
  }



</script>

<style scoped>
.barGraph_wrap{
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  padding-bottom: 80px;
  box-sizing: border-box;
  overflow: hidden;
  position: relative;
}
.barGraph_title{
  margin: auto;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-top: 80px;
}
.barGraph_title>h5{
  background-clip: text;
  -webkit-background-clip: text;
  text-align: center;
  display: inline-block;
  -webkit-text-fill-color: transparent;
  font-weight: bold;
  font-family: 'DCM';
  font-size: 65px;
  color: #0BA360;
  margin: 0;
  background-image: -webkit-gradient(linear, 0 0, 0 bottom, from(#9D8CFC), to(#53E0F1));
}
.barGraph_title>p{
  font-size:31px;
  font-weight:500;
  color:rgba(255,255,255,1);
  margin: 0;
}
.xsoo{
  width:1400px;
  flex-grow: 1;
  margin: auto;
  display: flex;
}
.xsoo>.xs{
  position: absolute;
  top: 595px;
  left: 0;
  height: 330px;
  width:100vw;
  opacity: .8;
}
#graph{
  width: 100%;
  flex-grow: 1;
  min-height: 520px;
  /* padding-top: 37px; */
  box-sizing: border-box;
}
.xsoo>.syzs{
  position: absolute;
  width: 100px;
  height: 100px;
  left: 120px;
  top: 0;
  bottom: 0;
  margin: auto;
  cursor: pointer;
}
.xsoo>.xyzs{
  position: absolute;
  width: 100px;
  height: 100px;
  right: 120px;
  top: 0;
  bottom: 0;
  margin: auto;
  cursor: pointer;
}


</style>
