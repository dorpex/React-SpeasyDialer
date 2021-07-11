const csv = require('csv-parser')
const fs = require('fs')
const data = fs.readFileSync('dataBaseJson/leads.json');
const SubLead = require('../../models/subLead')
const Product = require('../../models/product')
const List = require('../../models/list')
const Lead = require('../../models/lead')
const User = require('../../models/user')
let x = 0 
let y = 0
let leadsCounter 

// setInterval(() => {
//     Lead.find({}).then(e => {
//         console.log('number of leads - ',e.length);
//     })
// }, 30000);
SubLead.find({}).then(async e => {
    // console.log(e.length);
    console.log(e.length);
    for (const key in e) {
        let item = e[key]
        // x++ 
        await item.remove()
        // console.log(x);
    }
})




// Lead.find({}).then(async e => {
//     console.log(e);
//     for (const key in e) {
//         let item = e[key]
//         x++ 
//         await item.remove()
//         console.log(x);
//     }
//     console.log(e);
// })

// let testProducts , test2Products = {} , lists = new Array() , listsObject = {}, subLeadsList , subLeadsObject = new Object()
// let leadsList , leadsObject = new Object
// Product.find({})
// .then( allProducts => testProducts = allProducts )
// .then(async () => {
//     await Lead.findOne({}, {}, { sort: { 'created_at' : -1 } }, function(err, post) {
//         leadsCounter = post != null ? post.myId : 0
//         // console.log('post' , post);
//     });
//     testProducts.map((item) => {
//         test2Products[item.oldId] = item
//     })
//     lists = await List.find({})
//     lists.map((item) => {
//         listsObject[item.crmId] = item
//     })
// })
// .then( async () => {
//     let fullData = JSON.parse(data);
//     fullData = fullData.filter(( data , i ) => 100000 <= i <= 199999)
//     let allFullData = []
//     var i,j,chunk = 50000;
    
//     for (i=0,j=fullData.length; i<j; i+=chunk) {
//         console.log('start');
        
//         console.log('finish');
//         allFullData.push(fullData.slice(i,i+chunk));
//     }
//     for (const key in allFullData) {
//         fullDataParts = allFullData[key]
//         y++
//         await insertUsers(fullDataParts)
//         console.log('y - ' + y);
//     }
// })



// const insertUsers = async (fullData) => { 
//     let z = 0
//     subLeadsList = await SubLead.find({})
//     subLeadsList.map((item) => {
//         subLeadsObject[item.oldId] = item
//     })
//     leadsList = await Lead.find({})
//     leadsList.map((item) => {
//         leadsObject[`${item.email}-${item.phone}-${item.product}`] = item
//     })
//     return new Promise(async (resolve, reject) => {
//         let newSubLeadsArray = new Array()
//         let leadsArray = new Object()
//         for (const key in fullData) {
//             let subLeadData = fullData[key]
//             let product = test2Products[subLeadData.product]?._id
//             let list = listsObject[subLeadData.list_crm_id]?._id
//             let masterLead 
//             let newSubLead = subLeadsObject[subLeadData.id]
            
//             if (!newSubLead) {
//                 newSubLead = {}
                
//                 if ( leadsObject[`${subLeadData.email}-${subLeadData.phone}-${subLeadData.product}`]  != undefined ) {
//                     masterLead = leadsObject[`${subLeadData.email}-${subLeadData.phone}-${subLeadData.product}`]
//                     newSubLead.masterLeadMyId = leadsObject[`${subLeadData.email}-${subLeadData.phone}-${subLeadData.product}`].myId
//                 }

//                 if ( leadsArray[`${subLeadData.email}-${subLeadData.phone}-${subLeadData.product}`] != undefined) {
//                     masterLead =  leadsObject[`${subLeadData.email}-${subLeadData.phone}-${subLeadData.product}`]
//                 }

//                 if ( !masterLead  ) {
//                     leadsCounter++
//                     z++
//                     console.log(`${fullData.length} - ${z}`);
//                     newSubLead = {
//                         ...newSubLead,
//                         oldId : subLeadData.id,
//                         product : product ? product : null,
//                         masterLeadMyId : leadsCounter,
//                         list : list ? list._id : null
//                     }

