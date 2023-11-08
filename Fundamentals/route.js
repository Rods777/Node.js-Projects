const http = require("http");
const fs = require("fs");
const url = require("url");

const html = fs.readFileSync('Template/index.html', 'utf-8');
let products = JSON.parse(fs.readFileSync('Data/products.json', 'utf-8')); // Parsing JSON string into Javascript Object
let productListHTML = fs.readFileSync('Template/productList.html', 'utf-8');
let productDetailsHTML = fs.readFileSync('Template/productDetails.html', 'utf-8');

// Reusable Function that replace html contents to JSON data
function replaceHtml(template, product){
    let output = template.replace('{{%IMAGE%}}', product.productImage); // replacing the placeholder in html with the data from JSON  
    output = output.replace('{{%NAME%}}', product.name);
    output = output.replace('{{%MODELNAME%}}', product.modeName);
    output = output.replace('{{%MODELNUMBER%}}', product.modelNumber);
    output = output.replace('{{%SIZE%}}', product.size);
    output = output.replace('{{%CAMERA%}}', product.camera);
    output = output.replace('{{%PRICE%}}', product.price);
    output = output.replace('{{%COLOR%}}', product.color);
    output = output.replace('{{%ID%}}', product.id);
    output = output.replace('{{%ROM%}}', product.ROM);
    output = output.replace('{{%DESC%}}', product.Description);

    return output;
};

// Creates a server
const server = http.createServer((request, response) =>{
    let {query, pathname: path} = url.parse(request.url, true); // Parsing Query string from URL
    // let path = request.url; // Assigning route
    // console.log(path); 


    if(path === '/' || path.toLocaleLowerCase() === '/home'){
        response.writeHead(200, {'Content-Type': 'text/html'}); // Setting Header response
        response.end(html.replace('{{%CONTENT%}}', 'This is the Home Page')); // Sending an HTML response
    }
    else if(path.toLocaleLowerCase() === '/about'){
        response.writeHead(200, {'Content-Type': 'text/html'});
        response.end(html.replace('{{%CONTENT%}}', 'This is the About Page'));
    }
    else if(path.toLocaleLowerCase() === '/products'){
        let productHtmlArray = products.map((prod) => { // Loops an array data in JSON to display in HTML
            return replaceHtml(productListHTML, prod);
        })
        // Check if the query object has id
        if(!query.id){
            let productDisplay = html.replace('{{%CONTENT%}}', productHtmlArray.join(',')); // Display and Removes the ',' within productDataArray
            response.writeHead(200, {'Content-Type': 'text/html'});
            response.end(productDisplay);
        }else{
            let productID = products[query.id]; // Get the id property from parsed JSON file
            let productDetailsDisplay = replaceHtml(productDetailsHTML, productID); // Replacing the placeholders data based on id
            response.end(html.replace('{{%CONTENT%}}', productDetailsDisplay)); // Displays the product based on id query string
        }
    }
    else if(path.toLocaleLowerCase() === '/contacts'){
        response.writeHead(200, {'Content-Type': 'text/html'});
        response.end(html.replace('{{%CONTENT%}}', 'This is the Contacts Page'));
    }
    else{
        response.writeHead(404, {'Content-Type': 'text/html'});
        response.end(html.replace('{{%CONTENT%}}', "Error 404: Page Not Found"))
    }
});

// Starts a server
server.listen(8000, "127.0.0.1", () => {
    console.log("Web Server has started and running on port 8000");
});