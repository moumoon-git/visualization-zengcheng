<template>
  <div class="sbssHouse">
    <el-dialog
      :close-on-click-modal="true"
      :modal-append-to-body="false"
      width="850px"
      :visible.sync="visible"
      title="房屋详情"
    >
      <el-form :model="dataForm" ref="dataForm" label-width="130px">
        <el-row type="flex" justify="center">
          <el-col :span="8">
            <el-form-item label="房屋编号">
              <el-input
                v-model="dataForm.houseNumber"
                placeholder="房屋编号"
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
                style="width:93%;"
              ></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row type="flex" justify="center">
          <el-col :span="8">
            <el-form-item label="是否是出租房">
              <el-checkbox v-model="dataForm.isRentalHousing" />
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="出租人">
              <el-input
                v-model="dataForm.rentalPeople"
                placeholder="出租人"
                :readonly="true"
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="隐患程度">
              <el-input
                v-model="dataForm.degreeOfHazard"
                placeholder="隐患程度"
                :readonly="true"
              ></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row type="flex" justify="center">
          <el-col :span="8">
            <el-form-item label="隐患类型">
              <el-input
                v-model="dataForm.degreeOfType"
                placeholder="隐患类型"
                :readonly="true"
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="16">
            <el-form-item label="房屋地址类型">
              <el-input
                v-model="dataForm.housingAddressType"
                placeholder="房屋地址类型"
                :readonly="true"
                style="width:93%;"
              ></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row type="flex" justify="center">
          <el-col :span="8">
            <el-form-item label="房屋地址">
              <el-input
                v-model="dataForm.housingAddress"
                placeholder="房屋地址"
                :readonly="true"
                style="width:96%;"
              ></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row type="flex" justify="center">
          <el-col :span="8">
            <el-form-item label="建筑名称">
              <el-input
                v-model="dataForm.buildingName"
                placeholder="建筑名称"
                :readonly="true"
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="建筑用途">
              <el-input
                v-model="dataForm.buildingUse"
                placeholder="户籍门(楼)详址"
                :readonly="true"
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="建成年份">
              <el-input
                v-model="dataForm.buildingYear"
                placeholder="建成年份"
                :readonly="true"
              ></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row type="flex" justify="center">
          <el-col :span="8">
            <el-form-item label="本户建筑面积">
              <el-input
                v-model="dataForm.buildingArea"
                placeholder="本户建筑面积"
                :readonly="true"
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="房屋户型">
              <el-input
                v-model="dataForm.buildingType"
                placeholder="房屋户型"
                :readonly="true"
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="房屋来源">
              <el-input
                v-model="dataForm.buildingSource"
                placeholder="房屋来源"
                :readonly="true"
              ></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row type="flex" justify="center">
          <el-col :span="8">
            <el-form-item label="房屋用途">
              <el-input
                v-model="dataForm.housingUse"
                placeholder="房屋用途"
                :readonly="true"
                style="width:96%;"
              ></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row type="flex" justify="center">
          <el-col :span="8">
            <el-form-item label="自有产权">
              <el-input
                v-model="dataForm.ownPropertyRights"
                placeholder="自有产权"
                :readonly="true"
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="16">
            <el-form-item label="租赁公房">
              <el-input
                v-model="dataForm.publicRentalHousing"
                placeholder="租赁公房"
                :readonly="true"
                style="width:93%;"
              ></el-input>
            </el-form-item>
          </el-col>
        </el-row>

        <el-row type="flex" justify="center">
          <el-col :span="8">
            <el-form-item label="房主">
              <el-input
                v-model="dataForm.homeowners"
                placeholder="房主"
                :readonly="true"
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="房主证件类型">
              <el-input
                v-model="dataForm.homeownersldentificationType"
                placeholder="房主证件类型"
                :readonly="true"
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="房主证件号码">
              <el-input
                v-model="dataForm.homeownersldentificationNumber"
                placeholder="房主证件号码"
                :readonly="true"
              ></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row type="flex" justify="center">
          <el-col :span="8">
            <el-form-item label="房主固定电话">
              <el-input
                v-model="dataForm.homeownersTelephone"
                placeholder="房主固定电话"
                :readonly="true"
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="房主手机">
              <el-input
                v-model="dataForm.homeownersPhone"
                placeholder="房主手机"
                :readonly="true"
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="房屋所属楼宇">
              <el-input
                v-model="dataForm.propertyOwnership"
                placeholder="房屋所属楼宇"
                :readonly="true"
              ></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row type="flex" justify="center">
          <el-col :span="24">
            <el-form-item label="房主现居地址">
              <el-input
                v-model="dataForm.homeownersAddress"
                placeholder="房主现居地址"
                :readonly="true"
                style="width:96%;"
              ></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row type="flex" justify="center">
          <el-col :span="8">
            <el-form-item label="租赁备案证号">
              <el-input
                v-model="dataForm.leaseRecordCertificateNo"
                placeholder="租赁备案证号"
                :readonly="true"
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="16">
            <el-form-item label="出租房用途">
              <el-input
                v-model="dataForm.rentalHousingUse"
                placeholder="出租房用途"
                :readonly="true"
                style="width:93%;"
              ></el-input>
            </el-form-item>
          </el-col>
        </el-row>

        <el-row type="flex" justify="center">
          <el-col :span="8">
            <el-form-item label="出租人类型">
              <el-input
                v-model="dataForm.outsideReason"
                placeholder="出租人类型"
                :readonly="true"
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="出租人证件类型">
              <el-input
                v-model="dataForm.lessorldentificationType"
                placeholder="出租人证件类型"
                :readonly="true"
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="出租人证件号码">
              <el-input
                v-model="dataForm.lessorldentificationNumber"
                placeholder="出租人证件号码"
                :readonly="true"
              ></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row type="flex" justify="center">
          <el-col :span="8">
            <el-form-item label="出租人固定电话">
              <el-input
                v-model="dataForm.lessorTelephone"
                placeholder="出租人固定电话"
                :readonly="true"
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="16">
            <el-form-item label="出租人手机">
              <el-input
                v-model="dataForm.lessorPhone"
                placeholder="出租人手机"
                :readonly="true"
                style="width:93%;"
              ></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row type="flex" justify="center">
          <el-col :span="24">
            <el-form-item label="出租人地址">
              <el-input
                v-model="dataForm.lessorAddress"
                placeholder="出租人地址"
                :readonly="true"
                style="width:96%;"
              ></el-input>
            </el-form-item>
          </el-col>
        </el-row>

        <el-row type="flex" justify="center">
          <el-col :span="8">
            <el-form-item label="承租人">
              <el-input
                v-model="dataForm.lessee"
                placeholder="承租人"
                :readonly="true"
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="承租人身份证号码">
              <el-input
                v-model="dataForm.lesseeldentificationNumber"
                placeholder="承租人身份证号码"
                :readonly="true"
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="承租人固定电话">
              <el-input
                v-model="dataForm.lesseeTelephone"
                placeholder="承租人固定电话"
                :readonly="true"
              ></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row type="flex" justify="center">
          <el-col :span="8">
            <el-form-item label="承租人手机">
              <el-input
                v-model="dataForm.lesseePhone"
                placeholder="承租人手机"
                :readonly="true"
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="有无消防通道">
              <el-checkbox v-model="dataForm.isConsumptionChannel" />
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="有无安全通道">
              <el-checkbox v-model="dataForm.isSecurityChannel" />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row type="flex" >
          <el-col :span="8">
            <el-form-item label="是否签订治安责任书">
              <el-checkbox v-model="dataForm.isSecurityGuarantee" />
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="是否注销">
              <el-checkbox v-model="dataForm.isLogout" />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row type="flex" justify="center">
          <el-col :span="24">
            <el-form-item label="备注">
              <el-input type="textarea" v-model="dataForm.remarks" placeholder="备注" style="width: 96%;"></el-input>
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
      data = data.recordActualHouseEntity;
      this.dataForm.houseNumber = data.houseNumber;
      this.dataForm.gridName = data.gridName;
      this.dataForm.isRentalHousing = data.isRentalHousing=='0'?true:false;
      this.dataForm.rentalPeople = data.rentalPeople;
      this.dataForm.degreeOfHazard = data.degreeOfHazard;
      this.dataForm.degreeOfType = data.degreeOfType;
      this.dataForm.housingAddressType = data.housingAddressType;
      this.dataForm.housingAddress = data.housingAddress;
      this.dataForm.buildingName = data.buildingName;
      this.dataForm.buildingUse = data.buildingUse;
      this.dataForm.buildingYear = data.buildingYear;
      this.dataForm.buildingArea = data.buildingArea;
      this.dataForm.homeAddress = data.homeAddress;
      this.dataForm.buildingType = data.buildingType;
      this.dataForm.buildingSource = data.buildingSource;
      this.dataForm.housingUse = data.housingUse;
      this.dataForm.ownPropertyRights = data.ownPropertyRights;
      this.dataForm.publicRentalHousing = data.publicRentalHousing;
      this.dataForm.homeowners = data.homeowners;
      this.dataForm.homeownersldentificationType = data.homeownersldentificationType;
      this.dataForm.homeownersldentificationNumber = data.homeownersldentificationNumber;
      this.dataForm.homeownersTelephone = data.homeownersTelephone;
      this.dataForm.homeownersPhone = data.homeownersPhone;
      this.dataForm.propertyOwnership = data.propertyOwnership;
      this.dataForm.homeownersAddress = data.homeownersAddress;
      this.dataForm.leaseRecordCertificateNo = data.leaseRecordCertificateNo;
      this.dataForm.rentalHousingUse = data.rentalHousingUse;
      this.dataForm.outsideReason = data.lessorType;
      this.dataForm.lessorldentificationType = data.lessorldentificationType;
      this.dataForm.lessorldentificationNumber = data.lessorldentificationNumber;
      this.dataForm.lessorTelephone = data.lessorTelephone;
      this.dataForm.lessorPhone = data.lessorPhone;
      this.dataForm.lessorAddress = data.lessorAddress;
      this.dataForm.lessee = data.lessee;
      this.dataForm.lesseeldentificationNumber = data.lesseeldentificationNumber;
      this.dataForm.lesseeTelephone = data.lesseeTelephone;
      this.dataForm.lesseePhone = data.lesseePhone;
      this.dataForm.isConsumptionChannel = data.isConsumptionChannel=='0'?true:false;
      this.dataForm.isSecurityChannel = data.isSecurityChannel=='0'?true:false;
      this.dataForm.isSecurityGuarantee = data.isSecurityGuarantee=='0'?true:false;
      this.dataForm.isLogout = data.isLogout=='0'?true:false;
      this.dataForm.remarks = data.remarks;

    },
  }
};
</script>

<style lang="scss" scoped>
.sbssHouse {
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
