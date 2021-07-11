const csv = require('csv-parser')
const fs = require('fs')
const data = fs.readFileSync('dataBaseJson/leads.json');
const SubLead = require('../../models/subLead')
const Product = require('../../models/product')
const List = require('../../models/list')
const Lead = require('../../models/lead')
const moment = require('moment')
const User = require('../../models/user')
let leadsCounter 
let masterLeadObject = new Object()
let subLeadObject = new Object()

// Lead.find({})
// .then(async e => {
//     console.log(e.length);
//     for (const key in e) {
//         e[key].remove()
//     }
// })

// SubLead.find({})
// .then(async e => {
//     console.log('SubLead - ' , e.length);
//     for (const key in e) {
//         e[key].remove()
//     }
// })

const startSync = async () => {
    let fullData = JSON.parse(data);


    var i,j,chunk = 1000;
    
    leadsCounter = await Lead.find({})
    .then(e => {
        return e ? e.length : 0
    })
    //  for (i=0,j=fullData.length; i<j; i+=chunk) {
    //     await insertUsers(fullData.slice(i,i+chunk))
    // }
    insertUsers(fullData)
}

const insertUsers = (fullData) => { 
    return new Promise(async (resolve, reject) => {
        let x = 0 
        for (const key in fullData) {
            let subLeadData = fullData[key]
            var start = new Date().getTime();
            
            // let masterLead = await Lead.findOne({myId : `${subLeadData.phone}-${subLeadData.email}-${subLeadData.product}`})
            let masterLead = masterLeadObject[`${subLeadData.phone}-${subLeadData.email}-${subLeadData.product}`]
            if (!masterLead) {
                let product = await Product.findOne({ oldId : subLeadData.product }).select('_id')
                product = product ? product._id : undefined
                
                let list = await List.findOne({crm_id : subLeadData.list_crm_id}).select('_id')
                list = list ? list._id : null
                
                leadsCounter++

                let status 
                switch (subLeadData.status) {
                    case 1:
                        status = 'חדש' 
                        break;
                    case 2:
                        status = 'אין מענה'
                    break;
                    case 3:
                        status = 'בהמתנה'
                        break;
                    case 4:
                        status = 'בטיפול'
                    break;
                    case 5:
                        status = 'בהמתנה אין מענה'
                        break;
                    case 6:
                        status = 'בטיפול אין מענה'
                    break;
                    case 7:
                        status = 'טופל אין עסקה'
                        break;
                    case 8:
                        status = 'טופל subLeadData.idנסגרה עסקה'
                    break;
                    case 9:
                        status = 'לא רלוונטי'
                        break;
                    case 10:
                        status = 'לא תקין'
                    break;
                    case 11:
                        status = 'נשלח וואטס אפ'
                        break;
                    case 12:
                        status = 'כבר לקוח'
                    break;
                    case 13:
                        status = 'שמירת מקום'
                        break;
                    case 14:
                        status = 'אפ סייל'
                    break;
                    case 15:
                        status = 'תקועה'
                        break;
                    default:
                        status = undefined
                        break;
                }

                let newMasterLead = {
                    product : product ? product : null,
                    name : subLeadData.name,
                    subLeadsOldIds : new Array(String(subLeadData.id)),
                    hotlist : list ? list.type == 3 ? true : false : undefined,
                    email : subLeadData.email,
                    phone : subLeadData.phone,
                    product : product ? product._id : null,
                    status : status,
                    gold : subLeadData.gold == 0 ? false : true,
                    firstSubLeadWithAdOldId : subLeadData.id,
                    myId : leadsCounter
                }
                // await new Lead(newMasterLead).save()
                masterLeadObject[`${subLeadData.phone}-${subLeadData.email}-${subLeadData.product}`] = newMasterLead
            }else{
                // console.log(masterLead);
                if (!masterLead.subLeadsOldIds.includes(String(subLeadData.id))) {
                    masterLead.subLeadsOldIds.push(String(subLeadData.id))
                    // await masterLead.save()
                }
            }
            var end = new Date().getTime();
            var time = end - start;
            x++
            console.log(`${time} - ${x}`);
        }
        await Lead.insertMany(Object.values(masterLeadObject))
        resolve()
    })
    
}

startSync()