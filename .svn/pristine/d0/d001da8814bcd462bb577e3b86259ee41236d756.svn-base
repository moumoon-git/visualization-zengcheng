<template>
    <div class="border_wrap HeaderInformation_wrap">

      <div>
        <p>{{count}}</p>
        <p>抓拍相机</p>
      </div>
      <div>
        <p>{{allcount}}</p>
        <p>抓拍总数</p>
      </div>

    </div>
</template>

<script>
    export default {
        name: "HeaderInformation",
        data () {
            return{
                count:0,
                allcount: 0
            }
        },
        methods:{
           init (data) {
               let num = 0
               data.forEach(ele=>{
                   num += ele.alarmcount
               })
               this.count = data.length
               this.allcount = num
           }
        },
        mounted() {

        }
    }
</script>

<style scoped lang="less">
.HeaderInformation_wrap{
  width:373px;
  height:145px;
  margin: auto;
  display: flex;
  align-items: center;
  justify-content: space-around;
  padding: 0 10px;
  box-sizing: border-box;
  div{
    width:152px;
    height:90px;
    background: #000;
    display: flex;
    align-items: center;
    flex-direction: column;
    justify-content: center;
    p{
      margin: 0;
      color: #D9D5ED;
      text-align: center;
    }
    p:nth-child(1){
      font-size: 30px;
    }
    p:nth-child(2){
      font-size: 20px;
    }
  }
  div:nth-child(1){
    background: url("../../../assets/images/carBgr2.png")no-repeat;
    background-size: 100% 100%;
  }
  div:nth-child(2){
    background: url("../../../assets/images/carBgr.png")no-repeat;
    background-size: 100% 100%;
  }
}







</style>
