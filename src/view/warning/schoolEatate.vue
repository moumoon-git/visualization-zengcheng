<template>
    <div>

    </div>
</template>

<script>
import SockJS from 'sockjs-client'
import Stomp from 'stompjs'
export default {
    name: "schoolEatate",
    data () {
      return{

      }
    },
    methods:{
        // 连接
        initWebSocket () {
            var that = this
            that.connection()
            // 断开重连机制,尝试发送消息,捕获异常发生时重连
            this.timer = setInterval(() => {
                try {
                    that.globalStompClient.send(
                        '/platform/check',
                        {},
                        JSON.stringify({ to: that.$store.state.platformId })
                    )
                    // that.globalStompClient.send("text");
                    console.log('pong!', '校园物业')
                } catch (err) {
                    console.log('断线了: ' + err, '校园物业')
                    that.connection()
                }
            }, 10000)
        },
        // 连接
        connection () {
            var that = this
            that.socket = new SockJS(`${window.SITE_CONFIG['baseUrl']}/endpointOyzc`)
            that.stompClient = Stomp.over(that.socket)
            that.globalStompClient = that.stompClient
            // 连接WebSocket服务端
            that.stompClient.connect({}, function (frame) {
                console.log('校园物业', '校园物业', frame)
                that.stompClient.subscribe(
                    '/platform/' + that.$store.state.platformId + '/message',
                    function (response) {
                        var str = response.body
                        let body = JSON.parse(response.body)
                        console.log( '校园物业', body)
                    }
                )
            })
        },
        // 断开
        disconnect () {
            if (this.globalStompClient != null) {
                this.globalStompClient.disconnect()
            }
            console.log('Disconnected', '监测预警---人')
        }
    },
    mounted () {
        this.initWebSocket()
    }
}
</script>

<style scoped>

</style>
