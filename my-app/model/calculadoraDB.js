const mongoose = require('mongoose')
const {Schema} = mongoose

const BD = new Schema({
    formula: String,
    resultado: String
})

module.exports=mongoose.model('BD',BD)