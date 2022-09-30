import Bus from '@/utils/bus.js'

export default function createMeeting(man) {
    Bus.$emit('createMeetingData', man);
    let ws = new WebSocket(window.SITE_CONFIG["websocket_phone"]);
    let msgArray = [];
    var msg = {
        contactName: man.name,
        phone: man.mobile1,
        memberType: 1
    };
    msgArray.push(msg);
    let sendMsg = {
        member: msgArray,
        platformId: man.platformId,
        type: "CreateConf"
        // type: "JoinConf"
    };
    ws.onopen = function() {
        ws.send(JSON.stringify(sendMsg));
        console.log("WebSocket发送的内容：", sendMsg);
        console.log("WebSocket地址：", ws);
    };
    ws.onmessage = function(evt) {
        console.log("WebSocket接收到的数据：", evt);
    };
    ws.onerror = function(evt) {
        console.log("WebSocket错误信息：", evt);
    };
}
