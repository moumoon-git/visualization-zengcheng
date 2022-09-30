<template>
  <div class="xfz">
    <el-dialog
      :close-on-click-modal="true"
      :modal-append-to-body="false"
      width="820px"
      :visible.sync="visible"
      title="消防站详情"
    >
      <el-tabs v-model="activeName" type="card" @tab-click="handleClick">
        <el-tab-pane label="消防站详情" name="first">
          <el-form :model="dataForm" ref="dataForm" label-width="120px">
            <el-form-item label="消防站名称">
              <el-input
                v-model="dataForm.name"
                placeholder="消防站名称"
                :readonly="true"
              ></el-input>
            </el-form-item>
            <el-form-item label="消防站所在地">
              <el-input
                v-model="dataForm.address"
                placeholder="消防站所在地"
                :readonly="true"
              ></el-input>
            </el-form-item>
            <el-form-item label="主管单位">
              <el-input
                v-model="dataForm.groupName.name"
                placeholder="主管单位"
                :readonly="true"
              ></el-input>
            </el-form-item>
            <el-form-item label="联系人">
              <el-input
                v-model="dataForm.contactorName"
                placeholder="联系人"
                :readonly="true"
              ></el-input>
            </el-form-item>
            <el-form-item label="联系人电话">
              <el-input
                v-model="dataForm.contactNumber"
                placeholder="联系人电话"
                :readonly="true"
              ></el-input>
            </el-form-item>
            <el-form-item label="备注">
              <el-input type="textarea" v-model="dataForm.remark" placeholder="备注"></el-input>
            </el-form-item>
          </el-form>
        </el-tab-pane>
        <el-tab-pane label="装备列表" name="second">
          <el-table
            :data="equipmentTableData"
            style="width: 100%">
            <el-table-column
              prop="equipmentName"
              label="装备名称">
            </el-table-column>
            <el-table-column
              prop="typeName"
              label="装备类别">
            </el-table-column>
            <el-table-column
              prop="configure"
              label="配备标准">
            </el-table-column>
          </el-table>
          <el-pagination
            @current-change="handleCurrentChange"
            :current-page.sync="equipmentCurrentPage"
            :page-size="10"
            layout="prev, pager, next, jumper"
            :total="equipmentTotal">
          </el-pagination>
        </el-tab-pane>
        <el-tab-pane label="人员列表" name="third">
          <el-table
            :data="personnelTableData"
            style="width: 100%">
            <el-table-column
              prop="name"
              label="名称">
            </el-table-column>
            <el-table-column
              prop="sexChinese"
              label="性别">
            </el-table-column>
            <el-table-column
              prop="position"
              label="职位">
            </el-table-column>
            <el-table-column
              prop="age"
              label="年龄">
            </el-table-column>
            <el-table-column
              prop="mobile"
              label="联系电话">
            </el-table-column>
          </el-table>
          <el-pagination
            @current-change="handleCurrentChange"
            :current-page.sync="personnelCurrentPage"
            :page-size="10"
            layout="prev, pager, next, jumper"
            :total="personnelTotal">
          </el-pagination>
        </el-tab-pane>
      </el-tabs>
    </el-dialog>
  </div>
</template>

<script>

export default {
  data() {
    return {
      visible: false,
      activeName: 'first',
      dataForm: {
        name: '',
        address: '',
        groupName: { name: '', },
        contactorName: '',
        contactNumber: '',
        remark: '',
      },
      equipmentTableData: [],
      equipmentCurrentPage: 0,
      equipmentTotal: 0,
      personnelTableData: [],
      personnelCurrentPage: 0,
      personnelTotal: 0,
    };
  },
  props: [],
  methods: {
    init(data) {
      this.visible = true;
      console.log("表单数据", data);
      data = data.data;
      this.dataForm.name = data.name;
      this.dataForm.address = data.address;
      this.dataForm.groupName.name = data.groupName;
      this.dataForm.contactorName = data.contactorName;
      this.dataForm.contactNumber = data.contactNumber;
      this.dataForm.remark = data.remark;
    },
    handleCurrentChange() {
      if (this.activeName=='second'){
        this.apix({
          url: '/firefighting/equipment/list',
          method: 'POST',
          data: {
            word: '',
            page: this.equipmentCurrentPage,
            limit: 10,
          },
          header: {
            "Content-Type": "application/json",
          }
        }).then((res) =>{
          console.log('/firefighting/equipment/list', res);
          if (res.code == 0){
            this.equipmentTableData = res.page.list;
            this.equipmentTotal = res.page.totalCount;
          }
        });
      }
      if (this.activeName=='third'){
        this.apix({
          url: '/firefighting/contactor/list',
          method: 'POST',
          data: {
            word: '',
            page: this.personnelCurrentPage,
            limit: 10,
          },
          header: {
            "Content-Type": "application/json",
          }
        }).then((res) =>{
          console.log('/firefighting/contactor/list', res);
          if (res.code == 0){
            this.personnelTableData = res.page.list;
            this.personnelTotal = res.page.totalCount;
          }
        });
      }
    },
    handleClick() {
      this.handleCurrentChange();
    },
  }
};
</script>

<style lang="scss" scoped>
.xfz {
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
</style>
