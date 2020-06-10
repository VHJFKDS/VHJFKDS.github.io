button.addEventListener('click',(e)=>{   //新建一个对象，初始化它，并发送
    let request = new XMLHttpRequest()   //新建一个XMLHttpRequest对象
    request.open('GET','https://www.baidu.com')  
    //配置request(其实是重设/初始化一个request)，可选POST/GET/DELETE/PUT等,对应网址，默认异步
    request.send()   //发送
    request.onreadystatechange = ()=>{
        // console.log(request.readyState)
        if(request.readyState === 4){ 
            console.log('请求响应都完毕了')
            if(request.status >= 200 && request.status <300){
                console.log('请求成功')
                console.log(request.responseText)
                console.log(typeof(request.responseText))  //打出response内容的类型
                //下面这四行把符合json语法的字符串，转换成js对应的值
                let string = request.responseText 
                let object = window.JSON.parse(string)    //JSON.parse是浏览器提供的，json3.js是JSON.rarse写的
                console.log(typeof object)
                console.log(object)
                console.log('object.note')
                console.log(object.note)
            }else if(request.status >=400){
                console.log('请求失败')
            }
        } 
    }

})