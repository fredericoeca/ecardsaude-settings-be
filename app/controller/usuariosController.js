var Usuario = require('../models/usuarios');

exports.save = function (nome, email, nascimento, genero, tipo_sanguineo, senha, callback) {
    Usuario.findOne({'email': email}, function (err, usuario) {
        if(err){
            callback({
                cod: 301,
                msg: 'Erro na busca de registro de usuario: ',
                err: err
            });
        }else if(usuario){
            callback({
                cod: 302,
                msg: usuario.email + ' já cadastrado no sistema!'
            });
        }else{
            var novoUsuario = new Usuario();
            novoUsuario.nome = nome;
            novoUsuario.email = email;
            novoUsuario.nascimento = nascimento;
            novoUsuario.genero = genero;
            novoUsuario.tipo_sanguineo = tipo_sanguineo;
            novoUsuario.admin = false;
            novoUsuario.status = true;
            novoUsuario.senha = novoUsuario.genPassword(senha);
            novoUsuario.token = novoUsuario.genToken(email, senha);
            novoUsuario.save(function (err) {
                if(err){
                    callback({
                        cod: 303,
                        msg: 'Erro ao cadastrar usuário: ',
                        err: err
                    });
                }else {
                    callback({
                        cod: 304,
                        msg: 'Usuário cadastrado com sucesso!'
                    });
                }
            })
        }
    })
};

exports.update = function (nome, user, token, callback) {
    Usuario.findOne({'token': token}, function (err, usuario) {
        if(err){
            callback({
                cod: 305,
                msg: 'Token usuário inválido.',
                err: err
            });
        } else if(usuario){

            var usu = {
                'nome' : user.nome,
                'nascimento' : user.nascimento,
                'genero' : user.genero,
                'tipo_sanguineo' : user.tipo_sanguineo
            };

            Usuario.update({"_id": usuario._id},{ $set: usu }, function (err) {
                if(err){
                    callback({
                        cod: 306,
                        msg: 'Erro ao atualizar usuário.',
                        err: err
                    });
                } else {
                    callback({
                        cod: 307,
                        msg: 'Usuário atualizado com sucesso.'
                    });
                }
            })
        }
    })
};

exports.login = function (email, senha, callback) {
    Usuario.findOne({'email': email}, function (err, usuario) {
        if(err){
            callback({
                cod: 308,
                msg: 'Erro na busca do usuario.',
                err: err
            });
        }else if(usuario) {
            if(usuario.validatePassword(senha) && usuario.status === true) {
                callback(usuario);
            }else if(usuario.validatePassword(senha) && usuario.status === false){
                callback({
                    cod: 309,
                    msg: 'Conta ' + usuario.email +  ' inatíva!'
                });
            }else if(usuario.validatePassword(senha) === false && usuario.status === true){
                callback({
                    cod: 310,
                    msg: 'Senha incorreta!'
                });
            }else if(usuario.validatePassword(senha) === false && usuario.status === false){
                callback({
                    cod: 311,
                    msg: 'Conta ' + usuario.email +  ' inatíva e senha incorreta!'
                });
            }
        }else{
            callback({
                cod: 312,
                msg: 'Usuario não cadastrado!'
            });
        }
    })
};

exports.get = function (token, callback) {
    Usuario.findOne({'token': token}, function (err, usuario) {
        if(err){
            callback({
                cod: 313,
                msg: 'Token usuário inválido.',
                err: err
            });
        }else if(usuario){
            callback(usuario);
        }else{
            callback({
                cod: 314,
                msg: 'Usuário não encontrado'
            });
        }
    })
};

exports.changePassword = function (senhaAtual, novaSenha, token, callback) {
    Usuario.findOne({'token': token}, function (err, usuario) {
        if(err){
            callback({
                cod: 315,
                msg: 'Token usuário inválido.',
                err: err
            });
        } else if(usuario) {

            if(usuario.validatePassword(senhaAtual)){

                var senha = { $set : {
                        'senha': usuario.genPassword(novaSenha)
                    }};

                Usuario.update({_id: usuario._id}, senha, function (err) {
                    if(err){
                        callback({
                            cod: 316,
                            msg: 'Erro ao atualizar senha de usuário.',
                            err: err
                    });
                    } else {
                        callback({
                            cod: 317,
                            msg: 'Senha do usuário alterada com sucesso.'
                        });
                    }
                })
            } else {
                callback({
                   cod: 318,
                   msg: 'Senha atual digitada não corresponde a cadastrada.'
                });
            }
        }
    })
};

exports.saveFoto = function (imagem, token, callback) {
    Usuario.findOne({'token': token}, function (err, usuario) {
        if(err){
            callback({
                cod: 319,
                msg: 'Token de usuario inválido.',
                err: err
            });
        } else if(usuario){

            var foto = { $set: { foto : imagem }};

            Usuario.update({_id: usuario._id}, foto, function (err) {
                if(err){
                    callback({
                        cod: 320,
                        msg: 'Erro ao salvar foto do perfil.',
                        err: err
                    });
                } else {
                    callback({
                        cod: 321,
                        msg: 'Foto do perfil salva com sucesso'
                    });
                }
            })
        }
    })
};

