<template>
  <div v-if="isVisible">
    <div
      :class="$style.modal"
      @click="handleClose"
    />
    <div :class="$style.dialog">
      <header>
        <span>自定义添加成员</span>
        <button @click="handleClose" />
      </header>
      <main>
        <label>
          <span>姓名：</span>
          <input v-model="name">
        </label>
        <label>
          <span>单位：</span>
          <input v-model="workplace">
        </label>
        <label>
          <span>职务：</span>
          <input v-model="position">
        </label>
        <label>
          <span>手机：</span>
          <input v-model="phone">
        </label>
      </main>
      <footer>
        <button @click="handleConfirm">确认</button>
      </footer>
    </div>
  </div>
</template>

<script>
export default {
  name: 'AddMemberDialog',
  props: {
    isVisible: {
      type: Boolean,
      default: false,
    },
    // 预案id
    planId: {
      required: true,
    },
  },
  data() {
    return {
      // 姓名
      name: '',
      // 单位
      workplace: '',
      // 职务
      position: '',
      // 手机
      phone: '',
    };
  },
  methods: {
    /**
     * @description 取消或关闭对话框，重置数据
     */
    handleClose() {
      this.$emit('update:isVisible', false);
      // 重置数据
      this.name = '';
      this.workplace = '';
      this.position = '';
      this.phone = '';
    },
    /**
     * @description 确认添加
     */
    handleConfirm() {
      if (!this.name) {
        this.$message.error('请填写姓名');
        return;
      }
      if (!this.workplace) {
        this.$message.error('请填写单位');
        return;
      }
      if (!this.position) {
        this.$message.error('请填写职务');
        return;
      }
      if (!this.phone.match(/^1\d{10}$/)) {
        this.$message.error('手机号码格式错误');
        return;
      }
      const request = {
        method: 'post',
        baseURL: window.SITE_CONFIG.baseUrl,
        url: '/incidentplan/rpCustomMember/save',
        headers: {
          'Content-Type': 'application/json; charset=UTF-8',
        },
        data: {
          incidentPlanId: this.planId,
          name: this.name,
          unit: this.workplace,
          position: this.position,
          mobile: this.phone,
        },
      }
      this.apix(request)
        .then((response) => {
          if (response.code === 0) {
            this.$message.success('添加成功');
            this.handleClose();
            this.$emit('refresh-custom')
          } else {
            this.$message.error(`添加失败，错误代码${response.code}，错误信息：${response.msg}`)
          }
        })
        .catch((error) => {
          this.$message.error(`添加失败，错误信息：${error}`);
        });
    },
  },
};
</script>

