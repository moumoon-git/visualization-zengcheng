<template>
  <div class="sbssPerson">
    <el-dialog
      :close-on-click-modal="true"
      :modal-append-to-body="false"
      width="850px"
      :visible.sync="visible"
      title="人口详情"
    >
      <el-form :model="dataForm" ref="dataForm" label-width="100px">
        <el-row type="flex" justify="center">
          <el-col :span="8">
            <el-form-item label="姓名">
              <el-input
                v-model="dataForm.name"
                placeholder="姓名"
                :readonly="true"
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="16">
            <el-form-item label="所属网格">
              <el-input
                v-model="dataForm.gridName"
                placeholder="所属网格"
                :readonly="true"
                style="width:92%;"
              ></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row type="flex" justify="center">
          <el-col :span="8">
            <el-form-item label="性别">
              <el-input
                v-model="dataForm.gender"
                placeholder="性别"
                :readonly="true"
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="身份证号码">
              <el-input
                v-model="dataForm.idCardNumber"
                placeholder="身份证号码"
                :readonly="true"
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="出生日期">
              <el-input
                v-model="dataForm.birthTime"
                placeholder="出生日期"
                :readonly="true"
              ></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row type="flex" justify="center">
          <el-col :span="8">
            <el-form-item label="民族">
              <el-input
                v-model="dataForm.ethnicity"
                placeholder="民族"
                :readonly="true"
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="政治面貌">
              <el-input
                v-model="dataForm.politicalOutlook"
                placeholder="政治面貌"
                :readonly="true"
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="婚姻状况">
              <el-input
                v-model="dataForm.maritalStatus"
                placeholder="婚姻状况"
                :readonly="true"
              ></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row type="flex" justify="center">
          <el-col :span="8">
            <el-form-item label="学历">
              <el-input
                v-model="dataForm.educationBackground"
                placeholder="学历"
                :readonly="true"
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="宗教信仰">
              <el-input
                v-model="dataForm.religionBelief"
                placeholder="宗教信仰"
                :readonly="true"
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="籍贯">
              <el-input
                v-model="dataForm.nativePlace"
                placeholder="籍贯"
                :readonly="true"
              ></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row type="flex" justify="center">
          <el-col :span="8">
            <el-form-item label="户籍地">
              <el-input
                v-model="dataForm.homeNation"
                placeholder="户籍地"
                :readonly="true"
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="16">
            <el-form-item label="户籍门(楼)详址">
              <el-input
                v-model="dataForm.homeAddress"
                placeholder="户籍门(楼)详址"
                :readonly="true"
                style="width:92%;"
              ></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row type="flex" justify="center">
          <el-col :span="8">
            <el-form-item label="户号">
              <el-input
                v-model="dataForm.homeSno"
                placeholder="户号"
                :readonly="true"
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="与户主关系">
              <el-input
                v-model="dataForm.landlordRelation"
                placeholder="与户主关系"
                :readonly="true"
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="联系电话">
              <el-input
                v-model="dataForm.contactPhone"
                placeholder="联系电话"
                :readonly="true"
              ></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row type="flex" justify="center">
          <el-col :span="8">
            <el-form-item label="职业类别">
              <el-input
                v-model="dataForm.professionalCategory"
                placeholder="职业类别"
                :readonly="true"
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="职业">
              <el-input
                v-model="dataForm.profession"
                placeholder="职业"
                :readonly="true"
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="联系手机">
              <el-input
                v-model="dataForm.phoneNumber"
                placeholder="联系手机"
                :readonly="true"
              ></el-input>
            </el-form-item>
          </el-col>
        </el-row>

        <el-row type="flex" justify="center">
          <el-col :span="8">
            <el-form-item label="房屋编号">
              <el-input
                v-model="dataForm.houseSno"
                placeholder="房屋编号"
                :readonly="true"
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="16">
            <el-form-item label="入户状态">
              <el-input
                v-model="dataForm.residenceStatus"
                placeholder="入户状态"
                :readonly="true"
                style="width:92%;"
              ></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row type="flex" justify="center">
          <el-col :span="8">
            <el-form-item label="现住地">
              <el-input
                v-model="dataForm.residenceArea"
                placeholder="现住地"
                :readonly="true"
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="16">
            <el-form-item label="现住门(楼)详址">
              <el-input
                v-model="dataForm.residenceAddress"
                placeholder="现住门(楼)详址"
                :readonly="true"
                style="width:92%;"
              ></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row type="flex" justify="center">
          <el-col :span="8">
            <el-form-item label="服务处所">
              <el-input
                v-model="dataForm.servePlace"
                placeholder="服务处所"
                :readonly="true"
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="16">
            <el-form-item label="无住所原因">
              <el-input
                v-model="dataForm.unresidenceReason"
                placeholder="无住所原因"
                :readonly="true"
                style="width:92%;"
              ></el-input>
            </el-form-item>
          </el-col>
        </el-row>

        <el-row type="flex" justify="center">
          <el-col :span="8">
            <el-form-item label="外出时间">
              <el-input
                v-model="dataForm.absenceTime"
                placeholder="外出时间"
                :readonly="true"
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="16">
            <el-form-item label="外出原因">
              <el-input
                v-model="dataForm.outsideReason"
                placeholder="外出原因"
                :readonly="true"
                style="width:92%;"
              ></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row type="flex" justify="center">
          <el-col :span="8">
            <el-form-item label="外出去向">
              <el-input
                v-model="dataForm.outsidePlace"
                placeholder="外出去向"
                :readonly="true"
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="16">
            <el-form-item label="外出详址">
              <el-input
                v-model="dataForm.outsideAddress"
                placeholder="外出详址"
                :readonly="true"
                style="width:92%;"
              ></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row type="flex" justify="center">
          <el-col :span="24">
            <el-form-item label="备注">
              <el-input type="textarea" v-model="dataForm.remark" placeholder="备注" style="width: 95%;"></el-input>
            </el-form-item>
          </el-col>
        </el-row>

      </el-form>
    </el-dialog>
  </div>
