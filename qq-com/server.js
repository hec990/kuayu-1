var http = require('http')
var fs = require('fs')
var url = require('url')
var port = process.argv[2]

if (!port) {
    console.log('��ָ���˿ںźò�����\nnode server.js 8888 ����������')
    process.exit(1)
}

var server = http.createServer(function (request, response) {
    var parsedUrl = url.parse(request.url, true)
    var pathWithQuery = request.url
    var queryString = ''
    if (pathWithQuery.indexOf('?') >= 0) { queryString = pathWithQuery.substring(pathWithQuery.indexOf('?')) }
    var path = parsedUrl.pathname
    var query = parsedUrl.query
    var method = request.method

    /******** �����￪ʼ�������治Ҫ�� ************/

    console.log('�и�ɵ�ӷ������������·��������ѯ������Ϊ��' + pathWithQuery)

    // ���ʸ�Ŀ¼����Ӧ������
    if (path === '/') {
        response.statusCode = 200
        response.setHeader('Content-Type', 'text/html;charset=utf-8')
        response.write(`
        <!DOCTYPE html>
        <head>
          <link rel="stylesheet" href="/x">
        </head>
        <body>
        <h1>�ҵĵ�һ��HTTP����</h1>
        <script src="/y"></script>
        </body>
        `)
        response.end()
    } else if (path === '/index.html') { // ���ʸ�Ŀ¼����ѯ����  ==> CSS code
        response.statusCode = 200 // ״̬��
        response.setHeader('Content-Type', 'text/html;charset=utf-8')
        response.write(fs.readFileSync("public/index.html"))
        response.end()
    } else if (path === '/friends.json') { // ���ʸ�Ŀ¼����ѯ����  ==> JS code
        response.statusCode = 200
        response.setHeader('Content-Type', 'text/json;charset=utf-8')
        response.write(fs.readFileSync("public/friends.json"))
        response.end()
    } else if (path === '/qq.js') { // ���ʸ�Ŀ¼����ѯ����  ==> JS code
        response.statusCode = 200
        response.setHeader('Content-Type', 'text/javascript;charset=utf-8')
        response.write(fs.readFileSync("public/qq.js"))
        response.end()
    } else {
        response.statusCode = 404
        response.setHeader('Content-Type', 'text/html;charset=utf-8')
        response.write(`�������·�������ڶ�Ӧ������`)
        response.end()
    }

    /******** ������������治Ҫ�� ************/
})

server.listen(port)
console.log('���� ' + port + ' �ɹ�\n�����ڿ���ת��720��Ȼ���õ緹�Ҵ� http://localhost:' + port)