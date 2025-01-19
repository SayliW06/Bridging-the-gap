const mongoose = require('mongoose')
const {Schema} = mongoose

const client = new Schema({
    email: {
        type: String,
        unique: true
    },
    password: String,
    username: String,
})

const worker = new Schema({
    email: {
        type: String,
        unique: true
    },
    password: String,
    username: String,
    description: String,
    occupation: String,
})

const clientModel = new mongoose.Model("client", client)
const workerModel = new mongoose.Model("worker", worker)

module.exports = {
    clientModel,
    workerModel
}