const SubLead = require('../../../models/subLead')
const Lead = require('../../../models/lead')


Lead.find({$where : 'this.subLeadsOldIds.length > 0 && ( !this.subLeads || this.subLeads.length == 0 )'}).then( async e => {
    console.log(e.length);
    for (const key in e) {
        let doc = e[key] 
        let subLeads = new Array()
        for (const key in doc.subLeadsOldIds) {
            let subLeadOldId = doc.subLeadsOldIds[key]
            let subLead = await SubLead.findOne({ $and : [ { oldId : subLeadOldId } , { $where : 'this.masterLead == undefined' }] })
            subLead.masterLead = doc._id
            await subLead.save()
            subLeads.push(String(subLead._id))
        }
        doc.subLeads = subLeads
        await doc.save()
    }    
})
