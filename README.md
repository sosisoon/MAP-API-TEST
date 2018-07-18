# MAP-API-TEST
1、高德地图&百度地图API测试

2、请打开链接预览 https://sosisoon.github.io/MAP-API-TEST/

3、重点提示：
            --fetch（corsProxy+"url",{...}).then(()=>{}).catch(()=>{})
            --跨域请求：var corsProxy = 'https://cors-anywhere.herokuapp.com/'; 把corsProxy加在fetch的url前
            --升级为安全的https：`<meta http-equiv="Content-Security-Policy" content="upgrade-insecure-requests">`
            可以在相应的页面的<head>里加上这句代码，意思是自动将http的不安全请求升级为https,如此在github上部署web就可以正常显示web跨域引入http的资源