<template>
    <div class="RankingList_wrap">
      <div class="RankingList_content" :class="'list'+(index+1)" v-for="(item, index) in data" :key="index" @click="clickList(item)">
        <p>
          <span>{{index+1}}.</span>
          {{item.platformName?item.platformName:''}}
        </p>
        <p>{{item.alarmCount?item.alarmCount:0}}起</p>
      </div>
    </div>
</template>

<script>
    export default {
        name: "RankingList",
        data () {
            return{
              data:[],
                id:''
            }
        },
        methods:{
            clickList (item) {
                this.$emit('clickLists',{item,id:this.id})
            },
            init (data,id) {
                this.id = id
                this.data = data
            }
        },
        mounted() {

        }
    }
</script>

<style scoped>
.RankingList_wrap{
  width: 100%;
  height: 100%;
}
.RankingList_content{
  padding: 0 11px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 37px;
  margin-bottom: 3px;
}
.RankingList_content>p:nth-child(1){
  font-size:16px;
  font-weight:500;
  color:rgba(199,214,236,1);
}
.RankingList_content>p:nth-child(1)>span{
  font-size:16px;
  font-weight:500;
  font-style:italic;
  color:rgba(199,214,236,1);
}
.RankingList_content>p:nth-child(2){
  font-size:20px;
  font-weight:500;
  color:rgba(199,214,236,1);
}
.list1{
background: url("../../../assets/images/list1.png")no-repeat;
background-size: 100% 100%;
}
.list2{
background: url("../../../assets/images/list2.png")no-repeat;
background-size: 100% 100%;
}
.list3{
background: url("../../../assets/images/list3.png")no-repeat;
background-size: 100% 100%;
}
.list4{
background: url("../../../assets/images/list4.png")no-repeat;
background-size: 100% 100%;
}
.list5{
background: url("../../../assets/images/list5.png")no-repeat;
background-size: 100% 100%;
}
.list6{
background: url("../../../assets/images/list6.png")no-repeat;
background-size: 100% 100%;
}
.list7{
background: url("../../../assets/images/list7.png")no-repeat;
background-size: 100% 100%;
}
.list8{
background: url("../../../assets/images/list8.png")no-repeat;
background-size: 100% 100%;
}
.list9{
background: url("../../../assets/images/list9.png")no-repeat;
background-size: 100% 100%;
}
.list10{
background: url("../../../assets/images/list10.png")no-repeat;
background-size: 100% 100%;
}
.list11{
background: url("../../../assets/images/list11.png")no-repeat;
background-size: 100% 100%;
}
.list12{
background: url("../../../assets/images/list12.png")no-repeat;
background-size: 100% 100%;
}
</style>
