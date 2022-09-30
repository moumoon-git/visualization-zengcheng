<!--
  @author tanjinfeng
  @date 2020-12-01
  @description 新建/编辑覆盖物设置弹窗
-->
<template>
  <div
    class="painting-panel-overlay-edit-dialog"
    v-if="visible"
  >
    <!-- 遮罩层 -->
    <div
      class="painting-panel-overlay-edit-dialog__modal"
      @click="visible = false"
    ></div>
    <!-- 弹窗主体 -->
    <div class="painting-panel-overlay-edit-dialog__main">
      <!-- 关闭按钮 -->
      <div
        class="painting-panel-overlay-edit-dialog__main__close-button el-icon-close"
        @click="visible = false"
      ></div>
      <div class="painting-panel-overlay-edit-dialog__main__item">
        <label class="painting-panel-overlay-edit-dialog__main__item__label">覆盖物名称：</label>
        <el-input
          :clearable="true"
          v-model="text"
        />
      </div>
      <div class="painting-panel-overlay-edit-dialog__main__item">
        <label class="painting-panel-overlay-edit-dialog__main__item__label">覆盖物说明：</label>
        <el-input
          :clearable="true"
          :rows="3"
          resize="none"
          type="textarea"
          v-model="title"
        />
      </div>
      <div class="painting-panel-overlay-edit-dialog__main__item">
        <label class="painting-panel-overlay-edit-dialog__main__item__label">边线粗度：</label>
        <el-slider
          :min="0"
          :max="20"
          :step="1"
          v-model.number="weight"
        />
      </div>
      <div class="painting-panel-overlay-edit-dialog__main__item">
        <label class="painting-panel-overlay-edit-dialog__main__item__label">边线颜色：</label>
        <el-color-picker
          popper-class="color-picker"
          size="small"
          v-model="lineColor"
        />
      </div>
      <template v-if="type !== 'polyline' && type !== 'AMap.Polyline'">
        <div class="painting-panel-overlay-edit-dialog__main__item">
          <label class="painting-panel-overlay-edit-dialog__main__item__label">填充颜色：</label>
          <el-color-picker
            popper-class="color-picker"
            size="small"
            v-model="color"
          />
        </div>
        <div class="painting-panel-overlay-edit-dialog__main__item">
          <label class="painting-panel-overlay-edit-dialog__main__item__label">填充透明度：</label>
          <el-slider
            :min="0"
            :max="1"
            :step="0.01"
            :format-tooltip="formatTooltipPercentage"
            v-model.number="opacity"
          />
        </div>
      </template>
      
      <!-- 确定按钮 -->
      <button
        class="painting-panel-overlay-edit-dialog__main__confirm"
        @click="confirm"
      >确定</button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'PaintingPanelOverlayEditDialog',

  data() {
    return {
      // 弹窗是否可见
      visible: false,
      // 覆盖物名称
      text: '',
      // 覆盖物说明
      title: '',
      // 覆盖物类型
      type: '',
      // 填充颜色
      color: '#0091ff',
      // 边线粗细程度
      weight: 2,
      // 填充透明度
      opacity: 0.35,
      // 是否编辑状态
      isEdit: false,
      // 边线颜色
      lineColor: '#0091ff'
    }
  },

  methods: {
    /**
     * @description 滑块提示语
     * @param { Number } value 透明度取值（0-1）
     * @return { String } 百分比
     */
    formatTooltipPercentage(value) {
      return `${ parseInt(value * 100, 10) }%`
    },

    /**
     * @description 打开弹窗，初始化数据
     * @param { String } type 新建覆盖物的类型
     */
    open(type) {
      this.isEdit = false
      this.text = ''
      this.title = ''
      this.color = '#0091ff',
      this.lineColor = '#0091ff',
      this.weight = 2,
      this.opacity = 0.35
      this.type = type
      this.visible = true
    },

    /**
     * @description 打开编辑弹窗
     * @param { String } text 覆盖物名称
     * @param { String } title 覆盖物说明
     * @param { String } color 覆盖物颜色
     * @param { Number } weight 边框粗度
     * @param { Number } opacity 填充透明度
     * @param { String } type 覆盖物类型
     */
    edit(
      text,
      title,
      color,
      weight,
      opacity,
      type,
      lineColor
    ) {
      this.isEdit = true
      this.text = text
      this.title = title
      this.color = color
      this.weight = weight
      this.opacity = opacity
      this.type = type
      this.lineColor = lineColor
      this.visible = true
    },

    /**
     * @description 确定提交更新覆盖物数据
     */
    confirm() {
      if (this.isEdit) {
        this.$emit('update', {
          text: this.text,
          title: this.title,
          color: this.color,
          weight: this.weight,
          opacity: this.opacity,
          lineColor: this.lineColor
        })
      } else {
        this.$emit('confirm', {
          text: this.text,
          title: this.title,
          color: this.color,
          weight: this.weight,
          opacity: this.opacity,
          type: this.type,
          lineColor: this.lineColor
        })
      }

      // 关闭弹窗
      this.visible = false
    },
  },
}
</script>

<style lang="scss" scoped>
.painting-panel-overlay-edit-dialog {
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
    width: 450px;
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
