
const http = require("http");
const { parse } = require("querystring");

book1 = { id : 0,  name : 'Brief History of Time', authors : 'Stephen Hawking'};
book2 = { id : 1,  name : 'IT', authors : 'Stephen King'};

book_id = 2;

var bookList = new Array(book1, book2);

body = ""
parsed = ""

http.createServer(function(req, res) { 
    console.log("URL: " + req.url)
    console.log("Method: "+req.method)
    console.log("Headers: ")
    console.log(req.headers)

    res.setHeader('Access-Control-Allow-Origin', "file://");
    res.setHeader('Access-Control-Allow-Headers', '*');
    res.setHeader("Access-Control-Allow-Methods", "POST, GET, PUT, DELETE");
    res.setHeader("Access-Origin-Allow-Headers", "content-type");
    res.setHeader('Content-Type', 'text/plain');
    res.setHeader("Origin", "http://www.book_directory_server.com:8081");
    res.writeHead(200);

    if(req.method == 'GET')
        getMethod(req, res);
   
    else if(req.method == 'POST') 
        postMethod(req, res);
    
    else if(req.method == 'PUT' || req.method == 'OPTIONS') 
        putMethod(req, res);

    else if(req.method == 'DELETE') 
        deleteMethod(req, res);
    

    console.log("\n\n")
    body = ""
    parsed = ""
}).listen(8081);

function getMethod(request, response) {
    request.on('data', chunk => {
        body += (chunk);
        parsed = parse(body);

    });
    
    //Parsing to JSON
    request.on('end', () => {
    });
    response.write(JSON.stringify(bookList));
    response.end();
}

function postMethod(request, response) {
    request.on('data', chunk => {
        body += (chunk);
        parsed = parse(body);

    });
    //Parsing to JSON
    request.on('end', () => {
        if(parsed['bookname'] == "" || parsed['authorname'] == "")
            return
        bookList[book_id] = {id: book_id, name : parsed['bookname'], authors : parsed['authorname'] };        response.write(JSON.stringify(bookList[book_id]));
        response.end();
        book_id += 1;
    });    
}

function putMethod(request, response) {
    request.on('data', chunk => {
        body += (chunk);
        parsed = parse(body);

    });

    //Parsing to JSON
    request.on('end', () => {
        flag = 1;
        for(i=0; i < bookList.length; i++) {
            book = bookList[i];
            if(parsed['bookid'] == book['id']) {
                if(parsed['bookname'] != "")
                    book['name'] = parsed['bookname'];

                 if(parsed['authorname'] != "")
                    book['authors'] = parsed['authorname'];

                flag = 0;
                response.write(JSON.stringify(book))
                break;
            }
        }
        if(flag) 
            response.write("404");            
        response.end()
    });    
}

function  deleteMethod(request, response) {
    request.on('data', chunk => {
        body += (chunk);
        parsed = parse(body);
    });
    request.on('end', () => {
        if(parsed['bookid'] in bookList) {
            bookList.splice(parsed['bookid'], 1);
            response.write(JSON.stringify(parsed['bookid']));
        }
        response.end();
    });    
}

console.log('Sever Running')
