<template>
  <div class="yjwz">
    <el-dialog
      :close-on-click-modal="true"
      :modal-append-to-body="false"
      width="750px"
      :visible.sync="visible"
      title="物资列表"
    >
      <el-form :model="dataForm" ref="dataForm" label-width="100px">
        <el-form-item label="物资名称" prop="name">
          <el-input
            v-model="dataForm.name"
            placeholder="物资名称"
            readonly
          ></el-input>
        </el-form-item>

        <el-form-item label="物资类型">
          <el-input
            v-model="dataForm.articleTypeName"
            v-popover:eventTypeListPopover
            placeholder="选择分组"
            readonly
          ></el-input>
        </el-form-item>

        <el-form-item label="物资仓库" prop="articleStorehouseName">
          <el-input
            v-model="dataForm.articleStorehouseName"
            v-popover:eventTypeListPopover
            placeholder="选择分组"
            :readonly="true"
          ></el-input>
          <el-input
            v-show="false"
            v-model="dataForm.articleStorehouseId"
            :readonly="true"
          ></el-input>
        </el-form-item>

        <el-form-item
          label="物资数量"
          style="width: 45%;position: absolute;right: 20px;"
        >
          <el-input
            v-model="dataForm.amount"
            placeholder="物资数量"
            readonly
          ></el-input>
        </el-form-item>

        <el-form-item label="物资型号" style="width: 45%">
          <el-input
            v-model="dataForm.model"
            placeholder="物资型号"
            readonly
          ></el-input>
        </el-form-item>

        <el-form-item
          label="计量单位"
          style="width: 45%;position: absolute;right: 20px;"
        >
          <el-input
            v-model="dataForm.measureUnit"
            placeholder="计量单位"
            readonly
          ></el-input>
        </el-form-item>

        <el-form-item label="生产厂家" style="width: 45%">
          <el-input
            v-model="dataForm.factory"
            placeholder="生产厂家"
            readonly
          ></el-input>
        </el-form-item>

        <el-form-item
          label="有效期"
          style="width: 45%;position: absolute;right: 20px;"
        >
          <template>
            <div class="block">
              <span class="demonstration"></span>
              <el-date-picker
                unlink-panels
                v-model="dataForm.replaceTime"
                type="date"
                placeholder="选择日期"
                readonly
              ></el-date-picker>
            </div>
          </template>
        </el-form-item>

        <el-form-item label="保质期" style="width: 45%">
          <template>
            <div class="block">
              <span class="demonstration"></span>
              <el-date-picker
                unlink-panels
                v-model="dataForm.expireTime"
                type="date"
                placeholder="选择日期"
                readonly
              ></el-date-picker>
            </div>
          </template>
        </el-form-item>

        <el-form-item
          label="维修状态"
          style="width: 45%;position: absolute;right: 20px;"
        >
          <el-select
            v-model="dataForm.maintainStatus"
            placeholder="请选择"
            style="width: 220px;"
            readonly
          >
            <el-option
              v-for="item in maintainStatus"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="现在状态" style="width: 45%">
          <el-select
            v-model="dataForm.nowStatus"
            placeholder="请选择"
            style="width: 220px;"
            disabled
          >
            <el-option
              v-for="item in nowStatus"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
        </el-form-item>

        <el-form-item
          label="保密标准"
          style="width: 45%;position: absolute;right: 20px;"
        >
          <el-select
            v-model="dataForm.secret"
            placeholder="请选择"
            style="width: 220px;"
            disabled
          >
            <el-option
              v-for="item in secret"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="物资级别" style="width: 45%">
          <el-select
            v-model="dataForm.level"
            placeholder="请选择"
            style="width: 220px;"
            disabled
          >
            <el-option
              v-for="item in level"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="调用方式" prop="transferMethod">
          <el-input v-model="dataForm.transferMethod" placeholder="调用方式"></el-input>
        </el-form-item>

        <el-form-item label="是否易耗">
          <el-select
            v-model="dataForm.consumables"
            placeholder="请选择"
            style="width: 220px;"
            disabled
          >
            <el-option
              v-for="item in consumables"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="物资图片:">
          <viewer
            v-if="dataForm.picPath"
            :images="[dataForm.picPath]"
            style="width: 100px"
          >
            <img :src="dataForm.picPath" style="width:100%;height:100px;" />
          </viewer>
          <!--<img v-if="dataForm.picPath" :src="dataForm.picPath" class="avatar" />-->
        </el-form-item>

        <el-form-item label="备注">
          <el-input
            type="textarea"
            :rows="3"
            v-model="dataForm.remark"
            placeholder="请输入内容"
            resize="none"
            readonly
          ></el-input>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>

