//作品区的轮播图
!function (){
    var view = View('#mySlides')
    // view.style.border = '1px solid red'
    var controller = function(view){
        var mySwiper = new Swiper('.swiper-container', {
            loop: true, // 无缝循环
            navigation: {
                nextEl: '.swiper-button-next',
                prevEl: '.swiper-button-prev',
            }

        })
        mySwiper.el.onmouseover = function () {
            mySwiper.navigation.$nextEl.removeClass('hide');
            mySwiper.navigation.$prevEl.removeClass('hide');
        }
        mySwiper.el.onmouseout = function () {
            mySwiper.navigation.$nextEl.addClass('hide');
            mySwiper.navigation.$prevEl.addClass('hide');
        }
    }
    controller.call(null,view)
}.call()
























//下这一段已优化，但有bug，暂用上面一段
// !function () {
//     var view = document.querySelector('#mySlides')
//     var controller = {
//         view: null,
//         swiper: null,
//         swiperOptions: {
//             loop: true, // 无缝循环
//             navigation: {
//                 nextEl: '.swiper-button-next',
//                 prevEl: '.swiper-button-prev',
//             }
//         },
//         init: function (view) {
//             this.view = view
//             this.initSwiper()
//         },
//         initSwiper: function () {
//             this.Swiper = new Swiper(
//                 view.querySelector('.swiper-container'),
//                 this.swiperOptions
//             )
//         }
//     }
//     controller.init(view)
// }.call()





//作品区的轮播图,上面是优化
// var mySwiper = new Swiper('.swiper-container', {
//     // direction: 'vertical', // 垂直切换选项
//     loop: true, // 无缝循环

//     // 前进后退按钮
//     navigation: {
//         nextEl: '.swiper-button-next',
//         prevEl: '.swiper-button-prev',
//     },
// })
// mySwiper.el.onmouseover = function () {
//     mySwiper.navigation.$nextEl.removeClass('hide');
//     mySwiper.navigation.$prevEl.removeClass('hide');
// }
// mySwiper.el.onmouseout = function () {
//     mySwiper.navigation.$nextEl.addClass('hide');
//     mySwiper.navigation.$prevEl.addClass('hide');
// }