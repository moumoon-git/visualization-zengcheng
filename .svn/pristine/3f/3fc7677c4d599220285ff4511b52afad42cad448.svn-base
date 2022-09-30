import Bus from '@/utils/bus.js'

// export default function callPhone (data) {
//   Bus.$emit('callPhoneData', data)
// }
// Vue.prototype.callPhone

export default function callPhone (data) {
  Bus.$emit('callPhoneData', data);
  // var ws = new WebSocket("ws://192.168.3.28:9529");
  var ws = new WebSocket(window.SITE_CONFIG['websocket_phone']);
  if(data.hasOwnProperty('phone')) {
    var sendMsg = {
      contactId: data.id,
      contactName: data.name,
      phone: data.mobile1,
      position: data.position,
      workUnit: data.workUnit,
      platformId: data.platformId,
      type: 'phone'
    };
  } else {
    var sendMsg = {
      contactId: data.contactId,
      contactName: data.contactName,
      phone: '',
      position: data.position,
      workUnit: data.workUnit,
      platformId: data.platformId,
      type: 'phone'
    };
    sendMsg.phone = (data.callType == '0')? data.phoneCalling: data.phoneCalled;
  }
  ws.onopen = function() {
    ws.send(JSON.stringify(sendMsg));
    console.log("WebSocket发送的内容：", sendMsg);
    console.log("WebSocket地址：", window.SITE_CONFIG['websocket_phone']);
  };
  ws.onmessage = function (evt) {
    console.log("WebSocket接收到的数据：", evt);
  }
  ws.onerror = function (evt) {
    console.log("WebSocket错误信息：", evt);
  }
}