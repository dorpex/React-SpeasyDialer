const csv = require('csv-parser')
const fs = require('fs')
const data = fs.readFileSync('dataBaseJson/products.json');
const Product = require('../../../models/product')
let fullData = JSON.parse(data);
// fullData = fullData.filter(user => user.name != '')

fullData.forEach(productData => {
    console.log(productData);
    new Product({oldId : productData.id , name : productData.name , serialNumber : productData.serial_number}).save()
});