<script>
export default {
  data() {
    return {
      nowStatus: [
        {
          value: 0,
          label: "可正常使用"
        },
        {
          value: 1,
          label: "不可正常使用"
        }
      ],

      maintainStatus: [
        {
          value: 0,
          label: "好"
        },
        {
          value: 1,
          label: "良好"
        },
        {
          value: 2,
          label: "差"
        }
      ],

      level: [
        {
          value: 0,
          label: "国家级"
        },
        {
          value: 1,
          label: "省级"
        },
        {
          value: 2,
          label: "市级"
        },
        {
          value: 3,
          label: "县级"
        },
        {
          value: 4,
          label: "乡镇级"
        },
        {
          value: 5,
          label: "其他"
        }
      ],

      secret: [
        {
          value: 0,
          label: "机密"
        },
        {
          value: 1,
          label: "秘密"
        },
        {
          value: 2,
          label: "限制"
        },
        {
          value: 3,
          label: "公开"
        },
        {
          value: 4,
          label: "其他"
        }
      ],

      consumables: [
        {
          value: 0,
          label: "否"
        },
        {
          value: 1,
          label: "是"
        }
      ],

      visible: false,
      dataForm: {
        name: "",
        id: 0,
        articleTypeId: "",
        model: "",
        articleStorehouseId: "",
        amount: "",
        measureUnit: "",
        factory: "",
        expireTime: "",
        replaceTime: "",
        nowStatus: "",
        maintainStatus: "",
        level: "",
        secret: "",
        transferMethod: "",
        remark: "",
        isDeleted: "",
        createUserId: "",
        gmtCreate: "",
        modifiedUserId: "",
        gmtModified: "",
        platformId: "",
        consumables: "",
        articleTypeName: "",
        articleStorehouseName: "",
        picPath: ""
      },
      cloudUrl: window.SITE_CONFIG.cloudUrl
    };
  },
  methods: {
    init(data) {
      this.dataForm.name = data.resoureArticle.name;
      this.dataForm.articleTypeName = data.resoureArticle.typeName;
      this.dataForm.articleStorehouseName = data.resoureArticle.storehouseName;
      this.dataForm.articleTypeId = data.resoureArticle.articleTypeId;
      this.dataForm.model = data.resoureArticle.model;
      this.dataForm.articleStorehouseId =
        data.resoureArticle.articleStorehouseId;
      this.dataForm.amount = data.resoureArticle.amount;
      this.dataForm.measureUnit = data.resoureArticle.measureUnit;
      this.dataForm.factory = data.resoureArticle.factory;
      this.dataForm.expireTime = data.resoureArticle.expireTime;
      this.dataForm.replaceTime = data.resoureArticle.replaceTime;
      this.dataForm.nowStatus = data.resoureArticle.nowStatus;
      this.dataForm.maintainStatus = data.resoureArticle.maintainStatus;
      this.dataForm.level = data.resoureArticle.level;
      this.dataForm.secret = data.resoureArticle.secret;
      this.dataForm.transferMethod = data.resoureArticle.transferMethod;
      this.dataForm.remark = data.resoureArticle.remark;
      this.dataForm.isDeleted = data.resoureArticle.isDeleted;
      this.dataForm.createUserId = data.resoureArticle.createUserId;
      this.dataForm.gmtCreate = data.resoureArticle.gmtCreate;
      this.dataForm.modifiedUserId = data.resoureArticle.modifiedUserId;
      this.dataForm.gmtModified = data.resoureArticle.gmtModified;
      this.dataForm.platformId = data.resoureArticle.platformId;
      this.dataForm.consumables = data.resoureArticle.consumables;
      this.dataForm.picPath = data.resoureArticle.picPath;

      this.visible = true;
    }
  }
};
</script>
<style scoped lang="scss">
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
}
.avatar {
  width: 178px;
  height: 178px;
  display: block;
}

.yjwz {
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
      padding-left: 0;
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
    color: #9598A1;
    font-size: 14px;
  }
}
</style>