exports.registerVacine = function (data, vacina, local, agente, rede, lote, fabricante, origem, token, callback) {
    Usuario.findOne({'token': token}, function (err, usuario) {
        if(err){
            callback({
                cod: 322,
                msg: 'Token usuário inválido.',
                err: err
            })
        } else if(usuario) {
            usuario.registro_vacinas.push({
              'data' : data,
              'vacina' : vacina,
              'local' : local,
              'agente' : agente,
              'rede' : rede,
              'lote' : lote,
              'fabricante' : fabricante,
              'origem' : origem
        });

        var regVacina = { $set: { registro_vacinas : usuario.registro_vacinas }};

            Usuario.update({ _id : usuario._id}, regVacina, function (err) {
                if(err){
                    callback({
                        cod: 323,
                        msg: 'Erro ao registrar vacina.',
                        err: err
                    })
                } else {
                    callback({
                        cod: 324,
                        msg: 'Registro de vacina realizado!'
                    });
                }
            })
        }
    })
};

exports.updateRegisterVacine = function (_id, data, vacina, local, agente, rede, token, callback) {
    Usuario.findOne({'token' : token}, function (err, usuario) {
        if(err){
            callback({
                cod: 325,
                msg: 'Token usuário inválido.',
                err: err
            })
        } else if(usuario){

            var regVacina = { $set : {
                    "registro_vacinas.$.data" : data,
                    "registro_vacinas.$.vacina" : vacina,
                    "registro_vacinas.$.local" : local,
                    "registro_vacinas.$.agente" : agente,
                    "registro_vacinas.$.rede" : rede
                }};

            Usuario.update({_id : usuario._id, "registro_vacinas._id": _id }, regVacina, function (err) {
                if(err){
                    callback({
                        cod: 326,
                        msg: 'Erro ao atualizar registro de vacinas.',
                        err: err
                    })
                } else {
                    callback({
                        cod: 327,
                        msg: 'Registro de vacina atualizado com sucesso!'
                    });
                }
            })
        }
    })
};

exports.deleteRegisterVacine = function (_id, token, callback) {
    Usuario.findOne({'token': token}, function (err, usuario) {
        if(err){
            callback({
                cod: 328,
                msg: 'Token usuário inválido.',
                err: err
            });
        } else if(usuario){

            var regVacina = { $pull: { registro_vacinas : { _id : _id }}};

            Usuario.update({ _id : usuario._id}, regVacina, function (err) {
                if(err){
                    callback({
                        cod: 329,
                        msg: 'Erro ao apagar registro de vacina.',
                        err: err
                    });
                } else {
                    callback({
                        cod: 330,
                        msg: 'Registro de vacina apagado com sucesso!'
                    });
                }
            })
        }
    })
};

exports.saveFamiliar = function (nome, parentesco, tipo_sanguineo, nascimento, genero, token, callback) {
    Usuario.findOne({'token': token}, function (err, usuario) {
        if(err){
            callback({
                cod: 331,
                msg: 'Token usuário inválido.',
                err: err
            });
        } else if(usuario){
            usuario.familiar.push({
                'nome': nome,
                'parentesco': parentesco,
                'tipo_sanguineo': tipo_sanguineo,
                'nascimento': nascimento,
                'genero': genero
            });

            var familiar = { $set: { familiar : usuario.familiar}};

            Usuario.update({_id: usuario._id}, familiar, function (err) {
                if(err){
                    callback({
                        cod: 332,
                        msg: 'Erro ao cadastrar familiar.',
                        err: err
                    });
                } else {
                    callback({
                        cod: 333,
                        msg: 'Familiar cadastrado com sucesso!'
                    });
                }
            })
        }
    })
};

exports.updateFamiliar = function (_id, nome, parentesco, tipo_sanguineo, nascimento, genero, token, callback) {
    Usuario.findOne({'token': token}, function (err, usuario) {
        if(err){
            callback({
                cod: 334,
                msg: 'Token usuário inválido.',
                err: err
            });
        } else if(usuario){

            var familiar = { $set : {
                    "familiar.$.nome" : nome,
                    "familiar.$.parentesco" : parentesco,
                    "familiar.$.tipo_sanguineo" : tipo_sanguineo,
                    "familiar.$.nascimento" : nascimento,
                    "familiar.$.genero" : genero
                }};

            Usuario.update({_id: usuario._id, "familiar._id": _id}, familiar, function (err) {
                if(err){
                    callback({
                        cod: 335,
                        msg: 'Erro ao atualizar familiar.',
                        err: err
                    });
                } else {
                    callback({
                        cod: 336,
                        msg: 'Familiar atualizado com sucesso!'
                    });
                }
            })
        }
    })
};

