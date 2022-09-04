const fs = require('fs');
const { getRandomData } = require('../utils');

module.exports.getRandomUser = async(req, res) => {
   fs.readFile('users.json', (error, data) => {
    if(error){
        res.status(400).send({
            type: 'Error',
            message: 'Failed to get data'
        })
    }
    const jsonData = JSON.parse(data.toString());
    const randomData = getRandomData(jsonData)

    res.status(200).send({
        type: 'Success',
        message: 'Successfully got data',
        data: randomData
    })
   })
}

module.exports.getAllUsers = async(req, res) => {
    fs.readFile('users.json', (error, data) => {
        if(error){
            res.status(400).send({
                type: 'Error',
                message: 'Failed to get data',
            })
        }
        const {limit} = req.query;
        console.log('limit here',limit)
        const jsonData = JSON.parse(data.toString());

        res.status(200).send({
            type: 'Success',
            message: 'Successfully got data',
            data: jsonData
        })
    })
}

module.exports.saveAnUser = async (req, res) => {

    
    const newUser = req.body;
    if(!newUser.id) return;
    if(!newUser.gender) return;
    if(!newUser.name) return;
    if(!newUser.contact) return;
    if(!newUser.address) return;
    if(!newUser.photoUrl) return;
    let data = fs.readFileSync('test.json')
    data = JSON.parse(data.toString())
     data.push(newUser)
     fs.writeFile('test.json', JSON.stringify(data),  (error) => {
        if(error){
            res.status(400).send({
                type: 'Error',
                message: 'Failed to save user',
            })
        }
        
        res.status(200).send({
            type: 'Success',
            message: 'User saved successfully'
        })
    })
}


module.exports.updateAnUser = (req, res) => {
    const newUser = req.body;
    if(!newUser.id) return;
    if(!newUser.gender) return;
    if(!newUser.name) return;
    if(!newUser.contact) return;
    if(!newUser.address) return;
    if(!newUser.photoUrl) return;

    let data = fs.readFileSync('test.json')
    data = JSON.parse(data.toString())
    let user = data.find(user => user.id === newUser.id)
    user = {
        id: newUser.id || user.id,
        gender: newUser.gender || user.gender,
        name: newUser.name || user.name,
        contact: newUser.contact || user.contact,
        address: newUser.address || user.address,
    }
    console.log('an user updated')
    res.end()
}