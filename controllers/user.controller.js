const fs = require('fs');

module.exports.getRandomUser = async(req, res) => {
   fs.readFile('users.json', (error, data) => {
    if(error){
        res.status(400).send({
            type: 'Error',
            message: 'Failed to read data from file'
        })
    }
    res.status(200).send({
        type: 'Success',
        message: 'Successfully got data',
        data: JSON.parse(data.toString()),
    })
   })
}