exports.deleteFamiliar = function (_id, token, callback) {
    Usuario.findOne({'token': token}, function (err, usuario) {
        if(err){
            callback({
                cod: 337,
                msg: 'Token usuário inválido.',
                err: err
            });
        } else if(usuario){

            var familiar = { $pull: { familiar : { _id: _id }}};

            Usuario.update({_id: usuario._id}, familiar, function (err) {
                if(err){
                    callback({
                        cod: 338,
                        msg: 'Erro ao apagar familiar.',
                        err: err
                    });
                } else {
                    callback({
                        cod: 339,
                        msg: 'Familiar apagado com sucesso!'
                    });
                }
            })
        }
    })
};

exports.registerVacineFamiliar = function (id, data, vacina, local, agente, rede, token, callback) {
    Usuario.findOne({'token': token}, function (err, usuario) {
        if(err){
            callback({
                cod: 340,
                msg: 'Token usuário inválido.',
                err: err
            })
        } else if(usuario) {

            for(var i=0; i < usuario.familiar.length; i++) {

                console.log(usuario.familiar[i].nome);
                if(usuario.familiar[i]._id == id) {

                    usuario.familiar[i].registro_vacinas.push({
                        'data': data,
                        'vacina': vacina,
                        'local': local,
                        'agente': agente,
                        'rede': rede
                    });

                    var regVacina = { $set : { familiar : usuario.familiar[i]}};

                    Usuario.update({ _id : usuario._id, "familiar._id": id}, regVacina, function (err) {
                        if(err){
                            callback({
                                cod: 341,
                                msg: 'Erro ao registrar vacinação',
                                err: err
                            })
                        } else {
                            callback({
                                cod: 342,
                                msg: 'Registro de vacinação realizado!'
                            });
                        }
                    })
                }
            }
        }
    })
};


exports.savePets = function (nome, especie, raca, nascimento, token, callback) {
      Usuario.findOne({'token': token}, function (err, usuario) {
            if(err){
                callback({
                    cod: 343,
                    msg: 'Token usuário inválido.',
                    err: err
                });
            } else if(usuario){
                usuario.pet.push({
                    'nome': nome,
                    'especie': especie,
                    'raca': raca,
                    'nascimento': nascimento
                });

                var pet = { $set: { pet : usuario.pet}};

                Usuario.update({_id: usuario._id}, pet, function (err) {
                    if(err){
                        callback({
                            cod: 344,
                            msg: 'Erro ao cadastrar pet.',
                            err: err
                        });
                    } else {
                        callback({
                            cod: 345,
                            msg: 'Pet cadastrado com sucesso!'
                        });
                    }
                })
            }
      })
};

exports.updatePet = function (_id, nome, especie, raca, nascimento, token, callback) {
    Usuario.findOne({'token': token}, function (err, usuario) {
        if(err){
            callback({
                cod: 346,
                msg: 'Token usuário inválido.',
                err: err
            });
        } else if(usuario){

            var pet = { $set : {
                "pet.$.nome" : nome,
                "pet.$.especie" : especie,
                "pet.$.raca" : raca,
                "pet.$.nascimento" : nascimento
            }};

            Usuario.update({ _id : usuario._id, "pet._id" : _id}, pet, function (err) {
                if(err){
                    callback({
                        cod: 347,
                        msg: 'Erro ao atualizar pet.',
                        err: err
                    });
                } else {
                    callback({
                        cod: 348,
                        msg: 'Pet atualizado com sucesso!'
                    });
                }
            })
        }
    })
};

exports.deletePet = function (_id, token, callback) {
    Usuario.findOne({'token': token}, function (err, usuario) {
        if(err){
            callback({
                cod: 349,
                msg: 'Token usuário inválido.',
                err: err
            });
        } else if(usuario){

            var pet = { $pull: { pet : { _id: _id }}};

            Usuario.update({_id: usuario._id}, pet, function (err) {
                if(err){
                    callback({
                        cod: 350,
                        msg: 'Erro ao apagar pet.',
                        err: err
                    });
                } else {
                    callback({
                        cod: 351,
                        msg: 'Pet apagado do sucesso!'
                    });
                }
            })
        }
    })
};

exports.desactive = function (_id, callback) {
    Usuario.findOne({'_id': _id}, function (err, usuario) {
        if(err){
            callback({
                cod: 352,
                msg: 'Erro ao encontrar usuário.',
                err: err
            })
        } else {
            if(usuario.status){

                var status = { $set : {
                      'status': false
                    }};

                Usuario.update({'_id':_id}, status, function (err) {
                    if(err){
                        callback({
                            cod: 353,
                            msg: 'Erro ao desativar do usuário!',
                            err: err
                        })
                    } else {
                        callback({
                            cod: 354,
                            msg: 'Usuário desativado com sucesso!'
                        })
                    }
                })
            }
        }
    })
};

exports.authorize = function (token, callback) {
    Usuario.findOne({'token': token}, function (err, usuario) {
        if(err){
            callback(false);
        }else if(usuario){
            callback(true);
        }else{
            callback(false);
        }
    })
};