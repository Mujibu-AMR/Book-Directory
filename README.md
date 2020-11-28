# Book Directory
This is a simple web application with REST API.

## Requirements
- Node.js
- JS enabled browser

## Usage
### For Linux
1. Open up two terminals. Navigate to folder where the files are located.
2. On first terminal, type  **node Server.js**, *Server is running* will be displayed.
3. Now go to second terminal.
4. Type **chromium - -allow-file-access-from-files**
5. Application will be opened, now press *ctrl + o*, navigate to folder and open **index.html**

### For Windows
1. Open up two cmd. Navigate to folder where the files are located.
2. On first cmd, type  **node Server.js**, *Server is running* will be displayed.
3. Now go to second terminal.
4. Type **C:\Program Files\Google\Chrome\Application\chrome.exe - -allow-file-access-from-files**
5. Application will be opened, now press *ctrl + o*, navigate to folder and open **index.html**

## But why??
For those are wondering why we need to open browser like this, it is because of something called **CORS**. Because of that I wasted a week. But learnt alot during that time. So, what it is?
*Cross-Origin Resource Sharing* is the part of HTTP header which allows you to request resource from other domain or other origin. Here, our domain is *Book-Directory/index.html* but our server has *origin* of *files*. The origin between server and the website differs. Now,error will occur when you try to request and browser will not allow you to access resources from different origin for security purpose. That's why we told the browser to allow access from files in command line. But there is alot to learn. I encourage you to research about it.

## REST API
It consist of four APIs. 

1. GET
2. POST
3. PUT
4. DELETE

**GET** - With this API we request the resources from server.

**POST** - With this, we post our data to server.

**PUT** - It can be used as alternative for POST, but here we use it to update or modify existing content in server. 

**DELETE** - With this, we delete a specific resource in server.

## Notes
I only tested it in **Chromium** in my **Linux** machine. 

## Contributions
Suggestions, recommendations are always welcomed. So, feel free to reach me out.

email - amr15336@gmail.com 