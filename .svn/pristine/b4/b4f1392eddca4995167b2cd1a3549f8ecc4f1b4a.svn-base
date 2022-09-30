<template>
    <div class="selectCity_big_wrap">
      <div class="selectCity_wrap">
        <el-select v-model="value" :placeholder="placeholders" @change="seletct" >
          <el-option
            v-for="item in cities"
            :key="item.id"
            :label="item.townName"
            :value="item.id"
          >
            <span style="float: left">{{ item.townName }}</span>
          </el-option>
        </el-select>
      </div>
    </div>
</template>

<script>
  import allUrl from "../../../assets/api/allApiUrl";
  export default {
      name: "selectCity",
      data () {
         return {
           cities: [{id:'',townName:''}],
           value: '',
           placeholders:''
         }
      },
      methods:{
        init (data){
          let obj = {
            townName:this.placeholders,
            id:0
          }
          data.push(obj)
          this.cities = data
          // console.log(data)
        },
        seletct (item) {
          // console.log(item)
          this.$emit('transferID',item)
        },
        userInfos () {
          let data = allUrl.userInfo,s={}
          Object.assign(data,s) // 合并对象, 只是把参数搞成对象形式 {}
          this.apix(data)
            .then((res)=>{
              if (res.platform) {
                this.placeholders = res.platform.townName
              }
            })
            .catch((err)=>{
              console.log(err)
            })
        }
      },
      mounted () {
        this.userInfos()
      }
  }
</script>

<style scoped>
.selectCity_wrap /deep/ .el-input__inner{
  border: none;
  background: url("../../../assets/images/xsl.png")no-repeat;
  background-size: 100% 100%;
  width:207px;
  height:38px;
}
.selectCity_wrap /deep/ .el-select .el-input .el-select__caret{
  transform: rotateZ(0deg);
  position: relative;
}
.selectCity_wrap /deep/ .el-icon-arrow-up:before{
  content: '';
  background: url("../../../assets/images/bottomjt.png")no-repeat;
  background-size: 100% 100%;
  width:10px;
  height:6px;
  position: absolute;
  top: 16px;
  right: 8px;
}





</style>
