<template>
  <div :class="$style.wrapper">
    <div>
      <label>预案名称</label>
      <span>{{ formData.name }}</span>
    </div>
    <div>
      <label>预案版本</label>
      <span>{{ formData.version }}</span>
    </div>
    <div>
      <label>所属分类</label>
      <span>{{ formData.groupName }}</span>
    </div>
    <div>
      <label>编码</label>
      <span>{{ formData.code }}</span>
    </div>
    <div>
      <label>编制单位</label>
      <span>{{ formData.preparationUnit }}</span>
    </div>
    <div>
      <label>发布单位</label>
      <span>{{ formData.issued }}</span>
    </div>
    <div>
      <label>发布时间</label>
      <span>{{ formData.issuedTime }}</span>
    </div>
    <div>
      <label>适用区域</label>
      <span>{{ formData.applicableArea }}</span>
    </div>
    <div>
      <label>修订时间</label>
      <span>{{ formData.revisionTime }}</span>
    </div>
    <div>
      <label>备注</label>
      <span>{{ formData.remark }}</span>
    </div>
  </div>
</template>

<script>
export default {
  name: 'PlanInfo',
  props: {
    formData: {
      type: Object,
      required: true,
    },
  },
}
</script>

<style lang="scss" module>
.wrapper {
  height: 555px;
  overflow: auto;
  // 滚动条
  &::-webkit-scrollbar {
    background: transparent;
    width: 3px;
    height: 3px;
  }
  &::-webkit-scrollbar-thumb {
    background: #518ce5;
    border-radius: 6px;
  }
  // 表单项
  & > div {
    font-size: 16px;
    display: flex;
    margin: 10px 30px;
    align-items: center;
    // 表单项名称
    & > label {
      color: #B0E4FF;
      width: 80px;
      text-align: right;
      margin-right: 10px;
    }
    // 表单项内容
    & > span {
      color: #FFFFFF;
      border: 1px solid #489FF8;
      border-radius: 3px;
      display: inline-block;
      width: 300px;
      flex-grow: 1;
      padding: 5px 10px;
      min-height: 35px;
      white-space: pre-wrap;
      word-wrap: break-word;
      box-sizing: border-box;
    }
  }
}
</style>