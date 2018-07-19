var mongoose    = require('mongoose');
var Schema      = mongoose.Schema;

// curtidas
var curtidaSchema = Schema({
    email: String,
    notificationId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'notifications'
    }
});

var NotificationsSchema = new Schema({
    titulo: String,
    tipo: String,
    tema: String,
    descricao: String,
    link: String,
    regiao: String,
    fonte: String,
    dataCriacao: Date,
    dataPublicacao: Date,
    dataCancelamento: Date,
    restricoes: String,
    observacoes: String,
    status: Boolean,
    curtidas: [curtidaSchema]
});

module.exports = mongoose.model('notifications', NotificationsSchema);

