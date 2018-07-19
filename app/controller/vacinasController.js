var Vacina = require('../models/vacinas');

exports.save = function (vacina, descricao, dose, idadeInicialAno, idadeInicialMes, idadeFinalAno, idadeFinalMes, grupoAlvo,
                         contraIndicacao, possiveisReacoes, publica, privada, observacoes, callback) {
    new Vacina({
        'vacina': vacina,
        'descricao': descricao,
        'dose': dose,
        'idadeInicialAno': idadeInicialAno,
        'idadeInicialMes': idadeInicialMes,
        'idadeFinalAno' : idadeFinalAno,
        'idadeFinalMes' : idadeFinalMes,
        'grupoAlvo' : grupoAlvo,
        'contraIndicacao' : contraIndicacao,
        'possiveisReacoes' : possiveisReacoes,
        'publica' : publica,
        'privada' : privada,
        'observacoes': observacoes
    }).save(function (err) {
       if(err){
           callback({
               cod: 401,
               msg: 'Erro ao salvar registro de vacina.',
               err: err
           });
       }else{
           callback({
               cod: 402,
               msg: 'Vacina salva com sucesso.'
           });
       }
    });
};

exports.update = function (id, vacina, callback) {
    var query = {'_id': id};

    Vacina.update(query, { $set : vacina }, function(err){
        if (err){
            callback({
                cod: 403,
                msg: 'Erro ao atualizar registro da vacina.',
                err: err
            });
        } else {
            callback({
                cod: 404,
                msg: 'Registro de vacina atualizado com sucesso.'
            });
        }
    });
};

exports.list = function (callback) {
    Vacina.find({}, function (err, vacinas) {
        if(err){
            callback({
                cod: 405,
                msg: 'Não foi possivel encontrar vacinas.',
                err: err
            });
        }else{
            callback(vacinas);
        }
    }).sort({'idadeInicialAno' : 1,'idadeInicialMes' : 1});
};

exports.get = function (id, callback) {
    Vacina.findOne({'_id': id}, function (err, vacina) {
        if(err) {
            callback({
                cod: 406,
                msg: 'Não foi possível encontrar a vacina.',
                err: err
            });
        } else {
            callback(vacina);
        }
    })
};

exports.delete = function (id, callback) {
    Vacina.findById(id, function (err, vacina) {
        if(err){
            callback({
                cod: 407,
                msg: 'Registro de vacina não encontrado.',
                err: err
            });
        }else{
            vacina.remove(function (err) {
                if(err) {
                    callback({
                        cod: 408,
                        msg: 'Erro ao apagar registro de vacina.',
                        err: err
                    });
                } else {
                    callback({
                        cod: 409,
                        msg: 'Registro de vacina excluido com sucesso!'
                    });
                }
            })
        }
    })
};