<template>
  <div class="OutbreakBottomContent_wrap">
     <div v-if="tabData[0].flag" id="container"></div>
     <div v-if="tabData[1].flag" class="administrative" >
       <!-- <div style="width: 100%;height: 100%;background: #000;"></div> -->
     </div>
     <div class="OutbreakBottomContent_Btn">
       <span v-for="(item,index) in tabData" :class="item.flag?'sij':''" @click="changekl(item,index)">{{item.name}}</span>
     </div>

  </div>
</template>

<script>
export default{
    name:'OutbreakBottomContent',
    data () {
      return {
		     map:'',
         tabData:[
           {name:'区域统计',flag:true},
           {name:'地图标绘',flag:false}
         ]
      }
    },
	methods:{
		mapLoning () {
		   // 116.502328,39.806318 北京亦庄新区
		   // 113.824713,23.286085 广州增城
       // 113.959807,22.741134 深圳光明
		    const map = new AMap.Map('container', {
            center:[113.959807,22.741134],
            // center:[117.127998, 36.681641],
		        zoom:15,
            mapStyle:'amap://styles/macaron'
		    });
		    // map.add(this.wx)
		    this.map = map
		},
    changekl (item,index) {
      const _that = this
      this.tabData.forEach(ele=>{
        ele.flag = false
      })
      item.flag = true
      if (index == 0) {
        setTimeout(()=>{
          _that.mapLoning()
        })
      }else{
        this.map && this.map.destroy();
      }
    }
	},
	mounted () {
     this.mapLoning()
	}
}
</script>

<style scoped>
.OutbreakBottomContent_wrap{
  width: 100%;
  height: 100%;
  background:rgba(255,255,255,1);
  box-shadow:0px 3px 10px 2px rgba(54,121,225,0.09);
  border-radius:3px;
  position: relative;
}
.OutbreakBottomContent_wrap>div:nth-child(1){
  width: 100%;
  height: 100%;
}
.administrative{
  width: 100%;
  height: 100%;
  background: url('../../../assets/images/bgrxs.png')no-repeat !important;
}
.OutbreakBottomContent_Btn{
  position: absolute;
  top: 17px;
  right: 23px;
  width:159px;
  height:28px;
  background:rgba(255,255,255,1);
  border-radius:3px;
  border:1px solid rgba(63,146,254,1);
  display: flex;
  box-sizing: border-box;
}
.OutbreakBottomContent_Btn>span{
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  font-size:14px;
  font-weight:400;
  color:#555555;
}
.OutbreakBottomContent_Btn>.sij{
  background:rgba(63,146,254,1);
  border-radius:0px 3px 3px 0px;
  color: #fff;
}

</style>
