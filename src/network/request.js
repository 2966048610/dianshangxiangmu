import axios from "axios"   // 导入 axios

// // 第一种方法
// export function request(config,success,failure) {    // config 是请求的地址等基本信息 ， success 是请求成功的回调函数， failure 是请求失败的回调函数
//   // 创建 axios 的实例
//   const instance = axios.create({
//     baseURL:'http://123.207.32.32:8000',
//     timeout:5000
//   })

//   // 发送真正的网络请求
//   instance(config)
//   .then(res => {   // 接收请求成功的数据
//     // console.log(res);
//     success(res)  // 通过 success 函数 返回 请求成功的数据
//   })
//   .catch(err => {  // 接收请求失败的数据
//     // console.log(err);
//     failure(err)   // 通过 failure 函数 返回 请求失败的数据
//   })

// }


// // 第二种方法
// export function request(config) {    // 这里的 config 包含了（baseConfig，success，failure）; config.baseConfig 是请求的地址等基本信息 ， config.success 是请求成功的回调函数， config.failure 是请求失败的回调函数
//   // 创建 axios 的实例
//   const instance = axios.create({
//     baseURL:'http://123.207.32.32:8000',
//     timeout:5000
//   })

//   // 发送真正的网络请求
//   instance(config.baseConfig)
//   .then(res => {   // 接收请求成功的数据
//     // console.log(res);
//     config.success(res)  // 通过 success 函数 返回 请求成功的数据
//   })
//   .catch(err => {  // 接收请求失败的数据
//     // console.log(err);
//     config.failure(err)   // 通过 failure 函数 返回 请求失败的数据
//   })

// }



// // 第三种方法
// export function request(config) {    // config 是请求的地址等基本信息 ，

//   return new Promise((resolve, reject) => {  // resolve 是请求成功的回调函数， reject 是请求失败的回调函数

//     // 创建 axios 的实例
//     const instance = axios.create({
//       baseURL:'http://123.207.32.32:8000',
//       timeout:5000
//     })

//     // 发送真正的网络请求
//     instance(config)
//     .then(res => {   // 接收请求成功的数据
//       resolve(res)
//     })
//     .catch(err => {  // 接收请求失败的数据
//       reject(err)
//     })

//   })

// }


// // 第四种方法
// export function request(config) {    // config 是请求的地址等基本信息 ，

//   // 创建 axios 的实例
//   const instance = axios.create({
//     baseURL:'http://123.207.32.32:8000',
//     timeout:5000
//   })

//   // 发送真正的网络请求
//   return instance(config)   // 直接返回 instance(config)

// }

// 第四种方法 ，使用拦截器
export function request(config) {    // config 是请求的地址等基本信息 ，

  // 创建 axios 的实例
  const instance = axios.create({
    baseURL:'http://152.136.185.210:7878/api/hy66',
    timeout:5000
  })


  // axios 的拦截器
  // 这是 拦截 instance 实例的 拦截器 ， 若要全局拦截 就把 instance 替换成 axios
  // 这是在 发送 请求时 进行的拦截 ; axios.interceptors.request.use(函数,函数),返回两个函数,一个发送成功的函数,一个发送失败的函数
  instance.interceptors.request.use(config => {  // 发送成功的函数
    // console.log(config);
    // 请求拦截的作用
    /*
      1.比如 config 中的一些信息不符合服务器的要求
      2.比如每次发送请求时，都希望在界面中显示一个请求的图标
      3.某些网络请求（比如登录（token），必须携带一些特殊的信息
    */

    return config       // 拦截后要 返回return config ，不然拦截请求后 不能 正常请求，会导致请求失败
  },err => {              // 发送失败的函数
    console.log(err);
  })

  // 响应拦截 ， 在 请求 发送成功 ，并得到服务器的响应后进行拦截
  instance.interceptors.response.use(res => {
    // console.log(res);
    return res.data    // 响应拦截 一样需要返回return ，不然页面拿不到数据 ，返回res.data 是因为我们只需要 data 里面的数据，res 里面除了 data 其他的数据不需要
  },err => {
    console.log(err);
  })

  // 发送真正的网络请求
  return instance(config)   // 直接返回 instance(config)

}
