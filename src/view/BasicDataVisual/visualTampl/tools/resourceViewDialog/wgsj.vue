<template>
  <div class="wgsj">
    <el-dialog
      :close-on-click-modal="true"
      :modal-append-to-body="false"
      width="820px"
      :visible.sync="visible"
      title="事件详情"
    >   
        <el-row :gutter="20">
            <el-col :span="12">
                <el-form :model="dataForm" ref="dataForm" label-width="120px">
                    <el-form-item label="事件名称">
                      <el-input
                          v-model="dataForm.eventName"
                          placeholder="事件名称"
                          :readonly="true"
                      ></el-input>
                    </el-form-item>
                    <el-form-item label="事件类型">
                      <el-input
                          v-model="dataForm.eventTypeName"
                          placeholder="事件类型"
                          :readonly="true"
                      ></el-input>
                    </el-form-item>
                    <el-form-item label="事件规模">
                      <el-input
                          v-model="dataForm.eventScaleName"
                          placeholder="事件规模"
                          :readonly="true"
                      ></el-input>
                    </el-form-item>
                    <el-form-item label="涉及单位">
                      <el-input
                          v-model="dataForm.company"
                          placeholder="涉及单位"
                          :readonly="true"
                      ></el-input>
                    </el-form-item>
                    <el-form-item label="涉及人数">
                      <el-input
                          v-model="dataForm.number"
                          placeholder="涉及人数"
                          :readonly="true"
                      ></el-input>
                    </el-form-item>
                    <el-form-item label="发生现场">
                      <el-input
                          v-model="dataForm.eventPosition"
                          placeholder="发生现场"
                          :readonly="true"
                      ></el-input>
                    </el-form-item>
                    <el-form-item label="发生时间">
                      <el-input
                          v-model="dataForm.eventTime"
                          placeholder="发生时间"
                          :readonly="true"
                      ></el-input>
                    </el-form-item>
                    <el-form-item label="事件简述">
                      <el-input type="textarea" v-model="dataForm.remark" placeholder="事件简述"></el-input>
                    </el-form-item>
                    <el-form-item label="上传图片">
                      <template v-if="dataForm.imgList&&dataForm.imgList.length!=0">
                        <el-image
                          style="width: 100px; height: 100px"
                          v-for="(imgItem,imgIndex) in dataForm.imgList"
                          :key="imgIndex"
                          :src="imgItem.url" 
                          :preview-src-list="[imgItem.url]">
                        </el-image>
                      </template>
                      <div v-else style="color:#B0E4FF;">暂无图片</div>
                    </el-form-item>
                </el-form>
            </el-col>
            <el-col :span="12">
              <el-timeline>
                <template v-if="dataForm.eventHistoryList&&dataForm.eventHistoryList.length!=0">
                  <el-timeline-item
                    v-for="(historyItem, historyIndex) in dataForm.eventHistoryList"
                    :key="historyIndex"
                    :timestamp="historyItem.gmtCreate" placement="top">
                    <el-card>
                      <h4 v-if="historyItem.eventStatusAfter == 1">工单状态：待核实</h4>
                      <h4 v-if="historyItem.eventStatusAfter == 2">工单状态：核实中</h4>
                      <h4 v-if="historyItem.eventStatusAfter == 3">工单状态：待处理</h4>
                      <h4 v-if="historyItem.eventStatusAfter == 4">工单状态：处理中</h4>
                      <h4 v-if="historyItem.eventStatusAfter == 5">工单状态：已处理</h4>
                      <h4 v-if="historyItem.eventStatusAfter == 6">工单状态：超出范围</h4>
                      <p>事件记录：{{ item.title }}</p>
                      <p>操作人员：{{ item.mailContactorName }}</p>
                      <p>联系电话：{{ item.mailContactorMobile }}</p>
                    </el-card>
                  </el-timeline-item>
                </template>
                <el-timeline-item v-else placement="top">
                    <el-card>
                      <h4>暂无数据</h4>
                    </el-card>
                  </el-timeline-item>
              </el-timeline>
            </el-col>
        </el-row>
    </el-dialog>
  </div>
</template>

<script>

export default {
  data() {
    return {
      visible: false,
      dataForm: {
        name: '',
        address: '',
        groupName: { name: '', },
        contactorName: '',
        contactNumber: '',
        remark: '',
      },
    };
  },
  props: [],
  methods: {
    init(data) {
      this.visible = true;
      console.log("表单数据", data);
      data = data.data;
      this.dataForm.eventName = data.eventName;
      this.dataForm.eventTypeName = data.eventTypeName;
      this.dataForm.eventScaleName = data.eventScaleName;
      this.dataForm.company = data.company;
      this.dataForm.number = data.number;
      this.dataForm.eventPosition = data.eventPosition;
      this.dataForm.eventTime = data.eventTime;
      this.dataForm.remark = data.remark;
      this.dataForm.imgList = data.imgList;
      this.dataForm.eventHistoryList = data.eventHistoryList;
      
    },
  }
};
</script>

