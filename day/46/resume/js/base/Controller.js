/*
Controller({
    init:(){
        this.view
        this.model
        this.xxx()
        this.yyy()
    },
    xxx(){}
    yyy(){}
})
*/
window.Controller = function(options){
    var init = options.init

    let object = {
        view:null,
        model:null,
        init:function(view,model){
            this.view = view
            this.model = model
            this.model.init()
            init.call(this,view,model)  //这句话会调用options的init，同时会把object作为this，传进这里
            //这个this(指object)传给options的init
            this.bindEvents()
        },
       
    }
    for(let key in options){  //遍历这里的options
        if(key !== 'init'){      //如果有的值没在这里的init里，
           object[key] = options[key]   //那么就把option(即各文件里的Controller里)的init
        }                                //把别地的init值拷到这里给object
    }
    return object
}