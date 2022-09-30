export default {
  namespaced: true,
  state: {
    id: 0,
    name: '',
    mobile:'',
    platformId: null,
    isAdmin: '',
    rpList: [],
    levelList: [],  // 警情响应数据
    staffList: [],  // 人员关联数据
    referenceList: [],  // 处置参考数据
    active: false,
    planMultipleDelete: [],
    platformName: '',
    platformTypeId: '',
    platformTitle: '', //平台标题
    backgroundImage: '', //登录跳转后的背景图
    animationFlag: '', //是否跳转八大菜单页
    titleColor: '', // 平台标题颜色
    content: '',//短信内容,
    forward: null,//转发数据
    ReservePlanContact: {},//突发事件预案联系人组
    hopRoutingInfo: '', //跳转路由
    isLogo: '', //LOGO
  },
  mutations: {
    updateId(state, id) {
      state.id = id
    },
    updateName(state, name) {
      state.name = name
    },
    updateMobile(state, mobile) {
      state.mobile = mobile
    },
    updatePlatformId(state, platformId) {
      state.platformId = platformId
    },
    updatePlatformTypeId(state, platformTypeId){
      state.platformTypeId = platformTypeId
    },
    updateIsAdmin(state, isAdmin) {
      state.isAdmin = isAdmin
    },
    updateIsLogo(state, isLogo) {
      state.isLogo = isLogo
    },
    updateRpList(state, rpList) {
      state.rpList = rpList
    },
    // 修改form2的显示状态
    updataactive(state, boole) {
      state.active = boole;
      // console.log(true, state.active);
    },
    // 离开修改页面,清空form2中所有在vuex中的数据
    updataFormtwodelete(state, arr) {
      state.levelList = []
      state.staffList = []
      state.referenceList = []
      state.active = false
    },
    // 进入修改页面 替换 警情响应数据
    updateLevelListMore(state, arr) {
      state.levelList = arr
    },
    // 进入修改页面 替换 人员关联数据
    updataStaffListMore(state, arr) {
      state.staffList.push(arr)
    },
    // 进入修改页面 替换 处置参考数据
    updataReferenceListMore(state, arr) {
        state.referenceList.push(arr[0])
    },
    updateLevelListdel(state) {
      state.levelList = []
    },
    // 警情响应
    updateLevelList(state, levelList) {
      // console.log(state.levelList, levelList);

      let indexAdd = state.levelList.findIndex(item => {
        return levelList.id === item.id
      })
      if (indexAdd !== -1) {
        state.levelList.splice(indexAdd, 1, levelList)
        // console.log("覆盖一条数据", state.levelList[indexAdd]);
      } else {
        state.levelList.push(levelList)
        // console.log("新增一条数据", state.levelList);
      }
    },
    // 人员关联
    updatastaffList(state, staffList) {
      let indexAdd = state.staffList.findIndex(item => {
        return item.policeResponseId == staffList.policeResponseId
      })
      if (indexAdd !== -1) {
        state.staffList.splice(indexAdd, 1, staffList)
      } else {
        state.staffList.push(staffList)
      }
      // console.log("updatastaffList-------触发了", indexAdd);
    },
    // 处置参考
    updataReferenceList(state, referenceList) {
      let indexAdd = state.levelList.findIndex(item => {
          return referenceList.policeResponseId == item.id
      })
      if (indexAdd !== -1) {
        state.referenceList.splice(indexAdd, 1, referenceList)
      } else {
        state.referenceList.push(referenceList)
      }
      // console.log("updataReferenceList-------触发了", indexAdd);
    },
    // 删除等级
    updataDelete(state, data) {
      let index = state.levelList.findIndex(item => {
        return item.levelId === data.id
      })
      state.levelList.splice(index, 1)
    },
    updataplanMultiple(state, data) {
      state.planMultipleDelete = data
    },
    updatePlatformName(state,data){
      state.platformName = data
    },
    updatePlatformTitle(state,data){
      state.platformTitle = data
    },
    updateBackgroundImage(state,data){
      state.backgroundImage = data
    },
    updateAnimationFlag(state,data){
      state.animationFlag = data
    },
    updateTitleColor(state,data){
      state.titleColor = data
    },
    updateSMSContent(state,data){
      state.content = data
    },
    updateSMSForward(state,data){
      state.forward = data
    },
    updateReservePlanContact(state,data){
      state.ReservePlanContact = data
    },

    updateHopRoutingInfo(state,data){
      // console.log("登录的状态值",data)
      state.hopRoutingInfo = data
    }

  }
}