<style lang="scss" scoped>
.wgsj {
  /deep/ .el-dialog {
    background: rgba(10, 29, 81, .8);
    border: 1px solid #3B75DE;
    padding: 0;
    color: white;
    &__header {
      background: linear-gradient(to right, #3B75DE, transparent, #3B75DE);
      padding: 10px 20px;
      &btn {
        background: no-repeat center/100% 100% url('data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQH/2wBDAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQH/wAARCAAgACADAREAAhEBAxEB/8QAGQAAAwADAAAAAAAAAAAAAAAAAQoLBQYJ/8QAIRAAAgIDAQADAQEBAAAAAAAABQYDBAIHCAEJChUWESX/xAAUAQEAAAAAAAAAAAAAAAAAAAAA/8QAFBEBAAAAAAAAAAAAAAAAAAAAAP/aAAwDAQACEQMRAD8A5C/Xx+vkR+UskU6L6LKM6Bxnr9oxXcIl7GrRat/NVGpclOqSkektyWVJeUrUgD1tbcgJH9PwjZV1ezVO1S5dZCl5zXwZxnx8tiVfmnmjT2oqQYfWGwFFhJD4t9+CrF5FhOwPd+vddGcjL557naKMR4mSuTZyTWrUssmeeQDpbgrjLsNaLq3S3NGntuUjQ6yMnLMyUH/sR8FqL2LOdefB9ek6rBGLz3zOoVXT4wlTmwjnq2opY8M/Ame/YM+voZ+LM0P6H53IMT/xS/sUS/hmwS177loVyv18JBaa5FI5IZWdZZ5YCkqY6RiqmVXOr/Jtf/b/ABDbiFMLgvmpa484y5o5pVhA8NS1Hp5KWSsA2tHVgIOH49cg+MM+EXnnkpFndbp9iK2pPc5rhInatTySSy55+grDvzc3d/14vkHfehNvu22ev/iL7a3EZZXQqdKE3Bw5lfXcxHey8g9uQ2fF4mrQT2BimDG2RqdtdDFwh/IBDsujsg4bNzR1B8g/z6/IWjb554fducZfEZxjtoWboGgRMuoNXW7UqFJLky+ehqRQVHCq4VoK4txSC05RH1iiFZK5OA09nIsLwM8d6c0LfYnGfS3M7SKoF6W3tPuiwKiIV47MI9w9ETkERhgxk8/yIgsOtIAwjLOHuEtUgMrWIs8JI8cvAHBPSy32JxjzP0urlqBelt3TyUzFZR1iOzCPcfyK458Xp84/ffIyCw60T68TrZ+YS1SIyzXmwwkjyx8BWnfvLHyE/YH+Q121R06gbe4w+JPi/bZkBGmsAw0mtnT7OrEcB3p0XnanioOdxxrQWyC7sQPXKourUAxjVWbZ1yOkCRwM/wA86A78+v537r/n7RaNtvsv4h+ztvDV1YBAhhNwdeS3ZyKzQzXiEtaSaJaqrME2JlsZisQxJ2Uki7ZS1MDewdqSAGd+9ellvjzjLpfpZpLjw1LUennVmFTkrMVWAg4/kWByGvQZy+/5KRZ3a8AXRVXDzOa4SJ1a0EcksuGGQTPfr5/YKM/FkaI88dDjmJ/4q2CxyMMuK/FAQctDOV+tnCUck0XJjBIzrLPLAKidEuUpVzq5U/6tT/7f7YRxCmHzV3rxl2GtiGnmnpfT23KRkfWJQCll1D/2I+C1F5LhAwoZCxRdVgjH577haFMQAWSqTYSQ2asUuGeHgDpfvbjLjtbKtHS/S+ntRUxFCwRlEszoI/sSENaP2TOBfQx9i86sxCTzzzCsMXgBMhalywir1pJM8cfQmhfYN+wYS+U0oK5351FtWvuM9fM+bDn6xZ1KTTv1rpVakQJvbgMNOSypgFKxIewUlLxgJYkfCMDQz16p2sJELIf/2Q==');
        top: 12px;
        width: 20px;
        height: 20px;
        border-radius: 20px;
        display: block;
        font-size: 0;
      }
    }
    &__title {
      color: #0EF3FE;
      font-size: 20px;
      font-weight: bold;
      text-shadow: 0 0 5px #0EF3FE;
    }
    &__body {
      display: flex;
      flex-direction: column;
      justify-content: center;
    }
  }

  /deep/ .el-form-item__label {
    color: #B0E4FF;
    font-size: 14px;
  }
  /deep/ .el-input__inner,
  /deep/ .el-textarea__inner {
    background: transparent;
    border: 1px solid #4390FB;
    color: white;
    font-size: 14px;
  }
}
  /deep/ .el-tabs__item {
    color: #9598A1;
  }
  /deep/ .el-tabs__item.is-active {
    color: #409EFF;
  }
  /deep/ .el-table, /deep/ .el-table__expanded-cell {
    background: transparent;
    color: white;
  }
  /deep/ .el-table th, /deep/ .el-table tr {
    background: transparent;
    color: white;
  }
  /deep/ .el-pagination {
    text-align: right;
    margin-top: 20px;
  }
  /deep/ .el-pagination button:disabled {
    background: transparent;
  }
  /deep/ .el-pagination .btn-next,/deep/ .el-pagination .btn-prev {
    background: transparent;
  }
  /deep/ .el-pager li {
    background: transparent;
  }
  /deep/ .el-pagination__jump {
    color: white;
  }
  /deep/ .el-card {
    border: 1px solid #4390FB;
    background-color: transparent;
    color: #B0E4FF;
  }
  /deep/ .el-timeline-item__timestamp {
    color: #B0E4FF;
  }
</style>
