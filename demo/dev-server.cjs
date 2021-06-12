var http = require('http');
var fs = require('fs');
var path = require('path');

http.createServer(function (request, response) {
    console.log(request.url);

    var filePath = '.' + request.url;
    filePath = path.normalize(filePath);
    try
    {   var files= fs.readdirSync(filePath);
        response.writeHead(200, { 'Content-Type': 'text/html' });

        response.end( `<base href="${filePath}/" />`
        + files.map(file => `<a href="${file}">${file}</a><br/>`).join('\n') );
        return;
    }catch( ex ){}

    var extname = path.extname(filePath);
    var ext2type =
    {   '.xhtml': 'application/xhtml+xml'
    ,   '.html': 'text/html'
    ,   '.js':  'text/javascript'
    ,   '.css': 'text/css'
    ,   '.xml': 'application/xml'
    ,   '.svg': 'image/svg+xml'
    ,   '.json': 'application/json'
    ,   '.png': 'image/png'
    ,   '.jpg': 'image/jpg'
    ,   '.wav': 'audio/wav'
    };
    var contentType = ext2type[extname] || 'text/html'
    fs.readFile(filePath, function(error, content)
    {   if (error)
        {   if( error.code == 'ENOENT')
            {       response.writeHead(404, { 'Content-Type': contentType });
                    response.end(filePath+" not found");
            }else
            {   response.writeHead(500);
                response.end('Sorry, check with the site admin for error: '+error.code+' ..\n');
                response.end();
            }
        }else
        {   response.writeHead(200, { 'Content-Type': contentType });
            response.end(content, 'utf-8');
        }
    });

}).listen(8080);
console.log('Server running. Demo at http://127.0.0.1:8080/demo/index.html');