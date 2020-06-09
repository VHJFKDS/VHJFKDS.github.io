button.addEventListener('click',(e)=>{   //新建一个对象，初始化它，并发送
    let request = new XMLHttpRequest()   //新建一个XMLHttpRequest对象
    request.onreadystatechange = ()=>{
        // console.log(request.readyState)
        if(request.readyState === 4){ 
            console.log('请求响应都完毕了')
            if(request.status >= 200 && request.status <300){
                console.log('请求成功')
                console.log(request.responseText)
                let parser = new DOMParser()   //声明一个解析器
                let xmlDoc = parser.parseFromString(request.responseText,"text/xml")    //然后用解析器解析响应文本
                let c = xmlDoc.getElementsByTagName('body')[0].textContent    //你想获取什么都可以, 第一个内容
                let title = xmlDoc.getElementsByTagName('heading')[0].textContent
                console.log(title)
                console.log(c)
                // console.log(request.responseXML)
            }else if(request.status >=400){
                console.log('请求失败')
            }
        } 
    }
    request.open('GET','/xxx')  //配置request(其实是重设/初始化一个request)，可选POST/GET,对应网址，默认异步
    request.send()   //发送
})