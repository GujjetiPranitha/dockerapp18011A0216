var items = require('./itemArray.js')

console.log(items.itemArray)

const http = require('http')

const server = http.createServer(function(req, res) {
    // console.log(req.url)
    if(req.url === '/getItems' && req.method === 'GET') {
        res.statusCode=200;
        res.write(JSON.stringify(items.itemArray));
        res.end();
    }
    else if(req.url === '/addItem' && req.method === 'POST') {
        req.on('data', d => {
            items.itemArray.push(JSON.parse(d))
            // console.log(d.toString())
        })
        res.write("Item Added")
        res.statusCode=200;
        res.end();
    } 
    else if(req.url === '/uploadFile' && req.method === 'PUT') {
        res.write("File is being upload to the server using the put method")
        res.statusCode=200;
        res.end();
    }   
    else if(req.url === '/updateItem' && req.method === 'PATCH') {
        req.on('data', d => {
            var itemToUpdate = JSON.parse(d)
            for(let x of items.itemArray) {
                if(x.itemName === itemToUpdate.itemName) {
                    items.itemArray = items.itemArray.filter((e)=> {
                        e.itemName === itemToUpdate.itemName
                    })
                    items.itemArray.push(itemToUpdate);
                }
            }
        })
        res.write("Recorded Updated.!")
        res.end();
    }
    else if(req.url === '/deleteItem' && req.method === 'DELETE') {
        res.statusCode = 200;
        res.write("Item Deleted.!")
        res.end();
    }
    else {
        res.statusCode=404;
        res.write("Invalid request.!")
        res.end();
    }

})

server.listen(5001, function() {
    console.log("Server is up & running on port 5001")
})