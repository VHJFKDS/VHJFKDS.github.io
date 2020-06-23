
var result = `/*
*面试官你好，我是xxx
*我将以动画的形式来介绍我自己
*只用文字介绍太单调
*我就用代码来介绍吧
*首先准备一些样式
*/
*{transition:all 1s;}
html{
  background:rgb(222,222,222);
  font-size:16px;
}
body{
  border:1px solid red;
  padding:16px;
}

/* 我需要一点代码高亮 */
.token.selector{
    color:#690;
}
.token.property{
    color: #905;
}
.token.function{
    color: #DD4A68;
}

/* 加点3D效果 */

/* 不玩了，我来介绍一下自己 */
/* 我需要一张白纸 */
`

var n = 0
var id = setInterval(() => {
    n += 1
    code.innerHTML = result.substring(0, n)    //将result里的字符串逐个放入code中
    code.innerHTML = Prism.highlight(code.innerHTML, Prism.languages.css);
    //通过库让代码的内容高亮（自身代码，语言是css）
    styleTag.innerHTML = result.substring(0, n)     //将result里的字符串逐个放入style中
    if (n >= result.length) {
        window.clearInterval(id)     //遍历完result，就结束
        fn2()
        fn3(result)  //基于上面已写好的css，继续做事件
    }
}, 30)

function fn2() {
    var paper = document.createElement('div')
    paper.id = 'paper'
    document.body.appendChild(paper)
}
function fn3(preResult) {
    var result = `
        #paper{
            width:100px;
            height:100px;
            background:red;
        }`
    var n = 0
    var id = setInterval(() => {
        n += 1
        code.innerHTML = preResult + result.substring(0, n)
        //code中文字= code中之前的文字（在其后面加）+继续接css代码
        code.innerHTML = Prism.highlight(code.innerHTML, Prism.languages.css);
        styleTag.innerHTML = preResult + result.substring(0, n)     
        //样式也一样，接着前面result的

        if (n >= result.length) {
            window.clearInterval(id)
        }
    }, 30)
}