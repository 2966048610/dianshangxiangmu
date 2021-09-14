// 防抖函数: debounce() / 节流函数: throttle()
export function debounce(func , delay){
 let timer = null ;   // timer 的值 第一次执行时为 null
 return function(...args) {   // 返回函数  ，  ...args 加了三个点 表明 可以输入 多个参数
   if(timer) clearTimeout(timer) ; // 这里清除 timer 的值 ，
   timer = setTimeout( () => {     // 把定时器赋值给 timer
     func.apply(this,args)     // 在定时器 的时间过后 , 没有新的函数传入时 执行
   },delay)            // 在定时器的时间内 ，如果有新的函数传入，则会将上一次的取消掉，去执行新的
 }
}


export function formatDate(date, fmt) {
  if (/(y+)/.test(fmt)) {
    fmt = fmt.replace(RegExp.$1, (date.getFullYear() + '').substr(4 - RegExp.$1.length));
  }
  let o = {
    'M+': date.getMonth() + 1,
    'd+': date.getDate(),
    'h+': date.getHours(),
    'm+': date.getMinutes(),
    's+': date.getSeconds()
  };
  for (let k in o) {
    if (new RegExp(`(${k})`).test(fmt)) {
      let str = o[k] + '';
      fmt = fmt.replace(RegExp.$1, (RegExp.$1.length === 1) ? str : padLeftZero(str));
    }
  }
  return fmt;
};

function padLeftZero (str) {
  return ('00' + str).substr(str.length);
};

