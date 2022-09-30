<template>
    <div class="command_wrap">
       <div class="left_content">
          <leftContent></leftContent>
       </div>
       <div class="right_content">
         <div class="right_content_top">
           <rightContentTopLeft ref="rightContentTopLeft" ></rightContentTopLeft>
           <div style="margin-left: 56px;flex: 1;height: 565px;">
             <rightContentTopRight  ref="rightContentTopRight"></rightContentTopRight>
           </div>
         </div>
         <div class="right_content_bottom">
           <rightContentBottom ref="rightContentBottom" ></rightContentBottom>
         </div>
       </div>
    </div>
</template>

<script>
  import leftContent from "./left/left_content";
  import rightContentTopLeft from './right/right_content_top_left';
  import rightContentTopRight from "./right/right_content_top_right";
  import rightContentBottom from "./right/right_content_bottom";
  import allUrl from "../../assets/api/allApiUrl";
    export default {
        name: "command",
        data () {
            return{
                startTime: this.$store.state.startTime,
                endTime: this.$store.state.endTime,
                humanListData:[],
                carListData:[]
            }
        },
        components:{
            leftContent,
            rightContentTopLeft,
            rightContentTopRight,
            rightContentBottom
        },
        methods:{
            //    要情动态
            emergencyinfos (startTime,endTime,page,limit) {
                let data = allUrl.emergencyinfo,s={params:{
                        startTime,
                        endTime,
                        page,
                        limit
                    }}
                Object.assign(data,s) // 合并对象, 只是把参数搞成对象形式 {}
                this.apix(data)
                    .then((res)=>{
                        // console.log(res.page.list)
                        this.$refs.rightContentBottom.bottomLeftInit(res.page.list)
                    })
                    .catch((err)=>{
                        console.log(err)
                    })
            },
        //    风险预警
            risk (startTime,endTime,page,limit) {
                let data = allUrl.tyAlarm,s={params:{
                        startTime,
                        endTime,
                        page,
                        limit
                    }}
                Object.assign(data,s) // 合并对象, 只是把参数搞成对象形式 {}
                this.apix(data)
                    .then((res)=>{
                        // console.log(res.data.list)
                        this.$refs.rightContentBottom.bottomRightInit(res.data.list)
                    })
                    .catch((err)=>{
                        console.log(err)
                    })
            },
        //    智能采集人
            humanWorkOrderNums (startTime,endTime) {
                let data = allUrl.humanWorkOrderNum,s={params:{startTime,endTime}}
                Object.assign(data,s) // 合并对象, 只是把参数搞成对象形式 {}
                this.apix(data)
                    .then((res)=>{
                        // console.log(res.data,this.$refs.rightContentTopLeft)
                        this.$refs.rightContentTopLeft.setHumanListData(res.data)
                    })
                    .catch((err)=>{
                        console.log(err)
                    })
            },
            vehicleWorkOrderNums (startTime,endTime) {
                let data = allUrl.vehicleWorkOrderNum,s={params:{startTime,endTime}}
                Object.assign(data,s) // 合并对象, 只是把参数搞成对象形式 {}
                this.apix(data)
                    .then((res)=>{
                        // console.log(res.data)
                        this.$refs.rightContentTopLeft.setCarListData(res.data)
                    })
                    .catch((err)=>{
                        console.log(err)
                    })
            },
            //校园和物业
            selectfxdtSchoolAndConpanys (startTime,endTime,platformTypeId) {
                let data = allUrl.selectfxdtSchoolAndConpany,s={params:{
                        startTime,
                        endTime,
                        platformTypeId
                    }}
                Object.assign(data,s) // 合并对象, 只是把参数搞成对象形式 {}
                this.apix(data)
                    .then((res)=>{
                        // console.log(res)
                        if (platformTypeId == 5) {
                        //    判断是不是小区
                           this.$refs.rightContentTopLeft.housingInit(res.data)
                        }else if (platformTypeId == 6) {
                        //    判断是不是学校
                           this.$refs.rightContentTopLeft.schoolInit(res.data)
                        }
                    })
                    .catch((err)=>{
                        console.log(err)
                    })
            }

        },
        mounted() {

        },
        computed: {
            myValue() {
                return [this.$store.state.startTime,this.$store.state.endTime]
            }
        },
        watch:{
            myValue: function(newVal, oldVal) {
                // 监听到全局的时间发生改变
                console.log(newVal)
                this.startTime = newVal[0]
                this.endTime = newVal[1]
                this.emergencyinfos(newVal[0],newVal[1],1,7)
                this.risk(newVal[0],newVal[1],1,7)
                this.humanWorkOrderNums(newVal[0],newVal[1])
                this.vehicleWorkOrderNums(newVal[0],newVal[1])
                this.selectfxdtSchoolAndConpanys(newVal[0],newVal[1],5)
                this.selectfxdtSchoolAndConpanys(newVal[0],newVal[1],6)
                this.$refs.rightContentTopRight.init()
            }
        }
    }
</script>

<style scoped>
.command_wrap{
  flex: 1;
  width: 100%;
  min-height: 942px;
  height: 100%;
  padding: 42px 48px 35px;
  box-sizing: border-box;
  display: flex;
  background: none;
}
.left_content{
  width: 465px;
  margin-right: 49px;
}
.right_content{
  flex: 1;
  display: flex;
  flex-direction: column;
}
.right_content_top{
  height: 566px;
  display: flex;
  align-items: flex-start;
}
.right_content_bottom{
  flex: 1;
  margin-top: 8px;
}

</style>
