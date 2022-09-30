<template>
  <div>
    <el-dialog
      class="order-dialog"
      title="派发工单"
      :close-on-click-modal="false"
      @close="imgDialogVisible=false;orderData.desc='';contactorName='';contacts=[];"
      :visible.sync="visible"
      width="600px"
      :append-to-body="true"
      :modal="false"
    >
      <el-form class="formStyle" ref="form" :model="orderData" label-width="80px">
        <p>抓拍图片</p>
        <img
          v-if="orderData.picAbbreviate != null && orderData.picAbbreviate != '' && orderData.picAbbreviate.indexOf('http')>-1"
          :src="orderData.picAbbreviate"
          alt
          style="width:100px;height:100px"
        />
        <img
          v-if="orderData.picPlate != null && orderData.picPlate != '' && orderData.picPlate.indexOf('http')>-1"
          :src="orderData.picPlate"
          alt
          style="width:100px;height:100px"
        />
        <img
          v-if="orderData.bkgPicUrl && orderData.bkgPicMinUrl != '' && orderData.bkgPicUrl.indexOf('http')>-1"
          :data-original="orderData.bkgPicUrl"
          :src="orderData.bkgPicMinUrl"
          alt
          style="width:100px;height:100px"
        />
        <img
          id="image"
          v-if="orderData.facePicUrl != null && orderData.facePicUrl != '' && orderData.facePicUrl.indexOf('http')>-1"
          :src="orderData.facePicUrl"
          alt
          style="width:100px;height:100px"
        />

        <p>过程描述</p>
        <el-input
          type="textarea"
          :rows="6"
          placeholder="请输入内容"
          v-model="orderData.desc"
          resize="none"
        ></el-input>
        <p>通报人员</p>
        <el-row style="margin-bottom:2vh">
            <el-input style="width: 420px" placeholder="请添加人员" v-model="contactorName" ></el-input>
            <el-button
              icon="el-icon-plus"
              type="primary"
              @click="contactViewHandle()"
            >派发联系人</el-button>
        </el-row>
        <el-row style="text-align:center">
          <el-button
            type="primary"
            size="small"
            @click="submit()"
          >提交</el-button>
        </el-row>
      </el-form>
    </el-dialog>

    <!-- 派发联系人视图 -->
      <linkman-draggable ref="commonLink" v-show="showcommonLink" @OnchildByValue="handelLinkdata"></linkman-draggable>
  </div>
</template>

<script>
import LinkmanDraggable from '../visual/visualTampl/tools/revealFile/taskManagement/add/LinkmanDraggable'
import Viewer from "viewerjs";

