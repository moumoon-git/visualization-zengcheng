<template>
  <el-dialog
    class="view-dialog"
    title="查看工单"
    :close-on-click-modal="false" @close="imgDialogVisible=false"
    :visible.sync="visible"
    width="600px"
    :modal="false">

    <div class="wordmanager-view">
      <el-row :gutter="24">
        <!--右边是事件历史记录-->
        <el-col :span="24">
          <div class="word-history-record">
            <!--历史记录时间线-->
            <div class="block">
              <el-timeline>
                <el-timeline-item
                  v-for="(activity, index) in eventHistoryRecordArray"
                  :key="index"
                  :color="activity.color"
                  :timestamp="activity.gmtCreate"
                  placement="top">
                  <el-card>
                    <h4 v-if="activity.eventStatusAfter == 1">工单状态：待核实</h4>
                    <h4 v-if="activity.eventStatusAfter == 2">工单状态：核实中</h4>
                    <h4 v-if="activity.eventStatusAfter == 3">工单状态：待处理</h4>
                    <h4 v-if="activity.eventStatusAfter == 4">工单状态：处理中</h4>
                    <h4 v-if="activity.eventStatusAfter == 5">工单状态：已处理</h4>
                    <h4 v-if="activity.eventStatusAfter == 6">工单状态：超出范围</h4>
                    <h4 v-if="activity.eventStatusAfter == '' || activity.eventStatusAfter == undefined">事件状态：其他</h4>

                    <p v-if="activity.title != null && activity.title != ''">事件记录：{{activity.title}}</p>
                    <p v-if="activity.mailContactorName != null && activity.mailContactorName != ''">操作人员：{{activity.mailContactorName}}</p>
                    <p v-if="activity.mailContactorMobile != null && activity.mailContactorMobile != ''">联系电话：{{activity.mailContactorMobile}}</p>
                    <p v-if="activity.mailGroupName != null  && activity.mailGroupName !=''">人员单位：{{activity.mailGroupName}}</p>
                    <p v-if="activity.content != null  && activity.content !=''">操作描述：{{activity.content}}</p>

                    <!--单个图片indexOf("http")>-1-->
                    <p v-if="activity.imageUrl != null && activity.imageUrl != '' && activity.imageUrl.indexOf('http')>-1" >
                      <!-- <img :src="activity.imageUrl" style="width: 140px;height: 140px"/> -->
                      <img
                        id="image"
                        :data-original="activity.imageUrl"
                        :src="activity.imageUrl"
                        style="width: 140px;height: 140px"
                      />
                    </p>

                    <p v-if="activity.imageUrl != null && activity.imageUrl != '' && activity.imageUrl.indexOf('http')==-1" >
                      <img :src="backgroundURL+activity.imageUrl" style="width: 140px;height: 140px;" @click="largePhoto($event)"/>
                    </p>
                    <!--多个图片-->
                    <p>
                      <!-- <img
                        v-if="activity.imageArr != null && activity.imageArr != ''" @click="largePhoto($event)"
                        v-for="(image,index) in activity.imageArr"
                        :src="backgroundURL+'/wx/images/'+image"
                        :key="index"
                        style="width: 140px;height: 140px;"/> -->
                        <img
                        v-if="activity.imageArr != null && activity.imageArr != ''" @click="largePhoto($event)"
                        v-for="(image,index) in activity.imageArr"
                        :key="index"
                        :data-original="activity.imageUrl"
                        :src="backgroundURL+image"
                        style="width: 140px;height: 140px;"
                      />
                    </p>
                    


                    <!--单个音频-->
                    <p v-if="activity.audioUrl != null && activity.audioUrl != ''" >
                      <audio type="audio/mp3" :src="backgroundURL+activity.audioUrl" autostart=false loop=false >
                        <source :src="backgroundURL+activity.audioUrl" type="audio/mpeg" />
                      </audio>

                    </p>
                    <!--多个音频-->
                    <p>

                      <audio controls="controls"
                             v-if="activity.audioUrlArr != null && activity.audioUrlArr != ''"
                             v-for="(audio,index) in activity.audioUrlArr"
                             :key="index">
                        <source :src="backgroundURL+audio" type="audio/mpeg" />
                      </audio>
                    </p>


                    <!--单个视频-->
                    <!--<p  v-if="activity.videoUrl != null">
                      <video :src="backgroundURL+activity.videoUrl" width="320" height="240" controls="controls"></video>
                    </p>-->
                    <!--多个视频-->
                    <!--<p>
                      <video
                        v-if="activity.videoUrlArr != null"
                        v-for="(video,index) in activity.videoUrlArr"
                        :src="backgroundURL+video"
                        :key="index"
                        width="320" height="240" controls="controls">
                      </video>
                    </p>-->

                  </el-card>
                </el-timeline-item>
              </el-timeline>
            </div>
          </div>
        </el-col>
      </el-row>
    </div>
    <el-dialog
      title="查看图片"
      :visible.sync="imgDialogVisible" style="text-align:center;margin-top:100px;" width="400px" :modal="false"
      >
      <img :src="imgSrc" style="width: 300px;height: 300px;">
    </el-dialog>
  </el-dialog>

</template>

<script>
import Viewer from "viewerjs";

