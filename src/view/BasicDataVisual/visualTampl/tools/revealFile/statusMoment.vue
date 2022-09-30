<template>
  <div>
    <!-- 记录展示 -->

    <div ref="chatContent" class="history-container">
      <div
        v-for="item in handleResponseEntities"
        :key="item.id"
        class="history-item"
      >
        <span v-if="item.userId != userId">
          <!-- 头像 -->
          <span style="float: left; width: 50px">
            <el-tooltip effect="dark" placement="top">
              <div slot="content">{{ item.contactorEntity.contactorIdString }}</div>
              <span class="history-avatar">{{ item.contactorEntity.contactorIdString }}</span>
            </el-tooltip>
            <span class="history-content-time1">{{ item.gmtCreate }}</span>
            <span v-if="item.contactorEntity.type == '-1'" class="history-avatar-job">管理员1</span>
            <span v-if="item.contactorEntity.type == '1'" class="history-avatar-job">负责人</span>
            <span v-if="item.contactorEntity.type == '2'" class="history-avatar-job">参与人</span>
            <span v-if="item.contactorEntity.type == '3'" class="history-avatar-job">抄送人</span>
            <!-- <span v-else class="history-avatar-job history-avatar-nojob"
              >参与人</span
            > -->
          </span>

          <!-- 气泡框内容（普通无回复） -->
          <span class="history-content-wrapper" v-if="item.responseType != 3">
            <!-- 1. 记录的类型 -->
            <span class="work_form" v-if="item.responseType == -1"
              >已取消（停用）工单</span
            >
            <span class="work_form" v-if="item.responseType == 0"
              >处置中（重启）工单</span
            >
            <span class="work_form" v-if="item.responseType == 1"
              >已处置（完成）工单</span
            >
            <span v-if="item.responseType == 2" class="work_form"
              >处置工单</span
            >
            <!-- 2. 记录的内容 -->
            <el-row class="history-content-comment">{{ item.remark }}</el-row>
            <!-- 3. 记录的附件 -->
            <el-row
              class="history-content-attachments"
              v-for="file in item.documentList"
              :key="file.url"
            >
              <viewer v-if="isImg(file.allUrl)"
                ><img
                  :src="file.allUrl"
                  :alt="file.name"
                  class="history-content-image"
              /></viewer>
              <a v-else :href="file.allUrl">{{ file.name }}</a>
            </el-row>
            <!-- 4. 记录的定位 -->
            <el-row class="history-content-location"
              ><i class="el-icon-location" style="color: blue"></i
              >{{ item.workPlace }}</el-row
            >
            <!-- 5. 回复按钮 -->
            <el-button
              type="text"
              class="history-content-reply"
              @click="historyReply(item.id, item.contactorEntity.contactorIdString, item.remark)"
              >回复</el-button
            >
          </span>
          <!-- 气泡框内容（带有回复） -->
          <span class="history-content-wrapper4" v-else>
            <!-- 1. 工单类型 -->
            <div class="wrapper_line">
              <span
                class="work_form"
                v-if="item.handleResponseEntity.responseType == -1"
                >已取消（停用）工单</span
              >
              <span
                class="work_form"
                v-if="item.handleResponseEntity.responseType == 0"
                >处置中（重启）工单</span
              >
              <span
                class="work_form"
                v-if="item.handleResponseEntity.responseType == 1"
                >已处置（完成）工单</span
              >
              <span
                class="work_form"
                v-if="item.handleResponseEntity.responseType == 2"
                >处置工单</span
              >
              <span
                class="work_form"
                v-if="item.handleResponseEntity.responseType == 3"
                >回复工单</span
              >
              <!-- 2. 被回复的用户名 
                        <span class="userName">{{item.handleResponseEntity.userName}}</span>-->
              <!-- 3. 被回复的工单内容 -->
              <el-row class="history-content-commentex">{{
                item.handleResponseEntity.remark
              }}</el-row>
              <!-- 4. 被回复的工单附件 -->
              <el-row
                class="history-content-attachments"
                v-for="file in item.handleResponseEntity.documentList"
                :key="file.url"
              >
                <viewer v-if="isImg(file.allUrl)"
                  ><img
                    :src="file.allUrl"
                    :alt="file.name"
                    class="history-content-image"
                /></viewer>
                <a v-else :href="file.allUrl">{{ file.name }}</a>
              </el-row>
            </div>
            <!-- 5. 回复内容 -->
            <div class="wrapper_reply">
              <el-row>
                <span>回复工单</span>
                <span class="history-content-time3">{{ item.gmtCreate }}</span>
              </el-row>
              <el-row class="history-content-comment">{{ item.remark }}</el-row>
              <!-- 6. 回复内容的附件 -->
              <el-row
                v-for="(file, index) in item.documentList"
                :key="index"
                class="history-content-attachments"
              >
                <viewer v-if="isImg(file.allUrl)"
                  ><img
                    :src="file.allUrl"
                    :alt="file.name"
                    class="history-content-image"
                /></viewer>
                <a v-else :href="file.allUrl">{{ file.name }}</a>
              </el-row>
              <!-- 7. 定位 -->
              <el-row class="history-content-location"
                ><i class="el-icon-location" style="color: blue"></i
                >{{ item.workPlace }}</el-row
              >
              <!-- 8. 回复按钮 -->
              <el-button
                type="text"
                class="history-content-reply"
                @click="historyReply(item.id, item.contactorEntity.contactorIdString, item.remark)"
                >回复</el-button
              >
            </div>
          </span>
        </span>
        <span v-else class="myself_message">
          <!-- 头像 -->
          <span style="float: right;width:50px;">
            <el-tooltip effect="dark" placement="top">
              <div slot="content">{{ item.contactorEntity.contactorIdString }}</div>
              <span class="history-avatar">{{ item.contactorEntity.contactorIdString}}</span>
            </el-tooltip>
            <span class="history-content-time">{{ item.gmtCreate }}</span>
            <span v-if="item.contactorEntity.type == '-1'" class="history-avatar-job">管理员</span>
            <span v-if="item.contactorEntity.type == '1'" class="history-avatar-job">负责人</span>
            <span v-if="item.contactorEntity.type == '2'" class="history-avatar-job">参与人</span>
            <span v-if="item.contactorEntity.type == '3'" class="history-avatar-job">抄送人</span>
            <!-- <span class="history-avatar-job" v-if="item.job">{{item.job}}</span>
                        <span class="history-avatar-job history-avatar-nojob" v-else>{{item.job}}</span> -->
          </span>

          <!-- 气泡框内容（普通无回复） -->

          <span class="history-content-wrapper3" v-if="item.responseType != 3">
            <!-- 1. 记录的类型 -->
            <span class="work_form" v-if="item.responseType == -1"
              >已取消（停用）工单</span
            >
            <span class="work_form" v-if="item.responseType == 0"
              >处置中（重启）工单</span
            >
            <span class="work_form" v-if="item.responseType == 1"
              >已处置（完成）工单</span
            >
            <span class="work_form" v-if="item.responseType == 2"
              >处置工单</span
            >
            <!-- 2. 记录的内容 -->
            <el-row class="history-content-comment">{{ item.remark }}</el-row>
            <!-- 3. 记录的附件 -->
            <el-row
              v-for="file in item.documentList"
              :key="file.url"
              class="history-content-attachments"
            >
              <viewer v-if="isImg(file.allUrl)"
                ><img
                  :src="file.allUrl"
                  :alt="file.name"
                  class="history-content-image"
              /></viewer>
              <a v-else :href="file.allUrl">{{ file.name }}</a>
            </el-row>
            <!-- 4. 记录的定位 -->
            <el-row class="history-content-location"
              ><i class="el-icon-location" style="color: blue"></i
              >{{ item.workPlace }}</el-row
            >
            <!-- 5. 回复按钮 -->
            <el-button
              type="text"
              class="history-content-reply"
              @click="historyReply(item.id, item.contactorEntity.contactorIdString, item.remark)"
              >回复</el-button
            >
          </span>
          <!-- 气泡框内容（带有回复） -->
          <span class="history-content-wrapper2" v-else>
            <!-- 1. 工单类型 -->
            <div class="wrapper_line">
              <span
                class="work_form"
                v-if="item.handleResponseEntity.responseType == -1"
                >已取消（停用）工单</span
              >
              <span
                class="work_form"
                v-if="item.handleResponseEntity.responseType == 0"
                >处置中（重启）工单</span
              >
              <span
                class="work_form"
                v-if="item.handleResponseEntity.responseType == 1"
                >已处置（完成）工单</span
              >
              <span
                class="work_form"
                v-if="item.handleResponseEntity.responseType == 2"
                >处置工单</span
              >
              <span
                class="work_form"
                v-if="item.handleResponseEntity.responseType == 3"
                >回复工单</span
              >
              <!-- 2. 被回复的用户名 
                        <span class="userName">{{item.handleResponseEntity.userName}}</span>-->
              <!-- 3. 被回复的工单内容 -->
              <el-row class="history-content-commentex">{{
                item.handleResponseEntity.remark
              }}</el-row>
              <!-- 4. 被回复的工单附件 -->
              <el-row
                class="history-content-attachments"
                v-for="file in item.handleResponseEntity.documentList"
                :key="file.url"
              >
                <viewer v-if="isImg(file.allUrl)"
                  ><img
                    :src="file.allUrl"
                    :alt="file.name"
                    class="history-content-image"
                /></viewer>
                <a v-else :href="file.allUrl">{{ file.name }}</a>
              </el-row>
            </div>
            <!-- 5. 回复内容 -->
            <div class="wrapper_reply">
              <el-row>
                <span>回复工单</span>
                <span class="history-content-time2">{{ item.gmtCreate }}</span>
              </el-row>
              <el-row class="history-content-comment">{{ item.remark }}</el-row>
              <!-- 6. 回复内容的附件 -->
              <el-row
                class="history-content-attachments"
                v-for="(file, index) in item.documentList"
                :key="index"
              >
                <viewer v-if="isImg(file.allUrl)"
                  ><img
                    :src="file.allUrl"
                    :alt="file.name"
                    class="history-content-image"
                /></viewer>
                <a v-else :href="file.allUrl">{{ file.name }}</a>
              </el-row>
              <!-- 7. 定位 -->
              <el-row class="history-content-location"
                ><i class="el-icon-location" style="color: blue"></i
                >{{ item.workPlace }}</el-row
              >
              <!-- 8. 回复按钮 -->
              <el-button
                type="text"
                class="history-content-reply"
                @click="historyReply(item.id, item.contactorEntity.contactorIdString, item.remark)"
                >回复</el-button
              >
            </div>
          </span>
        </span>
      </div>
    </div>
    <!-- 被回复的记录概览 -->
    <el-row class="replying-wrapper" v-if="showReplying">
      <span class="wrappering_line"></span>
      <p style="padding: 5px 0px 0px 30px; font-size: 10px">
        {{ replyTo.name }}
      </p>
      <p style="padding: 5px 0px 0px 30px">{{ replyTo.remark }}</p>
      <span class="el-icon-close wrapper_del" @click="replyClose"></span>
    </el-row>
    <!-- 回复、评论输入部分 -->
    <el-row class="reply-wrapper">
      <el-input
        type="textarea"
        class="reply-input"
        rows="3"
        placeholder="请输入工单处置情况"
        v-model="statusForm.remark"
      ></el-input>
      <!-- <i class="el-icon-picture"></i>
            <i class="el-icon-picture"></i> -->
      <!-- 上传 -->
      <div class="uploadbea">
        <input
          type="file"
          multiple
          @change="getFile($event)"
          style="opacity: 0"
        />
      </div>
      <span
        v-for="(item, index) in statusForm.documentList"
        :key="index"
        class="wrapper_img"
      >
        <viewer v-if="isImg(item.url)"
          ><img alt="index" :src="hostUrl + item.url" width="60" height="60"
        /></viewer>
        <a v-else :href="item.url">{{ item.name }}</a>
        <i
          class="el-icon-close close_css"
          @click="deleteFile(item.url, statusForm.documentList)"
        ></i>
      </span>
      <el-button type="text" class="reply-submit" @click="statusFormInit"
        >清空</el-button
      >
      <el-button type="text" class="reply-submit" @click="statusSubmit"
        >提交</el-button
      >
    </el-row>
  </div>
