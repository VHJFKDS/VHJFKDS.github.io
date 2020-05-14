let n
初始化()

setInterval(() => {
    makeLeave(getImage(n))
        .one('transitionend', (e) => {
            makeEnter($(e.currentTarget))
        })
    makeCurrent(getImage(n+1))
    n+=1
}, 3000)



function x(n){
    if(n>5){
        n=n%5
    if(n===0){
        n=5
    }
}
    return n
}
function 初始化(){
    n=1
    $(`.images >img:nth-child(${n})`).addClass('current')
    .siblings().addClass('enter')
}
function getImage(n){
    return $(`.images >img:nth-child(${x(n)})`)
}

function makeLeave($node) {
    return $node.removeClass('current enter').addClass('leave')
}
function makeEnter($node) {
    return $node.removeClass('current leave').addClass('enter')
}
function makeCurrent($node) {
    return $node.removeClass('leave enter').addClass('current')
}