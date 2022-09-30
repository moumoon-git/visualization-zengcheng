<template>
    <div class="right_content_top_left_wrap">
       <div class="blueTitle right_content_topTitle">风险动态</div>
<!--      内容-->
       <div class="right_content_top_left_content">
         <!-- 智能采集 -->
         <div class="main_content">
           <div class="main_content_one">
             <img src="../../../assets/images/capacityBgr.png" class="bgrImg" alt="">
             <!-- <img src="" class="main_content_oneImg" alt=""> -->
             <div class="main_content_oneImg"></div>
             <p>智能采集</p>
             <div class="vertical"></div>
           </div>
           <div class="main_content_two">

             <div>
               <span @click="humanNext"><</span>
               <div class="capacityBgr" style="margin: 0 11px;" >
                 <h3><span>{{humanListData[humanInd].humanAll}}</span>人(次)</h3>
<!--                 :class="Flag?'animated fadeIn':''"-->
                 <p >{{humanListData[humanInd].name}}</p>
               </div>
               <span @click="humanlast">></span>
             </div>

             <div>
               <span @click="carNext"><</span>
               <div class="capacityBgr" style="margin: 0 11px;"  >
                 <h3><span>{{carListData[carInd].vehicleAll}}</span>宗(次)</h3>
                 <p>{{carListData[carInd].name}}</p>
               </div>
               <span @click="carlast">></span>
             </div>


           </div>
           <div class="main_content_three">
             <div>
               <div class="capacityBgr" >
                 <h3><span>{{humanListData[humanInd].total}}</span>次</h3>
                 <p>预警报告</p>
               </div>
               <div class="capacityBgr" >
                 <h3><span>{{humanListData[humanInd].validNum}}</span>次</h3>
                 <p>响应</p>
               </div>
             </div>
             <!--             11111111111----end-->
             <div>
               <div class="capacityBgr" >
                 <h3><span>{{carListData[carInd].total}}</span>次</h3>
                 <p>预警报告</p>
               </div>
               <div class="capacityBgr" >
                 <h3><span>{{carListData[carInd].validNum}}</span>次</h3>
                 <p>响应</p>
               </div>
             </div>
           </div>
           <div class="main_content_four">
             <div>
               <p>响应率</p>
               <!-- <h1 :class="oneFlag?'oneH1':''" >{{humanListData[humanInd].validPercent}}%<img src="../../../assets/images/chips.gif" alt=""></h1> -->
               <h1 class="oneH1">{{humanListData[humanInd].validPercent ? humanListData[humanInd].validPercent : '0'}}%<img src="../../../assets/images/chips.gif" alt=""></h1>
             </div>
             <div>
               <p>响应率</p>
               <!-- <h1 :class="twoFlag?'TwoH1':''" >{{carListData[carInd].validPercent}}%<img src="../../../assets/images/chips4.gif" alt=""></h1> -->
               <h1 class="TwoH1">{{carListData[carInd].validPercent ? carListData[carInd].validPercent : '0'}}%<img src="../../../assets/images/chips4.gif" alt=""></h1>
             </div>
           </div>
           <div class="across"></div>
           <div class="admane"></div>
         </div>
         <!-- 平台采集 -->
         <div class="main_content">
           <div class="main_content_one">
             <img src="../../../assets/images/plafrom.png" class="bgrImg" alt="">
             <!-- <img src="" class="main_content_oneImg" alt=""> -->
             <div class="main_content_oneImg"></div>
             <p>平台采集</p>
             <div class="vertical"></div>
           </div>
           <div class="main_content_two">

             <!-- 2020-11-02 tanjinfeng 校园和小区的数据调换，并且删除校园的整改率 -->
             <div>
               <div class="capacityBgr" style="margin: 0 11px;" >
                 <!-- <h3><span>{{schoolData.allCount}}</span>件</h3>
                 <p>校园周边</p> -->
                 <h3><span>{{housingData.allCount}}</span>件</h3>
                 <p>物业小区</p>
               </div>
             </div>

             <div>
               <div class="capacityBgr" style="margin: 0 11px;"  >
                 <!-- <h3><span>{{housingData.allCount}}</span>件</h3>
                 <p>物业小区</p> -->
                 <h3><span>{{schoolData.allCount}}</span>件</h3>
                 <p>校园周边</p>
               </div>
             </div>


           </div>
           <div class="main_content_three">
             <div>
               <div class="capacityBgr" >
                 <!-- <h3><span>{{schoolData.doing}}</span>次</h3> -->
                 <h3><span>{{housingData.doing}}</span>次</h3>
                 <p>督办整改</p>
               </div>
               <div class="capacityBgr" >
                 <!-- <h3><span>{{schoolData.doingEnd}}</span>次</h3> -->
                 <h3><span>{{housingData.doingEnd}}</span>次</h3>
                 <p>整改</p>
               </div>
             </div>
             <!--             11111111111----end-->
             <div>
               <div class="capacityBgr" >
                 <!-- <h3><span>{{housingData.doing}}</span>次</h3> -->
                 <h3><span>{{schoolData.doing}}</span>次</h3>
                 <p>督办整改</p>
               </div>
               <div class="capacityBgr" >
                 <!-- <h3><span>{{housingData.doingEnd}}</span>次</h3> -->
                 <h3><span>{{schoolData.doingEnd}}</span>次</h3>
                 <p>整改</p>
               </div>
             </div>
           </div>
           <div class="main_content_four">
             <div>
               <p>整改率</p>
               <!-- <h1 :class="threeFlag?'Three':''"  >{{schoolData.doEndPencent}}%<img src="../../../assets/images/chips3.gif" alt=""></h1> -->
               <!-- <h1 class="Three">{{schoolData.doEndPencent ? schoolData.doEndPencent : '0'}}%<img src="../../../assets/images/chips3.gif" alt=""></h1> -->
               <h1 class="Three">{{housingData.doEndPencent ? housingData.doEndPencent : '0'}}%<img src="../../../assets/images/chips3.gif" alt=""></h1>
             </div>
             <div>
               <p>整改率</p>
               <!-- <h1 :class="fourFlag?'Four':''"  >{{housingData.doEndPencent}}%<img src="../../../assets/images/chips2.gif" alt=""></h1> -->
               <h1 class="Four">{{schoolData.doEndPencent ? schoolData.doEndPencent : '0'}}%<img src="../../../assets/images/chips2.gif" alt=""></h1>
             </div>
           </div>
           <div class="across"></div>
         </div>

       </div>
