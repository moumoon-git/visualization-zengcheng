<template>
  <div class="OutbreakBottomRight_top">

    <div class="OutbreakBottomRight_top_top" >
      <div class="blueTitleTow">疫情态势</div>
      <div class="OutbreakBottomRight_top_top_Btn">
        <span v-for="(item, index) in topData" :class="item.flag?'spanActive':''" @click="changeSpan(item)" >{{item.name}}</span>
      </div>
      <div class="OutbreakBottomRight_top_top_Line" id="OutbreakBottomRight_top_top_Lines">

      </div>
    </div>

    <ul class="OutbreakBottomRight_top_bottom">
       <li class="liActive">确诊病例</li>
       <li>疑似病例</li>
       <li>确诊病例</li>
       <li>确诊病例</li>
       <li>确诊病例</li>
    </ul>


  </div>
</template>

<script>
  export default{
    name:'OutbreakBottomRight_top',
    data () {
      return {
        iDName:"",
         topData:[
           {name:'累计',flag:true},
           {name:'新增',flag:false}
           ]
      }
    },
    methods:{
      changeSpan (item) {
        this.topData.forEach(ele=>{
          ele.flag = false
        })
        item.flag = true
      },
      drwLine () {
        let ele = this.$echarts.init(document.getElementById(this.iDName))
        let option = {
              tooltip: {
                trigger: "axis",
                backgroundColor:'raba(0,0,0,0)',
                formatter: function(params, ticket, callback) {
                  // console.log(params, "");
                  let res = ''
                  params.forEach(ele=>{
                    res += `<div style='background:rgba(0,0,0,.6);border-radius:2px;padding:3px 9px;'>
                             <div>${ele.name}</div>
                             <div>新增确诊 ${ele.value}</div>
                           </div>`;
                  })
                  return res;
                },
                extraCssText: "z-index:4"
              },
              grid: {
                  x:  50,
                  y: 38,
                  x2: 31,
                  y2: 34,
              },
              xAxis: {
                  type: 'category',
                  boundaryGap: false,
                   data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
                  axisLine:{
                    show:false, //隐藏坐标轴
                    lineStyle:{
                      color:'#2C5CA9',  //坐标轴的颜色
                    },
                  },
                  axisTick:{
                    show:false, //隐藏坐标轴的刻度
                  },
              },
              yAxis: {
                  splitLine: {
                    show: true,
                    lineStyle:{
                      color: ['rgba(130,171,205,0.2)'],
                      width: 1,
                      type: 'solid'
                    }
                  },
                  axisLabel: {
                    textStyle:{
                      color:'#2C5CA9',  //坐标的字体颜色
                    },
                  },
                  axisLine:{
                    show:false, //隐藏坐标轴
                    lineStyle:{
                      color:'#00eeff',  //坐标轴的颜色
                    },
                  },
                  axisTick:{
                    show:false, //隐藏坐标轴的刻度
                  },
              },
              series: [{
                  data: [820, 932, 901, 934, 1290, 1330, 1320],
                  type: 'line',
                  smooth: true,
                  itemStyle: {
                    normal: {
                      color: '#2167FF', //改变折线点的颜色
                      borderColor : '#2167FF',
                      borderWidth : 4,
                      lineStyle: {
                        color: '#4D86FF' //改变折线颜色
                      }
                    }
                  },
              }]
          };

        ele.setOption(option);
      }
    },
    mounted () {
      this.iDName = 'OutbreakBottomRight_top_top_Lines'
      this.drwLine()
    }
  }
</script>

<style scoped>
.OutbreakBottomRight_top{
  background: #fff;
  box-shadow:0px 3px 10px 2px rgba(54,121,225,0.09);
  border-radius:3px;
}
.OutbreakBottomRight_top_top{
  height: 313px;
  padding: 17px 20px;
  box-sizing: border-box;
  position: relative;
  display: flex;
  flex-direction: column;
}
.OutbreakBottomRight_top_top_Btn{
  position: absolute;
  top:17px;
  right: 21px;
  width:160px;
  height:28px;
  background:rgba(255,255,255,1);
  border-radius:3px;
  border:1px solid rgba(63,146,254,1);
  display: flex;
  box-sizing: border-box;
}
.OutbreakBottomRight_top_bottom{
  height: 35px;
  box-shadow:0px 0px 9px 2px rgba(80,118,178,0.12);
  border-radius:3px;
  padding: 0;
  margin: 0;
  list-style: none;
  display: flex;
}
.OutbreakBottomRight_top_bottom>li{
  flex: 1;
  padding:  9px 6px 6px;
  box-sizing: border-box;
  flex: 1;
  font-size:14px;
  font-weight:400;
  color:rgba(153,153,153,1);
  text-align: center;
  border-right: 1px solid rgba(236,236,236,1);
  cursor: pointer;
}
.OutbreakBottomRight_top_bottom>li:last-child{
  border: 0;
}
.OutbreakBottomRight_top_bottom>.liActive{
  background:#3F92FE ;
  color: #fff;
  border-radius:3px 0px 0px 3px;
}
.OutbreakBottomRight_top_top_Btn>span{
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size:14px;
  font-weight:400;
  color:rgba(85,85,85,1);
  cursor: pointer;
}
.OutbreakBottomRight_top_top_Btn>.spanActive{
  background: #3F92FE;
  color: #fff;
}
.OutbreakBottomRight_top_top_Line{
  flex: 1;
}





</style>
