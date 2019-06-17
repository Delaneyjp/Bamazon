
//Tried unsuccessfuly to use .env file to hide db password
// require('dotenv').config()

// const db = require('db')
// db.connect({
//     password: process.env.DB_PASS
// })

// Pull in required dependencies
var inquirer = require('inquirer');
var mysql = require('mysql');

// Define the MySQL connection parameters
var connection = mysql.createConnection({
    host: 'localhost',
    port: 3306,

    // Your username
    user: 'root',

    // Your password 
    password: '', /*removed for viewers*/
    database: 'Bamazon'
});

// validateInput: only positive numbers can be entered
function validateInput(value) {
    var integer = Number.isInteger(parseFloat(value));
    var sign = Math.sign(value);

    if (integer && (sign === 1)) {
        return true;
    } else {
        return 'Only numbers 1+ allowed.';
    }
}

function promptUserPurchase() {

    // Prompt the user to select an item
    inquirer.prompt([
        {
            type: 'input',
            name: 'item_id',
            message: 'Please enter the Item ID which you would like to purchase.',
            validate: validateInput,
            filter: Number
        },
        {
            type: 'input',
            name: 'quantity',
            message: 'How many do you need?',
            validate: validateInput,
            filter: Number
        }
    ]).then(function (input) {

        var item = input.item_id;
        var quantity = input.quantity;

        // Query db to confirm that the entered item ID and quantity exists
        var queryStr = 'SELECT * FROM products WHERE ?';

        connection.query(queryStr, { item_id: item }, function (err, data) {
            if (err) throw err;

            if (data.length === 0) {
                console.log('ERROR: Invalid Item ID. Please select a valid Item ID.');
                displayInventory();

            } else {
                var productData = data[0];

                // Let Customer know product is available 
                if (quantity <= productData.stock_quantity) {
                    console.log('Perfect! The requested product is in stock! Placing order now!');

                    // Construct the updating query string that will subtract the number that was ordered, and update. 
                    var updateQueryStr = 'UPDATE products SET stock_quantity = ' + (productData.stock_quantity - quantity) + ' WHERE item_id = ' + item;

                    connection.query(updateQueryStr, function (err, data) {
                        if (err) throw err;

                        console.log('Success! Order Complete. \nTotal is $' + productData.price * quantity);
                        console.log("\n---------------------------------------------------------------------\n");

                        connection.end();
                    })
                    // Let Customer know product is not available 
                } else {
                    console.log('Oh No! The requested product quantity is not in stock... Please request new quantity.');
                    console.log("\n---------------------------------------------------------------------\n");

                    displayInventory();
                }
            }
        })
    })
}

// displayInventory: Shows current inventory
function displayInventory() {

    queryStr = 'SELECT * FROM products';

    connection.query(queryStr, function (err, data) {
        if (err) throw err;

        console.log('Current Available Inventory: ');
        console.log('---------------------\n');

        var strOut = '';
        for (var i = 0; i < data.length; i++) {
            strOut = '';
            strOut += 'Item ID: ' + data[i].item_id + '  //  ';
            strOut += 'Product Name: ' + data[i].product_name + '  //  ';
            strOut += 'Department: ' + data[i].department_name + '  //  ';
            strOut += 'Price: $' + data[i].price + '\n';

            console.log(strOut);
        }

        console.log("---------------------------------------------------------------------\n");

        //Prompt the customer for item and the quantity they want to purchase
        promptUserPurchase();
    })
}

// runBamazon: executes logic
function runBamazon() {

    displayInventory();
}

// Run the application logic
runBamazon();