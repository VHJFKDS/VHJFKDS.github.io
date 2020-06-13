//页面自动往上滚

//添加offset 类，页面滚动往上提升动画
let specialTags = document.querySelectorAll('[data-x]')
for (let i = 0; i < specialTags.length; i++) {    /*搜索含有data-x的元素*/
    specialTags[i].classList.add('offset')        /*给他们都添加上offset*/
}
setTimeout(function () {
    findClosestAndRemoveOffset()
}, 1000)


findClosestAndRemoveOffset()   //如果用户滚动了，就再从找到offset并移除
window.addEventListener('scroll',function(x){
    findClosestAndRemoveOffset()   //客户再移动就再找到offset
})//两个都是监听滚动，两种写法，把他们分开















function findClosestAndRemoveOffset() {   //找到最近的
    let specialTags = document.querySelectorAll('[data-x]')
    let minIndex = 0        // minIndex就是离窗口顶部最近的元素
    for (let i = 1; i < specialTags.length; i++) {    /*找到距离最小的data-x*/
        if (Math.abs(specialTags[i].offsetTop - window.scrollY) < Math.abs(specialTags[minIndex].offsetTop - window.scrollY)) {
            minIndex = i
        }
    }
    //给最近的元素移除offset
    specialTags[minIndex].classList.remove('offset')    /*只在最近上窗距的data-x加active*/
    let id = specialTags[minIndex].id            /*获取当前高亮的id*/
    let a = document.querySelector('a[href="#' + id + '"]')      /*获取3个id对应的a标签*/
    let li = a.parentNode                            /*获取a标签的爸爸li标签*/
    let brotherAndMe = li.parentNode.children        /*li的所以兄弟姐妹*/
    for (let i = 0; i < brotherAndMe.length; i++) {
        brotherAndMe[i].classList.remove('highlight')         /*遍历li下所有元素和自己，移除高亮*/
    }
    li.classList.add('highlight')          /*只给对应的id加高亮*/
}


