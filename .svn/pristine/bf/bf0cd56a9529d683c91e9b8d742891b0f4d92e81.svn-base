<template>
	<div>
		
	</div>
</template>

<script>
import SockJS from 'sockjs-client'
import Stomp from 'stompjs'

export default {
	name:'sockejs',
	data () {
		return {
			timer:'',
			platformId: this.$store.state.platformId,
			stompClient: '', // 存储订阅
			socket: '',
			globalStompClient:''
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
		        JSON.stringify({ to: that.platformId })
		      )
		    } catch (err) {
		      that.connection()
		    }
		  }, 10000)
		},
		// 连接
		connection () {
		  var that = this
		  that.socket = new SockJS(`${window.SITE_CONFIG.websocket}`)
		  // 使用STMOP子协议的WebSocket客户端
		  that.stompClient = Stomp.over(that.socket)
		  that.globalStompClient = that.stompClient
		  // 连接WebSocket服务端
		  that.stompClient.connect({}, function (frame) {
		    // 通过stompClient.subscribe订阅/topic/getResponse 目标(destination)发送的消息
		    that.stompClient.subscribe(
		      '/platform/' + that.platformId + '/message',
		      function (response) {
		        var str = response.body
				// console.log(JSON.parse(str))
		        if (str.indexOf('human') > -1) {
		          that.$emit('sockets','')
		        } else if (str.indexOf('vehicle') > -1) {
		          that.$emit('sockets','')
		        }else if (str.indexOf('violation') > -1) {
		          that.$emit('sockets','')
		        }else if (str.indexOf('report') > -1) {
		          that.$emit('sockets','')
		        } else if (str.indexOf('school') > -1) {
		          that.$emit('sockets','')
		        } else if (str.indexOf('crowd') > -1) {
				  that.$emit('sockets','')
		        }
		      }
		    )
			
		    // that.stompClient.subscribe(
		    //   '/topic/' + that.$store.state.user.id + '/message',
		    //   function (response) {
		    //     var str = response.body
		    //     var obj = JSON.parse(str)
		    //   }
		    // )
			
		  })
		},
		// 断开
		disconnect () {
		  if (this.globalStompClient.connected === false) {
		    this.globalStompClient.disconnect()
		  }
		}
	},
	mounted () {
	  this.initWebSocket()
	},
	
	beforeDestroy: function () {
	  // 页面离开时断开连接,清除定时器
	  // console.log('页面离开时断开连接,清除定时器')
	  this.disconnect()
	  clearInterval(this.timer)
	},
}
</script>

<style scoped>

</style>
