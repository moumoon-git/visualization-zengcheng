<template>
  <div class="properties_wrap">

    <div class="properties_xsx" >
      <ul class="properties_ul">
        <li :class="item.flag?'active_li':''" v-for="(item,index) in btnData" @click="tabType(item,index)" ><img :src="item.img" alt=""><span>{{item.name}}</span></li>
      </ul>
      <div @click="closeThis" >
        x
      </div>
    </div>

    <div class="goBack" >
      <img @click="tabVal" src="../../../../assets/images/cszh/back.png" alt="">
      <ul class="goBack_ul">
        <li class="oneLi" ><input type="text"  v-model="oneInp" ><img v-show="oneInp" @click="oneInp=''" src="../../../../assets/images/close.png" alt=""></li>
        <li class="towLi" ><input type="text"  v-model="towInp" ><img v-show="towInp" @click="towInp=''" src="../../../../assets/images/close.png" alt=""></li>
      </ul>
      <button class="serchVal" @click="serch">搜索</button>
    </div>

    <div id="panelCar"></div>

  </div>
</template>

<script>
  export default{
    name:'properties',
    data () {
      return {
          btnData:[
              {name:'公交',img:require('../../../../assets/images/cszh/1g.png'),flag:true},
              {name:'驾车',img:require('../../../../assets/images/cszh/1g.png'),flag:false},
              {name:'步行',img:require('../../../../assets/images/cszh/1g.png'),flag:false},
              {name:'骑行',img:require('../../../../assets/images/cszh/1g.png'),flag:false}
          ],
          oneInp:'',
          towInp:'',
          map:'',
          serchFlag:false
      }
    },
    methods:{
        tabType (item,index) {
            this.btnData.forEach(ele=>{
                ele.flag = false
            })
            item.flag = true
            if (index == 0) {
              this.bus()
            }else if (index == 1) {
              this.changeInpVal()
            }else if (index == 2) {
              this.walk()
            }else if (index == 3) {
              this.riding()
            }
        },
        closeThis () {
          this.clearData()
          this.$emit('closeThat','')
        },
        tabVal () {
          let sam = this.oneInp
          this.oneInp = this.towInp
          this.towInp = sam
          this.changeInpVal()
        },
        initMaps (data) {
          this.map = data
        },
        changeInpVal () {
          this.map.clearMap();
          let panelCar = document.getElementById('panelCar')
          panelCar.innerHTML = ''
          const _that = this
          if (this.serchFlag) {
            //构造路线导航类
            var driving = new AMap.Driving({
                map: _that.map,
                panel: "panelCar"
            });
            // 根据起终点名称规划驾车导航路线
            driving.search([
                {keyword:_that.oneInp},
                {keyword:_that.towInp}
            ], function(status, result) {
                // result 即是对应的驾车导航信息，相关数据结构文档请参考  https://lbs.amap.com/api/javascript-api/reference/route-search#m_DrivingResult
                if (status === 'complete') {
                    console.log('绘制驾车路线完成',result)
                } else {
                    console.log('获取驾车数据失败：' + result)
                }
            });
          }
        },
        serch () {
          this.serchFlag = true
          this.bus()
        },
        bus () {
          const _that = this
          this.map.clearMap();
          let panelCar = document.getElementById('panelCar')
          panelCar.innerHTML = ''
          if (this.serchFlag) {
            var transOptions = {
                map: _that.map,
                city: '北京市',
                panel: 'panelCar',
                policy: AMap.TransferPolicy.LEAST_TIME //乘车策略
            };
            //构造公交换乘类
            var transfer = new AMap.Transfer(transOptions);
            //根据起、终点名称查询公交换乘路线
            transfer.search([
                    {keyword:_that.oneInp},
                    {keyword:_that.towInp}
                ], function(status, result) {
                // result即是对应的公交路线数据信息，相关数据结构文档请参考  https://lbs.amap.com/api/javascript-api/reference/route-search#m_TransferResult
                if (status === 'complete') {
                    console.log('绘制公交路线完成')
                } else {

                }
            })
          }
        },
        walk () {
          const _that = this
          this.map.clearMap();
          let panelCar = document.getElementById('panelCar')
          panelCar.innerHTML = ''
          if (this.serchFlag) {
            //步行导航
            var walking = new AMap.Walking({
                map:_that.map,
                panel: "panelCar"
            });
            walking.search([
                {keyword:_that.oneInp},
                {keyword:_that.towInp}
            ], function(status, result) {
                // result即是对应的步行路线数据信息，相关数据结构文档请参考  https://lbs.amap.com/api/javascript-api/reference/route-search#m_WalkingResult
                if (status === 'complete') {
                    console.log('绘制步行路线完成')
              } else {
                  console.log('步行路线数据查询失败' + result)
              }
            });
          }
        },
        riding () {
          const _that = this
          this.map.clearMap();
          let panelCar = document.getElementById('panelCar')
          panelCar.innerHTML = ''
          if (this.serchFlag) {
            //步行导航
            var riding = new AMap.Riding({
                map: _that.map,
                panel: "panelCar"
            });
            riding.search([
                {keyword:_that.oneInp},
                {keyword:_that.towInp}
            ], function(status) {
                // result即是对应的骑行路线数据信息，相关数据结构文档请参考  https://lbs.amap.com/api/javascript-api/reference/route-search#m_RidingResult
                if (status === 'complete') {
                    console.log('绘制骑行路线完成')
                } else {
                    console.log('骑行路线数据查询失败' + result)
                }
            });
          }
        },
        clearData () {
          this.map.clearMap();
          let panelCar = document.getElementById('panelCar')
          panelCar.innerHTML = ''
          this.oneInp = ''
          this.towInp = ''
          this.serchFlag = false
        }
    },
    mounted () {

    }
  }
