var http = require('http')
var fs = require('fs')
var url = require('url')
const { resolve } = require('path')
const { rejects, strict } = require('assert')
var port = process.argv[2]

if(!port){
  console.log('请指定端口号好不啦？\nnode server.js 8888 这样不会吗？')
  process.exit(1)
}

var server = http.createServer(function(request, response){
  var parsedUrl = url.parse(request.url, true)
  var pathWithQuery = request.url 
  var queryString = ''
  if(pathWithQuery.indexOf('?') >= 0){ queryString = pathWithQuery.substring(pathWithQuery.indexOf('?')) }
  var path = parsedUrl.pathname
  var query = parsedUrl.query
  var method = request.method

  /******** 从这里开始看，上面不要看 ************/

  console.log('含字符串的路径（带查询参数）为：' + pathWithQuery)

if(path === '/'){
    let string = fs.readFileSync('./index.html','utf-8')
    let cookies = request.headers.cookie.split(';')  //['email=1@','a=1','b=2']
    let hash = {}
    for(let i=0;i<cookies.length;i++){
      let parts = cookies[i].split('=')
      let key = parts[0]
      let value = parts[1]
      hash[key] = value
    }
    let email = hash.sign_in_email   //从数据里找已登录的email
    let users = fs.readFileSync('./db/users','utf-8')
    users = JSON.parse(users)
    let foundUser
    for(let i=0;i<users.length;i++){   //遍历已登录的email，如果账户相等
      if(users[i].email === email){
        foundUser = users[i]  
        break
      }
      if(foundUser){   //如果相等,就找到首页的email处，变成用户的账户
        string = string.replace('__email__',foundUser.email)
      }else{
        string = string.replace('__email__','未登录')   //如果不相等（找不到账户），就显示未登录
      }
    }
    response.statusCode = 200
    response.setHeader('Content-Type', 'text/html;charset=utf-8')
    response.write(string)
    response.end()
    
  } else if(path === '/sign_up' && method === 'GET'){
    let string = fs.readFileSync('./sign_up.html','utf-8')
    response.statusCode = 200
    response.setHeader('Content-Type', 'text/html;charset=utf-8')
    response.write(string)
    response.end()
  } else if(path === '/sign_up' && method === 'POST'){
    readBody(request).then((body)=>{
      let strings = body.split('&')  //分开内容 ['email=1','password=2','password_confirmation=3']
      let hash = {}
      strings.forEach((string)=>{
        //string=='email=1'
        let parts = string.split('=')    //['email],'1']
        let key = parts[0]
        let value = parts[1]
        hash[key] = decodeURIComponent(value)     //hash['email']='1'   并用uri码翻译@
      })
      let {email,password,password_confirmation} = hash
      if(email.indexOf('@') === -1){   //-1状态码
        response.statusCode = 400
        response.setHeader('Content-Type', 'application/json;charset=utf-8')
        response.write(`{
          "errors":{
            "email":"invalid"   
          }
        }`)  //一句话简洁说提示
      }else if(password !== password_confirmation){
        response.statusCode = 400
        response.write('password not match')
      }else{
        var users = fs.readFileSync('./db/users','utf-8')  //得到的字符串转换成json语言
        try{
          users = JSON.parse(users)    //[]   但这句或不符合json语法
        }catch{
          users = []   //如果上一句执行有错（数据库有错），那么就清空数据库
        }
        let inUse = false   
        for(let i=0;i<users.length;i++){   //遍历数据库
          let user = users[i]
          if(user.email === email){
            inUse = true     //注册邮箱重复，则400，中断注册
            break;
          }
        }
        if(inUse){
          response.statusCode = 400
          response.write('email in use')
        }else{     //默认注册并存入数据库
          users.push({email:email,password:password})
          var usersString = JSON.stringify(users)     //把users的结果变成字符串
          fs.writeFileSync('./db/users',usersString)   //存入数据库(必须存的是字符串)
          response.statusCode = 200
        }
      }
      response.end()
    })  
    
    
  } else if(path === '/sign_in' && method === 'GET'){
    let string = fs.readFileSync('./sign_in.html','utf-8')
    response.statusCode = 200
    response.setHeader('Content-Type', 'text/html;charset=utf-8')
    response.write(string)
    response.end()
  } else if(path === '/sign_in' && method === 'POST'){
    readBody(request).then((body)=>{
      let strings = body.split('&')  //分开内容 ['email=1','password=2','password_confirmation=3']
      let hash = {}
      strings.forEach((string)=>{
        //string=='email=1'
        let parts = string.split('=')    //['email],'1']
        let key = parts[0]
        let value = parts[1]
        hash[key] = decodeURIComponent(value)     //hash['email']='1'   并用uri码翻译@
      })
      let {email,password} = hash
      var users = fs.readFileSync('./db/users','utf-8')  //得到的字符串转换成json语言
        try{
          users = JSON.parse(users)    //[]   但这句或不符合json语法
        }catch{
          users = []   //如果上一句执行有错（数据库有错），那么就清空数据库
        }
        let found 
        for(let i=0;i<users.length;i++){   //遍历数据库
          if(users[i].email === email && users[i].password === password){
            //如果用户输入的邮箱是存过的邮箱，且密码是存过的密码，就登录
            found = true
            break
          }
          if(found){
            response.setHeader('Set-Cookie', `sign_in_email=${email};HttpOnly`)  //禁止js修改
            response.statusCode = 200
          }else{
            response.statusCode = 401  //认证失败
          }
        }
      response.end()
    })
  } else if(path === '/x'){
    let string = fs.readFileSync('./sign_up.html','utf-8')
    response.statusCode = 200
    response.setHeader('Content-Type', 'text/css;charset=utf-8')
    response.write(string)
    response.end()
  } else {
    response.statusCode = 404
    response.setHeader('Content-Type', 'text/html;charset=utf-8')
    response.write(`你输入的路径不存在对应的内容`)
    response.end()
  }

  /******** 代码结束，下面不要看 ************/
})

//假设用户写超过一万行字码
function readBody(request){
  return new Promise((resolve,reject)=>{
    let body = []
    request.on('data',(chunk)=>{   //监听这个数据
      body.push(chunk)   //将得出的结果push到body里
   }).on('end',()=>{    //数组全部上传完后
     body = Buffer.concat(body).toString()  //把数据拼接起来
     resolve(body)     
   })
  })
}


server.listen(port)
console.log('监听 ' + port + ' 成功\n请在空中转体720度然后用电饭煲打开 http://localhost:' + port)


