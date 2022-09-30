// 历史日志

const dutylogs = {
  dutylogs_save: {url: '/duty/dutyLogItem/save', method: 'POST'},  // 交接班 保存接口
  dutylogs_update: {url: '/duty/dutyLogItem/update', method: 'POST'},  // 修改交班事项
  dutylogs_saveDutyLogOperation: {url: '/duty/dutyLogOperations/saveDutyLogOperation', method: 'POST'},  // 保存日志事项，如果是第一条则，先保存日志再保存该条记录。
  dutylogs_ByDay: {url: '/duty/dutyLogOperations/listDutyLogOperationByDay', method: 'POST'},  // 根据日期查询值班记录。
  dutylogs_listByDate: {url: '/duty/dutyLogItem/listDutyLogItemByDate', method: 'POST'},  // 根据日期查询交班事项
  dutylogs_uploadImg: {url: '/upload/dutyLogOperationsImages', method: 'POST'},  // 上传图片
  dutylogs_List: {url: '/duty/dutyLogOperations/dutyPersonList', method: 'get'}, // 值班员列表
  dutylogs_EventList: {url: '/duty/dutyLogOperations/eventInfoList', method: 'get'}, // 事件信息列表
  dutylogs_PhoneList: {url: '/duty/dutyLogOperations/phoneInfoList', method: 'get'}, // 电话信息列表
  dutylogs_MsgList: {url: '/duty/dutyLogOperations/getMessageInforList', method: 'get'}, // 短信信息列表
  dutylogs_Del: {url: '/duty/dutyLogOperations/delete/', method: 'post'}, // 交班记录删除
  dutylogs_DelEvent: {url: '/duty/dutyLogItem/delete/', method: 'post'} // 交班事项删除
}

export default dutylogs
