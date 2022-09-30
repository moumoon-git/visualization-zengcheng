// 预案管理表单验证
let planFromVerify = {
  // 事件类型
  eventName: [
    { required: true, message: '请选择事件类型' },
  ],
  // 版本名称必选
  planName: [
    { required: true, message: '请输入名称', trigger: 'blur' },
    // {min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur'}
  ],
  // 启用状态必选
  state: [
    { required: true, message: "请选择启用状态", trigger: "change" }
  ],
  //  预案版本必选
  version: [
    {  message: "请输入预案版本", trigger: "blur" }
  ],
  //  起始时间必选
  validTime: [
    {  required: true,message: "请输入起始时间", trigger: "blur" }
  ],
  //  间隔时间必选
  intervalTime: [
    {  required: true,message: "请输入间隔时间", trigger: "blur" }
  ],
  // 编制单位
  editUnit: [
    { required: true, message: "请输入编制单位名称", trigger: "blur" }
  ],
  // 发布单位
  publishUnit: [
    { message: "请输入发布单位名称", trigger: "blur" }
  ],
  // 发布时间
  publishDate: [
    { message: "请选择发布时间", trigger: "blur" }
  ],
  // 响应等级
  responseName: [
    { required: true, message: '请选择响应等级' }
  ],
  // 响应时间
  responseDuration: [
    { required: true, message: '请输响应时间(分钟)'},
    { pattern: /^[1-9]\d*$/, message: '目前只支持数字' }
  ],
  // 处置时间
  generalEventDuration: [
    { required: true, message: '请输处置时间(分钟)'},
    { pattern: /^[1-9]\d*$/, message: '目前只支持数字' }
  ],
  // 处置复杂事件时间
  complexEventDuration: [
    { required: true, message: '请输复杂时间处置时间(分钟)'},
    { pattern: /^[1-9]\d*$/, message: '目前只支持数字' }
  ],
  // 服务对象
  serviceName: [
    { required: true, message: '请输入服务对象' }
  ],
  // 联系人
  serviceContact: [
    { required: false, message: '请输入姓名' },
    {
      pattern: /^1[3456789]\d{9}$/,
      message: '暂时只支持国内电话号码',
      trigger: 'blur'
    }
  ],
  // 牵头部门
  leadgroupName: [
    { required: true, message: '请选择牵头部门' },
  ],
  // 牵头部门联系人
  leadContactorName: [
    { required: true, message: '请选择牵头部门联系人' },
  ],
  // 应哨部门
  sentinelgroupName: [
    { required: true, message: '请选择应哨部门'},
  ],
  // 应哨部门联系人
  sentinelContactor: [
    { required: true, message: '请选择应哨部门联系人' },
  ],
  // 核实部门
  verify: [
    { required: true, message: '请选择核实部门' },
  ],
  // 核实部门联系人
  verifyContactsShow: [
    { required: true, message: '请选择核实部门联系人'},
  ],
  // 处置部门
  disposegroupName: [
    { required: true, message: '请选择处置部门' },
  ],
  // 处置部门联系人
  disposeContactorName: [
    { required: true, message: '请选择处置部门联系人' },
  ],
  // 审批部门
  examineGroupName: [
    { required: true, message: '请选择审批部门' },
  ],
  // 审批部门联系人
  examineContactorName: [
    { required: true, message: '请选择审批部门联系人' },
  ],

}

export default {
  namespaced: true,
  state: {
    rules: {
      ...planFromVerify,
      region: [
        { required: true, message: '请选择活动区域', trigger: 'change' }
      ],
      date1: [
        { type: 'date', required: true, message: '请选择日期', trigger: 'change' }
      ],
      date2: [
        { type: 'date', required: true, message: '请选择时间', trigger: 'change' }
      ],
      type: [
        { type: 'array', required: true, message: '请至少选择一个活动性质', trigger: 'change' }
      ],
      resource: [
        { required: true, message: '请选择活动资源', trigger: 'change' }
      ],
      desc: [
        { required: true, message: '请填写活动形式', trigger: 'blur' }
      ],
      //事件接报信息验证
      //事件标题验证
      title: [
        { required: true, message: '请输入一个标题', trigger: 'blur' },
        { min: 2, max: 50, message: '最少要2个字段', trigger: 'blur' }
      ],
      //报送人验证
      reportName: [
        { required: true, message: '请输入报送人', trigger: 'blur' },
        { min: 2, max: 20, message: '最少要2个字段', trigger: 'blur' }
      ],
      //事件描述长度验证
      eventDescription: [
        { min: 0, max: 200, message: '最多只能200个字', trigger: 'blur' }
      ],
      //事件原因长度验证
      eventReason: [
        { min: 0, max: 200, message: '最多只能200个字', trigger: 'blur' }
      ],
      //报送人联系方式验证
      reportNameContact: [
        {required: true, message: '请输入手机号码', trigger: 'blur' },
        { pattern: /^1[34578]\d{9}$/, message: '手机号格式不对', trigger: 'blur' }
      ],
      upload: [
        { type: 'array' }
      ],
      // 事件报送时间
      /*reportTime: [
        { required: true, message: '请选择报送时间', trigger: 'blur' }
      ],*/
      initiate: [
        { required: true, message: '请输入启用状态', trigger: 'blur' }
      ],
      mainTitle:[
        { required: true, message: '请输入主标题', trigger: 'blur' }
      ],
      subTitle:[
        { required: true, message: '请输入副标题', trigger: 'blur' }
      ],
      dateTime:[
        { required: true, message: '请输入发生时间', trigger: 'blur' }
      ],
      tag:[
        { required: true, message: '请输入标签', trigger: 'blur' }
      ],
      noticeTitle:[
        { required: true, message: '请输入公告标题', trigger: 'blur' }
      ],
      noticeSendFlag:[
        { required: true, message: '请选择发送方式', trigger: 'blur' }
      ],
      noticeContactor:[
        { required: true, message: '请选择收信人员', trigger: 'blur' }
      ],
      noticeType:[
        { required: true, message: '请选择公告类型', trigger: 'blur' }
      ],

    }
  },
  mutations: {
    updateId(state, rules) {
      state.rules = rules
    }
  }
}
