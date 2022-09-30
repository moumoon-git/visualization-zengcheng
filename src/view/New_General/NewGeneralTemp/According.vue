<template>
    <div class="According_wrap">

      <div v-for="(item, index) in data" :key="index" >
         <p><span :class="index==0?'oneSpan':'TwoSpan'">{{item.value}}</span><span :class="index==0?'oneSpan':'TwoSpan'">人</span></p>
         <p>{{item.name}}</p>
      </div>

    </div>
</template>

<script>
    export default {
        name: "According",
        data () {
          return {
            data:[]
          }
        },
      methods:{
        init (data) {
          this.data = data
        }
      }
    }
</script>

<style scoped lang="less">
.According_wrap{
  width: 100%;
  height: 74px;
  background: url("../../../assets/images/psd3.png")no-repeat;
  background-size: 100% 100%;
  display: flex;
}
.According_wrap>div{
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}
.According_wrap>div>p{
  white-space: nowrap;
  text-align: center;
  color: #FFFFFF;
  font-size:13px;
  font-weight:400;
}
.According_wrap>div>p>span{
  font-size:30px;
  background-clip: text;
  -webkit-background-clip: text;
  text-align: center;
  display: inline-block;
  -webkit-text-fill-color: transparent;
  font-family: 'DCM';
}
.According_wrap>div>p>span:nth-child(2){
  font-size:16px;
}
.According_wrap>div>p:nth-child(1){

}

.According_wrap>div>p:nth-child(2){

}
.oneSpan{
  color:rgba(153,201,231,1);
  background-image: -webkit-gradient(linear, 0 0, 0 bottom, from(#68E6B4), to(#99C9E7));
}
.TwoSpan{
  color:rgba(178,191,117,1);
  background-image: -webkit-gradient(linear, 0 0, 0 bottom, from(#68E6B4), to(#B2BF75));
}
p{
  margin: 0 !important;
  width: 100%;
}






</style>
