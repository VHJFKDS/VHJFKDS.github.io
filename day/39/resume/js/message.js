!function () {
    var view = document.querySelector('section.message')
    var model = {
        initAV: function () {
            AV.init({
                appId: "YRjzDHkpxCnqw5LvVvWO2dwJ-gzGzoHsz",
                appKey: "LRgTivj31KkAFdmJiPzp0lCC",
                serverURL: "https://yrjzdhkp.lc-cn-n1-shared.com"
            })
        },
        fetch: function () {   //获取,所有数据
            var query = new AV.Query('TestObject');
            return query.find()   //promise对象
        },
        save: function (name, content) {   //创建数据
            var Message = AV.Object.extend('TestObject')
            var message = new Message()
            return message.save({   //返回promise对象
                'name': name,
                'content': content
            })
        }
    }
    var controller = {
        view: null,
        model: null,
        messageList: null,  //下一段代码要获取message了，所以要提前拿到
        init: function (view, model) {
            this.view = view
            this.model = model
            this.messageList = view.querySelector('#messageList')
            this.form = view.querySelector('form')
            this.model.initAV()
            this.loadMessage()  //初始化后加载message
            this.bindEvents()   //加载完给事件
        },
        
        loadMessage: function () {
            this.model.fetch().then((messages) => {
                let array = messages.map((item) => item.attributes)
                array.forEach((item) => {
                    let li = document.createElement('li')
                    li.innerText = `${item.name}:  ${item.content}`
                    this.messageList.appendChild(li)
                })
                console.log(array)
            }, function (error) {
                alert('提交失败，请改日再来~')
            })
        },
        bindEvents: function () {   //bind函数除了绑定事件其他不应该做，所以除事件外，其他如搜索信息的应另放
            this.form.addEventListener('submit', function (e) {
                e.preventDefault()   //阻止默认事件（刷新）
                this.saveMessage()
            })
        },
        saveMessage: function () {
            let myForm = this.form

            let content = myForm.querySelector('input[name=content]').value   //查找name=content的input元素，找到后获取它的value
            let name = myForm.querySelector('input[name=name]').value   //查找name=name的input元素，找到后获取它的value

            this.model.save(name, content).then(function (object) {       //完成以上操作后，自动新增li，不用再刷新页面才能看到
                let li = document.createElement('li')
                li.innerText = `${object.attributes.name}:${object.attributes.content}`
                let messageList = document.querySelector('#messageList')
                messageList.appendChild(li)     //更新页面
                myForm.querySelector('input[name=content]').value = ''         //提交后清空历史记录
            })
        }
    }
    controller.init(view, model)
}.call()


//上面封装代码
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
        myForm.querySelector('input[name=content]').value = ''         //提交后清空历史记录
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








//测试代码
  // {
  //   createdAt: "2017-03-08T11:25:07.804Z",
  //   objectId: "582570f38ac247004f39c24b",
  //   priority: 2,
  //   title: "工程师周会",
  //   updatedAt: "2017-03-08T11:25:07.804Z"
  // }
