<template>
  <div :class="[$style.container, { [$style.container_expand]: visible }]">
    <el-tooltip
      :enterable="false"
      content="最多保存10条记录"
      placement="top"
      effect="dark"
    >
      <div :class="$style.header">图层保存历史记录</div>
    </el-tooltip>
    <div
      v-for="(history, index) in list"
      :key="`histroy_record_${index}`"
      :class="$style.item"
      @click="$emit('select-record', history)"
    >
      <span :class="$style.item_time">{{ history[0].createTime }}</span>
      <span
        :class="$style.item_delete"
        @click.stop="deleteRecord(history[0].uuid)"
      >删除记录</span>
    </div>
    <div
      :class="$style.tips"
      v-if="list.length === 0"
    >暂无图层历史记录</div>
  </div>
</template>

<script>
export default {
  name: 'PaintingPanelOverlayHistory',

  props: {
    visible: {
      required: true,
      type: Boolean,
      default: false
    },
    // 图层历史记录
    list: {
      required: true,
      type: Array,
      default: () => ([])
    }
  },

  methods: {
    /**
     * @description 删除记录
     * @param { String } uuid 记录的唯一id
     */
    deleteRecord(uuid) {
      this.$confirm(
        '删除该条记录后，将无法恢复, 是否确定?',
        '提示',
        {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }
      ).then(() => {
        const request = {
          url: '/visuallayer/deleteVisualLayer',
          method: 'post',
          headers: { 'Content-Type': 'application/json; charset=UTF-8' },
          data: {
            ids: [uuid]
          }
        }
        this.apix(request).then(response => {
          if (response.code === 0) {
            // 刷新历史记录列表
            this.$emit('refresh')
          } else {
            this.$message.error(`删除失败！请重试！错误信息：${ response.msg }`)
          }
        })
      })
    }
  }
}
</script>

<style lang="scss" module>
.container {
  position: absolute;
  top: 0;
  right: -10px;
  transform: translateX(100%);
  width: 0;
  transition: width 0.5s;
  overflow: hidden;
  background: rgba(10, 29, 81, 0.8);
  color: white;
  box-shadow: 0 2px 4px rgba(0, 0, 0, .12), 0 0 6px rgba(0, 0, 0, .04);

  &_expand {
    width: 250px;
    border: 1px solid rgba(188, 208, 247, 0.1);
  }
}

.header {
  color: #6FFAFD;
  text-align: center;
  padding: 5px 10px;
  font-size: 16px;
  font-weight: bold;
  background: rgba(18, 47, 142, 0.5);
  white-space: nowrap;
}

.item {
  border-bottom: 1px solid rgba(188, 208, 247, 0.1);
  white-space: nowrap;
  padding: 5px 10px;
  cursor: pointer;

  &:hover > &_time {
    color: #6FFAFD;
  }

  &_delete {
    color: #99C9E7;
    margin-left: 10px;
    transition: color 0.3s;

    &:hover {
      color: #F54E57;
    }
  }
}

.tips {
  text-align: center;
  white-space: nowrap;
  padding: 5px 10px;
}
</style>