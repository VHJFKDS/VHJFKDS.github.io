/*导航页面跳转*/
!function () {
    var view = View('nav.menu')
    var controller = {
        view: null,
        aTags: null,
        initAnimation: function () {
            function animate(time) {
                requestAnimationFrame(animate);
                TWEEN.update(time);
            }
            requestAnimationFrame(animate);
        },
        init: function (view) {
            this.view = view
            this.initAnimation()
            this.bindEvents()
        },
        scrollToElement:function(element){
            let top = element.offsetTop

            let currentTop = window.scrollY
            let targetTop = top - 70
            let s = targetTop - currentTop     //算路程
            var coords = { y: currentTop };   /*计算起始位置*/
            var t = Math.abs(s / 100) * 300    /*求绝对值*/
            if (t > 500) { t = 500 }
            var tween = new TWEEN.Tween(coords)   /*起始位置*/
                .to({ y: targetTop }, t)    /*结束位置，时间*/
                .easing(TWEEN.Easing.Quadratic.InOut)   /*选择函数类型，缓动类型*/
                .onUpdate(function () {     /*每次更新会调用此函数*/
                    window.scrollTo(0, coords.y)
                })
                .start();    /*开始缓动*/
        },
        bindEvents: function () {
            let aTags = this.view.querySelectorAll('nav.menu>ul>li>a')
            for (let i = 0; i < aTags.length; i++) {
                aTags[i].onclick = (x)=> {
                    x.preventDefault()
                    let a = x.currentTarget
                    let href = a.getAttribute('href')
                    let element = document.querySelector(href)
                    this.scrollToElement(element)
                }
            }
        }
    }
    controller.init(view)
}.call()























// !function () {
//     var view = document.querySelector('nav.menu')
//     // view.style.border = '1px solid red'
//     var controller = function (view) {
//         let aTags = view.querySelectorAll('nav.menu>ul>li>a')
//         function animate(time) {                 /*多长时间动一次根据浏览器决定*/
//             requestAnimationFrame(animate);
//             TWEEN.update(time);
//         }
//         requestAnimationFrame(animate)

//         for (let i = 0; i < aTags.length; i++) {
//             aTags[i].onclick = function (x) {
//                 x.preventDefault()
//                 let a = x.currentTarget
//                 let href = a.getAttribute('href')
//                 let element = document.querySelector(href)
//                 let top = element.offsetTop
//                 // let top=document.querySelector(x.currentTarget.getAttribute('href')).offsetTop

//                 let currentTop = window.scrollY
//                 let targetTop = top - 70
//                 let s = targetTop - currentTop
//                 var coords = { y: currentTop };   /*设置初始位置*/
//                 var t = Math.abs(s / 100) * 300    /*求绝对值*/
//                 if (t > 500) { t = 500 }
//                 var tween = new TWEEN.Tween(coords)   /*起始位置*/
//                     .to({ y: targetTop }, t)    /*结束位置，时间*/
//                     .easing(TWEEN.Easing.Quadratic.InOut)   /*选择函数类型，缓动类型*/
//                     .onUpdate(function () {     /*每次更新会调用此函数*/
//                         window.scrollTo(0, coords.y)
//                     })
//                     .start();    /*开始缓动*/
//             }
//         }
//     }
//     controller.call(undefined, view)
// }.call()


/*二级菜单特效*/
let liTags = document.querySelectorAll('nav.menu>ul>li')
for (let i = 0; i < liTags.length; i++) {
    liTags[i].onmouseenter = function (x) {
        x.currentTarget.classList.add('active')
    }
    liTags[i].onmouseleave = function (x) {
        x.currentTarget.classList.remove('active')
    }
}



















//上面是代码优化
// let aTags = document.querySelectorAll('nav.menu>ul>li>a')
// function animate(time) {                 /*多长时间动一次根据浏览器决定*/
//     requestAnimationFrame(animate);
//     TWEEN.update(time);
// }
// requestAnimationFrame(animate)

// for (let i = 0; i < aTags.length; i++) {
//     aTags[i].onclick = function (x) {
//         x.preventDefault()
//         let a = x.currentTarget
//         let href = a.getAttribute('href')
//         let element = document.querySelector(href)
//         let top = element.offsetTop
//         // let top=document.querySelector(x.currentTarget.getAttribute('href')).offsetTop

//         let currentTop = window.scrollY
//         let targetTop = top - 70
//         let s = targetTop - currentTop
//         var coords = { y: currentTop };   /*设置初始位置*/
//         var t = Math.abs(s / 100) * 300    /*求绝对值*/
//         if (t > 500) { t = 500 }
//         var tween = new TWEEN.Tween(coords)   /*起始位置*/
//             .to({ y: targetTop }, t)    /*结束位置，时间*/
//             .easing(TWEEN.Easing.Quadratic.InOut)   /*选择函数类型，缓动类型*/
//             .onUpdate(function () {     /*每次更新会调用此函数*/
//                 window.scrollTo(0, coords.y)
//             })
//             .start();    /*开始缓动*/
//     }
// }

