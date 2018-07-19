var express = require('express');
var router = express.Router();
var notificationController = require('../controller/notificacoesController');
var usuarioController = require('../controller/usuariosController');

function getToken(req, res, next) {
    var header = req.headers['authorization'];

    if(typeof header !== 'undefined'){
        req.token = header;
        next();
    }else {
        res.sendStatus(403);
    }
}

router.get('/', getToken, function (req, res) {

    var token = req.token;

    usuarioController.authorize(token, function (resp) {
        if(resp === true) {
            notificationController.list(function (resp) {
                res.json(resp);
            });
        } else {
            res.sendStatus(403);
        }
    });
});

router.post('/register', function (req, res) {
    var titulo = req.body.titulo;
    var tipo = req.body.tipo;
    var tema = req.body.tema;
    var descricao = req.body.descricao;
    var link = req.body.link;
    var regiao = req.body.regiao;
    var fonte = req.body.fonte;
    var observacoes = req.body.observacoes;

    notificationController.save(titulo, tipo, tema, descricao, link, regiao, fonte, observacoes, function (resp) {
        res.json(resp);
    })
});

router.put('/edit/:id', function (req, res) {
    var id = req.params.id;

    notificationController.edit(id, req.body, function (resp) {
        res.json(resp);
    })
});

router.put('/publish/:id', function (req, res) {
     var id = req.params.id;

     notificationController.publish(id, function (resp) {
         res.json(resp);
     })
});

router.put('/unpublish/:id', function (req, res) {
    var id = req.params.id;

    notificationController.unpublish(id, function (resp) {
        res.json(resp);
    })
});

router.delete('/delete/:id', function (req, res) {
    var id = req.params.id;

    notificationController.delete(id, function (resp) {
        res.json(resp);
    })
});

router.post('/curtidas/like', function (req, res) {
    var _id = req.body._id;
    var email = req.body.email;

    notificationController.like(_id, email, function (resp) {
        res.json(resp);
    })
});

router.post('/curtidas/unlike', function (req, res) {
    var _id = req.body._id;
    var email = req.body.email;

    notificationController.unlike(_id, email, function (resp) {
        res.json(resp);
    })
});

module.exports = router;