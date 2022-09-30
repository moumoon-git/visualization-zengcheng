<template>
    <div class="echartsPie_wrap">

      <div id="echartsPies" @mouseout="strFlag=false" ></div>
      <div class="bgrEchartsPies" v-if="strFlag" >
        <span>{{countNum}}</span>
        <p>{{typeName}}</p>
      </div>

    </div>
</template>

<script>
  export default {
      name: "echartsPie",
      data () {
        return {
           hoverVal:'',
           countNum:'',
           typeName:'',
           strFlag:false,
           data: [
              {value: 0, name: ''},
              {value: 0, name: ''},
              {value: 0, name: ''}
           ]
        }
      },
      methods:{
        init (data){
          this.data = data
          this.drwPie('echartsPies',this.data)
        },
        drwPie (eleName,data) {
          const _that = this
          let ele = this.$echarts.init(document.getElementById(eleName))
          let option = {
             tooltip: {
               trigger: 'item',
               formatter(v){
                 _that.hoverVal = v
                 _that.countNum = _that.hoverVal.value
                 _that.typeName = _that.hoverVal.name
                 _that.strFlag = true
                 // console.log(v)
               },
             },
             series: [
               {
                 name: '',
                 type: 'pie',
                 radius: ['45%', '70%'],
                 avoidLabelOverlap: false,
                 hoverAnimation:false,
                 // silent: true,
                 center:['50%','55%'],
                 label: {
                   normal: {
                     show: true,
                     formatter(v) {
                       //  console.log(v)
                       let str = `${v.value}`
                       return str
                     },
                     textStyle: {
                       fontSize: 23,
                       fontWeight: '500',
                       fontFamily:'DCM',
                       color:'#5B9DDF'
                     },
                     position:'top' //默认自适应，水平布局为'top'，垂直布局为'right'，可选为 'inside'|'left'|'right'|'top'|'bottom'
                   },
                   emphasis: {
                     show: true,
                     textStyle: {
                       fontSize: 22,
                       fontWeight: 'bold',
                       color:'#5B9DDF'
                     }
                   }
                 },
                 labelLine: {
                   normal: {
                     length:5,
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
                         {c1: 'rgba(10, 207, 254, 0.8)',c2:'rgba(73, 90, 255, .8)'},
                         {c1: 'rgba(42, 245, 152, 0.8)',c2:'rgba(0, 158, 253, .8)' },
                         {c1: 'rgba(249, 212, 35, 0.8)',c2:'rgba(255, 78, 80, .8)'},
                         {c1: 'rgba(252, 204, 107, 0.55)',c2:'rgba(252, 215, 92, 1)'},
                         {c1: 'rgba(90, 211, 253, 0.55)',c2:'rgba(68, 129, 235, 1)' },
                         {c1: 'rgba(255, 140, 121, 0.55)',c2:'rgba(228, 153, 139, 1)'},
                         {c1: 'rgba(130, 255, 204, 0.55)',c2:'rgba(70, 208, 237, 1)'},
                         {c1: 'rgba(237, 139, 255, 0.55)',c2: 'rgba(209, 67, 201, 1)'},
                         {c1: 'rgba(255, 207, 118, 0.55)',c2:'rgba(254, 176, 10, 1)' },
                         {c1: 'rgba(254, 152, 61, 0.55)',c2: 'rgba(254, 102, 10, 1)'}
                       ]
                       return new _that.$echarts.graphic.LinearGradient(1, 0, 0, 0, [{ //颜色渐变函数 前四个参数分别表示四个位置依次为左、下、右、上
                         offset: 0,
                         color: colorList[params.dataIndex].c1
                       }, {
                         offset: 1,
                         color: colorList[params.dataIndex].c2
                       }])
                     },
                     label:{
                       show: true,
                       formatter(v) {
                         console.log(v)
                         let str = `${v.value}${'\n' + v.name}`
                         return str
                       }
                     },
                     labelLine :{show:true}
                   }
                 }
               }
             ],
             // animation:false
           }
           ele.setOption(option);
         },
      },
      mounted() {

      }
  }
</script>

<style scoped>
.echartsPie_wrap{
  width: 100%;
  height: 100%;
  position: relative;
}
#echartsPies{
  width: 100%;
  height: 100%;
}
.bgrEchartsPies {
  position: absolute;
  top: 34px;
  left: 0;
  right: 0;
  bottom: 0;
  margin: auto;
  width: 135px;
  height: 110px;
  text-align: center;
  overflow: hidden;
  /*background: #ff0000;*/
}
p{
  margin: 0 !important;
}
.bgrEchartsPies>span{
  width: 100%;
  overflow: hidden;
  white-space: nowrap;
  /*text-overflow: ellipsis;*/
  font-size: 42px;
  margin-top: 15px;
  font-weight: 500;
  line-height: 1;
  /*background-clip: text;*/
  /*-webkit-background-clip: text;*/
  text-align: center;
  display: inline-block;
  /*-webkit-text-fill-color: transparent;*/
  font-family: 'DCM';
  color:#3F99E2;
  /*background-image: -webkit-gradient(linear, 0 0, 0 bottom, from(#3F99E2), to(#3F99E2));*/
}
.bgrEchartsPies>p{
  font-size:18px;
  font-weight:normal;
  color:rgba(255,255,255,1);
}










</style>
