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
    let string = fs.readFileSync('./sign_up.html','utf-8')
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
        hash[key] = value    //hash['email']='1'
      })
      // let email = hash['email']
      // let password = hash['password']
      // let password_confirmation = hash['password_confirmation']
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
        response.statusCode = 200
      }
      response.end()
    })  
    
    
  } else if(path === '/x'){
    let string = fs.readFileSync('./sign_up.html','utf-8')
    response.statusCode = 200
    response.setHeader('Content-Type', 'text/css;charset=utf-8')
    response.write(`body{color: red;}`)
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


