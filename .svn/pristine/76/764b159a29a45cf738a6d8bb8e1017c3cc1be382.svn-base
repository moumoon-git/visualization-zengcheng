const allUrl = {
  government: {
    url: "/emergency/emergencyinfo/getCountGroupBySource",
    method: "GET"
  }, // 政务交办
  phoneApi: { url: "/statisticApi/phoneApi/phoneGather", method: "GET" }, // 电话数量
  Terminal: { url: "/ty/tyTerminal/getOnlineSum", method: "GET" }, // 终端在线
  emergencyinfo: { url: "/emergency/emergencyinfo/list", method: "GET" }, // 要情动态
  tyAlarm: { url: "/ty/tyAlarm/list", method: "GET" }, // 风险预警
  humanWorkOrderNum: {
    url: "/statisticApi/humanAlarmApi/humanFxtsWorkOrderNum",
    method: "GET"
  }, // 智能采集人
  vehicleWorkOrderNum: {
    url: "/statisticApi/vehicleApi/vehicleFxtsWorkOrderNum",
    method: "GET"
  }, // 智能采集车
  selectfxdtSchoolAndConpany: {
    url: "/statisticApi/SchoolApi/selectfxdtSchoolAndConpany",
    method: "GET"
  }, // 校园和物业
  selectGdblSchoolAndCompany: {
    url: "/statisticApi/SchoolApi/selectGdblSchoolAndCompany",
    method: "GET"
  }, // 校园和物业 5-物业,6-小区
  selectGdblhuman: {
    url: "/statisticApi/humanAlarmApi/humanFxtsAlarm",
    method: "GET"
  }, // 人员
  selectGdblcar: {
    url: "/statisticApi/vehicleApi/vehicleFxtsAlarm",
    method: "GET"
  }, // 车辆

  getHumanList: { url: "/risk/riskhuamnalarminfo/recentList", method: "GET" }, // 获取人员列表

  getHumanInfo: { url: "/risk/riskhuamnalarminfo/info", method: "get" },
  getHumanMuenList: {
    url: "/risk/riskhuamnalarminfo/queryHumanAndVehicleControlTypeList",
    method: "post"
  }, // 获取人员菜单列表
  countHumanHotAndVehicleHot: {
    url: "/risk/riskcamera/countHumanHotAndVehicleHot",
    method: "get"
  }, // 获取人员热力图数据
  getAlarmHumanCountGroupByType: {
    url: "/statisticApi/humanAlarmApi/getAlarmHumanCountGroupByTypeTop5",
    method: "get"
  }, // 获取吸毒与精神病的前五告警人 0--吸毒,1-精神
  getHumanAlarmTop: {
    url: "/statisticApi/humanAlarmApi/getgetHumanAlarmTop",
    method: "get"
  }, // 相机抓拍前五

  vehicleRankList: {
    url: "/risk/riskvehiclealarm/vehicleRankListTop5",
    method: "get"
  }, // 2.货车 3.违检车
  getgetvehicleAlarmTop: {
    url: "/statisticApi/vehicleApi/getgetvehicleAlarmTop",
    method: "get"
  }, // 车-相机排行前五
  riskvehiclealarm: { url: "/risk/riskvehiclealarm/make-up", method: "get" }, //初始化获取车辆列表

  eventTypeStatistic: {
    url: "/event/eventinfo/eventTypeStatistic",
    method: "get"
  }, //小区隐患排行
  eventTypeTreeStatistic: {
    url: "/event/eventType/eventTypeTreeStatistic",
    method: "get"
  }, //小区隐患类型排行
  listEventOrderByConditions: {
    url: "/event/eventShare/listEventOrderByConditions",
    method: "get"
  }, //小区列表

  getHumanAlarmList: {
    url: "/risk/riskhuamnalarminfo/getHumanAlarmList",
    method: "get"
  }, //获取人员轨迹
  queryHumanCameraDetailList: {
    url: "/risk/riskcamera/queryHumanCameraDetailList",
    method: "get"
  }, //获取相机(无分页)
  queryHumanCameraDetailListPage: {
    url: "/risk/riskcamera/queryHumanCameraDetailListPage",
    method: "get"
  }, //获取相机（有分页）
  queryVehicleCameraDetailList: {
    url: "/risk/riskcamera/queryVehicleCameraDetailList",
    method: "get"
  }, //获取卡口（无分页）
  queryVehicleCameraDetailListPage: {
    url: "/risk/riskcamera/queryVehicleCameraDetailListPage",
    method: "get"
  }, //获取卡口（有分页）

  queryVehicleCameraRank: {
    url: "/risk/riskcamera/queryVehicleCameraRank",
    method: "get"
  }, //获取车辆类型摄像头
  queryHumanCameraRank: {
    url: "/risk/riskcamera/queryHumanCameraRank",
    method: "get"
  }, //获取人员类型摄像头

  selectGdblSchoolAndCompanyWorkList: {
    url: "/statisticApi/SchoolApi/selectGdblSchoolAndCompanyWorkList",
    method: "get"
  }, //根据类型找这个类型下所有学校跟物业
  selectGdblSchoolAndCompanyWork: {
    url: "/statisticApi/SchoolApi/selectGdblSchoolAndCompanyWork",
    method: "get"
  }, //根据类型找这个类型下所有学校跟物业的详情
  WaterBall: {
    url: "/statisticApi/SchoolApi/selectGdblSchoolAndCompanyWorkPencent",
    method: "get"
  }, //水波球
  chaByDataSource: {
    url: "/event/eventHistory/selectHistoryByDataSourceId",
    method: "post"
  }, //查询工单
  listByConditions: {
    url: "/sys/platform/selectPlaformByKeywordAndType",
    method: "get"
  }, //搜索

  //  新总体态势
  newVisualization: {
    url: "/visualizationIndicator/selectIndicatorListByTownAndIndicatorType",
    method: "get"
  },
  cityList: { url: "/visualizationTown/list", method: "get" },

  // 用户平台
  userInfo: { url: "/sys/user/info", method: "get" },

  countSumByPlatform: {
    url: "/buss/bussCount/countSumByPlatform",
    method: "get"
  },
  updateData: { url: "/visualization/updateData", method: "get" },
  // 可视指挥
  // 地图图层
  // 上传icon
  mailImages: { url: "/upload/file", method: "post" },
  // 保存icon
  iconSave: { url: "/command/icon/save", method: "post" },
  // 查询所以的icon
  selectAll: { url: "/command/icon/selectAll", method: "post" },
  // 删除指定的icon
  deleteIcon: { url: "/command/icon/delete", method: "post" },
  // 圈选
  searchSourceByPoint: {
    url: "/solr/resource/searchSourceByPoint",
    method: "post"
  },
  // 框选
  searchAppDbResourseByPolygon: {
    url: "/solr/resource/searchSourceByPolygon",
    method: "post"
  },

  // 资源检索
  resoureteam: { url: "/resoure/resoureteam/list", method: "post" },
  resourearticle: { url: "/resoure/resourearticle/list", method: "post" },
  resourearea: { url: "/resoure/resourearea/list", method: "post" },
  resoureProtectTarget: {
    url: "/resoure/resoureProtectTarget/listByGroupId",
    method: "post"
  },
  riskcamera: { url: "/risk/riskcamera/spdyVisuaList", method: "post" },

  // 图层资源
  getResourceTeamInfo: { url: "/resoure/resoureteam/info", method: "get" },
  getResourceArticleInfo: {
    url: "/resoure/resourearticle/info",
    method: "get"
  },
  getResourceAreaInfo: {
    url: "/resoure/resourearea/selectById",
    method: "get"
  },
  getProtectTargetInfo: {
    url: "resoure/resoureProtectTarget/info",
    method: "get"
  },

  // 添加图层
  LayerSave: { url: "/command/Layer/save", method: "post" },
  LayerDelete: { url: "/command/Layer/delete", method: "post" },
  // 业务
  visualList: { url: "/emergency/emergencyinfo/list", method: "get" },
  processList: { url: "/emergency/emergencyhandleprocess/list", method: "get" },
  // 预案
  listTree: { url: "/incidentplan/rpPlanGroup/listTree", method: "get" },

  // 点击预案获取分组
  getOneAndLink: {
    url: "/incidentplan/rpIncidentPlan/getOneAndLink",
    method: "get"
  },

  // 获取分组下单位的联系人
  getContactorByUnit: {
    url: "/incidentplan/rpIncidentUnit/getContactorByUnit",
    method: "get"
  },
  listAndPage: { url: "/rp/plan/listAndPage", method: "post" },

  // 返回所以的图层
  selectAllLayer: { url: "/command/Layer/selectAll", method: "post" },
  selectAllGraphics: {
    url: "/command/Layer/selectAllGraphics",
    method: "post"
  },

  // 查询仓库的物资
  listAllByStorehouseId: {
    url: "/resoure/resourearticle/listAllByStorehouseId",
    method: "post"
  },

  // 视频预览
  videoPreview: { url: "/risk/riskcamera/getEncryptionProtocol", method: "get" }
};
export default allUrl;
