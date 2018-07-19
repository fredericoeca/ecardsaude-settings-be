var Notification = require('../models/notifications');

exports.save = function (titulo, tipo, tema, descricao, link, regiao, fonte, observacoes, callback) {
    new Notification({
        'titulo': titulo,
        'tipo': tipo,
        'tema': tema,
        'descricao': descricao,
        'link': link,
        'regiao': regiao,
        'fonte': fonte,
        'dataCriacao': new Date(),
        'status': false,
        'observacoes': observacoes
    }).save(function (err, notification) {
        if(err){
            callback({
                cod: 201,
                msg: 'Não foi possivel criar notificação!',
                err: err
            });
        }else{
            callback(notification);
        }
    });
};

exports.edit = function (id, notification, callback) {

    Notification.update({'_id': id}, { $set : notification }, function (err) {
        if(err){
            callback({
                cod: 202,
                msg: 'Erro ao editar notificação',
                err: err
            })
        } else {
            callback({
                cod: 203,
                msg: 'Notificação editada com sucesso!'
            })
        }
    })
};

exports.list = function (callback) {
    Notification.find({}, function (err, notifications) {
        if(err){
            callback({
                cod: 204,
                msg: 'Não foi encontrado nenhuma notificação!',
                err: err
            });
        }else{
            callback(notifications);
        }
    }).sort({'dataCriacao' : -1});
};

exports.publish = function (id, callback) {
  Notification.findOne({'_id' : id},function (err, notification) {
      if(err){
          callback({
              cod: 205,
              msg: 'Notificação não encontrada!',
              err: err
          });
      } else {

          var not = {
              'dataPublicacao' : new Date(),
              'status' : true
          };

          Notification.update({'_id' : notification._id},{ $set : not }, function (err) {
              if(err){
                  callback({
                      cod: 206,
                      msg: 'Erro ao publicar notificação',
                      err: err
                  });
              } else {
                  callback({
                      cod: 207,
                      msg: 'Notificação publicada com sucesso!',
                  });
              }
          })
      }
  })
};

exports.unpublish = function (id, callback) {
    Notification.findOne({'_id' : id},function (err, notification) {
        if(err){
            callback({
                cod: 207,
                msg: 'Notificação não encontrada!',
                err: err
            });
        } else {

            var not = {
                'dataCancelamento' : new Date(),
                'status' : false
            };

            Notification.update({'_id' : notification._id},{ $set : not }, function (err) {
                if(err){
                    callback({
                        cod: 208,
                        msg: 'Erro ao cancelar publicação da notificação.',
                        err: err
                    });
                } else {
                    callback({
                        cod: 209,
                        msg: 'Publicação cancelada com sucesso!'
                    });
                }
            })
        }
    })
};

exports.delete = function (id, callback) {
    Notification.findById(id, function (err, notification) {
        if(err){
            callback({
                cod: 210,
                msg: 'Notificação não encontrada!',
                err: err
            });
        }else{
            notification.remove(function (err) {
                if(err){
                    callback({
                        cod: 211,
                        msg: 'Erro ao apagar notificação!',
                        err: err
                    });
                } else {
                    callback({
                        cod: 212,
                        msg: 'Notificação apagada com sucesso!'
                    })
                }
            })
        }
    })
};

exports.like = function (_id, email, callback) {
    Notification.findOne({'_id': _id}, function (err, notification) {
        if(err){
            callback({
                cod: 213,
                msg: 'Notificação não encontrada!',
                err: err
            })
        } else if(notification){
            notification.curtidas.push({
                'email': email
            });

            var curtida = { $set: { curtidas : notification.curtidas }};

            Notification.update({_id: notification._id}, curtida, function (err, notification) {
                if(err){
                    callback({
                        cod: 214,
                        msg: 'Erro ao curtir notificação.',
                        err: err
                    });
                } else {
                    callback(notification);
                }
            })
        }
    })
};

exports.unlike = function (_id, email, callback) {
    Notification.findOne({'_id': _id}, function (err, notification) {
        if(err){
            callback({
                cod: 215,
                msg: 'Notificação não encontrada!',
                err: err
            })
        } else if(notification){

            var curtida = { $pull: { curtidas : { email : email} }};

            Notification.update({_id: notification._id}, curtida, function (err, notification) {
                if(err){
                    callback({
                        cod: 216,
                        msg: 'Erro ao curtir notificação.',
                        err: err
                    });
                } else {
                    callback(notification);
                }
            })

        }
    })
};