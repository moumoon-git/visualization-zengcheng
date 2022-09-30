<!--
  @author tanjinfeng
  @date 2020-12-01
  @description 定位图标列表面板
-->
<template>
  <div :class="['painting-panel-marker', { 'painting-panel-marker--visible': visible }]">
    <div
      class="painting-panel-marker__item"
      v-for="(icon, index) in list"
      :key="`marker_${ index }`"
    >
      <div
        :class="['painting-panel-marker__item__icon', `painting-panel-marker__item__icon--${ index + 1 }`]"
        @click="$emit('marker-click', index + 1)"
      ></div>
      <div class="painting-panel-marker__item__name">{{ icon }}</div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'PaintingPanelMarker',

  props: {
    visible: {
      required: true,
      type: Boolean,
      default: false
    }
  },

  data() {
    return {
      list: [
        '指挥中心',
        '安置点',
        '物资库',
        '物资发放',
        '应急厕所',
        '安防人员',
        '应急供电',
        '应急通讯',
        '灭火器',
        '停车场',
        '医疗点',
        '禁止通行',
        '排污口',
        '垃圾堆',
        '避护场所',
        '急救站',
        '直升机',
        '水井',
        '危险源',
        '供水点',
      ],
    }
  },
}
</script>

<style lang="scss" scoped>
.painting-panel-marker {
  height: 0;
  overflow: hidden;
  transition: height 0.5s;

  &--visible {
    height: 320px;
    margin-top: 10px;
  }

  &__item {
    display: inline-block;
    width: 57px;
    text-align: center;
    margin: 5px;

    &__icon {
      margin: 0 auto;
      width: 32px;
      height: 32px;
      border-radius: 40px;
      cursor: pointer;
      background: no-repeat center/200% 200% transparent;
      @for $i from 1 through 20 {
        &--#{$i} {
          background-image: url('./img/marker-#{$i}.png');
        }
      }
      &:hover {
        box-shadow: 0 0 15px rgba(155, 238, 255, 0.5);
      }
      &:active {
        position: relative;
        top: 1px;
      }
    }

    &__name {
      color: white;
      font-size: 14px;
    }
  }
}
</style>