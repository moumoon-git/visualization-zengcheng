<template>
  <div class="OutbreakBottomRight_bottom">

    <div class="OutbreakBottomRight_bottom_top">
      <div class="blueTitleTow"  style="margin: 20px 20px 0;" >区域分布</div>
      <div class="select">
          <el-select
           v-model="value"
           placeholder="请选择"
           :popper-append-to-body="false"
           >
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
      </div>
      <div class="eachrtsPie" id="eachrtsPiesx">

      </div>
    </div>

    <ul class="OutbreakBottomRight_bottom_bom">
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
    name:'OutbreakBottomRight_bottom',
    data () {
      return {
        iDName:'',
         options: [{
                  value: '选项1',
                  label: '黄金糕'
                }, {
                  value: '选项2',
                  label: '双皮奶'
                }, {
                  value: '选项3',
                  label: '蚵仔煎'
                }, {
                  value: '选项4',
                  label: '龙须面'
                }, {
                  value: '选项5',
                  label: '北京烤鸭'
                }],
                value: ''
      }
    },
    methods:{
      drwPie () {
        const _that = this
        let ele = this.$echarts.init(document.getElementById(this.iDName))
        let option = {
         tooltip: {
           trigger: 'item',
           formatter(v){
            //  _that.hoverVal = v
            //  _that.countNum = _that.hoverVal.value
            //  _that.typeName = _that.hoverVal.name
            //  _that.strFlag = true
             // console.log(v)
           },
         },
         series: [
           {
             name: '',
             type: 'pie',
             radius: ['53%', '70%'],
             avoidLabelOverlap: false,
             hoverAnimation:false,
             // silent: true,
             center:['50%','50%'],
             label: {
               normal: {
                 show: true,
                 formatter(v) {
                     console.log(v)
                   let str = `${v.name+'\n'+v.name+v.value+'万'+'\n'+v.percent+'%\n'}`
                   return str
                 },
                 textStyle: {
                   fontSize: 16,
                   fontWeight: '400',
                   color:'#333333'
                 },
                 position:'top' //默认自适应，水平布局为'top'，垂直布局为'right'，可选为 'inside'|'left'|'right'|'top'|'bottom'
               },
               emphasis: {
                 show: true,
                 textStyle: {
                   fontSize: 16,
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
             data: [
                        {value: 335, name: '直接访问'},
                        {value: 360, name: '邮件营销'},
                        {value: 234, name: '联盟广告'},
                        {value: 135, name: '视频广告'}
                    ],
             itemStyle: {
               emphasis: {
                 shadowBlur: 10,
                 shadowOffsetX: 0,
                 shadowColor: 'rgba(0, 0, 0, 0.5)'
               },
               normal: {
                 color: function(params) {
                   var colorList = [
                     {c1: '#518AFB',c2:'#518AFB'},
                     {c1: '#FDB502',c2:'#FDB502' },
                     {c1: '#84CEEA',c2:'#84CEEA'},
                     {c1: '#C2C5E1',c2:'#C2C5E1'}
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
         ]
         // animation:false
        }
        ele.setOption(option);
      }
    },
    mounted() {
      this.iDName = 'eachrtsPiesx'
      this.drwPie()
    }
  }
</script>

<style scoped>
.OutbreakBottomRight_bottom{
  width:448px;
  height:429px;
  background:rgba(255,255,255,1);
  box-shadow:0px 3px 10px 2px rgba(54,121,225,0.09);
  border-radius:3px;
  display: flex;
  flex-direction: column;
}
.OutbreakBottomRight_bottom_top{
  flex: 1;
  box-sizing: border-box;
  position: relative;
  display: flex;
  flex-direction: column;
}
.OutbreakBottomRight_bottom_bom{
  height: 35px;
  box-shadow:0px 0px 9px 2px rgba(80,118,178,0.12);
  border-radius:3px;
  padding: 0;
  margin: 0;
  list-style: none;
  display: flex;
}
.OutbreakBottomRight_bottom_bom>li{
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
.OutbreakBottomRight_bottom_bom>li:last-child{
  border: 0;
}
.OutbreakBottomRight_bottom_bom>.liActive{
  background:#3F92FE ;
  color: #fff;
  border-radius:3px 0px 0px 3px;
}
.select{
  position: absolute;
  top: 16px;
  right: 16px;
  width:117px;
  height:30px;
  border-radius:3px;
  z-index: 99;
}
.select /deep/ .el-input__inner{
  width:117px;
  height:30px;
  color: #000;
}
.select /deep/ .el-input__icon{
  display: flex;
  align-items: center;
  justify-content: center;
}
.select /deep/ .el-select-dropdown{
  background: #fff;
  left: -73px !important;
}
.select /deep/ .el-select-dropdown__item, .el-input__inner{
  color: #000;
}
.select /deep/ .el-select-dropdown__item.hover, .el-select-dropdown__item:hover{
  background-color: #F5F7FA;
}
.eachrtsPie{
  flex: 1;
}



</style>
