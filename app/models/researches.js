var mongoose    = require('mongoose');
var Schema      = mongoose.Schema;

var searchesNewsSchema = new Schema({
    titulo: String,
    tipo: String,
    descricao: String,
    link: String,
    data: Date,
    status: Boolean,
    fonte: String,
    new: Boolean
});

module.exports = mongoose.model('searchesnews', searchesNewsSchema);






titulo: String,
    tipo: String,
    descricao: String,
    link: String,
    data: Date,
    status: Boolean,
    fonte: String,
    new: Boolean