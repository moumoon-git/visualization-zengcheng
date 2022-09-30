import axios from 'axios'

export default function $axios(options) {
    return new Promise((resolve,reject)=> {
      //创建一个axios实例
      const instance = axios.create({
        baseURL: options.baseURL?options.baseURL:window.SITE_CONFIG['baseUrl'],
        withCredentials: true,
        headers: options.header?options.header:{
          'Content-Type': 'application/x-www-form-urlencoded'
        },
        transformResponse: [function () {}],
        timeout:30000
      })
      //   拦截器
      instance.interceptors.request.use(
        config => {
          config.headers['token'] = this.$store.state.token
          return config
        },
        error => {
          // console.log(error)
          return Promise.reject(error)
        }
      )
    //  响应头拦截器
      instance.interceptors.response.use(
        response => {
          let responseBody = JSON.parse(response.request.response)
          let setFlag = true
          if(responseBody.code == 401 && setFlag ){
            this.$message.error(responseBody.msg);
            setFlag = false
            setTimeout(()=>{
              setFlag = true
            },1000)
          }
          return response
        }, error => {
          return Promise.reject(error)
        })
      //发送请求
      instance(options)
        .then((res)=>{
          // console.log(res)
          if(res.request){
            if(res.request.readyState!=4 || !res.request.readyState ){
              return reject("请求失败")
            }
          }
          return resolve(JSON.parse(res.request.response))
        })
        .catch((err)=>{
          // console.log(err)
          return reject(err)
        })
    })
}
