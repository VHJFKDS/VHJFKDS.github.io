//promise正式写法
window.jQuery.ajax = function (url, method, body, headers) {   //url,method,body,successFn,failFn成功函数，失败函数
    return new Promise(function (resolve, reject) {   //固定用法,固定词语,如果成功就调resolve，失败调reject
        let request = new XMLHttpRequest()   //新建一个XMLHttpRequest对象
        request.open(method, url)
        for (let key in headers) {
            let value = headers[key]
            request.setRequestHeader(key, value)
        }
        request.onreadystatechange = () => {
            if (request.readyState === 4) {
                if (request.status >= 200 && request.status < 300) {
                    resolve.call(undefined, request.responseText)    //如果成功则调用成功函数
                } else if (request.status >= 400) {
                    reject.call(undefined, request)
                }
            }
        }

        request.send(body)   //发送 
    })
}

button.addEventListener('click', (e) => {
    let promise = window.jQuery.ajax({
        url: '/jack.com',
        method: 'post',
        headers: {
            'content-type': 'application/x-www-form-urlencoded',
            'rank': '18'
        }
    })

promise.then(    //promise自带有then属性
    (text)=>{console.log(text)},  //上面代码运行成功返回
    (request)=>{console.log(request)}    //上面代码运行失败返回
)







//Promise写法
function f1(responseText) { }
function f2(responseText) { }

//调用这个函数返回promise
button.addEventListener('click', (e) => {
    $.ajax({
        url: '/jack.com',
        method: 'post',
    }).then(     //(success,fail)可以分开另写下面两个函数
        (responseText) => {
            console.log(responseText);
            return responseText
        },
        (request) => { console.log('error1'); return '已经处理' }
    ).then(
        (responseText) => { console.log(上一次的处理结果) },    //第一个成功return的值会串到这里，所以这里是上一次的处理结果
        (request) => { console.log('error2') }
    )
})

// function success(responseText){
//     console.log(responseText)
// }
// function fail(request){
//     console.log(request)
// }






































// window.jQuery.ajax = function(url,method,body,successFn,failFn,headers){   //url,method,body,successFn,failFn成功函数，失败函数
//     let url
//     if(arguments.length === 1){    //如果只有一个参数
//         url = options.url
//     }else if(arguments.length === 2){   //如果有两个参数
//         url = arguments[0]  //其实就是options
//         options = arguments[1]
//     }
//     // let method = options.method
//     // let body = options.body
//     // let successFn = options.successFn
//     // let failFn = options.failFn
//     // let headers = options.headers
//     // //ES6 析构赋值（分析结构并赋值），或直接代替上面options
//     // let {method,body,successFn,failFn,headers} = options

//     let request = new XMLHttpRequest()   //新建一个XMLHttpRequest对象
//     request.open(method,url)  
//     for(let key in headers){
//         let value = headers[key]
//         request.setRequestHeader(key,value)
//     }
//     request.onreadystatechange = ()=>{
//         if(request.readyState === 4){ 
//             if(request.status >= 200 && request.status <300){
//                 successFn.call(undefined,request.responseText)    //如果成功则调用成功函数
//             }else if(request.status >=400){
//                 failFn.call(undefined,request)
//             }
//         } 
//     request.send(body)   //发送 
//     }
// }

//下这一部分代码叫使用方代码，我自己不调用函数，只传给你，你调用回给我（callback），这种叫回调函数
// button.addEventListener('click', (e) => {
//     window.jQuery.ajax({
//         url: '/xxx',
//         method: 'get',
//         body: '',
//         headers: {
//             'content-type': 'application/x-www-form-urlencoded',
//             'rank': '18'
//         },
//         success: (x) => {
//             f1.callback(undefined, x)    //多个函数可多个写
//             f2.callback(undefined, x)
//         },
//         error: (x) => {
//             console.log(x.status)
//             console.log(x.responseText)
//         }
//     })
// })










//下面代码整体来说过一周或一个月，或许就不记得这些代码分别代表什么意思了，需要结构化代码（如上）
// button.addEventListener('click',(e)=>{   //新建一个对象，初始化它，并发送
//     window.jQuery.ajax(
//         '/xxx',
//         'post',
//         'a=1&b=2',   //get一般不设第三个参数，但必须写undefined或null占位
//         (responseText) =>{console.log(1)},
//         (request) =>{console.log(2)})
// })     

// window.jQuery.ajax = function(url,method,body,successFn,failFn){   //url,method,body,successFn,failFn成功函数，失败函数
//     let request = new XMLHttpRequest()   //新建一个XMLHttpRequest对象
//     request.open(method,url)  
//     request.onreadystatechange = ()=>{
//         if(request.readyState === 4){ 
//             if(request.status >= 200 && request.status <300){
//                 successFn.call(undefined,request.responseText)    //如果成功则调用成功函数
//             }else if(request.status >=400){
//                 failFn.call(undefined,request)
//             }
//         } 
//     request.send(body)   //发送 
//     }
// }







//上面是jquery封装，下面源代码

// button.addEventListener('click',(e)=>{   //新建一个对象，初始化它，并发送
//     let request = new XMLHttpRequest()   //新建一个XMLHttpRequest对象
//     request.open('post','/xxx')  
//     //配置request(其实是重设/初始化一个request)，可选POST/GET/DELETE/PUT等,对应网址，默认异步
//     request.setRequestHeader('frank','18')
//     request.setRequestHeader('Content-Type','x-www-form-urlencoded')
//     request.send('第四部分')   //发送
//     request.onreadystatechange = ()=>{
//         // console.log(request.readyState)
//         if(request.readyState === 4){ 
//             console.log('请求响应都完毕了')
//             console.log(request.status)
//             console.log(request.statusText)
//             if(request.status >= 200 && request.status <300){
//                 console.log('请求成功')
//                 console.log(request.getAllResponseHeaders())
//                 console.log(request.getResponseHeader('Content-Type'))
//                 console.log(request.responseText)
//                 //下面这四行把符合json语法的字符串，转换成js对应的值
//                 let string = request.responseText
//                 let object = window.JSON.parse(string)      //JSON.parse是浏览器提供的，json3.js是JSON.rarse写的

//             }else if(request.status >=400){
//                 console.log('请求失败')
//             }
//         } 
//     }

// })