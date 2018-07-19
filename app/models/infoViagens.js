var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var localizationSchema = Schema({
    cidade : String,
    estado : String,
    regiao : String,
    pais : String,
    //continente : String
    infoViagensId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'infotravels'
    }
});

var InfoTravelsSchema = new Schema({
    descricao : String,
    tipo : String,
    ator : String,
    localizacao : (localizationSchema),
    observacoes : String
});

module.exports = mongoose.model('infotravels', InfoTravelsSchema);