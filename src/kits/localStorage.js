const key = "goodsbuy";


// 1.存储信息
// goodsinfo: {c:11,bcount:1}
export function setItem(goodsinfo) {
    // console.log("goodsinfo:" + goodsinfo)
    // 判断localStrage中是否有这个值
    var goodObj = getItem();
    //判断goodsinfo中是否有这个值
    // 如果有
    if (goodObj[goodsinfo.gid]) {
        goodObj[goodsinfo.gid] = goodObj[goodsinfo.gid] + goodsinfo.bcount
    } else {
        //没有
        goodObj[goodsinfo.gid] = goodsinfo.bcount
    }
    // 设置回localStorage
    localStorage.setItem(key, JSON.stringify(goodObj))
};
// 2.获取信息
export function getItem() {
    var goodStr = localStorage.getItem(key);
    // JSON.parse() 方法解析一个JSON字符串，构造由字符串描述的JavaScript值或对象。可以提供
    // 可选的reviver函数以在返回之前对所得到的对象执行变换。
    var obj = JSON.parse(goodStr);
    if (!obj) {
        localStorage.setItem(key, JSON.stringify("{}"))

        return {};
    }
    return obj;
}
// 3.删除信息
export function delectItem(goodsID) {
    var goodObj = setItem();
    // console.log(goodObj);
    delete goodObj[goodsID];

    localStorage.setItem(key, JSON.stringify(goodObj))
}