AV.init({
    appId: "YRjzDHkpxCnqw5LvVvWO2dwJ-gzGzoHsz",
    appKey: "LRgTivj31KkAFdmJiPzp0lCC",
    serverURL: "https://yrjzdhkp.lc-cn-n1-shared.com"
});
console.log('没有报错')



//在云库里建立TestObject文件库
const TestObject = AV.Object.extend('TestObject');
const testObject = new TestObject();
testObject.set('words', 'Hello world!');
testObject.save().then((testObject) => {
  console.log('保存成功。')
})
console.log('成功了')