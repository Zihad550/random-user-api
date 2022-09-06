const fs = require('fs');
const { getRandomData } = require('../utils');

module.exports.getRandomUser = async(req, res) => {
   fs.readFile('users.json', (error, data) => {
    if(error){
       return res.status(400).send({
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
          return res.status(400).send({
                type: 'Error',
                message: 'Failed to get data',
            })
        }
        const {limit} = req.query;
        const jsonData = JSON.parse(data.toString()).slice(0, limit);

        res.status(200).send({
            type: 'Success',
            message: 'Successfully got data',
            data: jsonData
        })
    })
}

module.exports.saveAnUser = async (req, res) => {
    const newUser = req.body;
    if(!newUser.id) return res.status(400).send({
        type: 'Error',
        message: 'Id not provided'
    });
    if(!newUser.gender) return res.status(400).send({
        type: 'Error',
        message: 'Gender not provided'
    });
    if(!newUser.name) return res.status(400).send({
        type: 'Error',
        message: 'Name not provided'
    });
    if(!newUser.contact) return res.status(400).send({
        type: 'Error',
        message: 'Contact not provided'
    });
    if(!newUser.address) return res.status(400).send({
        type: 'Error',
        message: 'Address not provided'
    });
    if(!newUser.photoUrl) return res.status(400).send({
        type: 'Error',
        message: 'Photo url not provided'
    });

    let data = fs.readFileSync('users.json')
    data = JSON.parse(data.toString())
     data.push(newUser)
     fs.writeFile('users.json', JSON.stringify(data),  (error) => {
        if(error){
           return res.status(400).send({
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

    if(!newUser.id || typeof id !== 'string') return res.status(400).send({
        type: 'Error',
        message: 'Invalid id'
    });
   
    let data = fs.readFileSync('users.json')
    data = JSON.parse(data.toString())
    let updatedUser = data.find(user => user.id === newUser.id)
    if(!updatedUser) {
       return res.status(400).send({
            type: 'Error', 
            message: 'User not found'
        })
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

    fs.writeFile('users.json', JSON.stringify(unUpdatedUsers), (error) => {
        if(error){
           return res.status(400).send({
                type: 'Error',
                message: 'Unable to update user',
            })
        }
        res.status(200).send({
            type: 'Success',
            message: 'User updated successfully',
        })
    })
}

module.exports.updateMultipleUsers = (req, res) => {
    const {userIds, field, value} = req.body;
    
    // get all users
    let users = JSON.parse(fs.readFileSync('users.json').toString())

    // update users
    const updatedUsers = users.map(user => {
        userIds.find(id => {
            if(user.id === id) {
                return user[field] = value
            }
        })
        return user;
    }
       
    )
    fs.writeFile('users.json', JSON.stringify(updatedUsers), (error) => {
        if(error){
            return res.status(400).send({
                type: 'Error',
                message: 'Failed to update multiple users',
                data: error,
            }) 
        }
        res.status(200).send({
            type: 'Success',
            message: 'Users updated successfully',

        })
    })
    
}


module.exports.deleteAnUser = (req, res) => {
    const {id} = req.body;

    // verify id type & value
    if(!id || typeof id !== 'string') {
       return res.status(400).send({
            type: 'Error',
            message: 'User id is invalid!',
        })
    }

    // get all users
    const users = JSON.parse(fs.readFileSync('users.json').toString());
    // remove the user
    const remainedUsers = users.filter(user => user.id !== id);

    // verify if user was deleted or not
    if(users.length === remainedUsers.length) {
        return res.status(400).send({
            type: "Error",
            message: "No user exists with the given id!!"
        })
    }

    fs.writeFile('users.json', JSON.stringify(remainedUsers), (error) => {
        if(error){
            return res.status(400).send({
                type: 'Error', 
                message: 'Failed to delete the user'
            })
        }

        res.status(200).send({
            type: 'Success',
            message: 'User Deleted successfully.'
        })
    })
}