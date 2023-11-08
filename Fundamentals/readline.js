/* Reading Input and Writing Output */

// Importing module
const readline = require("readline"); // module that reads user input

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

// Question Method
rl.question("Who is your favorite league champ?: ", (champName) => {
    console.log("Your Favorite Champion is "+champName);
    rl.close(); // closes the interface
})

// On Method
rl.on('close', () => {
    console.log("Thank you for wasting your time!");
    process.exit(0);
})