<style lang="scss" module>
// 遮罩
.modal {
  position: fixed;
  top: -100vh;
  left: -100vw;
  width: 200vw;
  height: 200vh;
  z-index: 1000;
}
// 对话框
.dialog {
  position: fixed;
  top: 50vh;
  left: 50vw;
  transform: translate(-50%, -50%);
  background: rgba(10, 29, 81, .9);
  z-index: 1100;
  box-shadow: 0px 4px 12px rgba(0, 0, 0, .4);
  color: #C7D6EC;
  border: 1px solid #4390FB;
  border-radius: 3px;
  header {
    color: #0EF3FE;
    text-shadow: 0 0 5px rgba(14, 243, 254, .7);
    font-size: 16px;
    height: 40px;
    line-height: 40px;
    padding: 0 10px;
    font-weight: bold;
    position: relative;
    background: linear-gradient(to right, rgba(19, 98, 171, .9) 10%, rgba(19, 98, 171, .1), rgba(19, 98, 171, .9) 90%);
    button {
      width: 16px;
      height: 16px;
      border: 0;
      outline: 0;
      cursor: pointer;
      position: absolute;
      right: 10px;
      top: 11px;
      background: no-repeat center/100% 100% url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAADp0lEQVRYR7WXW6hVVRSGv78yIwwqExU0JSQTLbASDMoKn0QpxEQIshQELxVKqARigRLlwUrTUlCIlFKf0icxyUtJqeAlJPMhpJC8YKX5kJE65F/Mc1jus9dlH86ZT3uzxhzjH7d/jClqnIi4A3gQGAmMA54EHgHuTdcvAb8Ah4DvgJ+B3yVdq1KvKoGIGAa8nwzfD9xecec68BewF1go6bcy+UIAETEAeAN4E+hTBbTg+z/AKuBTSeeayTQFEBF9gQPA8C4abrzm9Dwt6c/GD50ARMR8YEHKeTfZz9ScAV6R5NR0nFsARMQDwFFgUHdazulyPTyRj0QHgJTzPam6e8h+ptbpeFbSBf/JA1gGLOlJy0l3AMslLe0AEBFDgZ+AewoAbAFOA6+XyOSvmgcGAvcV6LsCjJb0qyLCff0VMLVAeJ+k5/wtIqYAXwB3F8iaAxZLWhkRrqMjQL8C2S+zooyIh4AfSwR3SpqQADhlTwHfNAFh46/ZGUn+bcCHE2s2w3AeGGsAk4CvSxjOOXsLWG3FEWEQ04H1QO+k2QYXAh9LVplFdW4ioSKy853Jll6RLpfVn4VnAJttIHn3EuAw2sAsSZ/nojQZ2Ap4hpSdlQbg1styXHEMYpGkD5MhK7eXBrC2ffBExJzkea8qhcB+A/gjVWwNeQxiVorE//kLKewvAO6YO+soA84bwL/AXTUvWMwjdoGkNQ0AZgKftWDc1//rCgDP/mmSdjUAMLG8A9zWgjNXW02B5/x44Hh7MbYbiwiHfTbwUQsgzrZShJfdfpJ2pCJ0kXly3kgtmtVERCwG3qsJYk/dNvRi8Ywk03V2IsLervVPey5pQ64NXwU21gDRZgATge0lROQifdkyiWScY5NO3stmROTotOUHXkNt+M6LBjAEOAj0LyieTZLMfPbavW9CWtfEO3eHPd+ao+JvgecL9HocZ1RsjzYlL5vJngLGSLoSEW97lJaE1l65RT+JCG/MP5TsF9tsM+PpNJCOlYxar1PugMdqtJiL0rPlYWBUgbzH8aPemPMLifv43ZKc1bBdW2TZLQtJioLn9j5gRG01XRM8YS7ptJIlEF7HnYqeWkq9VT0uyWyanWZruSejR6u7ozuP66hN0uq80rKHyffduCGfTERW/TDJMZ15YV6i26JltSpCrnbPBj/NvIJ1OnUep96YP0iEUvdxehHY7enozbcMZSWAHAMOzj3Px6R3o9du6/gbMGGZUfcDrvQz7YxYBuAmk2JZNmN747gAAAAASUVORK5CYII=');
    }
  }
  main {
    width: 350px;
    height: 160px;
    & > label {
      display: flex;
      margin: 10px;
      align-items: center;
      & > input {
        flex-grow: 1;
        border: 1px solid rgba(67, 144, 251, 1);
        background: transparent;
        outline: 0;
        border-radius: 3px;
        height: 30px;
        color: #FFFFFF;
        font-size: 16px;
        padding: 0 5px;
      }
    }
  }
  footer {
    text-align: center;
    margin: 10px 0;
    & > button {
      width: 72px;
      height: 37px;
      border: 0;
      outline: 0;
      cursor: pointer;
      color: rgba(17, 184, 254, 1);
      font-size: 16px;
      font-weight: bold;
      transition: color .1s;
      background: no-repeat center/100% 100% url('data:image/png;base64,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');
      &:hover {
        color: rgba(2, 254, 255, 1);
      }
    }
  }
}
</style>
