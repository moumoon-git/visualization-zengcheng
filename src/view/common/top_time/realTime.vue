<template>
    <div class="realTime_wrap">
      <div class="realTime_content">
        <ul class="realTime_content_left">
          <li>{{date.split('')[0]}}</li>
          <li>{{date.split('')[1]}}</li>
          <li>:</li>
          <li>{{date.split('')[3]}}</li>
          <li>{{date.split('')[4]}}</li>
        </ul>
        <div class="realTime_content_right">
          <p>{{Day}}</p>
          <p>{{dateDay}}</p>
        </div>
      </div>
    </div>
</template>

<script>
    export default {
        name: "realTime",
        data () {
            return{
              date: '',
              dateDay:'',
              time: '',
              month: new Date(),
              Day:'星期一'
            }
        },
        mounted () {
          let that = this
          setInterval(()=>{
              that.month = new Date()
              that.num(new Date().toTimeString().split(' ')[0])
              if (that.isIE()) {
                  let reg = new RegExp("[\u4E00-\u9FA5]+",'g');
                  let date = new Date().toLocaleDateString()
                  let str = date.replace(reg,'-').substr(0,date.length-1)
                  that.dateDay = str.trim()
              }else{
                that.dateDay =new Date().toLocaleDateString('zh-hans-cn').replace(/\//gi,'-')
              }
              that.Day = that.isDay(String(that.month).split(' ')[0])
          },1000)
        },
        methods:{
            num (data) {
                if (data) {
                    data = data.split(':')[0]+ ':' + data.split(':')[1]
                    let timeArr = data.split(':');
                    // console.log(data,timeArr)

                    // for (let i = 0;i<timeArr.length;i++){
                    //     timeArr[i] = this.isNumTen(timeArr[i])
                    // }
                    this.date = timeArr.join(':')
                    // console.log(this.date)
                }
            },
            isNumTen (data) {
                if (data<10) {
                    return '0' + data
                }
                return data
            },
            isDay (data) {
                if (data == 'Mon') {
                    return '星期一'
                }else if (data == 'Tue') {
                    return '星期二'
                }else if (data == 'Wed') {
                    return '星期三'
                }else if (data == 'Thu') {
                    return '星期四'
                }else if (data == 'Fri') {
                    return '星期五'
                }else if (data == 'Sat') {
                    return '星期六'
                }else if (data == 'Sun') {
                    return '星期七'
                }
            },
            isIE () { //ie?
                if (!!window.ActiveXObject || "ActiveXObject" in window)
                { return true; }
                else
                { return false; }
            }
        }
    }
</script>

<style scoped lang="less">
.realTime_wrap{
  width: 255px;
  height: 40px;
  margin-left: 10px;
}
.realTime_content{
  display: flex;
  align-items: center;
  text-shadow: 0 0 0.2em lightskyblue;
}
.realTime_content_left{
  font-family: 'numStyle';
  color: #fff;
  display: flex;
  overflow: hidden;
  margin: 0;
  margin-right: 11px;
  padding: 0;
}
.realTime_content_left>li{
  font-size: 44.55px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  width: 27px;
  background: url('../../../assets/images/timeNum.png');
  background-position: 0 -1px;
  margin-right: 6px;
  font-weight: 500;
}
.realTime_content_left>li:nth-child(3){
  font-family: "Pang";
  margin-top: -8px;
  background: none;
  color: #1A52EE;
  width: 10px;
}
.realTime_content_left>li:last-child{
  margin-right: 0;
}
.realTime_content_right{
  height: 35px;
  color: #fff;
  font-family: 'numStyle';
  font-size: 18px;
  overflow: hidden;
  margin-top: -2px;
  font-weight: bold;
  letter-spacing: 1px;
}
.realTime_content_right>p{
  margin: 0;
  padding: 0;
}
.realTime_content_right>p:first-child{
  font-size: 14px;
  font-weight: 700;
}
</style>
