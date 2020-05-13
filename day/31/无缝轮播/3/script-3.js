
let n
初始化()
setInterval(() => {
    makeLeave(getImage(n))    
    .one('transitionend',(e)=>{         
        makeEnter($(e.currentTarget))   //当前元素
    })
    makeCurrent(getImage(n+1))
    n+=1
    console.log(n)
},3000)








//下面属于封装
function getImage(n){
    return $(`.images >img:nth-child(${x(n)})`)       /*${n}，n是几这里就是几的意思*/
}

function x(n){
    if(n>3){
        n=n%3     /*如果n大于3，就搞余数，n=4,余数1，n=5，余数2，n=6余数0，让他不超过3*/
        if(n===0){     /*防止为0*/
            n=3      /*永远满足n=1,2,3*/
        }
    }
    return n
}

function 初始化(){
    n=1
    $(`.images >img:nth-child(${n})`).addClass('current')   //无论n等于几，给当前页面加current状态，其他兄弟给enter
    .siblings().addClass('enter')
    // $('.images >img:nth-child(1)').addClass('current')   //给图片1做初始化，让它在中间
    // $('.images >img:nth-child(2)').addClass('enter')     //初始化图2图3，在右边
    // $('.images >img:nth-child(3)').addClass('enter')
}

function makeCurrent($node){
    $node.removeClass('enter leave').addClass('current')
    return $node          //如果不返回node，那么makeCurrent($node)返回的将是undefined
}                         //虽然操作了它，但是最后返回来了后面才能照常进行
function makeLeave($node){
    return $node.removeClass('current enter').addClass('leave')
}
function makeEnter($node){
    return $node.removeClass('leave').addClass('enter')
}