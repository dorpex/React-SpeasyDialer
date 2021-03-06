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
// Lead.collection.drop()
Lead.find({})
.then(async e => {
    console.log(e.length);
    // for (const key in e) {
    //     e[key].remove()
    // }
})

// SubLead.find({})
// .then(async e => {
//     console.log('SubLead - ' , e.length);
//     for (const key in e) {
//         e[key].remove()
//     }
// })

const startSync = async () => {
    let fullData = JSON.parse(data);


    var i,j,chunk = 10;
    
    leadsCounter = await Lead.find({})
    .then(e => {
        return e ? e.length : 0
    })
     for (i=0,j=fullData.length; i<j; i+=chunk) {
       newInsert(fullData.slice(i,i+chunk))
    }
    // newInsert(fullData)
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
                        status = '??????' 
                        break;
                    case 2:
                        status = '?????? ????????'
                    break;
                    case 3:
                        status = '????????????'
                        break;
                    case 4:
                        status = '????????????'
                    break;
                    case 5:
                        status = '???????????? ?????? ????????'
                        break;
                    case 6:
                        status = '???????????? ?????? ????????'
                    break;
                    case 7:
                        status = '???????? ?????? ????????'
                        break;
                    case 8:
                        status = '???????? subLeadData.id?????????? ????????'
                    break;
                    case 9:
                        status = '???? ??????????????'
                        break;
                    case 10:
                        status = '???? ????????'
                    break;
                    case 11:
                        status = '???????? ?????????? ????'
                        break;
                    case 12:
                        status = '?????? ????????'
                    break;
                    case 13:
                        status = '?????????? ????????'
                        break;
                    case 14:
                        status = '???? ????????'
                    break;
                    case 15:
                        status = '??????????'
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
let x = 0
const newInsert = async (fullData) => {
    for (const key in fullData) {
        let lead = fullData[key]
        
        if ((lead.product != null && lead.product != '') && ( ( lead.phone != null && lead.phone != '' ) || ( lead.email != null && lead.email != '' ) ) ) {
            var start = new Date().getTime();
            let product = await Product.findOne({ oldId : lead.product }).select('_id')
            product = product ? product._id : null

            let list = await List.findOne({crm_id : lead.list_crm_id}).select('_id')
            list = list ? list._id : null
            let status = await getStatus(lead.status)

            await Lead.findOneAndUpdate(
            // filter
            {
                myId : `${lead.product}${lead.phone}${lead.email}`
            },
            // update
            {
                product : product ? product : null,
                name : lead.name,
                hotlist : list ? list.type == 3 ? true : false : undefined,
                email : lead.email,
                phone : lead.phone == '' ? null : lead.phone,
                product : product ? product._id : null,
                status : this.status == '???????? ?????????? ????????' ? '???????? ?????????? ????????' : status,
                gold : lead.gold == 0 ? false : true,
                lastLeadDate : moment(lead.created_at),
                $addToSet : {'subLeads' : { list , createdAt : lead.created_at }},
                myId : `${lead.product}${lead.phone}${lead.email}`
            }, 
            // settings
            {
                new: true,
                upsert: true // Make this update into an upsert
            })
            var end = new Date().getTime();
            var time = end - start;
            x++
            console.log(`${time} - ${x}`);
        }
    }
    
}

const getStatus = (status) => {


    let newStatus = new String()

    switch (Number(status)) {
        case 1:
            newStatus = '??????' 
            break;
        case 2:
            newStatus = '?????? ????????'
        break;
        case 3:
            newStatus = '????????????'
            break;
        case 4:
            newStatus = '????????????'
        break;
        case 5:
            newStatus = '???????????? ?????? ????????'
            break;
        case 6:
            newStatus = '???????????? ?????? ????????'
        break;
        case 7:
            newStatus = '???????? ?????? ????????'
            break;
        case 8:
            newStatus = '???????? ?????????? ????????'
        break;
        case 9:
            newStatus = '???? ??????????????'
            break;
        case 10:
            newStatus = '???? ????????'
        break;
        case 11:
            newStatus = '???????? ?????????? ????'
            break;
        case 12:
            newStatus = '?????? ????????'
        break;
        case 13:
            newStatus = '?????????? ????????'
            break;
        case 14:
            newStatus = '???? ????????'
        break;
        case 15:
            newStatus = '??????????'
            break;
        default:
            newStatus = undefined
            break;
    }
    return newStatus
}
startSync()