export default {
  props:['index'],
  components: {
    'linkman-draggable':LinkmanDraggable,
  },
  data() {
    return {
      imgDialogVisible: false,
      riskvehiclealarmContactsVisible: false,
      visible: false,
      orderData: {
        desc: ""
      },
      contacts: [],
      eventType: "",
      // invitedToJoinList: [],
      showcommonLink: false,

      contactorName: '',//通报人员
      loginUser: {}
    };
  },
  mounted(){
    this.getUserInfo()
  },
  methods: {
     // 预览图片
    initImageTools() {
      //初始化 viewerjs
      const ViewerDom = document.querySelectorAll("#image");
      ViewerDom.forEach(item=>{
        const viewer = new Viewer(item, {
          url: "data-original"
        });
      })
    },
    init(row, eventType, flagType) {
      // this.invitedToJoinList = []
      console.log('派单', row)
      this.eventType = eventType;
      this.flagType = flagType;
      this.orderData = row;
      this.visible = true;
       this.$nextTick(() => {
            this.initImageTools();
          });
      //   console.log('dflajsdal2132',this.orderData.picAbbreviate)
      // this.$http({
      //   url: this.$http.adornUrl('/mail/mailcontactor/listByPlatformId'),
      //   method: 'GET',
      //   param: this.$http.adornParams()
      // }).then((res) => {
      //   console.log('invitedToJoin', res)
      //   if (res && res.data.code === 0) {
      //   res.data.data.records.forEach((item) => {
      //     if (item.openId) {
      //       this.invitedToJoinList.push(item)
      //     }
      //   })
      //   }
      // })
    },
    invitedToJoin() {
      this.riskvehiclealarmContactsVisible = true;
      this.$nextTick(() => {
        this.$refs.riskvehiclealarmContacts.init(true);
      });
    },
    comeData(data) {
      this.contacts = data;
      // console.log(this.contacts)
    },
    submit() {
      console.log('提交', this.contacts)
      if (this.orderData.desc === "") {
        this.$message({
          message: "请输入过程描述",
          type: "error"
        });
        return;
      } else if (!this.contacts) {
        this.$message({
          message: "请选择联系人",
          type: "error"
        });
        return;
      } else {
          this.$http({
            url: this.$http.adornUrl("/weChatHandleTask/monitoringSendSingle"),
            method: "POST",
            data: this.$http.adornData({
              platformId: this.loginUser.platformId,
              platformName: this.loginUser.name,
              platformTypeId: 3,
              contactorName: this.contacts[0].name,
              performTaskOpenId: this.contacts[0].openId,
              performTaskContactorId: this.contacts[0].id,
              mailContactorIds: this.contacts.map(v=>v.id),
              imageUrl: this.orderData.picAbbreviate,
              eventDescription: this.orderData.desc,
              longitude: this.orderData.longitude,
              latitude: this.orderData.latitude,
              title: this.eventType,
              eventTypeName: this.eventType,
              alarmId: this.orderData.id,
              flagType: this.flagType
            })
          }).then(( data ) => {
            // console.log("/weChatHandleTask/monitoringSendSingle",data)
              if (data.data.code == 0) {
                this.$message({
                  type: "success",
                  message: "派单成功!"
                });
                this.orderData.desc = ''
                this.contactorName = ''
                this.contacts = []
                this.$emit('upDataTable',this.index)
                this.visible=false
              } else {
                this.$message({
                  type: "info",
                  message: "派单失败!"
                });
              }
            })
      }
    },
    // 选择联系人视图
    contactViewHandle(){
      this.showcommonLink = true;
      this.$nextTick(()=>{
        this.$refs.commonLink.handleAddContacts(
          '/mail/mailgroup/list',
          "请选择",
        );
      })
    },
    // 选择联系人数据
    handelLinkdata({linkman}){
      console.log(linkman)
      this.contacts = linkman

      this.contactorName = ''
      linkman.map(v=>{
        this.contactorName += v.name + ','
      })
      this.contactorName = this.contactorName.substring(0,this.contactorName.length-1)
      // this.contacts = []
      //  for (var i = 0; i < linkman.length; i++) {
      //     this.contacts.push(linkman[i].name);
      //     this.contacts.push(linkman[i].openId);
      //     this.contacts.push(linkman[i].id);
      //   }
    },

    /**
     * @method
     * @desc 获取当前登陆用户信息
     */
    getUserInfo() {
        let self = this;
        let request = {
            url: '/sys/user/info',
            method: 'get',
            params:{},
        };
        this.apix(request)
        .then((res)=>{
            console.log("getUserInfo()获取到当前登陆用户信息：【\n", res.user, "\n】");
            self.loginUser = res.user;
        })
        .catch((err)=>{
            console.log("getUserInfo()获取当前登陆用户信息失败！错误信息：【\n", err, "\n】")
        })
    },
  }
};
</script>

<style lang="scss">
.el-dialog__body {
  padding-top: 0;
}
.el-input {
  width: 100%;
}
.order-dialog /deep/.el-dialog {
  background: rgba(10, 29, 81, 1);
  border: 2px solid rgba(27, 216, 250, 1);
}
.order-dialog /deep/.el-dialog__headerbtn {
  border: 1px solid white;
  border-radius: 50%;
  padding-left: 1px;
  padding-top: 1px;
  height: 20px;
  width: 20px;
}
.order-dialog /deep/.el-dialog {
  .el-dialog__header *,
  p {
    color: white;
  }
}
</style>
