const csv = require('csv-parser')
const fs = require('fs')
const data = fs.readFileSync('dataBaseJson/products.json');
const Product = require('../../models/product')
let fullData = JSON.parse(data);
// fullData = fullData.filter(user => user.name != '')
let x = 0
fullData.forEach(productData => {
    x++
    console.log(productData);
    new Product({oldId : productData.id , name : productData.name , serialNumber : productData.serial_number}).save()
    console.log(`${fullData.length} - ${x}`);
});