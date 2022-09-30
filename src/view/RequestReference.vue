<template>
  <div class="hello"></div>
</template>

<script>
import allUrl from "../assets/api/allApiUrl";
export default {
  name: 'RequestReference',
  data () {
    return {
      msg: 'Welcome to Your Vue.js App'
    }
  },
    mounted() {
      // let data = allUrl.login,s={data:{
      //         username: "enlong",
      //         password: '151456',
      //         uuid: "40569015-089f-44f9-8499-98bad9ed441a",
      //         captcha: ""
      //     }}
      //   Object.assign(data,s) // 合并对象, 只是把参数搞成对象形式 {}
      //    this.apix(data)
      //        .then((res)=>{
      //            console.log(res)
      //            this.$store.commit('token',res.token) // 改变vuex的参数
      //            console.log(this.$store.state.token)
      //            this.apix(allUrl.routerx)
      //                .then((res)=>{
      //                    console.log(res)
      //                })
      //                .catch((err)=>{
      //                    console.log(err)
      //                })
      //        })
      //        .catch((err)=>{
      //            console.log(err)
      //        })
        // {
        //   url:'',
        //   method:'get',
        //   data:{}
        // }
        // from data

  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1, h2 {
  font-weight: normal;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