<!--      内容-->
    </div>
</template>

<script>
    export default {
        name: "right_content_top_left",
        data () {
            return{
                housingData: {},
                schoolData: {},
                oneFlag:false,
                twoFlag:false,
                threeFlag:false,
                fourFlag:false,
                humanListData:[{humanAll:'',name:'',total:'',validNum:'',validPercent:0}],
                carListData:[{validPercent:0,total:0,validNum:0,vehicleAll:0,name:''}],
                humanInd:0,
                carInd:0
            }
        },
        methods:{
          housingInit (data) {
              // 小区的数据
              let that = this
              this.housingData = {...data}
              this.flags('fourFlag')
          },
          schoolInit (data) {
              //  校园的数据
              let that = this
              this.schoolData = {...data}
              this.flags('threeFlag')
          },
          setHumanListData (data) {
              if(data.length!=0){
                  this.humanListData = data
                  this.flags('oneFlag')
              }
          },
          setCarListData (data) {
              if(data.length!=0) {
                  this.carListData = data
                  this.flags('twoFlag')
              }
          },
          humanNext () {
            this.humanInd = this.humanInd>=this.humanListData.length-1?0:this.humanInd+=1
            this.oneFlag = false
            this.flags('oneFlag')
          },
          humanlast () {
            this.humanInd = this.humanInd<=0?this.humanListData.length-1:this.humanInd-=1
            this.oneFlag = false
            this.flags('oneFlag')
          },
          carNext () {
            this.carInd = this.carInd>=this.carListData.length-1?0:this.carInd+=1
            this.twoFlag = false
            this.flags('twoFlag')
          },
          carlast () {
            this.carInd = this.carInd<=0?this.carListData.length-1:this.carInd-=1
            this.twoFlag = false
            this.flags('twoFlag')
          },
          flags (data) {
              let that = this
              that[data] = true
              this.$forceUpdate()
              setTimeout(()=>{
                  that[data] = true
              },100)
          }
        }
    }
</script>

