!function () {
    function writeCode(prefix, code, fn) {
        let container = document.querySelector('#code')
        let styleTag = document.querySelector('#styleTag')
        let n = 0
        let id = setInterval(() => {
            n += 1
            container.innerHTML = code.substring(0,n)
            styleTag.innerHTML = code.substring(0,n)
            container.scrollTop = container.scrollHeight
            if (n >= code.length) {
                window.clearInterval(id)
                setTimeout(function(){
                    container.style = "overflow-y:scroll;"
                },1000)  
                fn && fn.call()    //如果有回调，就调用回调
            }
        }, 70)
    }
        let code = `
/* 首先需要皮卡丘的皮 */

.preview{
   height: 100%;
   display: flex;
   justify-content: center;
   align-items: center;
   background:#fee433;
    }
.wrapper{
   width: 100%;
   height: 200px;
   position: relative;
    }

/* 接下来，画皮卡丘的鼻子 */

.nose{
   position: absolute;
   width: 0;
   height: 0;
   top: 28px;
   left: 50%;
   margin-left: -11px; 
   border: 1px solid red;
   border-width: 13px 13px;
   border-radius: 13px;
   border-color: black transparent transparent;
    }

/* 现在画皮卡丘的眼睛 */

.eye{
   background-color: #2e2e2e;
   border-radius: 50%;
   width: 50px;
   height: 50px;
   position: absolute;
   border: 2px solid black;
    }

/* 画眼睛里面的珠子 */

.eye::after{
   content: '';
   display: block;
   border: 1px solid black;
   background: white;
   width: 24px;
   height: 24px;
   position: absolute;
   border-radius: 12px;
   left: 5px;
    }
.eye.left{
   right:50%;
   margin-right: 90px;
    }
.eye.right{
   left: 50%;
   margin-left: 90px;
    }

/* 然后画皮卡丘的脸 */

.face{
   background-color: #fc0d1c;
   border-radius: 50%;
   width: 70px;
   height: 70px;
   top: 90px;
   position: absolute;
   border: 2px solid black;
    }

/* 将脸放到正确的位置 */

.face.left{
    right:50%;
    margin-right: 120px;
    }
.face.right{
   left:50%;
   margin-left:120px;
    }

/* 上嘴唇 */

.upperLip{
   border:3px solid black;
   width:85px;
   height:30px;
   position:absolute;
   top:55px;
   background:#fee433;
    }
.upperLip.left{
   right:50%;
   border-bottom-left-radius: 60px 30px;
   border-top: none;
   border-right: none;
   transform: rotate(-20deg);
    }
.upperLip.right{
   left:50%;
   border-bottom-right-radius: 60px 30px;
   border-top: none;
   border-left: none;
   transform:rotate(20deg);
    }

/* 下嘴唇 */

.lowerLip-wrapper{
   bottom:0;
   position:absolute;
   left:50%;
   margin-left:-70px;
   height:135px;
   overflow: hidden;
   width:140px; 
    }
.lowerLip{
   width: 140px;
   height: 800px;
   border: 2px solid black;
   border-radius: 200px/700px;
   position: absolute;
   bottom: 0;
   background:#990513;
   overflow: hidden;
    }

/* 小舌头 */

.lowerLip::after{
   content: '';
   width: 110px;
   height: 105px;
   position: absolute;
   bottom: 0;
   left: 50%;
   margin-left:-55px;
   border-top-left-radius: 55px;
   border-top-right-radius: 55px;
   background:#fc4a62;
    } 
    
/* 好了，这只皮卡丘送给你 */
    `
    
    writeCode('',code)
}.call()   //立即执行函数



