<template>
    <div>

    </div>
</template>

<script>
  import SockJS from 'sockjs-client'
  import Stomp from 'stompjs'
  import Bus from '@/utils/bus.js'

  export default {
    name: 'topic',
    data () {
      return {
        userId: this.$store.state.callPhone.userId,
      }
    },
    mounted () {

    },
    methods: {
      // 连接
      initWebSocket () {
        var that = this
        that.connection()
        // console.log(that.$store.state.callPhone.userId)
        // 断开重连机制,尝试发送消息,捕获异常发生时重连
        this.timer = setInterval(() => {
          try {
            that.globalStompClient.send(
              '/topic/check',
              {},
              JSON.stringify({ to: that.$store.state.callPhone.userId })
            )
            // that.globalStompClient.send("text");
            // console.log('pong!', '用户通道')
          } catch (err) {
            // console.log('断线了: ' + err, '用户通道')
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
          // console.log('执行次数', '用户通道', frame)
          // console.log('Connected:' + frame);
          // 通过stompClient.subscribe订阅/topic/getResponse 目标(destination)发送的消息
          // "/platform/" + that.platformId + "/message",
          that.stompClient.subscribe(
            '/topic/' + that.$store.state.callPhone.userId + '/phone/userMessage',
            function (response) {
              var str = response.body
               console.log('用户通道', JSON.parse(response.body))
              let body = JSON.parse(response.body)
              if(body.cmdType){
                if(body.cmdType =='CallingNumberReceived' && !body.calling){//如果是来电呼叫，没有号码则不触发
                  return;
                }else{
                  setTimeout(function () {
                    Bus.$emit('callPhoneStatex', body)
                  }, 1000)
                }

              }

            }
          )
        })
      },
      // 断开
      disconnect () {
        if (this.globalStompClient != null) {
          this.globalStompClient.disconnect()
        }
        // console.log('Disconnected', '用户通道')
      }
    },
    computed: {
      getStoreItem () {
        return this.$store.state.callPhone.userId
      }
    },
    watch: {
      getStoreItem () {
        // console.log(this.$store.state.callPhone.userId)
        this.initWebSocket() // 连接电话
      }
    }
  }
</script>

<style scoped>

</style>
