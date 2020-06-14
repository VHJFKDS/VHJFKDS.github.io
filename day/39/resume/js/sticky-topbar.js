/*监听顶部导航粘着效果*/
!function () {
    var view = document.querySelector('#topNavBar')    //声明视图区域是顶端导航
    var controller = {
        view: null,
        init: function(view) {
                this.view = view
                this.bindEvents()
                //this.bindEvents.call(this)
        },
        bindEvents: function() {
            var view = this.view
            window.addEventListener('scroll',(x) => {
                if (window.scrollY > 0) {
                    this.active()
                } else {
                    this.deactive()
                }
            })  //箭头函数没有this
        },
        active: function() {
            this.view.classList.add('sticky')
        },
        deactive: function() {
            this.view.classList.remove('sticky')
        }
    }
    controller.init(view)
}.call()

























//上面是代码优化
// !function () {
//     var view = document.querySelector('#topNavBar')    //声明视图区域是顶端导航
//     // view.style.border = '1px solid red'
//     var controller = function (view) {        //控制器，控制视图区域
//         window.addEventListener('scroll', function (x) {
//             if (window.scrollY > 0) {
//                 topNavBar.classList.add('sticky')
//             } else {
//                 topNavBar.classList.remove('sticky')
//             }
//         })
//     }
//     controller.call(null, view)   //必须调用，因为这个匿名函数作值赋给变量了，不调用是不会自己执行的
// }.call()







//上面是代码优化
// window.onscroll = function (xx) {
//     if (window.scrollY > 0) {
//         topNavBar.classList.add('sticky')
//     } else {
//         topNavBar.classList.remove('sticky')
//     }
// }