</template>

<script>

export default {
  data() {
    return {
      visible: false,
      dataForm: {
      },
    };
  },
  props: [],
  methods: {
    init(data) {
      this.visible = true;
      console.log("表单数据", data);
      data = data.recordActualPopulation;
      this.dataForm.name = data.name;
      this.dataForm.gridName = data.gridName;
      this.dataForm.gender = data.gender;
      this.dataForm.idCardNumber = data.idCardNumber;
      this.dataForm.birthTime = data.birthTime;
      this.dataForm.ethnicity = data.ethnicity;
      this.dataForm.politicalOutlook = data.politicalOutlook;
      this.dataForm.maritalStatus = data.maritalStatus;
      this.dataForm.educationBackground = data.educationBackground;
      this.dataForm.religionBelief = data.religionBelief;
      this.dataForm.nativePlace = data.nativePlace;
      this.dataForm.homeNation = data.homeNation;
      this.dataForm.homeAddress = data.homeAddress;
      this.dataForm.homeSno = data.homeSno;
      this.dataForm.landlordRelation = data.landlordRelation;
      this.dataForm.contactPhone = data.contactPhone;
      this.dataForm.contactNumber = data.contactNumber;
      this.dataForm.professionalCategory = data.professionalCategory;
      this.dataForm.profession = data.profession;
      this.dataForm.phoneNumber = data.phoneNumber;
      this.dataForm.houseSno = data.houseSno;
      this.dataForm.residenceStatus = data.residenceStatus;
      this.dataForm.residenceArea = data.residenceArea;
      this.dataForm.residenceAddress = data.residenceAddress;
      this.dataForm.servePlace = data.servePlace;
      this.dataForm.unresidenceReason = data.unresidenceReason;
      this.dataForm.absenceTime = data.absenceTime;
      this.dataForm.outsideReason = data.outsideReason;
      this.dataForm.outsidePlace = data.outsidePlace;
      this.dataForm.outsideAddress = data.outsideAddress;
      this.dataForm.remark = data.remark;
    },
  }
};
</script>

<style lang="scss" scoped>
.sbssPerson {
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
  /deep/ .el-form-item__label {
    white-space: nowrap;
  }
  /deep/ .el-form-item__content > div {
    width: 80%;
  }
</style>
