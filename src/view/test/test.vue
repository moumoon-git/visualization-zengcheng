<template>
    <div class="audio_wrap">
      <audio :class="className" style="visibility: hidden;" @timeupdate="upDataTime($event)" >
        <source :src="src" type="audio/ogg">
        <source :src="src" type="audio/mpeg">
        您的浏览器不支持 audio 元素。
      </audio>
      <div class="control_wrap">
         <div class="playImg" @click="playAudio">
           <img v-if="playFlag" src="../../assets/images/play.png" alt="">
           <img v-if="!playFlag" src="../../assets/images/stop.png" alt="">
         </div>
<!--      播放进度控制-->
         <div class="schedule" >
<!--           :format-tooltip="formatTooltip"-->
             <el-slider @input="inputs($event)" :show-tooltip="false" v-model="durationNum"  :max="duration" ></el-slider>
         </div>
<!--        播放时间显示-->
         <div class="timeDis">{{PlayDurationTime +'/'+ durationTime}}</div>
<!--        静音-->
         <div class="mute" @click="mutes">
           <img v-if="mutesFlag" src="../../assets/images/trumpet.png" alt="">
           <img v-if="!mutesFlag" src="../../assets/images/ziyuan.png" alt="">
         </div>
<!--        下载-->
          <div class="downloadAuido" @click="dowmFile">

          </div>
      </div>
    </div>
</template>

<script>
    export default {
        name: "test",
        data () {
            return{
                src:'',
                className: '',
                thisAudio:'',
                timeOutFlag:false, //延时
                playFlag:true,    //  暂停和播放的控制
                duration:0,         //  时间  秒
                durationNum:0,
                durationTime:'00:00',
                PlayDurationTime:'00:00',
                mutesFlag:true,     //  是否静音
                readyStateFlag: false,    // 音频初始化
                Interval:''         //  实时监视播放时间
            }
        },
        methods:{
            init (src,classNmae) {
                const _that = this
                this.className = classNmae;
                // this.src = src;
                setTimeout(()=>{
                    _that.getAudio(src,_that.className)
                },100)
            },
            initpause () {
                this.thisAudio.pause()
            },
            getAudio (src,ele) {
                const _that = this
                var x = document.getElementsByClassName(ele)[0];
                this.thisAudio = x
                x.src = src
                x.oncanplay = function(v){
                  // console.log(v,x)
                }
                let readyStateInterval = setInterval(()=>{
                    if (x.readyState == 4){
                        _that.readyStateFlag = true
                        _that.duration = x.duration  // 获得整个音频的时长
                        // console.log(x.duration)
                        if (Number(x.duration) >=3600 ) {
                            _that.durationTime = _that.hour(x.duration)
                        }else{
                            _that.durationTime = _that.minute(x.duration)
                        }
                        clearInterval(readyStateInterval)
                    }else {
                        _that.readyStateFlag = false
                    }
                },200)
            },
            playAudio () {
                if (this.playFlag&&this.readyStateFlag) {
                    this.thisAudio.play()
                }else if(!this.playFlag&&this.readyStateFlag){
                    this.thisAudio.pause()
                }
                this.playFlag = !this.playFlag
            },
            actualTime (currentTime) {
                if (currentTime >= 3600) {
                    this.PlayDurationTime = this.hour(currentTime)
                }else if (currentTime < 3600){
                    this.PlayDurationTime = this.minute(currentTime)
                }
                this.durationNum = currentTime
            },
            formatTooltip(val) {
                let Time = ''
                if (val >= 3600) {
                    Time = this.hour(parseInt(val))
                }else if (val < 3600){
                    Time = this.minute(parseInt(val))
                }
                return Time;
            },
            inputs(e){
                if (this.readyStateFlag) {
                    if(this.thisAudio.currentTime >= this.duration){
                        this.durationNum = 0
                    }
                    if (parseInt(this.thisAudio.currentTime) != parseInt(e)) {
                        this.thisAudio.currentTime = e
                        // console.log(this.thisAudio.currentTime,e)
                        this.thisAudio.play()
                    }
                }
            },
            mutes () {
                if (this.mutesFlag) {
                    this.thisAudio.muted = true
                }else{
                    this.thisAudio.muted = false
                }
                this.mutesFlag = !this.mutesFlag
            },
            upDataTime (e){
                this.actualTime(e.currentTarget.currentTime)
            },
            //小时以上级别
            hour (Time) {
                let hourTimeNum = Time/3600;
                let remainder = Time%3600;
                let minutes = this.minute(parseInt(remainder));
                return this.ifNumBigTen(parseInt(hourTimeNum)) + ':' + minutes
            },
            minute (Time) {
                // 分钟以上级别
                if (Time >= 60 ) {
                    let AllTimeNum = Number(Time)
                    let minutes = parseInt(AllTimeNum/60)
                    let second = parseInt(AllTimeNum%60)
                    return this.ifNumBigTen(minutes) + ":" + this.ifNumBigTen(second)
                }else if (Time <60 ) {
                //    秒一下级别
                    return '00:'+this.ifNumBigTen(parseInt(Time))
                }
            },
            ifNumBigTen (data) {
                if (Number(data)<10) {
                    return '0'+Number(data)
                }
                return data
            },
            dowmFile () {
                var link = document.createElement('a');
                link.setAttribute("download", "");
                link.setAttribute("target", "_blank");
                link.href = this.src;
                link.click();
            }

        },
        mounted() {
            // this.init('https://webfs.yun.kugou.com/202002111600/3ce9cbcf21d28003a934022d6c60a2f7/G203/M0A/1A/01/q5QEAF49el2AfaetADM4zcKN-YU193.mp3','MyAudio')
        },
        watch:{
            durationNum:function (newValue) {

            }
        }
    }
</script>

<style scoped>
.control_wrap{
  display: flex;
  align-items: center;
}
.playImg{
  display: flex;
  align-items: center;
  margin-right: 16px;
}
.playImg>img{
  width: 15px;
  height: 17px;
  cursor: pointer;
}
.schedule{
  width: 130px;
  margin-right: 8px;
}
.schedule /deep/ .el-slider__runway{
  background: #606266;
}
.schedule /deep/ .el-slider__bar{
  background: #fff;
}
.schedule /deep/ .el-slider__button{
  border: 3px solid #fff;
  background-color: #606266;
  width: 12px;
  height: 12px;
}
.timeDis{
  color: #fff;
  margin-right: 8px;
  display: flex;
  align-items: center;
}
.mute{
  width: 20px;
  height: 20px;
  cursor: pointer;
  margin-right: 8px;
  display: flex;
  align-items: center;
}
.mute>img{
  width: 18px;
  height: 16px;
}
.downloadAuido{
  width: 17px;
  height: 18px;
  background: url("../../assets/images/dow.png")no-repeat;
  background-size: 100% 100%;
  cursor: pointer;
  display: flex;
  align-items: center;
}




</style>
