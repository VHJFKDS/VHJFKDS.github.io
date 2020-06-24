//把code写到#code和style标签里，这段代码是在定闹钟，并没有开始写代码
function writeCode(prefix, code, fn) {  //之前的代码，现在的代码，完成后执行的函数
    let domCode = document.querySelector('#code') //js中最好不要直接用id，容易冲突，用选择器选择这个id
    // domCode.innerHTML = prefix || ''   //把前缀（前面已有代码）写入#code里，没有的话就空
    let n = 0
    let id = setInterval(() => {
        n += 1
        domCode.innerHTML = Prism.highlight(prefix + code.substring(0, n), Prism.languages.css);
        //把code里的字符（所有），以css形式高亮，放入domCode中
        styleTag.innerHTML = prefix + code.substring(0, n)     //将代码里的字符串逐个放入style中
        domCode.scrollTop = 10000   //每次更新就往下拉1w像素  或写domCode.scrollTop = domCode.scrollHeight 拉到最大
        if (n >= code.length) {
            window.clearInterval(id)     //遍历完result，就结束
            fn && fn.call()  //结束后call人
        }
    }, 30)
}
function writeMarkdown(markdown, fn) {
    let domPaper = document.querySelector('#paper > .content')
    let n = 0
    let id = setInterval(() => {
        n += 1
        domPaper.innerHTML = markdown.substring(0, n)
        domPaper.scrollTop = domPaper.scrollHeight
        if (n >= markdown.length) {
            window.clearInterval(id)     //遍历完result，就结束
            fn.call()  //结束后call人
        }
    }, 30)
}


var result = `
    /*
    *面试官你好，我是xxx
    *我将以动画的形式来介绍我自己
    *只用文字介绍太单调
    *我就用代码来介绍吧
    *首先准备一些样式
    */
    *{transition:all 1s;}
    html{
      background:#eee;
    }
    #code{
        border:1px solid #aaa;
        padding:16px;
    }
    
    /* 我需要一点代码高亮 */

    .token.selector{color:#690;}
    .token.property{color: #905;}
    .token.function{color: #DD4A68;}
    
    /* 加一个呼吸效果 */

    #code{
        animation: breath 0.5s infinite alternate-reverse;
      }

    /* 现在正是开始 */

    /* 我需要一张白纸 */

    #code-wrapper{
        width:50%; left:0; position:fixed;
        height:100%;
    }
    #paper > .content{
        display:block;
    }

    /* 于是我就可以在白纸上写字了，请看右边 */
    `
var result2 = `
    /* 接下来用一个优秀的库 marked.js
    * 把 Markdown 变成 HTML
    */


   
`

var md = `
# 自 我 介 绍

 我叫 xxx
 1993 年 1 月 1 日
 xxx 学校毕业
 自学前端半年
 希望应聘前端开发岗位

# 技 能 介 绍
 熟悉 jacascript css

# 项 目 介 绍
 1、canvas画板
 2、keyboard导航页
 3、会动的简历

# 联 系 方 式
 QQ  XXXXXX
 Email XXXXXXXX
 Wechat xxxxxxxxxx
 手机  xxxxxxxxxx

# 联 系 方 式
 QQ  XXXXXX
 Email XXXXXXXX
 Wechat xxxxxxxxxx
 手机  xxxxxxxxxx
 
# 联 系 方 式
 QQ  XXXXXX
 Email XXXXXXXX
 Wechat xxxxxxxxxx
 手机  xxxxxxxxxx
 
# 联 系 方 式
 QQ  XXXXXX
 Email XXXXXXXX
 Wechat xxxxxxxxxx
 手机  xxxxxxxxxx
 
`
var result3 = `
    /* 
    * 这就是我的会动的简历 
    * 谢谢观看
    */
    
    `

writeCode('', result, () => {  //之前代码是空，开始写（result）里的代码，并且写完后回call（函数）  回调
    createPaper(() => {     //写完后写paper，再加回调，写完paper后再写代码
        writeMarkdown(md, () => {
            writeCode(result, result2, () => {    //（之前代码，现在代码,写完后写markdown）
                converMarkdownToHtml(() => {
                    writeCode(result + result2, result3, () => {
                        console.log('完成')
                    })
                })
            })

        })
    })
})   //同样是回调，writeCode是异步任务/函数，creatpaper是同步


function createPaper(fn) {
    var paper = document.createElement('div')
    paper.id = 'paper'
    var content = document.createElement('pre')
    content.className = 'content'
    paper.appendChild(content)
    document.body.appendChild(paper)
    fn.call()
}

function converMarkdownToHtml(fn) {
    var div = document.createElement('div')
    div.className = 'html markdown-body'
    div.innerHTML = marked(md)
    let markdownContainer = document.querySelector('#paper > .content')
    markdownContainer.replaceWith(div)
    fn.call()
}



    // var result = `...`
    // var n = 0
    // var id = setInterval(() => {
    //     n += 1
    //     code.innerHTML = result.substring(0, n)    //将result里的字符串逐个放入code中
    //     code.innerHTML = Prism.highlight(code.innerHTML, Prism.languages.css);
    //     //通过库让代码的内容高亮（自身代码，语言是css）
           //上面两句，完全可以写成一句：code.innerHTML = Prism.highlight(result.substring(0, n), Prism.languages.css);

    //     styleTag.innerHTML = result.substring(0, n)     //将result里的字符串逐个放入style中
    //     if (n >= result.length) {
    //         window.clearInterval(id)     //遍历完result，就结束
    //         fn2()
    //         fn3(result)  //基于上面已写好的css，继续做事件
    //     }
    // }, 30)
    // function fn2() {
    //     var paper = document.createElement('div')
    //     paper.id = 'paper'
    //     document.body.appendChild(paper)
    // }
    // function fn3(preResult) {
    //     var result = `
    //         #paper{
    //             width:100px;
    //             height:100px;
    //             background:red;
    //         }`
    //     var n = 0
    //     var id = setInterval(() => {
    //         n += 1
    //         code.innerHTML = preResult + result.substring(0, n)
    //         //code中文字= code中之前的文字（在其后面加）+继续接css代码
    //         code.innerHTML = Prism.highlight(code.innerHTML, Prism.languages.css);
    //         styleTag.innerHTML = preResult + result.substring(0, n)     
    //         //样式也一样，接着前面result的

    //         if (n >= result.length) {
    //             window.clearInterval(id)
    //         }
    //     }, 30)
    // }