<template>
  <div class="OutbreakBottomRight_wrap">
    <OutbreakBottomRightTop ref='OutbreakBottomRightTop' style='margin-bottom: 20px;'></OutbreakBottomRightTop>
    <OutbreakBottomRightBottom ref='OutbreakBottomRightBottom'></OutbreakBottomRightBottom>
  </div>
</template>

<script>
  import OutbreakBottomRightTop from './OutbreakBottomRight_top'
  import OutbreakBottomRightBottom from './OutbreakBottomRight_bottom'
  export default{
    name:'OutbreakBottomRight',
    data () {
      return {

      }
    },
    components:{
      OutbreakBottomRightTop,
      OutbreakBottomRightBottom
    }
  }
</script>

<style scoped>

</style>
