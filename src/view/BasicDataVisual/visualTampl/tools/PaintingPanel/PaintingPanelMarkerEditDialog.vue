<!--
  @author tanjinfeng
  @date 2020-12-01
  @description 新建/编辑marker设置弹窗
-->
<template>
  <div
    class="painting-panel-marker-edit-dialog"
    v-if="visible"
  >
    <!-- 遮罩层 -->
    <div
      class="painting-panel-marker-edit-dialog__modal"
      @click="visible = false"
    ></div>
    <!-- 弹窗主体 -->
    <div class="painting-panel-marker-edit-dialog__main">
      <!-- 关闭按钮 -->
      <div
        class="painting-panel-marker-edit-dialog__main__close-button el-icon-close"
        @click="visible = false"
      ></div>
      <div class="painting-panel-marker-edit-dialog__main__item">
        <label class="painting-panel-marker-edit-dialog__main__item__label">落点名称：</label>
        <el-input
          :clearable="true"
          v-model="text"
        />
      </div>
      <div class="painting-panel-marker-edit-dialog__main__item">
        <label class="painting-panel-marker-edit-dialog__main__item__label">落点说明：</label>
        <el-input
          :clearable="true"
          :rows="3"
          resize="none"
          type="textarea"
          v-model="title"
        />
      </div>
      
      <!-- 确定按钮 -->
      <button
        class="painting-panel-marker-edit-dialog__main__confirm"
        @click="confirm"
      >确定</button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'PaintingPanelMarkerEditDialog',

  data() {
    return {
      // 弹窗是否可见
      visible: false,
      // 覆盖物名称
      text: '',
      // 覆盖物说明
      title: '',
      // 覆盖物类型
      index: '',
      // 是否编辑状态
      isEdit: false
    }
  },

  methods: {
    /**
     * @description 打开弹窗，初始化数据
     * @param { Number } index marker的类型
     */
    open(index) {
      this.isEdit = false
      this.text = ''
      this.title = ''
      this.index = index
      this.visible = true
    },

    /**
     * @description 打开编辑弹窗
     * @param { String } text marker名称
     * @param { String } title marker说明
     */
    edit(
      text,
      title
    ) {
      this.isEdit = true
      this.text = text
      this.title = title
      this.visible = true
    },

    /**
     * @description 确定提交更新覆盖物数据
     */
    confirm() {
      if (this.isEdit) {
        this.$emit('update', {
          text: this.text,
          title: this.title
        })
      } else {
        this.$emit('confirm', {
          text: this.text,
          title: this.title,
          index: this.index
        })
      }

      // 关闭弹窗
      this.visible = false
    },
  },
}
</script>

<style lang="scss" scoped>
.painting-panel-marker-edit-dialog {
  position: fixed;
  z-index: 100;
  // 遮罩
  &__modal {
    position: fixed;
    left: 0;
    top: 0;
    width: 100vw;
    height: 100vh;
  }

  // 弹窗主体
  &__main {
    width: 350px;
    height: 170px;
    background: rgba(12, 30, 71, 0.8);
    border: 1px solid #BBEBFF;
    position: fixed;
    left: 50vw;
    top: 50vh;
    transform: translate(-50%, -50%);
    z-index: 1;
    padding: 30px 20px 20px 20px;
    text-align: center;

    // 关闭按钮
    &__close-button {
      color: #6CDEFF;
      font-weight: bolder;
      font-size: 18px;
      transition: color 0.1s;
      cursor: pointer;
      position: absolute;
      right: 5px;
      top: 5px;
      &:hover {
        color: white;
      }
    }

    // 选项
    &__item {
      position: relative;
      padding-left: 100px;
      margin-bottom: 15px;
      text-align: left;
      &__label {
        color: #47E0FF;
        font-size: 16px;
        position: absolute;
        left: 0;
        top: 50%;
        transform: translateY(-50%);
      }
      /deep/ .el-input { 
        &__inner {
          height: 30px;
          border: 1px solid #9AC9E7;
          background: transparent;
        }
        &__clear {
          line-height: 30px;
        }
      }
      /deep/ .el-color-picker__trigger {
        border: 1px solid #9AC9E7;
      }
      /deep/ .el-textarea__inner {
        border: 1px solid #9AC9E7;
        background: transparent;
        font-size: 16px;
        color: #9AC9E7;
        font-family: 'SourceHanSansCN-Regular';
      }
    }

    // 确定按钮
    &__confirm {
      color: #47E0FF;
      font-size: 16px;
      background: #062D5E;
      border: 1px solid #0D79FF;
      width: 76px;
      cursor: pointer;
      outline: none;
      &:hover {
        color: white;
      }
    }
  }
}
</style>
