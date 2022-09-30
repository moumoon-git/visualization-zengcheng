export default {
  namespaced: true,
  state:{
    flag:false,
    phoneNum:0,//手机
    name:"",//姓名
    del:"",//电话
    unit:"",//单位
    visa:"",//职位
    agentId:0,//通道ID
    contact_id:0,//通讯录ID
    num:0,
    userId: '',
    question:false
  },
  mutations:{
    phoneNum(state,val){
      state.phoneNum=val
    },
    num(state,val){
      state.num=val
    },
    userId(state,val){
      state.userId=val
    },
    question(state,val){
      state.question=val
    }
  }
}
