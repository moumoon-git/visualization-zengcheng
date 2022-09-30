<template>
    <div>
      
      <div class="fromHeader flex">
        <div>序号</div>
        <div>相机名称</div>
        <div>抓拍次数</div>
      </div>

      <div v-for="(item, index) in Data" :key="index" @click="transfer(item)">
        <div class="fromBody flex fromBodyOne" v-if="index==0">
          <div><span>{{index+1}}</span></div>
          <div>{{item.cameraName}}</div>
          <div v-if="$store.state.selectBtn == 'car'" >{{item.num}}</div>
          <div v-else >{{item.num}}</div>
        </div>

        <div class="fromBody flex fromBodyTwo" v-else-if="index==1">
          <div><span>{{index+1}}</span></div>
          <div>{{item.cameraName}}</div>
          <div v-if="$store.state.selectBtn == 'car'" >{{item.num}}</div>
          <div v-else >{{item.num}}</div>
        </div>

        <div class="fromBody flex fromBodyThree" v-else-if="index==2">
          <div><span>{{index+1}}</span></div>
          <div>{{item.cameraName}}</div>
          <div v-if="$store.state.selectBtn == 'car'" >{{item.num}}</div>
          <div v-else >{{item.num}}</div>
        </div>

        <div class="fromBody flex" v-else>
          <div><span>{{index+1}}</span></div>
          <div>{{item.cameraName}}</div>
          <div v-if="$store.state.selectBtn == 'car'" >{{item.num}}</div>
          <div v-else >{{item.num}}</div>
        </div>
      </div>

      <!-- 视频预览 -->
      <videoPreview ref="videoPreviewVisiable"></videoPreview>

    </div>
</template>

<script>
import videoPreview from "../../visual/visualTampl/tools/videoPreview";
    export default {
        name: "rankingListx",
        components: {
            videoPreview,
        },
        data () {
            return{
                Data:[{cameraName:'',alarmcount:''}],
                map:"",
            }
        },
        methods:{
            init (data,map) {
                this.map = map;
                var len = data.length;
                if (this.$store.state.selectBtn == 'car') {
                  for (var i = 0; i < len-1; i++) {
                      for (var j = 0; j < len - 1 - i; j++) {
                          if (data[j].num > data[j + 1].num) {
                              var temp = data[j+1];
                              data[j+1] = data[j];
                              data[j] = temp;
                          }
                      }
                  }
                }else{
                  for (var i = 0; i < len-1; i++) {
                      for (var j = 0; j < len - 1 - i; j++) {
                          if (data[j].num > data[j + 1].num) {
                              var temp = data[j+1];
                              data[j+1] = data[j];
                              data[j] = temp;
                          }
                      }
                  }
                }
               this.Data = data.reverse()
           },
           transfer (item) {
               console.log('item: ', item);
               let that = this
               let cameraMarker = this.$store.state.cameraMarker
               if (cameraMarker[item.id]) {
                   this.map.remove(cameraMarker[item.id])
                   delete cameraMarker[item.id]
                   this.$store.commit("cameraMarker",cameraMarker)
               }else{
                //    console.log('item: ', item);

                    // author:xuchuangxing lastUpdateTime:2021/6/4 添加摄像头标绘 并添加右击鼠标预览监控
                   let imgUrl = require("@/assets/images/cszh/spicon.png");
                   var endIcon = new AMap.Icon({
                        size: new AMap.Size(40, 40),
                        image: imgUrl,
                        imageSize: new AMap.Size(40, 40),
                        imageOffset: new AMap.Pixel(0, 0),
                    });
                   let position = [
                    item.longitude,
                    item.latitude,
                  ];
                  if (this.$store.state.isTianditu) {
                    const transformedPath = GCJ02ToWGS84(position[0], position[1]);
                    position = new AMap.LngLat(transformedPath.lng, transformedPath.lat);
                  }
                  // 将 icon 传入 marker
                  var endMarker = new AMap.Marker({
                    position,
                    icon: endIcon,
                    offset: new AMap.Pixel(-20, -40),
                  });
                  this.map.add(endMarker)
                  let obj = {
                  }
                  obj[item.id] = endMarker
                  Object.assign(cameraMarker,obj)
                  this.$store.commit("cameraMarker",cameraMarker)

                  endMarker.on("click", function (e) {
                    that.$refs.videoPreviewVisiable.videoPreview(item);
                  });
               }
            //    this.$emit('transfer',item)
           },
        },
    }
</script>

<style scoped>
.flex{
  display: flex;
}
.fromHeader{
  color: #C7D6EC;
  font-size: 12px;
  width: 100%;
  padding-left: 30px;
  box-sizing: border-box;
  height: 34px;
  align-items: center;
}
.fromHeader>div{
  flex: 1;
}
.fromHeader>div:nth-child(2){
  flex: 2;
}
.fromBody{
  width: 100%;
  padding-left: 30px;
  box-sizing: border-box;
  align-items: center;
  height: 39px;
  border-bottom: 1px solid rgba(21,61,150,0.8);
  color: #FCF9F9;
}
.fromBody>div{
  flex: 1;
  font-size: 12px;
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
}
.fromBody>div:nth-child(2){
  flex: 2;
}
.fromBody>div:nth-child(1)>span{
  display: block;
  width:18px;
  height:21px;
  line-height: 21px;
  text-align: center;
  color: #FCF9F9;
}
.fromBodyOne{
  color: #F54E57;
}
.fromBodyOne>div:nth-child(1)>span{
  background:rgba(245,78,87,1);
}
.fromBodyTwo{
  color: #FC914C;
}
.fromBodyTwo>div:nth-child(1)>span{
  background:#FC914C;
}
.fromBodyThree{
  color: #F1AD3A;
}
.fromBodyThree>div:nth-child(1)>span{
  background:#F1AD3A;
}



 




</style>
