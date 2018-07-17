/**
 * Created by Administrator on 2018/6/3.
 */

//广州的博物馆艺术馆地点列表
var locationMuseum = [
    {title: "广州镇海楼博物馆", lnglat: [113.265568, 23.137701], id: 1},
    {title: "广东美术馆", lnglat: [113.307132, 23.108002], id: 2},
    {title: "广东省博物馆", lnglat: [113.32602, 23.114603], id: 3},
    {title: "广东华侨博物馆", lnglat: [113.305946, 23.108579], id: 4},
    {title: "西汉南越王博物馆", lnglat: [113.260917, 23.137657], id: 5},
    {title: "广州美术馆", lnglat: [113.267796, 23.13756], id: 6},
    {title: "时代美术馆", lnglat: [113.286603, 23.222217], id: 7}
];
var locationUniversity = [
    {title: "中山大学", lnglat: [113.298126, 23.096636], id: 8},
    {title: "华南理工大学", lnglat: [113.345833, 23.153157], id: 9},
    {title: "华南师范大学", lnglat: [113.351112, 23.139425], id: 10},
    {title: "华南农业大学", lnglat: [113.357463, 23.157576], id: 11},
    {title: "广东工业大学", lnglat: [113.299925, 23.133126], id: 12},
    {title: "广州医科大学", lnglat: [113.255937, 23.134034], id: 13},
    {title: "暨南大学", lnglat: [113.348478, 23.130324], id: 14},
    {title: "广东外语外贸大学", lnglat: [113.292429, 23.200438], id: 15},
    {title: "广州大学城", lnglat: [113.389097, 23.050047], id: 16}
];

//初始化标记点数组
var markerList = [];

//初始化地图
var gzmap;
function initMap() {
    gzmap = new AMap.Map('map', {
        // resizeEnable: true,
        zoom: 12,//级别
        center: [113.260917, 23.137657],//中心点坐标
        viewMode: '3D'//使用3D视图);
    });

    var infoWindowsInMap = new AMap.InfoWindow({
        offset: new AMap.Pixel(0, -25)
        //position: markers.F.position
    });
    //博物馆艺术馆markers和信息窗口
    for (var i = 0; i < locationMuseum.length; i++) {
        var markers = new AMap.Marker({
            map: gzmap,
            position: locationMuseum[i].lnglat,
            title: locationMuseum[i].title,
            id: locationMuseum[i].id + 1
        });
        markerList.push(markers);
        console.log(Object.values(markers));//markers是object对象
        //添加点击事件
        AMap.event.addListener(markers, 'click', function (event) {
            infoWindowsInMap.open(gzmap, event.lnglat);
            infoWindowsInMap.setContent(event.target.F.title);
            console.log(infoWindowsInMap.getPosition());//为何显示的地址是-数组最后一个地址数据？
        });

    }

    //大学markers和信息窗口
    // for (var i in locationUniversity) {
    //     var markers = new AMap.Marker({
    //         map: gzmap,
    //         position: locationUniversity[i].lnglat,
    //         title: locationUniversity[i].title,
    //         id: locationUniversity[i] + 1
    //     });
    //     markerList.push(markers);
    //
    //     var infoWindowsInMap = new AMap.InfoWindow({
    //         content:markers.F.title,
    //         offset: new AMap.Pixel(0, -25),
    //         position:markers.F.position
    //     });
    //
    //     AMap.event.addListener(markers,'click', function () {
    //         infoWindowsInMap.open(gzmap);
    //         console.log(infoWindowsInMap.getPosition());//为何显示的地址是-数组最后一个地址数据？
    //     });
    //     console.log(infoWindowsInMap);
    //
    // }

}
console.log(markerList);//markerList在函数体外是数组？

//body末尾加载地图
function loadAmap() {
    var url = 'http://webapi.amap.com/maps?v=1.4.6&key=b22b1c07c6cb055f7221f4e2b29861ec&callback=initMap';
    var jsapi = document.createElement('script');
    jsapi.charset = 'utf-8';
    jsapi.src = url;
    document.body.appendChild(jsapi);
}


//fetch 异步获取加载信息
var corsProxy = 'https://cors-anywhere.herokuapp.com/';
fetch("http://webapi.amap.com/maps?v=1.4.6&key=b22b1c07c6cb055f7221f4e2b29861ec&callback=initMap").then(function (res) {
    console.log(res.statusText)
    // console.log(res);
}, function (err) {
    console.log(err);
    alert("高德地图链接失败,请检查您的网络连接或设备！");
});

//异步加载百度地图天气信息，跨域请求
fetch(corsProxy + "http://api.map.baidu.com/telematics/v3/weather?location=广州&output=json&ak=18200586c6255b83bad986e41bec0429").then(function (res) {
    console.log(res);
    res.json().then(function (data) {
        // baiduWeather = data;
        console.log(data);
        let city = data.results[0].currentCity;
        let pm25 = data.results[0].pm25;
        let weather = data.results[0].weather_data[0].date;
        let baiduWeather = "<ul style='list-style: none;'><li>" + city + "</li><li>PM25:" + pm25 + "</li><li>" + weather + "</li></ul>";
        $(".localWeather").append(baiduWeather);
    })
    //res.json();
}, function (err) {
    console.log(err)
});