//                     let newMasterLead = {
//                         product : product ? product : null,
//                         name : subLeadData.name,
//                         subLeadsOldIds : new Array(String(subLeadData.id)),
//                         hotlist : list ? list.type == 3 ? true : false : undefined,
//                         email : subLeadData.email,
//                         phone : subLeadData.phone,
//                         product : product ? product._id : null,
//                         status : subLeadData.status == 1 ? 'חדש' 
//                         : subLeadData.status == 2 ? 'אין מענה' 
//                         : subLeadData.status == 3 ? 'בהמתנה'
//                         : subLeadData.status == 4 ? 'בטיפול'
//                         : subLeadData.status == 5 ? 'בהמתנה אין מענה'
//                         : subLeadData.status == 6 ? 'בטיפול אין מענה'
//                         : subLeadData.status == 7 ? 'טופל אין עסקה'
//                         : subLeadData.status == 8 ? 'טופל subLeadData.idנסגרה עסקה'
//                         : subLeadData.status == 9 ? 'לא רלוונטי '
//                         : subLeadData.status == 10 ? 'לא תקין'
//                         : subLeadData.status == 11 ? 'נשלח וואטס אפ'
//                         : subLeadData.status == 12 ? 'כבר לקוח'
//                         : subLeadData.status == 13 ? 'שמירת מקום'
//                         : subLeadData.status == 14 ? 'אפ סייל'
//                         : subLeadData.status == 15 ? 'תקועה' : undefined,
//                         gold : subLeadData.gold == 0 ? false : true,
//                         firstSubLeadWithAdOldId : subLeadData.id,
//                         myId : leadsCounter
//                     }
                    
//                     leadsArray[`${subLeadData.email}-${subLeadData.phone}-${subLeadData.product}`] = newMasterLead
//                     x++
//                 }else{
//                     newSubLead = {
//                         ...newSubLead,
//                         oldId : subLeadData.id,
//                         product : product ? product : null,
//                         masterLeadMyId : masterLead.myId,
//                         list : list ? list : null
//                     }
//                     let newMasterLead = await Lead.findOne({'myId' : masterLead.myId})
//                     !newMasterLead.subLeadsOldIds.includes(subLeadData.id) ? newMasterLead.subLeadsOldIds.push(subLeadData.id) : undefined
//                     await newMasterLead.save()
//                 }
//                 newSubLeadsArray.push(newSubLead)
//             }

//         }

//         subLeadsObject = {}
//         subLeadsList = undefined
//         leadsList = undefined
//         leadsObject = {}
//         // console.log(Object.values(leadsArray));
//         await SubLead.insertMany(newSubLeadsArray, { ordered: false }).catch(e => console.log(e)) 
//         // Object.values(leadsArray).forEach((item) => {
//         //     let newItem = new Lead(item)
//         //     newItem.save()
//         // })
//         await Lead.insertMany(Object.values(leadsArray), { ordered: false }).catch(e => console.log(e))
//         // newSubLeadsArray.length > 0 ? new SubLead.insertMany(newSubLeadsArray, { ordered: false }) : undefined

//         resolve()
//     })
    
// }



// setInterval(() => {
//     Lead.find({}).then(e => {
//         console.log('number of leads - ',e.length);
//     })
// }, 30000);
// Lead.find({}).then(async e => {
//     console.log(e);
//     for (const key in e) {
//         let item = e[key]
//         x++ 
//         await item.remove()
//         console.log(x);
//     }
//     console.log(e);
// })




// Lead.find({}).then(async e => {
//     console.log(e);
//     for (const key in e) {
//         let item = e[key]
//         x++ 
//         await item.remove()
//         console.log(x);
//     }
//     console.log(e);
// })







// let testProducts , test2Products = {} , lists = new Array() , listsObject = {}, subLeadsList , subLeadsObject = new Object()
// let leadsList , leadsObject = new Object
// Product.find({})
// .then( allProducts => testProducts = allProducts )
// .then(async () => {
//     await Lead.findOne({}, {}, { sort: { 'created_at' : -1 } }, function(err, post) {
//         leadsCounter = post != null ? post.myId : 0
//         // console.log('post' , post);
//     });
//     testProducts.map((item) => {
//         test2Products[item.oldId] = item
//     })
//     lists = await List.find({})
//     lists.map((item) => {
//         listsObject[item.crmId] = item
//     })
// })
// .then( async () => {
//     let fullData = JSON.parse(data);
//     fullData = fullData.filter(( data , i ) => 0 <= i <= 100000)
//     let allFullData = []
//     var i,j,chunk = 50000;
    
//     for (i=0,j=fullData.length; i<j; i+=chunk) {;
//         allFullData.push(fullData.slice(i,i+chunk));
//     }
//     for (const key in allFullData) {
//         fullDataParts = allFullData[key]
//         y++
//         await insertUsers(fullDataParts)
//         console.log('y - ' + y);
//     }
// })



// const insertUsers = async (fullData) => { 
//     // subLeadsList = await SubLead.find({})
//     // subLeadsList.map((item) => {
//     //     subLeadsObject[item.oldId] = item
//     // })
//     // leadsList = await Lead.find({})
//     // leadsList.map((item) => {
//     //     leadsObject[`${item.email}-${item.phone}-${item.product}`] = item
//     // })
//     return new Promise(async (resolve, reject) => {
//         let newSubLeadsArray = new Array()
//         let leadsArray = new Object()
//         for (const key in fullData) {
//             let subLeadData = fullData[key]
//             let subLeadExists = await SubLead.findOne({ oldId : subLeadData.id })

