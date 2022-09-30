<template>
    <div class="timelineBig_wrap">

      <div class="timeline_wrap" v-for="(item,index) in data" :key="index" :class="index==0&&activeFlag?'anmaid':''" >
        <h5>{{item.alarmTime}} <img src="" alt="">{{item.cameraName}}</h5>
        <div class="timeline_content " :class="index==0?'timeline_contentActive':''" >
         <div class="timeline_content_img">
           <div  @click.stop="">
             <img
               class="BigImg"
               :data-original="item.bkgPicUrl"
               :src="item.bkgPicMinUrl" >
           </div>
           <div  @click.stop="">
             <img
               class="BigImg"
               :data-original="item.bkgPicUrl"
               :src="item.bkgPicMinUrl" >
           </div>
         </div>
         <div class="timeline_Info" v-if="timeline_InfoFlag && str == 'human'">
           <p>{{item.humanName}}</p>
           <p>{{item.idCard.substr(0,4)+'****'+item.idCard.substr(item.idCard.length-4)}}</p>
         </div>

          <div class="timeline_Info" v-if="timeline_InfoFlag && str == 'car'" >
            <p>{{item.plateInfo}}</p>
          </div>

        </div>
      </div>


    </div>
</template>

<script>
  import bus from "../../../assets/js/bus";
    export default {
        name: "timeline",
        data () {
            return{
               data:[],
               activeFlag:true,
               timeline_InfoFlag:false,
               getBottomFlag:true,
                str : this.$store.state.selectBtn
            }
        },
        methods:{
            init (data) {
                this.data = data
            },
            inits (data,type,page) {
                this.data = data
                this.timeline_InfoFlag = true
                this.scroll(type,page)
            },
            initConnects (data,type,page) {
                let datas = this.data.concat(data)
                this.getBottomFlag = true
                this.inits (datas,type,page)
            },
            scroll (type,isTop) {
                let scroll = document.getElementsByClassName('el-scrollbar__wrap')[0]
                // console.log(scroll.scrollTop)
                let _that = this
                if(isTop == 1){
                  scroll.scrollTop = 1
                }
                scroll.addEventListener('scroll', function (e) {
                  // console.log((parseInt(e.target.clientHeight) + parseInt(e.target.scrollTop)),parseInt(e.target.scrollHeight))
                    if ((parseInt(e.target.clientHeight) + parseInt(e.target.scrollTop)) === parseInt(e.target.scrollHeight)) {
                        if (_that.getBottomFlag){
                            _that.getBottomFlag = false
                            console.log("到底")
                            _that.Timeout = setTimeout(function () {
                                if (type == 'Camera') {
                                  if (_that.$store.state.selectBtn == 'human') {
                                      bus.$emit('Camera','human')
                                  }else if (_that.$store.state.selectBtn == 'car') {
                                      bus.$emit('Camera','car')
                                  }
                                }else if (type == 'Cameras') {
                                  if (_that.$store.state.selectBtn == 'human') {
                                      bus.$emit('Cameras','human')
                                  }else if (_that.$store.state.selectBtn == 'car') {
                                      bus.$emit('Cameras','car')
                                  }
                                }
                            },500)
                        }
                    }
                })
            },
        },
        mounted() {

        },
        watch:{
            data:function (newVlue) {
                // console.log(newVlue)
                this.$nextTick(() => {
                    this.$viewer()
                });
            }
        }
    }
</script>

<style scoped>
.timelineBig_wrap{
  padding: 0 42px;
}
.timelineBig_wrap>div:last-child:before{
  height: 0;
}
.timeline_wrap{
  height: 120px;
  width: 100%;
  position: relative;
  padding-left: 32px;
  box-sizing: border-box;
  background: rgba(7,22,75,.5);
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}
.timeline_wrap:after{
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width:14px;
  height:14px;
  border-radius:50%;
  background: url("../../../assets/images/ty.png")no-repeat;
  background-size: 100% 100%;
}
.timeline_wrap:before{
  content: '';
  position: absolute;
  top: 10px;
  left: 7px;
  width:1px;
  height:115px;
  background:linear-gradient(-30deg,rgba(42,171,236,1),rgba(68,234,170,1));
}
.timeline_wrap>h5{
  font-size:14px;
  font-weight:500;
  color:rgba(237,243,252,1);
  margin: 0;
  margin-bottom: 15px;
}
.timeline_wrap>h5>img{

}
.timeline_content{
  display: flex;
}
.timeline_content_img{
  display: flex;
}
.timeline_content_img>div:nth-child(1){
  margin-right: 5px;
}
.timeline_content img{
  width:63px;
  height:40px;
  background:rgba(0,0,0,1);
  opacity:0.33;
  cursor: pointer;
}
.anmaid{
  animation: hei 1.5s;
}
@keyframes  hei {
  from{height: 0px;}
  to{height: 120px;}
}
.timeline_contentActive img{
  width:86px;
  height:55px;
  opacity: 1;
}
.timeline_Info{
  padding-bottom: 2px;
  box-sizing: border-box;
  margin-left: 13px;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
}
.timeline_Info>p{
  margin: 0;
  font-size:14px;
  font-weight:400;
  color:rgba(199,214,236,1);
  line-height: 1;
}
.timeline_Info>p:nth-child(1){
  margin-bottom: 8px;
}

</style>