</template>

<script>
import Axios from 'axios';

export default {
  name: 'statusMoment',
  props: ['workId', 'handleResponseEntities'],

  created() {
    // 获取当前登录的用户ID
    // this.userId = this.$cookie.get('userId').slice(2);
    this.getUserInfo();
    // 获取平台名字
    this.getPlatformName();
  },
  watch: {
    // viewWhich(id) {
    //     this.statusForm.workId = id;
    // },
  },
  mounted() {
    this.scrollToBottom();
  },
  updated() {
    this.scrollToBottom();
  },
  methods: {
    scrollToBottom() {
      this.$nextTick(() => {
        this.$refs.chatContent.scrollTop = this.$refs.chatContent.scrollHeight;
      });
    },
    /**
     * @description: 获取用户id
     */
    getUserInfo(){
      let data = {
        url: '/sys/user/info',
        method: 'get',
        params: {},
      };
      this.apix(data)
        .then(data => {
          this.userId = data.user.userId;
        })
        .catch(err => {
          this.$message.error(`获取用户id失败，错误信息：${error}`);
        })
    },
    /**
     * @description: 获取平台名字
     */
    getPlatformName(){
      let data = {
        url: window.SITE_CONFIG['baseUrl'] + '/sys/platform/platformName?id=' + this.$store.state.platformId,
        method: 'get',
        headers: {
          token: this.$store.state.token,
          'Content-Type': 'application/json; charset=UTF-8',
        },
      }
      Axios(data)
        .then(data => {
          this.statusForm.workPlace = data.data;
        })
        .catch((error) => {
          this.$message.error(`获取平台名字失败，错误信息：${error}`);
        })
    },
    // 提交回复/评论
    statusSubmit() {
      this.statusForm.workId = this.workId;
      let data = {
        url: window.SITE_CONFIG['baseUrl'] + '/work/workHandleResponse/pcReply',
        method: 'post',
        data: this.$http.adornData({...this.statusForm}),
        headers: {
          'Content-Type': 'application/json; charset=UTF-8',
        },
      }
      this.$confirm('确认提交？').then(() =>{
        this.apix(data).then(data => {
          if (data && data.code == 0) {
            this.statusFormInit();
            this.replyClose();
            this.$emit('getSingleData', this.workId);
          } else {
            this.$message({
              type: 'error',
              message: '提交失败!'
            })
          }
        })
      })
      // let url =
      //   window.SITE_CONFIG['baseUrl'] + '//work/workHandleResponse/pcReply';
      // let that = this;
      // that.statusForm.workId = that.workId;
      // console.log('提交回复/评论: ', that.statusForm);
      // this.$confirm('确认提交？')
      //   .then((_) => {
      //     this.$http.post(url, that.statusForm, { emulateJSON: true }).then(
      //       function (res) {
      //         that.statusFormInit();
      //         that.replyClose();
      //         that.getSingleData(that.workId);
      //       },
      //       function (res) {
      //         console.log('提交失败：', res);
      //       }
      //     );
      //     done();
      //   })
      //   .catch((_) => {});
    },
    // 重置输入的内容
    statusFormInit() {
      this.statusForm.remark = '';
      this.statusForm.workId = '';
      this.statusForm.handleResponseId = '0';
      this.statusForm.documentList = [];
    },
    // 点击回复按钮
    historyReply(id, name, remark) {
      console.log('handleResponseEntities', this.handleResponseEntities);
      console.log('reply to id: ', id);
      this.showReplying = true;
      this.replyTo.name = name;
      this.replyTo.remark = remark;
      console.log('this.replyTo.remark', this.replyTo.remark);
      this.statusForm.handleResponseId = id;
    },
    // 关闭下方被回复的信息的预览
    replyClose() {
      this.showReplying = false;
      this.replyTo.name = '';
      this.replyTo.remark = '';
      this.statusForm.handleResponseId = 0;
    },
    // 判断是图片还是文档
    isImg(url) {
      let res = url.slice(-4);
      if (
        res == '.png' ||
        res == '.jpg' ||
        res == 'jpeg' ||
        res == '.gif' ||
        res == '.bmp'
      ) {
        return true;
      }
      return false;
    },
    // 删除文件
    deleteFile(url, list) {
      let that = this;
      for (let index in list) {
        if (list[index].url == url) {
          list.splice(index, 1);
        }
      }
      console.log('删tmd：', list);
    },
    // 文件上传，返回文件所在服务器url
    getFile(event) {
      // 上传的文件列表
      let fileList = event.target.files;
      console.log(event);
      for (let file of fileList) {
        console.log(file);
        // 每次上传1个文件，返回一条url
        let formData = new FormData();
        formData.append('file', file);
        formData.append('token', this.$store.state.token);
        console.log(formData);
        let data = {
          url: '/upload/emergencyHandleProcessFile',
          method: 'post',
          headers: {
            'Content-Type': 'application/json; charset=UTF-8',
          },
          data: formData,
        };
        this.apix(data)
          .then(data => {
            console.log(data);
            if(data && data.code === 0){
              console.log(  
                'upload successfully and get response: ',
                data
              );
              this.statusForm.documentList.push({
                name: data.data.name,
                url: data.data.url,
              });
              // 清空input值，防止重复上传时不触发change事件
              event.srcElement.value = '';
            } else {
              this.$message({
                type: 'error',
                message: '上传失败!'
              })
            }
          })
      }
      // // 上传接口
      // let url =
      //   window.SITE_CONFIG['baseUrl'] + '/upload/emergencyHandleProcessFile';
      // let that = this;
      // // 上传的文件列表
      // let fileList = event.target.files;
      // for (let file of fileList) {
      //   // 每次上传1个文件，返回一条url
      //   let formData = new FormData();
      //   formData.append('file', file);
      //   formData.append('token', that.$cookie.get('token'));
      //   that.$http.post(url, formData, { emulateJSON: true }).then(
      //     function (res) {
      //       console.log(
      //         'upload successfully and get response: ',
      //         res.data.data
      //       );
      //       that.statusForm.documentList.push({
      //         name: res.data.data.name,
      //         url: res.data.data.url,
      //       });
      //       // 清空input值，防止重复上传时不触发change事件
      //       event.srcElement.value = '';
      //     },
      //     function (res) {
      //       console.log('upload fail: ', res);
      //     }
      //   );
      // }
    },
  },
  data() {
    return {
      // 当前登录用户的id
      userId: '',
      statusForm: {
        // workPlace: window.sessionStorage.getItem('platformName'),
        workPlace: '',
        remark: '',
        workId: '',
        handleResponseId: 0,
        documentList: [],
      },
      showReplying: false,
      replyTo: {
        name: '',
        remark: '',
      },

      // 上传图片的服务器主机地址
      hostUrl: 'http://scg.chinaemt.com',
    };
  },
};
</script>

