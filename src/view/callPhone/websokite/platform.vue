<template>
    <div>

    </div>
</template>

<script>
  import SockJS from 'sockjs-client'
  import Stomp from 'stompjs'
  import Bus from '@/utils/bus.js'

  export default {
    name: 'platform',
    data () {
      return {
        platformId: this.$store.state.user.platformId,
      }
    },
    mounted () {
      this.initWebSocket ()
    },
    methods: {
      // 连接
      initWebSocket () {
        // console.log('platformId====' + this.platformId)
        var that = this
        that.connection()
        // 断开重连机制,尝试发送消息,捕获异常发生时重连
        this.timer = setInterval(() => {
          try {
            that.globalStompClient.send(
              '/platform/check',
              {},
              JSON.stringify({ to: that.platformId })
            )
            // that.globalStompClient.send("text");
            // console.log('pong!', '平台广播')
          } catch (err) {
            // console.log('断线了: ' + err, '平台广播')
            that.connection()
          }
        }, 10000)
      },
      // 连接
      connection () {
        var that = this
        // 连接SockJS的endpoint名称为"endpointOyzc"
        // var socket = new SockJS('http://127.0.0.1:8888/endpointOyzc');
        that.socket = new SockJS(`${window.SITE_CONFIG.websocket}`)
        // 使用STMOP子协议的WebSocket客户端
        that.stompClient = Stomp.over(that.socket)
        that.globalStompClient = that.stompClient
        // 连接WebSocket服务端
        that.stompClient.connect({}, function (frame) {
          // 通过stompClient.subscribe订阅/topic/getResponse 目标(destination)发送的消息
          // "/platform/" + that.platformId + "/message",
          that.stompClient.subscribe(
            '/platform/' + that.platformId + '/phone/platformMessage',
            function (response) {
              // alert(11111)
              var str = response.body
               console.log( '平台广播', response)
              let body = JSON.parse(response.body)
              setTimeout(function () {
                Bus.$emit('callPhoneStatex', body)
              }, 1000)
            }
          )
        })
      },
      // 断开
      disconnect () {
        if (this.globalStompClient != null) {
          this.globalStompClient.disconnect()
        }
        // console.log('Disconnected', '平台广播')
      }
    }
  }
</script>

<style scoped>

</style>
