<template>
    <div class="significants_wrap">

      <div class="commodDiv" :class="'significants_'+(index+1)" v-for="(item, index) in data" :key="index" >
        <div>
          <div></div>
          <span :class="'Span'+(index+1)" >{{item.value}}</span>
          <p>{{item.name}}</p>
        </div>
      </div>

    </div>
</template>

<script>

export default {
    name: "significants",
    data () {
      return {
        data:[]
      }
    },
    methods:{
        init (data) {
          console.log(data.slice(0,6))
          this.data = data.slice(0,6)
        }
    },
    mounted() {

    }
}
</script>

<style scoped>
p{
  margin: 0 !important;
}
.significants_wrap{
  position: relative;
  width: 100%;
  height: 100%;
}
.commodDiv{
  position: absolute;
}
.commodDiv>div>span{
  background-clip: text;
  -webkit-background-clip: text;
  text-align: center;
  display: inline-block;
  -webkit-text-fill-color: transparent;
  font-weight: bold;
  font-family: 'DCM';
}
.commodDiv>div>p{
  font-weight:400;
  color:rgba(255,255,255,1);
  white-space: nowrap;
}
.commodDiv>div{
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  position: relative;
}
.significants_1{
  top: 12px;
  left: 0;
  right: 0;
  margin: auto;
}
.significants_1>div>div{
  width: 157px;
  height: 178px;
  position: absolute;
  animation: breatheFrom 3s linear infinite;
  background: url("../../../assets/images/1x.png")no-repeat;
  background-size: 100% 100%;
}
.significants_1>div>p{
  font-size:21px;
}

.significants_2{
  top: 89px;
  left: 70px;
  width: 135px;
}
.significants_2>div>div{
  width: 135px;
  height: 149px;
  position: absolute;
  animation: breatheFrom 3s linear infinite;
  background: url("../../../assets/images/2x.png")no-repeat;
  background-size: 100% 100%;
}
.significants_2>div>p{
  font-size:18px;
}

.significants_3{
  top: 89px;
  left: 526px;
  width: 135px;
}
.significants_3>div>div{
  width: 135px;
  height: 149px;
  position: absolute;
  animation: breatheFrom 3s linear infinite;
  background: url("../../../assets/images/3x.png")no-repeat;
  background-size: 100% 100%;
}
.significants_3>div>p{
  font-size:18px;
}

.significants_4{
  top: 316px;
  left: 152px;
  width: 108px;
}
.significants_4>div>div{
  width: 108px;
  height: 118px;
  position: absolute;
  animation: breatheFrom 3s linear infinite;
  background: url("../../../assets/images/4x.png")no-repeat;
  background-size: 100% 100%;
}
.significants_4>div>p{
  font-size:16px;
}

.significants_5{
  top: 316px;
  left: 482px;
  width: 108px;
}
.significants_5>div>div{
  width: 108px;
  height: 118px;
  position: absolute;
  animation: breatheFrom 3s linear infinite;
  background: url("../../../assets/images/5x.png")no-repeat;
  background-size: 100% 100%;
}
.significants_5>div>p{
  font-size:16px;
}

.significants_6{
  top: 370px;
  left: 310px;
  width: 108px;
}
.significants_6>div>div{
  width: 108px;
  height: 118px;
  position: absolute;
  animation: breatheFrom 3s linear infinite;
  background: url("../../../assets/images/6x.png")no-repeat;
  background-size: 100% 100%;
}
.significants_6>div>p{
  font-size:16px;
}

.Span1{
  margin-top: 188px;
  font-size:41px;
  color:#F192B2;
  background-image: -webkit-gradient(linear, 0 0, 0 bottom, from(#F192B2), to(#E54BF2));
}
.Span2{
  margin-top: 159px;
  font-size: 34px;
  color:#0BA360;
  background-image: -webkit-gradient(linear, 0 0, 0 bottom, from(#0BA360), to(#3CBA92));
}
.Span3{
  margin-top: 159px;
  font-size: 34px;
  color:#F76A61;
  background-image: -webkit-gradient(linear, 0 0, 0 bottom, from(#F76A61), to(#F9BD4B));
}
.Span4{
  margin-top: 129px;
  font-size: 32px;
  color:#A1C4FD;
  background-image: -webkit-gradient(linear, 0 0, 0 bottom, from(#A1C4FD), to(#C2E9FB));
}
.Span5{
  margin-top: 129px;
  font-size: 32px;
  color:#666666;
  background-image: -webkit-gradient(linear, 0 0, 0 bottom, from(#666666), to(#999999));
}
.Span6{
  margin-top: 128px;
  font-size: 32px;
  color:#A1C4FD;
  background-image: -webkit-gradient(linear, 0 0, 0 bottom, from(#A1C4FD), to(#C2E9FB));
}




@keyframes breatheFrom {
  0%{opacity: .5;top: 12px;}
  25%{opacity: .82;top: 8px;}
  50%{opacity: .95;top: 5px;}
  75%{opacity: .82;top: 8px;}
  100%{opacity: .5;top: 12px;}
}
</style>
