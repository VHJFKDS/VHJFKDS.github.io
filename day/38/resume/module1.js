//通过闭包，间接与文件间交流
!function(){
        var person = {   
            name:'frank',
            age:18     //!!!不能加''，否则就是字符串！
        }
        window.frankGrowUp = function(){  //想知道这个人几岁就调用这个信息，但你不能知道这个人的全部信息，只能做它允许的操作
            person.age += 1
            return person.age    
        }
       //运用了外面的变量，闭包，隐藏了数据细节
}.call()

//以上代码其实可以写作如下，都是一样的作用：
window.a = function(){
    var person = {
        name:'frank',
        age:18 
    }
    return function(){
        person.age += 1
        return person.age
    }
}.call()   //这是一个返回了匿名函数的函数，return的匿名函数的函数


//通过数据入window，文件间交流
// !function(){
//     var person = window.person = {   //声明一个变量存入window，再同时存一个在本地
//         name:'frank'
//     }
//     console.log(person)              //虽然是两个不同的变量，但存的是同一个地址
//     console.log(window.person)
// }.call()