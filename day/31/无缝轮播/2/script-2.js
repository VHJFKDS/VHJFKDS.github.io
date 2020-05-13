$('.images >img:nth-child(1)').addClass('current')
$('.images >img:nth-child(2)').addClass('enter')

setTimeout(()=>{
    $('.images >img:nth-child(1)').removeClass('current').addClass('leave')
    .one('transitionend',(e)=>{
        $(e.currentTarget).removeClass('leave').addClass('enter')
    })
    $('.images >img:nth-child(2)').removeClass('enter').addClass('current')
},2000)
setTimeout(()=>{
    $('.images >img:nth-child(2)').removeClass('current').addClass('leave')
    .one('transitionend',(e)=>{
        $(e.currentTarget).removeClass('leave').addClass('enter')
    })
    $('.images >img:nth-child(3)').removeClass('enter').addClass('current')
},4000)
setTimeout(()=>{
    $('.images >img:nth-child(3)').removeClass('current').addClass('leave')
    .one('transitionend',(e)=>{
        $(e.currentTarget).removeClass('leave').addClass('enter')
    })
    $('.images >img:nth-child(1)').removeClass('enter').addClass('current')
},6000)
setTimeout(()=>{
    $('.images >img:nth-child(1)').removeClass('current').addClass('leave')
    .one('transitionend',(e)=>{
        $(e.currentTarget).removeClass('leave').addClass('enter')
    })
    $('.images >img:nth-child(2)').removeClass('enter').addClass('current')
},9000)

// 持续下去的话就是不断img:nth-Child(n+1)的结果,不断的切换状态，可以用for循环