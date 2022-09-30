<template>
  <div class="Outbreaks_wrap">
     <div class="Outbreaks_left">
       <div class="Outbreaks_left_top">
         <formMenuTplaeLt ref='formMenuTplaeLt'></formMenuTplaeLt>
       </div>
       <div class="Outbreaks_left_content">
         <formMenuTplaeLc ref='formMenuTplaeLc'></formMenuTplaeLc>
       </div>
       <div class="Outbreaks_left_bottom">
         <formMenuTplaeLb ref='formMenuTplaeLb'></formMenuTplaeLb>
       </div>
     </div>

     <div class="Outbreaks_content" id="Outbreaks_contents" ></div>

     <div class="Outbreaks_right">
       <div class="Outbreaks_right_top">
          <formMenuTplaeRt ref='formMenuTplaeRt'></formMenuTplaeRt>
       </div>
       <div class="Outbreaks_right_content">
          <formMenuTplaeRc ref='formMenuTplaeRc'></formMenuTplaeRc>
       </div>
       <div class="Outbreaks_right_bottom">
          <formMenuTplaeRb ref='formMenuTplaeRb'></formMenuTplaeRb>
       </div>
     </div>
  </div>
</template>

<script>
  import formMenuTplaeLt from './OutbreakTamp/formMenuTplae'
  import formMenuTplaeLc from './OutbreakTamp/formMenuTplae'
  import formMenuTplaeLb from './OutbreakTamp/formMenuTplae'
  import formMenuTplaeRt from './OutbreakTamp/formMenuTplae'
  import formMenuTplaeRc from './OutbreakTamp/formMenuTplae'
  import formMenuTplaeRb from './OutbreakTamp/formMenuTplae'
  export default {
    name:'Outbreaks',
    data () {
      return {

      }
    },
    methods:{
      mapLoning () {
         // 116.502328,39.806318 北京亦庄新区
         // 113.824713,23.286085 广州增城
         // 113.959807,22.741134 深圳光明
        //  117.127998, 36.681641 济南高新区
          const map = new AMap.Map('Outbreaks_contents', {
              center:[113.959807,22.741134],
              // center:[117.127998, 36.681641],
              zoom:15,
              mapStyle:'amap://styles/macaron'
          });
          // map.add(this.wx)
          this.map = map
      },
    },
    components:{
      formMenuTplaeLt,
      formMenuTplaeLc,
      formMenuTplaeLb,
      formMenuTplaeRt,
      formMenuTplaeRc,
      formMenuTplaeRb
    },
    mounted () {
      this.mapLoning()
    }
  }
</script>

<style scoped>
.Outbreaks_wrap{
  flex: 1;
  padding: 20px;
  box-sizing: border-box;
  background: #F4F4F4;
  display: flex;
  min-height: 1010px;
}
.Outbreaks_left{
  width:448px;
}
.Outbreaks_content{
  width:944px;
  margin: 0 20px;
}
.Outbreaks_right{
  width:448px;
}
.Outbreaks_left_top{
  height:342px;
  background:rgba(255,255,255,1);
  border-radius:3px;
  margin-bottom: 20px;
}
.Outbreaks_left_content{
  height:352px;
  background:rgba(255,255,255,1);
  border-radius:3px;
  margin-bottom: 20px;
}
.Outbreaks_left_bottom{
  height:235px;
  background:rgba(255,255,255,1);
  border-radius:3px;
}

.Outbreaks_right_top{
  height:248px;
  background:rgba(255,255,255,1);
  border-radius:8px;
  margin-bottom: 20px;
}
.Outbreaks_right_content{
  height:286px;
  background:rgba(255,255,255,1);
  border-radius:8px;
  margin-bottom: 20px;
}
.Outbreaks_right_bottom{
  height:396px;
  background:rgba(255,255,255,1);
  border-radius:8px;
}


</style>
