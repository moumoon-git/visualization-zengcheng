import axios from 'axios' // 引入axios
import config from '../../assets/js/httpConfig' // 倒入默认配置
import router from '../../router/index'
import { Notification ,MessageBox} from 'element-ui';
import NProgress from "nprogress";
//引入element ui的弹窗
let MessageBoxshow=true;
export default function $axios (options) {
  return new Promise((resolve, reject) => {
    const instance = axios.create({
        baseURL: config.baseURL,
        headers: {
        },
        transformResponse: [function (data) {}],
      });
    // http request 拦截器
    instance.interceptors.request.use(
      config => {
        // startLoading()
        NProgress.start()
        return config
      },
      err => {
        return Promise.reject(err)
      }
    )
    // response 拦截器
    instance.interceptors.response.use(
      response => {
        NProgress.done()
        let data;
        if(response.data === undefined){
          try {
           data =JSON.parse(response.request.responseText)//将返回的字段转为JSON,可以和后台约定
          } catch(e) {
            data =response.request.responseText
          }
        }
        else{
          data = response.data;
        }
        if (data.errorcode == '10002' || data.errorcode == '10004') {
          if(MessageBoxshow){
            MessageBox.alert(data.msg, '提示', { //多个接口同时请求，会弹出多次弹窗，目前最方便是定义MessageBoxshow变量，但是太low不治本 ，这是bug，未解决？
              confirmButtonText: '确定',
              callback: () => {
                router.replace({
                  path: "/login",
                  querry: {
                    redirect: router.currentRoute.fullPath
                  }
                })
              }
            });
            MessageBoxshow=false;
          }
        }else {
          MessageBoxshow=true;
          return data
        }

      },
      error => {
        return Promise.reject(error)
      }
    )
    //请求处理
    instance(options)
      .then((res) => {
        resolve(res);
        return false
      })
      .catch((error) => {
        reject(error)
        Notification.warning('网络连接延时!');
      })
  })
}
