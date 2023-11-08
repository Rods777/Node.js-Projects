/* Reading and Writing to a Files */

// Importing module
// const fs = require("fs");

/***** Read and Write File Synchronously *****/

/* let textIn = fs.readFileSync('./Files/input.txt', 'utf-8');
console.log(textIn);

let content = `Data read from input.txt: ${textIn} \nDate Created: ${new Date()}`
fs.writeFileSync('./Files/output.txt', content); */


/***** Read File Asynchronously *****/

// Ex. Call Backhell

/* fs.readFile('./Files/start.txt', 'utf-8', (error1, data1) => {
    console.log(data1);
    fs.readFile(`./Files/${data1}.txt`, 'utf-8', (error2, data2) => {
        console.log(data2);
        fs.readFile('./Files/append.txt', 'utf-8', (error3, data3) => {
            console.log(data3);
            fs.writeFile('./Files/output.txt', `${data1}\n\n${data2}\n\n${data3}\n\nDate Created: ${new Date()}`, () => {
                console.log("File writen Successfully!");
            });
        });
    })
});
console.log("Reading File....."); */
