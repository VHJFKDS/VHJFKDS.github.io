//通过闭包，间接与文件间交流
!function(){
        var newAge = window.frankGrowUp()
        console.log(newAge)
    }.call()






//通过数据入window，文件间交流
// !function(){
//     var person = window.person
//     console.log(person)
// }.call()

// //2文件想用1文件的变量，可以一样声明这个变量，把window存的值拿来用，打出来是一样的