export default {
  data() {
    return {
      //后台全局url
      backgroundURL: window.SITE_CONFIG.cloudUrl,
      imgDialogVisible:false,
      imgSrc:'',
      visible: false,

      //表格详情数据（初始化）
      eventDetailForm: {
        id: "",
        statusFlag: "",
        title: "",
        eventType: "",
        eventLevel: "",
        eventTypeName: "",
        responseName: "",
        reportName: "",
        reportTime: "",
        eventPosition: "",
        eventDescription: "",
        status: "",
        eventClose: ""
      },

      //历史记录时间线
      eventHistoryRecordArray: [],
      //状态变量
      status: ""
    };
  },

  methods: {
     // 预览图片
    initImageTools() {
      //初始化 viewerjs
      const ViewerDom = document.querySelectorAll("#image");
      for (let i in ViewerDom) {
        if(typeof ViewerDom[i]==='object'){
          const viewer = new Viewer(ViewerDom[i], {
            url: "data-original"
          });
        }
      }
    },
    largePhoto(event){
      // if(event.target.style.width=="140px"){
      
      //   event.target.style="position:absolute;width:300px;height:300px;"
      //   console.log(1)
      // } else {
      //   event.target.style="position:absolute;width:140px;height:140px;"
      // }
      this.imgDialogVisible=true
      this.imgSrc=event.target.src
      // console.log('eventevent',event.target.src)
     
    },
    init(row,flagType) {
      // console.log(row)
      this.visible = true;

      //查看人员详情
      this.eventDetailForm.id = row.id;
      this.eventDetailForm.title = row.title;
      this.eventDetailForm.eventType = row.eventType;
      this.eventDetailForm.reportName = row.reportName;
      this.eventDetailForm.reportTime = row.reportTime;
      this.eventDetailForm.eventPosition = row.eventPosition;
      this.eventDetailForm.eventDescription = row.eventDescription;
      this.eventDetailForm.eventTypeName = row.eventTypeName;

      //this.eventDetailForm.responseName = row.rpPoliceResponseEntity.responseName;

      if (row.status == "1") {
        this.eventDetailForm.status = "待核实";
      } else if (row.status == "2") {
        this.eventDetailForm.status = "核实中";
      } else if (row.status == "3") {
        this.eventDetailForm.status = "待处理";
      }  else if (row.status == "4") {
        this.eventDetailForm.status = "处理中";
      }else if (row.status == "5") {
        this.eventDetailForm.status = "已处理";
      } else if(row.status == "6"){
        this.eventDetailForm.status = "超出范围";
      }else {
        this.eventDetailForm.status = "其他";
      }

      if (row.isClose == "1") {
        this.eventDetailForm.eventClose = "否";
      } else if (row.isClose == "0") {
        this.eventDetailForm.eventClose = "是";
      } else {
        this.eventDetailForm.eventClose = "其他";
      }

      //根据事件信息请求历史记录
      this.$http({
        url: this.$http.adornUrl(`/event/eventHistory/selectHistoryByDataSourceId`),
        method: "post",
        params: this.$http.adornParams({
          dataSourceId: row.eventInfoId,
          flagType,
          platformId: 0
        })

      }).then(({ data }) => {
        if (data && data.code === 0) {
        // console.log("selectHistoryByDataSourceId",data)
        this.eventHistoryRecordArray = data.list;
        }
      });

       this.$nextTick(() => {
            this.initImageTools();
          });
    },
    onSubmit() {
      // console.log("submit!");
    },
    //表格格式化
    eventLevelFormatter(obj) {
      let val = obj.eventLevel;
      if (val == "1") {
        return "一般";
      } else if (val == "2") {
        return "严重";
      } else if (val == "3") {
        return "重大";
      } else if (val == "4") {
        return "特大";
      } else {
        return "其他";
      }
    },
    eventStatusFormatter(obj) {
      let val = obj.status;
      if (val == "1") {
        return "待核实";
      } else if (val == "2") {
        return "核实中";
      } else if (val == "3") {
        return "待处理";
      } else if (val == "4") {
        return "处理中";
      } else if (val == "5") {
        return "已处理";
      } else {
        return "其他";
      }
    },
  }
};
</script>

<style lang="scss">
.el-row {
  margin-bottom: 20px;
  &:last-child {
    margin-bottom: 0;
  }
}
.el-col {
  border-radius: 4px;
}
.bg-purple-dark {
  background: #99a9bf;
}
.bg-purple {
  background: #d3dce6;
}
.bg-purple-light {
  background: #e5e9f2;
}
.grid-content {
  border-radius: 4px;
  min-height: 36px;
}
.row-bg {
  padding: 10px 0;
  background-color: #f9fafc;
}

.word-history-record {
  height: 600px;
  padding-right: 10px;
  overflow-y: auto;
  /deep/.el-card {
    background: transparent;
    border-color: rgba(27, 216, 250, 1);
    color: white;
  }
}
.word-history-record::-webkit-scrollbar {
  background: transparent;
  width: 3px;
  height: 3px;
}
.word-history-record::-webkit-scrollbar-thumb {
  background: #518ce5;
  border-radius: 6px;
}
.view-dialog /deep/.el-dialog {
  background: rgba(10, 29, 81, 1);
  border: 2px solid rgba(27, 216, 250, 1);
}
.view-dialog /deep/.el-dialog__headerbtn {
  border: 1px solid white;
  border-radius: 50%;
  padding-left: 1px;
  padding-top: 1px;
  height: 20px;
  width: 20px;
}
.view-dialog /deep/.el-dialog {
  .el-dialog__header *,
  p {
    color: white;
  }
}
</style>
