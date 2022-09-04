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

    let data = fs.readFileSync('test.json')
    data = JSON.parse(data.toString())
    const newUser = req.body;
    if(!newUser.id) return;
    if(!newUser.gender) return;
    if(!newUser.name) return;
    if(!newUser.contact) return;
    if(!newUser.address) return;
    if(!newUser.photoUrl) return;
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