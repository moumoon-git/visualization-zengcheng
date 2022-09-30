export default function mapx (map,zengjiangLngLat,shitanLngLat,xiancunLngLat,xintangLngLat,yongningLngLat,zhongxinLngLat,zhucunLngLat,lichengLngLat,xiaolouLngLat,zhengguoLngLat,paitanLngLat) {
// export default function mapx (map,lqxsq,syshlsq,xjsq,xldhlsq,xyjaq,yfjsq,zzysq) {
  // var zhengChengLngLat = [lqxsq,syshlsq,xjsq,xldhlsq,xyjaq,yfjsq,zzysq]
  var zhengChengLngLat = [zengjiangLngLat,shitanLngLat,xiancunLngLat,xintangLngLat,yongningLngLat,zhongxinLngLat,zhucunLngLat,lichengLngLat,xiaolouLngLat,zhengguoLngLat,paitanLngLat]
  var OneCity = []  // 初始化存储一个镇级经纬度
  var zhengChengCity = []  //初始化存储每一个镇级经纬方法集
  // 将经纬度存在方法体中:new AMap.LngLat()
  for (let i = 0; i < zhengChengLngLat.length; i++) {
    for (let j = 0; j < Object.keys(zhengChengLngLat[i]).length; j++) {
      OneCity.push(new AMap.LngLat(zhengChengLngLat[i][j].lng, zhengChengLngLat[i][j].lat))
    }
    zhengChengCity.push(OneCity)
    OneCity = []  // 回首掏  清了再存
  }
  drawLine(zhengChengCity)  // 初始化增城区域图
  let arrays = []
  function drawLine(polygonArr) {
    var colorStyle = ["#FE786F", "#FC76EF", "#806693", "#9B9CD5", "#FFD374", "#82B1A7", "#7DC183", "red", "orange", "red", "green"]
    var polygon=null;
    for (let i = 0; i < polygonArr.length; i++) {
      polygon = new AMap.Polygon({
        map: map,
        path: polygonArr[i],//设置多边形边界路径
        strokeColor: "white", //线颜色
        strokeOpacity: 0.1, //线透明度
        fillOpacity: 0.8, //面透明度
        fillColor: colorStyle[i], //填充色
        index:i
      });
      let polyEditor= new AMap.PolyEditor(map, polygon)
      polygon.on('dblclick',function (e) {
          console.log('编辑',this)
          polyEditor.open();
      });
      console.log(polygon)

    }
    // map.setFitView([polygon]);//地图自适应显示
  }
  var townTitle = ["增江", '石滩', '仙村', '新塘', '永宁', '中新', '朱村', '荔城', '小楼', '正果', '派潭']
  // var townTitle = ["濂泉西社区", '水荫四横路社区', '西街社区', '先烈东横路社区', '新一街社区', '永福正街社区', '左竹园社区']
  // 创建纯文本标记
  for (let i=0;i<townTitle.length;i++) {
    // let pos = [[113.303598,23.150574],[113.312085,23.145631],[113.311934,23.149755],[113.306988,23.149587],[113.308523,23.147604],[113.307686,23.144526
    // ],[113.311409,23.152843]]
    let pos = [[113.871835,23.314495],[113.800904,23.173914],[113.723531,23.185768],[113.618984,23.123457],
                  [113.600431,23.183419],[113.62459,23.292032],[113.708077,23.278018],[113.821426,23.296224],
                  [113.761997,23.441008],[113.899791,23.423235],[113.789011,23.565003]]
    var marker = new AMap.Marker({ //添加自定义点标记
      map: map,
      position: pos[i], //基点位置
      draggable: false, //是否可拖动
      content: `<div style="text-align:center;white-space:nowrap;background:transparent;color:#fff;font-size:16px;">${townTitle[i]}</div>` //自定义点标记覆盖物内容
    });
    marker.setMap(map);
  }
}
