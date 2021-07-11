const csv = require('csv-parser')
const fs = require('fs')
const data = fs.readFileSync('dataBaseJson/lists.json');
const List = require('../../models/list')
const Product = require('../../models/product')
let fullData = JSON.parse(data);
// console.log(fullData);
// fullData = fullData.filter(user => user.name != '')
let x = 0
fullData.forEach(async listData => {
    x++
    let productId = await Product.findOne({oldId : listData.product_id}).select('_id')
    let type = listData.type === '1' ? 'normal' : listData.type === '2' ? 'sold' : listData.type === '3' ? 'hot list' : null  
    let status = listData.status === '1' ? 'send' : 'dont send' 
    if (productId) {
        productId = productId._id
    }
    new List({
        oldId : listData.id,
        name : listData.name,
        type : type,
        crmId : listData.crm_id,
        product : productId,
        status : status
    }).save()
    console.log(`${fullData.length} - ${x}`);

    // new List({old_id : listData.id , name : listData.name , type , status  , product : productId , crm_id : listData.crm_id }).save()
});