<style lang="scss" scoped>
.el-row {
  border: 0 !important;
}
.uploadbea {
  // width: 20px !important;
  // height: 17px;
  height: 30px;
  color: #fff;
  background-image: url(../../../../../assets/images/3g.png);
  background-repeat: no-repeat;
  margin-top: 30px;

  .close_css {
    position: absolute;
    color: #adb6c2;
    top: 5%;
    right: 1%;
    border: 1px solid #999999;
    border-radius: 50%;
    cursor: pointer;
  }
}
.userName {
  color: #999999;
}
.el-row {
  margin-left: 22px;
}
.history-container {
  display: flex;
  flex-direction: column-reverse;
  max-height: 250px;
  overflow-x: hidden;
  &::-webkit-scrollbar {
    width: 3px;
    height: 3px;
  }
  &::-webkit-scrollbar-thumb {
      background-color: #518ce5;
      border-radius: 6px;
  }
  .history-item {
    margin: 15px 4px;
    position: relative;
    .history-avatar {
      border: 1px solid #0091ff;
      border-radius: 50%;
      display: inline-block;
      width: 50px;
      height: 50px;
      line-height: 50px;
      background: #0091ff;
      color: white;
      text-align: center;
      box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
      margin-right: 5px;
      white-space: nowrap;
    }
    .history-avatar-job {
      // border: 1px solid rgba(0, 0, 0, 0.3);
      // border-radius: 4px;
      // background: rgba(0, 0, 0, 0.3);
      color: #ffffff;
      display: inline-block;
      width: 50px;
      height: 20px;
      line-height: 20px;
      text-align: center;
    //  position: relative;
      // box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
    }
    .history-avatar-nojobs {
      visibility: hidden;
    }
    .history-content-wrapper {
      display: inline-block;
      width: 360px;
      border: 1px solid #489FF8;
      border-radius: 10px;
      box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.2);
      color: #0091ff;
      position: relative;
      top: 0px;
      padding: 5px;
      left: 15px;
      margin-top: 30px;
      .work_form {
        padding: 0px 0px 5px 10px;
      }
    }
    .history-content-wrapper4 {
      display: inline-block;
      width: 360px;
      border: 1px solid #489FF8;
      border-radius: 10px;
      box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.2);
      color: #999999;
      position: relative;
      margin-top: 30px;
      left: 15px;
      .wrapper_line {
        border-bottom: 1px solid #f2f4f6;
        padding: 5px;
      }
      .work_form {
        padding: 0px 0px 5px 10px;
      }
      .wrapper_reply {
        padding: 5px;
      }
    }
    .history-content-time1 {
      color: #aaaaaa;
      position: absolute;
      left: 70px;
      top: 0px;
    }
    .history-content-time2 {
      color: #aaaaaa;
      position: absolute;
      left: 205px;
      margin-top: 0px;
    }
    .history-content-time3 {
      color: #aaaaaa;
      position: absolute;
      left: 100px;
      margin-top: 0px;
    }

    .history-content-time {
      color: #aaaaaa;
      position: absolute;
      right: 72px;
    }
    .history-content-comment {
      padding: 5px 0px 5px 10px;
      // color: #333333;
      color: #999999;
    }
    .history-content-commentex {
      color: #999999 !important;
      font-size: 10px;
      padding: 5px 0px 5px 10px;
    }
    .history-content-location {
      color: #7f7f7f;
      margin-left: 15px;
      width: 280px !important;
    }
    .history-content-reply {
      position: absolute;
      right: 10px;
      bottom: -3px;
    }

    .myself_message {
      .history-avatar {
        border: 1px solid #0bd295;
        border-radius: 50%;
        display: inline-block;
        width: 50px;
        height: 50px;
        line-height: 50px;
        background: #0bd295;
        color: white;
        text-align: center;
        box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
        margin-right: 5px;
        white-space: nowrap;
      }
      .history-avatar-job {
        // border: 1px solid rgba(0, 0, 0, 0.3);
        // border-radius: 4px;
        // background: rgba(0, 0, 0, 0.3);
        color: #ffffff;
        display: inline-block;
        width: 50px;
        height: 20px;
        line-height: 20px;
        text-align: center;
       // position: relative;
        left: -10px;
        top: 35px;
        // box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
      }
      .history-avatar-nojobs {
        visibility: hidden;
      }

      .history-content-wrapper2 {
        display: inline-block;
        width: 360px;
        border: 1px solid #489FF8;
        border-radius: 10px;
        box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.2);
        color: #999999;
        position: relative;
        margin-top: 30px;
        // left: 230px;
        left: 95px;
        .wrapper_line {
          border-bottom: 1px solid #f2f4f6;
          padding: 5px;
        }
        .work_form {
          padding: 0px 0px 5px 10px;
        }
        .wrapper_reply {
          padding: 5px;
        }
      }
      .history-content-wrapper3 {
        display: inline-block;
        width: 360px;
        border: 1px solid #489FF8;
        border-radius: 10px;
        box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.2);
        color: #0091ff;
        position: relative;
        margin-top: 30px;
        padding: 5px;
        // left: 230px;
        left: 95px;
        .work_form {
          padding: 0px 0px 5px 10px;
        }
        .history-content-comment {
          padding: 5px 0px 5px 10px;
        }
      }

      .history-content-time1 {
        color: #aaaaaa;
        position: absolute;
        left: 70px;
      }
      .history-content-time2 {
        color: #aaaaaa;
        position: absolute;
        left: 190px;
        margin-top: 0px;
      }
      .history-content-time3 {
        color: #aaaaaa;
        position: absolute;
        left: 100px;
        margin-top: 0px;
      }

      .history-content-time {
        color: #aaaaaa;
        position: absolute;
        right: 75px;
      }
      .history-content-comment {
        padding: 5px 0px 5px 10px;
        color: #333333;
      }
      .history-content-commentex {
        color: #999999 !important;
        font-size: 10px;
        padding: 5px 0px 5px 10px;
      }

      .history-content-location {
        color: #7f7f7f;
        margin-left: 15px;
        width: 280px !important;
      }
      .history-content-reply {
        position: absolute;
        right: 10px;
        bottom: -3px;
      }
    }
  }
}

