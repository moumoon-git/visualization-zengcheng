<template>
    <div  class="schoolTopNum_wrap">
       <div  class="schoolTopNumx">
         <div v-if="num.length<5" v-for="(item,index) in 5-num.length" >0</div>
         <div v-for="(item,index) in num" :key="index">{{item}}</div>
         <div>件</div>
       </div>
      <div class="responds" v-if="$store.state.selectBtn == 'estate'" >
        <div>已处理{{percentageNum}}件</div>
        <div>处理率{{percentage}}</div>
      </div>
    </div>
</template>

<script>
    export default {
        name: "schoolTopNum",
        data () {
            return{
               num:'0',
               percentage: '0%',
               percentageNum: 0
            }
        },
        methods:{
            initNum (num) {
              console.log(num)
                this.num = num+''
            },
            initPercentage (data = [0,0]) {
              this.percentage = data[1]
              this.percentageNum = data[0]
              console.log(data[0],data[1])
            }
        },
        mounted() {

        }
    }
</script>

<style scoped>
.schoolTopNum_wrap{
  width: 100%;
  height: 100%;
  background: url('../../../assets/images/allNumBor.png')no-repeat;
  background-size: 100% 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}
.schoolTopNumx{
  display: flex;
  align-items: center;
  justify-content: center;
}
.schoolTopNumx>div{
  width:44px;
  height:58px;
  background: url("../../../assets/images/numBor.png")no-repeat;
  background-size: 100% 100%;
  font-size:40px;
  font-weight:bold;
  font-style:italic;
  color:rgba(254,246,87,1);
  display: flex;
  align-items: center;
  padding-left: 5px;
  box-sizing: border-box;
}
.schoolTopNumx>div:last-child{
  background: none;
  display: flex;
  align-items: flex-end;
  font-size:24px;
  font-weight:500;
  font-style: normal;
}
.responds{
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 74%;
  margin-top: 15px;
}
.responds>div:nth-child(1){
  font-size:22px;
  font-weight:400;
  color:rgba(255,255,255,1);
}
.responds>div:nth-child(2){
  font-size:22px;
  font-weight:400;
  color:rgba(107,238,252,1);
}
</style>
