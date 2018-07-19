var VacinaPet = require('../models/vacinasPet');

exports.save = function (vacina, descricao, dose, idadeInicialAno, idadeInicialMes, idadeFinalAno, idadeFinalMes,
                         contraIndicacao, possiveisReacoes, observacoes, callback) {
    new VacinaPet({
        'vacina': vacina,
        'descricao': descricao,
        'dose': dose,
        'idadeInicialAno': idadeInicialAno,
        'idadeInicialMes': idadeInicialMes,
        'idadeFinalAno' : idadeFinalAno,
        'idadeFinalMes' : idadeFinalMes,
        'contraIndicacao' : contraIndicacao,
        'possiveisReacoes' : possiveisReacoes,
        'observacoes': observacoes
    }).save(function (err) {
        if(err){
            callback({
                cod: 501,
                msg: 'Erro ao salvar registro de vacina para pet.',
                err: err
            });
        }else{
            callback({
                cod: 502,
                msg: 'Registro da vacina para pet salva com sucesso.'
            });
        }
    });
};

exports.update = function (id, vacinaPet, callback) {
    var query = {'_id': id};

    VacinaPet.update(query, { $set : vacinaPet }, function(err){
        if (err){
            callback({
                cod: 503,
                msg: 'Erro ao atualizar registro da vacina para pet.',
                err: err
            });
        } else {
            callback({
                cod: 504,
                msg: 'Registro de vacina para pet atualizado com sucesso.'
            });
        }
    });
};

exports.list = function (callback) {
    VacinaPet.find({}, function (err, vacinasPet) {
        if(err){
            callback({
                cod: 505,
                msg: 'Não foi possivel encontrar vacinas para pet.',
                err: err
            });
        }else{
            callback(vacinasPet);
        }
    }).sort({'idadeInicialAno' : 1,'idadeInicialMes' : 1});
};

exports.get = function (id, callback) {
    VacinaPet.findOne({'_id': id}, function (err, vacinaPet) {
        if(err) {
            callback({
                cod: 506,
                msg: 'Não foi possível encontrar a vacina para pet.',
                err: err
            });
        } else {
            callback(vacinaPet);
        }
    })
};

exports.delete = function (id, callback) {
    VacinaPet.findById(id, function (err, vacinaPet) {
        if(err){
            callback({
                cod: 507,
                msg: 'Registro de vacina para pet não encontrado.',
                err: err
            });
        }else{
            vacinaPet.remove(function (err) {
                if(err) {
                    callback({
                        cod: 508,
                        msg: 'Erro ao apagar registro de vacina para pet.',
                        err: err
                    });
                } else {
                    callback({
                        cod: 509,
                        msg: 'Registro de vacina excluido com sucesso!'
                    });
                }
            })
        }
    })
};