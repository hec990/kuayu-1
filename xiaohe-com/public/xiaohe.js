const request = new XMLHttpRequest();
request.open("GET", "http://qq.com:8888/friends.json");
request.onreadystatechange = () => {
    // 如果判断通过表示请求成功
    if (request.readyState === 4 && request.status === 200) {
        // 打印数据
        console.log(request.response)
    }
}

request.send()