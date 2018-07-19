var mongoose    = require('mongoose');
var bcrypt      = require('bcrypt-nodejs');
var jwt         = require('jsonwebtoken');
var Schema      = mongoose.Schema;


// register vaccines user
var registroVacinasSchema = Schema({
    data: Date,
    vacina: String,
    local: String,
    agente: String,
    rede: String,
    lote: String,
    fabricante: String,
    origem: String
});

// Campanhas ou calendários

// familiar
var familiarSchema = Schema({
    nome: String,
    parentesco: String,
    nascimento: Date,
    tipo_sanguineo: String,
    genero: String,
    registro_vacinas: [registroVacinasSchema],
    usuarioId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'usuarios'
    }
});

// pets
var petsSchema = Schema({
    nome: String,
    especie: String,
    raca: String,
    nascimento: Date,
    registro_vacinas: [registroVacinasSchema],
    usuarioId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'usuarios'
    }
});

// model user
var UsuariosSchema = new Schema({
    nome: String,
    email: String,
    nascimento: Date,
    genero: String,
    tipo_sanguineo: String,
    senha: String,
    familiar: [familiarSchema],
    pet: [petsSchema],
    registro_vacinas: [registroVacinasSchema],
    admin: Boolean,
    status: Boolean,
    token: String,
    foto: String
});

UsersSchema.methods.genToken = function (email, senha) {
    return jwt.sign({'email':email, 'senha':senha}, 'secret');
};

UsersSchema.methods.genPassword = function (senha) {
    return bcrypt.hashSync(senha, bcrypt.genSaltSync(9));
};

UsersSchema.methods.validatePassword = function (senha) {
    return bcrypt.compareSync(senha, this.senha);
};

module.exports = mongoose.model('usuarios', UsuariosSchema);