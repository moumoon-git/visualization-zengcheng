<template>
  <div class="popUpWindows_wrap" >
    <div class="borwrap">
      <img class="activeImg" @click="closeDiv" src="../../../../../../assets/images/cszh/cl.png" alt="">
      <div class="wrap" >
        <span>标题</span>
        <input type="text" v-model="inpval" >
      </div>
      <div class="wrap" >
        <span>工单描述</span>
        <textarea name="" id="" cols="30" rows="10" v-model="remarck" ></textarea>
      </div>
      <button class="saveBtn" @click="clickSaveBtn" >保存</button>
    </div>


  </div>
</template>

<script>
  export default{
    name:'popUpWindows',
    data () {
      return {
        inpval:'',
        remarck:''
      }
    },
    methods:{
      closeDiv () {
        this.$emit('closeThis','')
      },
      clickSaveBtn () {
        this.$emit('clickSaveBtns',{inpval:this.inpval,remarck:this.remarck})
      },
      init (data) {
        this.inpval = data.name
        this.remarck = data.remark
      }
    },
    mounted () {

    }
  }
</script>

<style scoped>

.popUpWindows_wrap{
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right:0;
  margin: auto;
  width:616px;
  height:397px;
  background: url('../../../../../../assets/images/cszh/bigbor.png')no-repeat;
  background-size: 100% 100%;
}
.borwrap{
  width: 72%;
  height: 93%;
  margin: auto;
  box-shadow:3px 5px 13px 0px rgba(3,28,58,1);
  opacity:0.8;
  padding: 20px 96px 0 62px;
  margin-top: 4px;
  position: relative;
}
.activeImg{
  position: absolute;
  top: 10px;
  right: 10px;
  cursor: pointer;
}
.wrap{
  margin-top: 35px;
  display: flex;
}
.wrap>span{
  width: 20%;
  font-size:18px;
  font-weight:400;
  color:rgba(0,242,255,1);
}
.wrap>input{
  width: 80%;
  height:26px;
  border: none;
  background: url('../../../../../../assets/images/cszh/btx.png')no-repeat;
  background-size: 100% 100%;
  outline: none;
  padding-left: 10px;
  font-size:14px;
  font-weight:300;
  color:rgba(196,214,238,1);
}
.wrap>textarea{
  height:190px;
  width: 80%;
  border: none;
  background: url('../../../../../../assets/images/cszh/msx.png')no-repeat;
  background-size: 100% 100%;
  outline: none;
  padding: 20px 10px;
  font-size:14px;
  font-weight:300;
  color:rgba(196,214,238,1);
  box-sizing: border-box;
}
.saveBtn{
  width:82px;
  height:26px;
  margin: auto;
  display: block;
  background: url('../../../../../../assets/images/cszh/li2.png')no-repeat;
  border: none;
  outline: none;
  font-size:16px;
  font-weight:400;
  color:rgba(0,242,255,1);
  margin-top: 30px;
  cursor: pointer;
}


</style>
