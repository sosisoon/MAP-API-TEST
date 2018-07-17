/**
 * Created by Administrator on 2018/6/4.
 */
var http = require("http");
var events = require("events");
var fs = require("fs");

//console.log(fs);
fs.readFile("./a.txt",function (err,data) {
    console.log(data);
})
// var sever = http.createServer();
// console.log(__dirname);
// console.log(__filename);
// console.log(sever instanceof events.EventEmitter);//相等
//console.log(events.prototype)
// var ev = new events.EventEmitter();
// console.log(events.EventEmitter.prototype.eventNames());

//on绑定事件
// ev.on("a", function (e1, e2) {
//     console.log(e1, e2)
// });
// ev.once("a", function () {
//     console.log("once-1")
// });
// setTimeout(function () {
//     ev.emit("a", {}, 3, "canglaoshi");//emit触发事件
// }, 2000);
//
// setTimeout(function () {
//     ev.emit("a", 3, "canglaoshi");//emit触发事件
// }, 4000);
