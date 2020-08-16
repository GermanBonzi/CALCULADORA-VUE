const mongoose = require('mongoose')
const {Schema} = mongoose

const BD = new Schema({
    formula: {
        type: String,
        trim: true,
      },
      resultado: {
        type: String,
        trim: true,
      },
      nombre:{
        type:String,
        trim:true,
      }
})

module.exports=mongoose.model('BD',BD) 