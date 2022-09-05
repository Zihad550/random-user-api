const fs = require('fs');
const { getRandomData } = require('../utils');

module.exports.getRandomUser = async(req, res) => {
   fs.readFile('users.json', (error, data) => {
    if(error){
        res.status(400).send({
            type: 'Error',
            message: 'Failed to get data'
        })
        return res.end()
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
            return res.end()
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
            return res.end()
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
    let updatedUser = data.find(user => user.id === newUser.id)
    if(!updatedUser) {
        res.status(400).send({
            type: 'Error', 
            message: 'User not found'
        })
       return res.end();
    }

    updatedUser = {
        id: newUser.id || updatedUser.id,
        gender: newUser.gender || updatedUser.gender,
        name: newUser.name || updatedUser.name,
        contact: newUser.contact || updatedUser.contact,
        address: newUser.address || updatedUser.address,
    }
    const unUpdatedUsers = data.filter(user => user.id !== newUser.id);
    unUpdatedUsers.push(updatedUser)

    fs.writeFile('test.json', JSON.stringify(unUpdatedUsers), (error) => {
        if(error){
            res.status(400).send({
                type: 'Error',
                message: 'Unable to update user',
            })
            return res.end()
        }
        res.status(200).send({
            type: 'Success',
            message: 'User updated successfully',
        })
    })
}