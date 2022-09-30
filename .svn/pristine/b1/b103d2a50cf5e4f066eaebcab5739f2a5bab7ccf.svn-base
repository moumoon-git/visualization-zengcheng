<template>
    <div class="schoolTop_Wrap">
      <div class="underlineTitle">{{title}}</div>
      <div class="top_div"  v-for="(item, index) in data" :key="index" @click="selects(item)" >
        <div class="top_div_wrap" v-if="index==0" :class="index==0?'Color1':''" >
          <div>{{index+1}}</div>
          <div><span>{{item.typeName}}</span><span>{{item.count}}件</span></div>
        </div>
        <div class="top_div_wrap"  v-else-if="index==1" :class="index==1?'Color2':''" >
          <div>{{index+1}}</div>
          <div><span>{{item.typeName}}</span><span>{{item.count}}件</span></div>
        </div>
        <div class="top_div_wrap" v-else-if="index==2" :class="index==2?'Color3':''" >
          <div>{{index+1}}</div>
          <div><span>{{item.typeName}}</span><span>{{item.count}}件</span></div>
        </div>
        <div class="top_div_wrap"  v-else >
          <div>{{index+1}}</div>
          <div><span>{{item.typeName}}</span><span>{{item.count}}件</span></div>
        </div>
      </div>
    </div>
</template>

<script>
    export default {
        name: "schoolTop",
        data () {
            return{
                data:[],
                title:''
            }
        },
        methods:{
            init (data,title) {
                var len = data.length;
                for (var i = 0; i < len-1; i++) {
                    for (var j = 0; j < len - 1 - i; j++) {
                        if (data[j].count > data[j + 1].count) {
                            var temp = data[j];
                            data[j] = data[j+1];
                            data[j+1] = temp;
                        }
                    }
                }
                let Data = data.reverse()
                this.data = Data.slice(0,5)
                this.title = title
            },
            selects (item) {
              // console.log(item)
              this.$emit('clickSchoolTop',item)
            }
        },
        mounted() {

        }
    }
</script>

<style scoped>
.schoolTop_Wrap>.underlineTitle{
  background: url("../../../assets/images/xs.png")no-repeat;
  background-position: 14px 0;
  margin-bottom: 6px;
}
.top_div{
  margin-bottom: 13px;
}
.top_div_wrap{
  padding: 0 10px;
  box-sizing: border-box;
  display: flex;
  align-items: center;
  width: 100%;
}
.top_div_wrap>div:nth-child(1){
  line-height: 28px;
  width:27px;
  height:28px;
  font-size:18px;
  font-weight:bold;
  color: #FFFFFF;
  font-style:italic;
  padding-left: 5px;
  box-sizing: border-box;
}
.top_div_wrap>div:nth-child(2){
  padding: 4px 9px;
  flex: 1;
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size:16px;
  color:rgba(255,255,255,1);
  border-radius:3px;
  background: url("../../../assets/images/daf.png")no-repeat;
  background-size: 100% 100%;
}
.Color1>div:nth-child(1){
  color:rgba(235,75,87,1);
}
.Color1>div:nth-child(2){
  background-color: #198D9A; /* 不支持线性的时候显示 */
  background-image: linear-gradient(to right, #198D9A , #0E74AE);
}
.Color2>div:nth-child(1){
  color:#FC914C;
}
.Color2>div:nth-child(2){
  background-color: #4C6FA8; /* 不支持线性的时候显示 */
  background-image: linear-gradient(to right, #4C6FA8 , #4B4AAB);
}
.Color3>div:nth-child(1){
  color:#F1AD3A;
}
.Color3>div:nth-child(2){
  background-color: #776A9D; /* 不支持线性的时候显示 */
  background-image: linear-gradient(to right, #776A9D , #554D8B);
}





</style>
