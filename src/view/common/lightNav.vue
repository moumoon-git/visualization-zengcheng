<template>
  <div class="lightNav_wrap">
      <div class="lightNav_left">光明区疫情看板</div>
      <div class="lightNav_content">

      </div>
      <div class="lightNav_right">
        <div class="timeDiv">
         {{dates+' '+ strs }}
        </div>
        <div class="tabBtns">
          <span v-for="(item, index) in data" :key='index' :class="item.flag?'active':''" @click="changes(item,index)" >{{item.name}}</span>
        </div>
      </div>
  </div>
</template>

<script>
  export default {
    name:'lightNav',
    data () {
      return {
        dates:'',
        strs:'',
        data:[
          {name:'疫情统计',flag:true},
          {name:'防控情况',flag:false},
        ]
      }
    },
    methods:{
      changes (item,index) {
        this.data.forEach(ele=>{
          ele.flag = false
        })
        item.flag = true
        if (index == 0) {
          this.$router.push({path:'Outbreak'})
        }else {
          this.$router.push({path:'Outbreaks'})
        }
      },
      Time () {
        let time = new Date()
        let Dates = time.toLocaleDateString().replace(/\//g,'-')
        let Times = time.toLocaleTimeString().substr((2))
        let str = Times.split(':')[0]+':'+Times.split(':')[1]
        this.dates = Dates
        this.strs = str
        // console.log(Dates,str)
      }
    },
    mounted() {
      this.Time()
    }
  }
</script>

<style scoped>
.lightNav_wrap{
  width:1920px;
  height:70px;
  display: flex;
  background:linear-gradient(90deg,rgba(64,145,248,1) 0%,rgba(0,189,249,1) 100%);
}
.lightNav_left{
  display: flex;
  align-items: center;
  width: 257px;
  font-size: 36px;
  color:rgba(255,255,255,1);
  margin-left:30px ;
}
.lightNav_content{
  flex: 1;
}
.lightNav_right{
  width: 531px;
  display: flex;
  align-items: center;
}
.timeDiv{
  font-size:24px;
  color:rgba(255,252,252,1);
  line-height:33px;
  margin-right: 18px;
}
.tabBtns{
  display: flex;
  width:262px;
  height:31px;
  background:rgba(255,255,255,1);
  font-size:20px;
  font-weight:normal;
  color:rgba(153,153,153,1);
  border-radius: 3px;
  box-sizing: border-box;
}
.tabBtns>span{
  display: flex;
  flex: 1;
  align-items: center;
  justify-content: center;
  position: relative;
  cursor: pointer;
}
.tabBtns>span:nth-child(1):before{
  content: '';
  position: absolute;
    top: 0;
    bottom: 0;
    margin: auto;
    right: 0;
    width:1px;
    height:16px;
    background:rgba(216,216,216,1);
}
.tabBtns>.active{
  color: #0091FF;
}


</style>
