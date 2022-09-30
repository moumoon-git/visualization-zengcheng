export default {
  namespaced: true,
  state:{
    analysisData:{
      analysisModulePosition: [], //自定义模块位置
      analysisModuleName: '' //自定义模块名称
    },
    submenuLeftId: 0,  //点击左边模块菜单
    modulePositionId: 0 //模块位置
  },
  mutations:{
    updateAnalysisModulePosition(state, data) {
      state.analysisData.analysisModulePosition = data
    },
    updateAnalysisModuleName(state, data) {
      state.analysisData.analysisModuleName = data
    },
    updateAnalysisSubmenuLeftId(state, data){
      state.submenuLeftId = data

    },
    updateAnalysisModulePositionId(state, data){
      //console.log("改变模块位置",data)
      state.modulePositionId = data
    }
  }
}
