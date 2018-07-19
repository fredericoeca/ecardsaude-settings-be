var InfoViagens = require('../models/infoTravels');

exports.save = function (descricao, tipo, ator, observacao, callback) {

    new InfoViagens({
        'descricao': descricao,
        'tipo': tipo,
        'ator': ator,
        'observacao': observacao,
    }).save(function (err) {
        if(err){
            callback({
                cod: 601,
                msg: 'Erro ao salvar informação de cuidados em viagens.',
                err: err
            })
        } else {
            callback({
                cod: 602,
                msg: 'Infomação de cuidados em viagens salvo com sucesso.'
            })
        }
    })
};

exports.update = function (id, info, callback) {
    var query = {'_id': id};

    InfoViagens.update(query, { $set : info }, function(err){
        if (err){
            callback({
                cod: 603,
                msg: 'Erro ao atualizar informação de cuidados em viagens.',
                err: err
            });
        } else {
            callback({
                cod: 604,
                msg: 'Informação de cuidados em viagens atualizado com sucesso.'
            });
        }
    });
};

exports.list = function (callback) {
    InfoViagens.find({}, function (err, infos) {
        if(err){
            callback({
                cod: 605,
                msg: 'Não foi possivel encontrar informações.',
                err: err
            });
        }else{
            callback(infos);
        }
    });
};

exports.get = function (id, callback) {
    InfoViagens.findOne({'_id': id}, function (err, info) {
        if(err) {
            callback({
                cod: 606,
                msg: 'Não foi possível encontrar a informação.',
                err: err
            });
        } else {
            callback(info);
        }
    })
};

exports.delete = function (id, callback) {
    InfoViagens.findById(id, function (err, info) {
        if(err){
            callback({
                cod: 607,
                msg: 'Informação de cuidados com viagens não encontrada.',
                err: err
            });
        }else{
            info.remove(function (err) {
                if(err) {
                    callback({
                        cod: 608,
                        msg: 'Erro ao apagar informação de cuidados com viagem.',
                        err: err
                    });
                } else {
                    callback({
                        cod: 609,
                        msg: 'Informação de cuidado com viagem apagado com sucesso!'
                    });
                }
            })
        }
    })
};