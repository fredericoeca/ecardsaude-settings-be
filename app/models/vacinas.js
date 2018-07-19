var mongoose    = require('mongoose');
var Schema      = mongoose.Schema;

var VacinaSchema = new Schema({
    vacina : String,
    descricao : String,
    dose: String,
    idadeInicialAno : Number,
    idadeInicialMes : Number,
    idadeFinalAno : Number,
    idadeFinalMes : Number,
    grupoAlvo : String,
    contraIndicacao: String,
    possiveisReacoes : String,
    publica : String,
    privada : String,
    observacoes : String
});

module.exports = mongoose.model('vacinas', VacinaSchema);

