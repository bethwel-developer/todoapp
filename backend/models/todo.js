const mongoose = require ("mongoose")

const TodoSchema = new mongoose.Schema({
name:{
  type:String,
  required:true,
},
},

{timestamps:true}
)

module.exports = mongoose.model ("Todos", TodoSchema);
