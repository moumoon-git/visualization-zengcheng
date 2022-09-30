<template>
  <div class="Outbreak_wrap">

    <div class="OutbreakTop">
       <div >
         <OutbreakOne ref='OutbreakOne' ></OutbreakOne>
       </div>
       <div>
         <OutbreakTow ref='OutbreakTow' ></OutbreakTow>
       </div>

    </div>

    <div class="OutbreakBottom">
       <div class="OutbreakBottom_left">
          <OutbreakBottomLeft ref='OutbreakBottomLeft'></OutbreakBottomLeft>
       </div>
       <div class="OutbreakBottom_content">
           <OutbreakBottomContent ref='OutbreakBottomContent'></OutbreakBottomContent>
       </div>
       <div class="OutbreakBottom_right">
           <OutbreakBottomRight ref='OutbreakBottomRight' ></OutbreakBottomRight>
       </div>
    </div>

  </div>
</template>

<script>
import OutbreakOne from './OutbreakTamp/OutbreakOne'
import OutbreakTow from './OutbreakTamp/OutbreakTow'
import OutbreakBottomLeft from './OutbreakTamp/OutbreakBottomLeft'
import OutbreakBottomContent from './OutbreakTamp/OutbreakBottomContent'
import OutbreakBottomRight from './OutbreakTamp/OutbreakBottomRight'



  export default {
    name:'Outbreak',
    data () {
      return {

      }
    },
    components:{
      OutbreakOne,
      OutbreakTow,
      OutbreakBottomLeft,
      OutbreakBottomContent,
      OutbreakBottomRight
    }
  }
</script>

<style scoped>
.Outbreak_wrap{
   flex: 1;
   padding: 20px;
   background: #F4F4F4;
   display: flex;
   flex-direction: column;
 }
.OutbreakTop{
   width: 100%;
   height:152px;
   display: flex;
 }
.OutbreakTop>div:nth-child(1){
   width: 296px;
   height:100%;
   margin-right: 20px;
   background: #fff;
 }
.OutbreakTop>div:nth-child(2){
   flex: 1;
 }
.OutbreakBottom{
  flex: 1;
  margin-top: 21px;
  display: flex;
  min-height: 797px;
}
.OutbreakBottom_left{
  width:448px;
  background:rgba(255,255,255,1);
  box-shadow:0px 3px 10px 2px rgba(54,121,225,0.09);
  border-radius:3px;
  height: 797px;;
  margin-right: 20px;
}
.OutbreakBottom_content{
  width:944px;
  height:797px;
  margin-right: 20px;
}
.OutbreakBottom_right{
  width:448px;
  height:797px;
}






</style>
