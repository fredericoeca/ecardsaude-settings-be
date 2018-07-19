var Researches = require('../models/researches');

exports.save = function (research, callback) {

    Researches.findOne({'titulo' : research.titulo}, function (err, res) {
        if(err) {
            callback({
                cod: 101,
                msg: 'Erro na busca por notícias',
                err: err
            })
        } else if(res) {

            callback({
                cod: 102,
                msg: 'Notícia ja salva!',
                id: res._id
            })

        } else {

            var nResearch = new Researches(research);

            nResearch.save(function (err, researches) {
                if(err){
                    callback({
                        cod: 103,
                        msg: 'Erro ao salvar researches',
                        err: err
                    });
                } else {
                    callback(researches);
                }
            });
        }
    });
};

exports.list = function (callback) {
    Researches.find({"status" : true}, function (err, researches) {
        if(err){
            callback({
                cod: 104,
                msg: 'Não foi encontrado nenhum resultado!',
                err: err
            });
        }else{
            callback(researches);
        }
    }).sort({'data' : -1});
};

exports.updateNew = function (id, callback) {
    Researches.update({"_id" : id}, { $set: { 'new' : false }}, function (err) {
        if(err) {
            callback({
                cod: 105,
                msg: 'Erro ao atualizar noticia nova!',
                err: err
            })
        } else {
            callback({
                cod: 106,
                msg: 'Status da noticia nova atualizada!'
            })
        }
    })
};

exports.delete = function (id, research, callback) {

    Researches.update({"_id" : id}, research, function (err) {
        if(err){
            callback({
                cod: 107,
                msg: 'Erro ao apagar notícia',
                err: err
            })
        } else {
            callback({
                cod: 108,
                msg: 'Notícia apagada com sucesso!'
            })
        }
    })
};

exports.searchNew = function (callback) {

    Researches.count({"new" : true}, function (err, res) {
        if(err) throw err;
        if(res) {
            callback(res);
            console.log(res);
        }
    })

};