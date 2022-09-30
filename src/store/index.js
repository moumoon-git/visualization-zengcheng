import Vue from 'vue'
import Vuex from 'vuex'
import callPhone from './modules/call-phone'
Vue.use(Vuex)

const state = {
     token:'PC_b0486f42614f23745af1bf8a16e4b13b',
  startTime:'',
  endTime:'',
  platformId:'6',
  btnArray:[],
  selectBtn:'',
  type:'visual',
  townId:'1',
  center:[],
  cameraMarker:{}, // 风险隐患 人车地图标绘
};
const mutations = {
  //全局token存储
  token(state,token){
    state.token = token;
  },
  //全局的开始时间更改
  startTime(state,data){
    state.startTime = data;
  },
  //全局的结束时间更改
  endTime(state,data){
    // let arr = []
    // data.split('-').forEach(function (ele,index) {
    //   if (index!=0) {
    //     ele = ele.indexOf('0')!=0? ele : ele.substr(1)
    //   }
    //   arr.push(ele)
    // })
    // let str = arr.join('-')
    // state.endTime = str;
    state.endTime = data;
  },
  //平台
  platformId(state,data){
    state.platformId = data;
  },
//  按钮
  btnArray(state,data){
    state.btnArray = data;
  },
  selectBtn(state,data){
    state.selectBtn = data;
  },
  type(state,data){
    state.type = data;
  },
  townId(state,data){
    state.townId = data;
  },
  center(state,data){
    state.center = data;
  },
};


export default new Vuex.Store({
      state,
      mutations,
      callPhone
})