//             if (!subLeadExists) {
//                 console.log(subLeadExists);
//                 let product = test2Products[subLeadData.product]?._id
//                 let list = listsObject[subLeadData.list_crm_id]?._id
//                 let masterLead = await Lead.findOne({email : subLeadData.email , phone : subLeadData.phone , product : subLeadData.product})
//                 // let newSubLead = subLeadsObject[subLeadData.id]
//                 let newSubLead = {}
                
//                 // if ( leadsObject[`${subLeadData.email}-${subLeadData.phone}-${subLeadData.product}`]  != undefined ) {
//                 //     masterLead = leadsObject[`${subLeadData.email}-${subLeadData.phone}-${subLeadData.product}`]
//                 //     newSubLead.masterLeadMyId = leadsObject[`${subLeadData.email}-${subLeadData.phone}-${subLeadData.product}`].myId
//                 // }

//                 // if ( leadsArray[`${subLeadData.email}-${subLeadData.phone}-${subLeadData.product}`] != undefined) {
//                 //     masterLead =  leadsObject[`${subLeadData.email}-${subLeadData.phone}-${subLeadData.product}`]
//                 // }

//                 if ( !masterLead  ) {
//                     leadsCounter++
//                     newSubLead = {
//                         ...newSubLead,
//                         oldId : subLeadData.id,
//                         product : product ? product : null,
//                         masterLeadMyId : leadsCounter,
//                         list : list ? list._id : null
//                     }

//                     let status 
//                     switch (subLeadData.status) {
//                         case 1:
//                             status = 'חדש' 
//                             break;
//                         case 2:
//                             status = 'אין מענה'
//                         break;
//                         case 3:
//                             status = 'בהמתנה'
//                             break;
//                         case 4:
//                             status = 'בטיפול'
//                         break;
//                         case 5:
//                             status = 'בהמתנה אין מענה'
//                             break;
//                         case 6:
//                             status = 'בטיפול אין מענה'
//                         break;
//                         case 7:
//                             status = 'טופל אין עסקה'
//                             break;
//                         case 8:
//                             status = 'טופל subLeadData.idנסגרה עסקה'
//                         break;
//                         case 9:
//                             status = 'לא רלוונטי'
//                             break;
//                         case 10:
//                             status = 'לא תקין'
//                         break;
//                         case 11:
//                             status = 'נשלח וואטס אפ'
//                             break;
//                         case 12:
//                             status = 'כבר לקוח'
//                         break;
//                         case 13:
//                             status = 'שמירת מקום'
//                             break;
//                         case 14:
//                             status = 'אפ סייל'
//                         break;
//                         case 15:
//                             status = 'תקועה'
//                             break;
//                         default:
//                             status = undefined
//                             break;
//                     }

//                     let newMasterLead = {
//                         product : product ? product : null,
//                         name : subLeadData.name,
//                         subLeadsOldIds : new Array(String(subLeadData.id)),
//                         hotlist : list ? list.type == 3 ? true : false : undefined,
//                         email : subLeadData.email,
//                         phone : subLeadData.phone,
//                         product : product ? product._id : null,
//                         status : status,
//                         gold : subLeadData.gold == 0 ? false : true,
//                         firstSubLeadWithAdOldId : subLeadData.id,
//                         myId : leadsCounter
//                     }
                    
//                     leadsArray[`${subLeadData.email}-${subLeadData.phone}-${subLeadData.product}`] = newMasterLead
//                     x++
//                 }else{
//                     newSubLead = {
//                         ...newSubLead,
//                         oldId : subLeadData.id,
//                         product : product ? product : null,
//                         masterLeadMyId : masterLead.myId,
//                         list : list ? list : null
//                     }
//                     let newMasterLead = await Lead.findOne({'myId' : masterLead.myId})
//                     !newMasterLead.subLeadsOldIds.includes(subLeadData.id) ? newMasterLead.subLeadsOldIds.push(subLeadData.id) : undefined
//                     await newMasterLead.save()
//                 }
//                 newSubLeadsArray.push(newSubLead)
//             }

//         }

//         subLeadsObject = {}
//         subLeadsList = undefined
//         leadsList = undefined
//         leadsObject = {}
//         // console.log(Object.values(leadsArray));
//         await SubLead.insertMany(newSubLeadsArray, { ordered: false }).catch(e => console.log(e)) 
//         // Object.values(leadsArray).forEach((item) => {
//         //     let newItem = new Lead(item)
//         //     newItem.save()
//         // })
//         await Lead.insertMany(Object.values(leadsArray), { ordered: false }).catch(e => console.log(e))
//         // newSubLeadsArray.length > 0 ? new SubLead.insertMany(newSubLeadsArray, { ordered: false }) : undefined

//         resolve()
//     })
    
// }

