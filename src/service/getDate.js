import axios from 'axios'
import requestAPI from './requestAPI'
const instance = axios.create()
let reqAPI = {}

for(let item in requestAPI) {
  reqAPI[item] = function (opts) {
    return instance(Object.assign({}, {
      url: requestAPI[item].url,
      baseURL: 'http://cangdu.org:8001/',
      method: requestAPI[item].method
    }, opts))
  }
}



instance.interceptors.request.use(function (config) {
  console.log('请求')
  console.log(config)
  return config
}, function (err) {
  // console.log('请求出错')
  return Promise.reject(err)
})

instance.interceptors.response.use(function(response) {
  // console.log('响应')
  // console.log(response)
  return response
}, function (err) {
  return Promise.reject(err)
})


export default reqAPI
