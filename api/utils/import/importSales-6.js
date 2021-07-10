const csv = require('csv-parser')
const fs = require('fs')
const data = fs.readFileSync('dataBaseJson/sales.json');
const Sale = require('../../../models/sale')
const Product = require('../../../models/product');
const Lead = require('../../../models/lead');
const User = require('../../../models/user');

let fullData = JSON.parse(data);
let x = 1

const setSale = async  (saleData) => {
        try {
            x++
            let product = await Product.findOne({ name : saleData.product })
            product = product != null ? product._id : null
        
            let lead = await  Lead.findOne({ $and : [
                { $or : [ { phone : saleData.lead_phone } , { email : saleData.lead_email } ] },
                { product : product }
            ] }).select('_id')
            lead = lead != null ? lead._id : null
            console.log(x);
        
            let agent = await User.findOne({oldId : saleData.agent_id})
            agent = agent != null ? agent._id : null
            
            await new Sale({
                oldId : saleData.id,
                product : product,
                lead : lead,
                agent :agent,
                profit : saleData.profit,
                method : saleData.method,
                token : saleData.token,
                receiptNumber : saleData.receiptNumber,
                type : saleData.type
        
            }).save()
        } catch (error) {
            
        }
        
}
const setSales = async  () => {
    var i,j,temparray,chunk = 1000;
    for (i=0,j=fullData.length; i<j; i+=chunk) {
        temparray = fullData.slice(i,i+chunk);
        for (const key in temparray) {
            let saleData = temparray[key]
            await setSale(saleData)
        }
        // do whatever
    }
}


setSales()
