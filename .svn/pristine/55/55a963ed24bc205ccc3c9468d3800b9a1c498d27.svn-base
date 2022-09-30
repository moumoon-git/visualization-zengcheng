<template>
    <div class="tailAfter_wrap">

      <div v-for="(item, index) in data" :key="index">
        <div>
          <img v-if="index==0" src="../../../assets/images/1com.png" alt="">
          <img v-if="index==1" src="../../../assets/images/2com.png" alt="">
          <img v-if="index==2" src="../../../assets/images/3com.png" alt="">
          <img v-if="index==3" src="../../../assets/images/4com.png" alt="">
          <span>{{item.value}}</span>
        </div>
        <p>{{item.name}}</p>
      </div>

    </div>
</template>

<script>
    export default {
        name: "tailAfters",
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

<style scoped>
p{
  margin: 0 !important;
}
.tailAfter_wrap{
  width: 100%;
  height: 100%;
  display: flex;
  flex-flow: wrap;
  justify-content: flex-start;
}
.tailAfter_wrap>div{
  width: 50%;
  height: 50%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
.tailAfter_wrap>div>div{
  display: flex;
  align-items: center;
}
.tailAfter_wrap>div>div>img{
  width: 43px;
  height: 43px;
  margin-right: 10px;
}
.tailAfter_wrap>div>div>span{
  font-size:42px;
  background-clip: text;
  -webkit-background-clip: text;
  text-align: center;
  display: inline-block;
  -webkit-text-fill-color: transparent;
  font-family: 'DCM';
}
.tailAfter_wrap>div>p{
  font-size:16px;
  font-weight:500;
  color:rgba(254,254,254,1);
  margin-top: 12px;
}

.tailAfter_wrap>div:nth-child(1)>div>span{
  color:rgba(105,231,180,1);
  background-image: -webkit-gradient(linear, 0 0, 0 bottom, from(#9A8FF5), to(#79DDEE));
}
.tailAfter_wrap>div:nth-child(2)>div>span{
  color:rgba(250,216,73,1);
  background-image: -webkit-gradient(linear, 0 0, 0 bottom, from(#51AAE6), to(#77E6AF));
}
.tailAfter_wrap>div:nth-child(3)>div>span{
  color:#ED645E;
  background-image: -webkit-gradient(linear, 0 0, 0 bottom, from(#E87267), to(#F1BF60));
}
.tailAfter_wrap>div:nth-child(4)>div>span{
  color:#ED645E;
  background-image: -webkit-gradient(linear, 0 0, 0 bottom, from(#A6C0FE), to(#F68084));
}






</style>