</script>

<style scoped>
#panelCar{
  height: 300px;
  max-height: 300px;
  overflow-y: scroll;
}
.properties_wrap{
  height: 100%;
  display: flex;
  flex-direction: column;
}
.properties_xsx{
  display: flex;
  align-items: center;
}
.properties_ul{
  display: flex;
  list-style: none;
  padding: 0;
  margin: 0;
}
.properties_ul>li{
  width:63px;
  height:29px;
  color: #A8CEFC;
  border-right:1px solid rgba(13,121,255,1);
  border-bottom:1px solid rgba(13,121,255,1);
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
}
.active_li{
  background:rgba(1,180,255,.5);
  border-bottom: 0px !important;
}
.properties_ul>li>img{
  width:16px;
  height:19px;
}
.properties_xsx>div{
  width:20px;
  height:20px;
  cursor: pointer;
  color: #70B7FF;
  font-family: '黑体';
  text-align: center;
}
.goBack{
  position: relative;
  flex: 1;
  display: flex;
  align-items: auto;
  justify-content: center;
  align-items: center;
}
.goBack>img{
  position: absolute;
  top: 0;
  bottom: 0;
  left: 10px;
  margin: auto;
  cursor: pointer;
}
.goBack_ul{
  list-style: none;
  margin: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 0;
  width: 50%;
}
.goBack_ul>li{
  width: 100%;
  display: flex;
  align-items: center;
  margin: 5px 0 ;
  position: relative;
  border-bottom: 1px solid #2877D7;
}
.goBack_ul>li>input{
  background: transparent;
  font-size:17px;
  border: 0;
  font-weight:400;
  outline: none;
  color:rgba(168,206,252,1);
  width: 100%;
  padding-left: 5px;
}
.goBack_ul>li>img{
  position: absolute;
  right: -25px;
  cursor: pointer;
}
.oneLi:before{
  content: '';
  position: absolute;
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background: #0BA360;
  top: 0;
  bottom: 0;
  margin: auto;
  left: -15px;
}
.towLi:before{
  content: '';
  position: absolute;
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background: #ff0000;
  top: 0;
  bottom: 0;
  margin: auto;
  left: -15px;
}
.serchVal{
  background: transparent;
  border:1px solid #0091FF;
  outline: none;
  cursor: pointer;
  color: #fff;
  height: 30px;
  position: absolute;
  top:0;
  bottom: 0;
  margin: auto;
  right: 3px;
}
</style>
