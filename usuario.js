var mongoose = require('mongoose');
const Schema = mongoose.Schema; 

var usuarioSchema =  Schema({ nombre: String,apellidos:String,dni:String });

module.exports = mongoose.model('usuario', usuarioSchema);