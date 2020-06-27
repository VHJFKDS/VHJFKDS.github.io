!function(){
  function writeCode(prefix,code,fn){
      let container = document.querySelector('#code')
      let styleTag = document.querySelector('#styleTag')
      let n = 0
      let id = setInterval(()=>{
          n+=1
          container.innerHTML = code.substring(0,n)
          styleTag.innerHTML = code.substring(0,n)
          if( n >= code.length){
              window.clearInterval(id)
              fn && fn.call()    //如果有回调，就调用回调
          }
      },100)
  }
  writeCode('','321637863786248')
}.call()   //立即执行函数