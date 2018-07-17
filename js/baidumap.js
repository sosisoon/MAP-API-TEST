/**
 * Created by Administrator on 2018/6/8.
 */
var locationMuseum = [
    {title:"",location:222}
]

function initialize() {
    var mp = new BMap.Map('map');
    mp.centerAndZoom(new BMap.Point(113.263658, 23.132124), 13);
}

function loadScript() {
    var script = document.createElement("script");
    script.src = "http://api.map.baidu.com/api?v=2.0&ak=18200586c6255b83bad986e41bec0429&callback=initialize";
    document.body.appendChild(script);
}
window.onload = loadScript;

//knockout viewmodel
var ViewModel = function () {
    var self = this;
    self.showLocationMuseum = function () {

    };
    self.hideLocationMuseum = function () {

    };

};
var currentViewModel = new ViewModel();
ko.applyBindings(currentViewModel);