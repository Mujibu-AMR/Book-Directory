var xhr = new XMLHttpRequest();

bookTable = document.getElementById('book-table');
radio_elements = document.getElementsByName('options');

var bookId, bookName, authorName;

sts = 0;

response = ""
url      = "http://www.book_directory_server.com:8081/";

function requestHandle() {
    bookId = document.getElementById('book_id-Text');
    bookName = document.getElementById('book_name-Text');
    authorName = document.getElementById('book_author-Text');

    if(radio_elements[0].checked)
        postRequest();

    else if(radio_elements[1].checked)
        putRequest();

    else if(radio_elements[2].checked)
        deleteRequest();

    bookId.value = "";
    bookName.value = "";
    authorName.value = "";
}

//Add New Row to Table;
function addRow(book) {
    row = document.createElement('tr');
    id = document.createElement('td');
    author = document.createElement('td');
    bookTitle = document.createElement('td');

    id.innerHTML = book['id'];
    author.innerHTML = book['authors'];
    bookTitle.innerHTML = book['name'];

    row.appendChild(id);
    row.appendChild(bookTitle);
    row.appendChild(author);
    bookTable.appendChild(row);
}

//To Get Book List;
function getRequest() {
    xhr.open("GET", url, true);
    xhr.onreadystatechange = function() { 
        if (this.readyState == 4) {
            if(sts == 1)
                return 0;
            else {
                sts = 1;
                response = JSON.parse(xhr.responseText);
                for(ele in response)
                  addRow(response[ele]);    
            }
        }    
    }
    xhr.send();
}

//To Add New Book;
function postRequest() {
    queryString = "bookname=" + bookName.value+ "&authorname="+authorName.value; 
    console.log(queryString)
    xhr.open("POST", url);
    xhr.onreadystatechange = function() { 
        if (this.readyState == 4)
            addRow(JSON.parse(xhr.responseText));    
    }
    xhr.send(queryString);
}

//To Modify Existing Book;
function putRequest() {
    queryString = "bookid=" + bookId.value + "&bookname=" + bookName.value + "&authorname=" + authorName.value;
    console.log(queryString)
    xhr.open("PUT", url);
    xhr.onreadystatechange = function() { 
        if (this.readyState == 4) {
            if(xhr.responseText != "404"){
            response = JSON.parse(xhr.responseText);
            for(i = 1; i < bookTable.rows.length; i++){
                book = bookTable.rows[i];
                if(parseInt(book.cells[0].innerText) == parseInt(response['id'])) {
                    if(response['name']) 
                        book.cells[1].innerText = response['name'];
                    if(response['authors']) 
                         book.cells[2].innerText = response['authors'];
                break;
                    }
               }
            }
        }
        console.log(response);    
    }
    xhr.send(queryString);
}

//To Delete a Book;
function deleteRequest() {
    queryString = "bookid=" + bookId.value;
    xhr.open("DELETE", url);
    xhr.onreadystatechange = function() { 
        if (this.readyState == 4) {
            if(xhr.responseText != "404") {
            response = JSON.parse(xhr.responseText);
            for(i = 1; i < bookTable.rows.length; i++){
                book = bookTable.rows[i];
                if(parseInt(book.cells[0].innerText) == response)
                    bookTable.deleteRow(book.rowIndex);
               }
            }
         }      
        }
    xhr.send(queryString);
}
