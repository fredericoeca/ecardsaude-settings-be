var mongoose    = require('mongoose');
var Schema      = mongoose.Schema;

var VaccinesPetSchema = new Schema({
    vacina : String,
    descricao : String,
    dose: String,
    idadeInicialAno : Number,
    idadeInicialMes : Number,
    idadeFinalAno : Number,
    idadeFinalMes : Number,
    contraIndicacao: String,
    possiveisReacoes : String,
    observacoes : String
});

module.exports = mongoose.model('vaccinespet', VaccinesPetSchema);

