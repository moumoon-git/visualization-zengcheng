<template>
  <div>
    <iframe width="0" height="0" id="url"></iframe>
  </div>
</template>

<script>
export default {
  name: "videoPreview",
  data() {
    return {
      SvrIp: '',
      SvrPort: '',
      Appkey: '',
    }
  },
  mounted(){
    this.initData()
  },
  methods: {
    initData(){
       this.apix({
        url: "/risk/riskcamera/getEncryptionInfor",
        method: "get"
      }).then(res => {
        // console.log("dhaskjhdkashdjkashdjka", res);
        if (res && res.code == 0) {
          let msg = res.msg
          if (msg){
            this.SvrIp = msg.hostPortUrl.substring(0,msg.hostPortUrl.lastIndexOf(':'))
            this.SvrPort = msg.hostPortUrl.substring(msg.hostPortUrl.lastIndexOf(':')+1)
            this.Appkey = msg.key

          }
        }
      });
    },
    videoPreview(obj) {
      console.log('obj',obj)
      this.apix({
        url: "/risk/riskcamera/getEncryptionProtocol",
        method: "get"
      }).then(res => {
        // console.log("dhaskjhdkashdjkashdjka", res.data.code == 0);
          // console.log(res);
        if (res && res.code == 0) {
          if (res.data) {
            var result = res.data;
             var param =
            "hikvideoclient://ReqType:" +
            "PlayReal" +
            ";" +
            'VersionTag:artemis' + 
            ';' +
            "SvrIp:" +
            this.SvrIp +
            ";" +
            "SvrPort:" +
            this.SvrPort +
            ";" +
            "Appkey:" +
            this.Appkey +
            ";" +
            "AppSecret:" +
            result.appSecret +
            ";" +
            "time:" +
            result.time +
            ";" +
            "timesecret:" +
            result.timeSecret +
            ";" +
            "httpsflag:" +
            1 +
            ";" +
            "CamList:" +
            obj.indexCode +
            ";";
            //如果初始化传了WndCont值 这里也需要传 如demo中设置了WndCont:1  这里也要传WndCont:1  如果使用默认四窗口则可以不传

            // this.play_ocx_do(param);
            document.getElementById("url").src = param;
          }
        } else {
          this.$message.error(res.msg);
        }
      });
    }
  }
};
</script>

<style scoped>
</style>