window.onload = loadAmap();

//插入天气信息
//var currentCity = baiduWeather.results[0];
//var pm25 = baiduWeather.results[0].pm25;
//console.log(currentCity );
currentWeather = {
    "error": 0,
    "status": "success",
    "date": "2018-07-05",
    "results": [{
        "currentCity": "广州",
        "pm25": "39",
        "index": [{
            "des": "天气炎热，建议着短衫、短裙、短裤、薄型T恤衫等清凉夏季服装。",
            "zs": "炎热",
            "tipt": "穿衣指数",
            "title": "穿衣"
        }, {
            "des": "不宜洗车，未来24小时内有雨，如果在此期间洗车，雨水和路上的泥水可能会再次弄脏您的爱车。",
            "zs": "不宜",
            "tipt": "洗车指数",
            "title": "洗车"
        }, {
            "des": "各项气象条件适宜，发生感冒机率较低。但请避免长期处于空调房间中，以防感冒。",
            "zs": "少发",
            "tipt": "感冒指数",
            "title": "感冒"
        }, {
            "des": "有降水，且风力较强，推荐您在室内进行低强度运动；若坚持户外运动，请选择避雨防风的地点。",
            "zs": "较不宜",
            "tipt": "运动指数",
            "title": "运动"
        }, {"des": "属中等强度紫外线辐射天气，外出时建议涂擦SPF高于15、PA+的防晒护肤品，戴帽子、太阳镜。", "zs": "中等", "tipt": "紫外线强度指数", "title": "紫外线强度"}],
        "weather_data": [{
            "date": "周四 07月05日 (实时：28℃)",
            "dayPictureUrl": "http://api.map.baidu.com/images/weather/day/yin.png",
            "nightPictureUrl": "http://api.map.baidu.com/images/weather/night/leizhenyu.png",
            "weather": "阴转雷阵雨",
            "wind": "西南风3-4级",
            "temperature": "34 ~ 27℃"
        }, {
            "date": "周五",
            "dayPictureUrl": "http://api.map.baidu.com/images/weather/day/leizhenyu.png",
            "nightPictureUrl": "http://api.map.baidu.com/images/weather/night/leizhenyu.png",
            "weather": "雷阵雨",
            "wind": "无持续风向微风",
            "temperature": "35 ~ 28℃"
        }, {
            "date": "周六",
            "dayPictureUrl": "http://api.map.baidu.com/images/weather/day/leizhenyu.png",
            "nightPictureUrl": "http://api.map.baidu.com/images/weather/night/duoyun.png",
            "weather": "雷阵雨转多云",
            "wind": "东南风3-4级",
            "temperature": "35 ~ 28℃"
        }, {
            "date": "周日",
            "dayPictureUrl": "http://api.map.baidu.com/images/weather/day/duoyun.png",
            "nightPictureUrl": "http://api.map.baidu.com/images/weather/night/duoyun.png",
            "weather": "多云",
            "wind": "东南风3-4级",
            "temperature": "35 ~ 28℃"
        }]
    }]
};

//knockout ViewModel
var ViewModel = function () {
    var self = this;
    self.showLocationMuseum = function () {
        for (var i in markerList) {
            markerList[i].show();
        }
    };
    self.hideLocationMuseum = function () {
        for (var i in markerList) {
            markerList[i].hide();
        }
    };
    self.inputSearch = ko.observable("");
    self.museumList = ko.computed(function () {
        var searchName;
        searchName = locationMuseum.filter(function (e) {
            return e.title.indexOf(self.inputSearch()) >= 0
        });
        markerList.forEach(function (marker) {
            let findItem = searchName.find(function (item) {
                return item.title == marker.F.title;
            });
            if (findItem) {
                marker.show();
            } else {
                marker.hide()
            }
        });
        return searchName;
    });
    self.listcolors = ko.observable("black");
    self.overlist = function (data, event) {
        event.currentTarget.style.color = "white";
    };
    self.outlist = function (data, event) {
        event.currentTarget.style.color = "black";
    };
    self.clicklist = function (data) {
        var clickedMarker;
        // 遍历 markerList 数组
        markerList.forEach(function (marker) {
            // 暂时通过 title 来判断列表条目是否与某一个 marker 匹配
            if (data.title === marker.F.title) {
                clickedMarker = marker;
                clickedMarker.show();
            }
        });
        clickedMarker.setAnimation('AMAP_ANIMATION_BOUNCE');
        setTimeout(function () {
            clickedMarker.setAnimation('AMAP_ANIMATION_NONE');
        }, 5000);
        console.log(clickedMarker)
    }

};
var currentViewModel = new ViewModel();
ko.applyBindings(currentViewModel);

//console.log(typeof markerList);



