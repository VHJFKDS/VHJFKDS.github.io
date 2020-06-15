AV.init({
    appId: "YRjzDHkpxCnqw5LvVvWO2dwJ-gzGzoHsz",
    appKey: "LRgTivj31KkAFdmJiPzp0lCC",
    serverURL: "https://yrjzdhkp.lc-cn-n1-shared.com"
});



let myForm = document.querySelector('#postMessage')
myForm.addEventListener('submit', function (e) {
    e.preventDefault()   //阻止默认事件（刷新）
    let content = myForm.querySelector('input[name=content]').value   //查找name=content的input元素，找到后获取它的value
    let name = myForm.querySelector('input[name=name]').value   //查找name=name的input元素，找到后获取它的value

    var Message = AV.Object.extend('TestObject')
    var message = new Message()
    message.save({
        'name': name,
        'content': content
    }).then(function (object) {       //完成以上操作后，自动新增li，不用再刷新页面才能看到
        let li = document.createElement('li')
        li.innerText = `${object.attributes.name}:${object.attributes.content}`
        let messageList = document.querySelector('#messageList')
        messageList.appendChild(li)
        myForm.querySelector('input[name=content]').value =''         //提交后清空历史记录
    })
})

var query = new AV.Query('TestObject');
query.find().then(function (messages) {
    let array = messages.map((item) => item.attributes)
    array.forEach((item) => {
        let li = document.createElement('li')
        li.innerText = `${item.name}:  ${item.content}`
        let messageList = document.querySelector('#messageList')
        messageList.appendChild(li)
    })
    console.log(array)
}, function (error) {
    alert('提交失败，请改日再来~')
});
console.log('运行到这里')



// rows="5" cols="20"








//测试代码
  // {
  //   createdAt: "2017-03-08T11:25:07.804Z",
  //   objectId: "582570f38ac247004f39c24b",
  //   priority: 2,
  //   title: "工程师周会",
  //   updatedAt: "2017-03-08T11:25:07.804Z"
  // }
