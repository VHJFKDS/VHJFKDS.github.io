console.log(window.Swiper)
var mySwiper = new Swiper('.swiper-container', {
    // direction: 'vertical', // 垂直切换选项
    loop: true, // 无缝循环

    // 前进后退按钮
    navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
    },
})
mySwiper.el.onmouseover = function () {
    mySwiper.navigation.$nextEl.removeClass('hide');
    mySwiper.navigation.$prevEl.removeClass('hide');
}
mySwiper.el.onmouseout = function () {
    mySwiper.navigation.$nextEl.addClass('hide');
    mySwiper.navigation.$prevEl.addClass('hide');
}