<style scoped>
.right_content_top_left_wrap{
  position: relative;
  width:886px;
  height: 100%;
}
.right_content_topTitle{
  position: absolute;
  top: 0;
  width: 100%;
  left: 0;
}
/* 内容 */
.right_content_top_left_content{
  display: flex;
  justify-content: space-between;
  height: 545px;
  background: url("../../../assets/images/shine.png")no-repeat;
  background-position: 0 512px;
}
.main_content{
  width: 404px;
  height: 517px;
  position: relative;
}
/*第一个*/
.main_content_one{
  margin: auto;
  width:114px;
  height:132px;
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}
.bgrImg{
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  z-index: 1;
}
.main_content_one>.main_content_oneImg,.main_content_one>p{
  z-index: 9;
  position: relative;
}
.main_content_oneImg{
  width: 40px;
  height: 40px;
}
.main_content_one>p{
  margin: 0;
  font-size:16px;
  font-weight:400;
  color:rgba(217,213,237,1);
}
.vertical{
  position: absolute;
  left: 0;
  right: 0;
  margin: auto;
  bottom: -20px;
  width:1px;
  height:20px;
  background: rgba(78,143,247,1);
}
.across{
  position: absolute;
  left: 0;
  right: 0;
  margin: auto;
  top: 153px;
  height: 1px;
  background: rgba(78,143,247,1);
  width: 222px;
}
/*第二个*/
.main_content_two{
  margin-top: 51px;
  display: flex;
  justify-content: space-between;
  padding: 0 32px 0 31px;
}
.main_content_two>div{
  width: 120px;
  height: 91px;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
}
.main_content_two>div:after{
  content: '';
  width: 1px;
  height:20px;
  background: rgba(78,143,247,1);
  position: absolute;
  left: 0px;
  right: 0;
  margin: auto;
  bottom: -20px;
}
.main_content_two>div>span{
  font-family: '黑体';
  color: #67EBFC;
  cursor: pointer;
}
.capacityBgr{
  width:81px;
  height:91px;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  background: url("../../../assets/images/capacityBgr2.png");
  flex-direction: column;
}
.capacityBgr:after{
  content: '';
  position: absolute;
  width: 1px;
  height:30px;
  background: rgba(78,143,247,1);
  left: 0px;
  right: 0;
  margin: auto;
  top: -30px;
}
.main_content_two>div:before{
  content: '';
  position: absolute;
  width: 102px;
  height:1px;
  background: rgba(78,143,247,1);
  left: 1px;
  right: 0;
  margin: auto;
  bottom: -20px;
}
.capacityBgr>h3{
  color: #35B1FF;
  font-size:14px;
  font-weight:400;
  margin: 0;
  line-height: 1;
  height: 26px;
}
.capacityBgr>h3>span{
  font-size:20px;
}
.capacityBgr>p{
  color: #fff;
  font-size:14px;
  margin: 0;
  line-height: 1;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
/*第三个*/
.main_content_three{
  display: flex;
  justify-content: space-between;
  margin-top: 50px;
  padding-left: 1px;
}
.main_content_three>div{
  flex: 1;
  display: flex;
  justify-content: space-between;
}
.main_content_three>div:nth-child(1){
  margin-right: 39px;
}
/*第四个*/
.main_content_four{
  margin-top: 41px;
  width: 100%;
  height: 60px;
  display: flex;
  justify-content: space-between;
}
.main_content_four>div{
  flex: 1;
}
.main_content_four>div:nth-child(1){
  margin-right: 40px;
}
.main_content_four>div:nth-child(2){

}
.main_content_four>div>p{
  font-size:14px;
  font-weight:400;
  color: #fff;
  text-align: center;
  line-height: 1;
  margin: 0;
}
.main_content_four>div>h1{
  font-family: 'DCM';
  font-weight:400;
  font-size: 45px;
  margin: 0;
  /* background-clip: text; */
  /* -webkit-background-clip: text; */
  text-align: center;
  width: 100%;
  display: inline-block;
  /* -webkit-text-fill-color: transparent; */
}
.main_content_four>div>h1>img{
  margin-left: 20px;
}
.oneH1{
  color: #E54BF2;
  /* background-image: -webkit-gradient(linear, 0 0, 0 bottom, from(#F192B2), to(#E54BF2)); */
}
.TwoH1{
  color: #F6D365;
  /* background-image: -webkit-gradient(linear, 0 0, 0 bottom, from(#F6D365), to(#FDA085)); */
}
.Three{
  color: #E3DB87;
  /* background-image: -webkit-gradient(linear, 0 0, 0 bottom, from(#D6A44C), to(#E3DB87)); */
}
.Four{
  color: #53E0F1;
  /* background-image: -webkit-gradient(linear, 0 0, 0 bottom, from(#9D8CFC), to(#53E0F1)); */
}
.admane{
  position: absolute;
  z-index: 999;
  background: url("../../../assets/images/judge.png")no-repeat;
  background-size: 100% 100%;
  width: 28px;
  height: 78px;
  top: 90px;
  left: 188px;
  animation: bottomRight2 3s;
}
@keyframes bottomRight
{
  0%{top: 90px;left: 188px;}
  100%{top:114px;left:188px;}
  /*32%{top:114px;left:188px;transform: rotate(90deg);}*/
  /*65%{top:114px;left:299px;transform: rotate(180deg);}*/
  /*100%{left:299px;top:143px;transform: rotate(180deg);}*/
}
@keyframes bottomRight2
{
  0%{transform: rotate(-90deg);top:114px;left:188px;}
  100%{transform: rotate(-90deg);top:114px;left:299px;}
  /*32%{top:114px;left:188px;transform: rotate(90deg);}*/
  /*65%{top:114px;left:299px;transform: rotate(180deg);}*/
  /*100%{left:299px;top:143px;transform: rotate(180deg);}*/
}

</style>