.history-content-image {
  max-width: 200px;
  max-height: 200px;
  margin-left: 15px;
}
.replying-wrapper {
  border: 1px solid rgba(0, 0, 0, 0.1);
  background: #fff;
  position: relative;
  color: #999999;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
  .wrappering_line {
    position: absolute;
    display: block;
    width: 2px;
    height: 40px;
    left: 20px;
    top: 20px;
    background-color: rgba(0, 0, 0, 0.05);
  }
  .wrapper_del {
    color: #adb6c2;
    float: right;
    display: inline-block;
    width: 28px;
    height: 28px;
    font-size: 20px;
    line-height: 28px;
    cursor: pointer;
    text-align: right;
    right: 5px;
    top: 2px;
    font-weight: bold;
    position: absolute;
  }
}
.reply-wrapper {
  font-weight: 500;
  color: #333333;
  font-size: 14px;
  .wrapper_img {
    margin: 10px;
    display: inline-block;
    padding: 10px;
    background: #f0f2f5;
    position: relative;
    .close_css {
      color: #adb6c2;
      float: right;
      display: inline-block;
      width: 28px;
      height: 28px;
      font-size: 20px;
      line-height: 28px;
      cursor: pointer;
      text-align: right;
      right: -7px;
      top: -10px;
      font-weight: bold;
      position: absolute;
    }
  }
  /deep/ .el-textarea__inner{
    border: 1px solid rgba(63, 146, 254, 1);
    background-color:transparent;
    color: #ffffff;
    resize: none;
  }
}
.reply-input {
  width: 100%;

  // border: 1px solid #0091FF;
  resize: none;
}
.reply-submit {
  float: right;
  margin-top: -30px;
}
</style>
