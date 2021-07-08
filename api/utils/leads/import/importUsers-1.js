const csv = require('csv-parser')
const fs = require('fs')
const data = fs.readFileSync('dataBaseJson/agents.json');
const User = require('../../../models/user')
let fullData = JSON.parse(data);
fullData = fullData.filter(user => user.name != '')

fullData.forEach(userData => {
    new User({
        oldId : userData.id,
        name : userData.name,
        email : userData.email,
        password : '1234',
        status : false,
        rank : userData.rank == 1 ? 'נציג'
        : userData.rank == 2 ? 'נציג'
        : userData.rank == 3 ? 'משווק'
        : userData.rank == 4 ? 'מנהל מוקד' 
        : userData.rank == 5 ? 'מנהל' : undefined,
        published : userData.published == 1 ? true : false
    }).save()
});