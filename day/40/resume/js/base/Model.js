window.Model = function(options){
    let resourceName = options.resourceName
    return {
        init:function(){
            AV.init({
                appId: "YRjzDHkpxCnqw5LvVvWO2dwJ-gzGzoHsz",
                appKey: "LRgTivj31KkAFdmJiPzp0lCC",
                serverURL: "https://yrjzdhkp.lc-cn-n1-shared.com"
            })
        },
        fetch:function(){
            var query = new AV.Query(resourceName);
            return query.find()   //promise对象
        },
        save:function(object){
            var X = AV.Object.extend(resourceName);
            var x = new X();
            return x.save(object)
        }
    }
    
}