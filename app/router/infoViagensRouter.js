var express = require('express');
var router = express.Router();
var infoViagensController = require('../controller/infoViagensController');

function getToken(req, res, next) {
    var header = req.headers['authorization'];

    if(typeof header !== 'undefined'){
        req.token = header;
        next();
    }else {
        res.sendStatus(403);
    }
}

router.get('/list', getToken, function (req, res) {
    infoViagensController.list(function (resp) {
        res.json(resp);
    })
});

router.get('/infoviagem/:id', getToken, function (req, res) {
    var id = req.params.id;
    infoViagensController.get(id, function (resp) {
        res.json(resp);
    })
});

router.post('/register', function (req, res) {

    var descricao = req.body.descricao;
    var tipo = req.body.tipo;
    var ator = req.body.ator;
    var observacoes = req.body.observacoes;

    infoViagensController.save(descricao, tipo, ator, observacoes, function (resp) {
        res.json(resp);
    })
});

router.put('/update/:id', function (req, res) {
    var id = req.params.id;

    infoViagensController.update(id, req.body, function (resp) {
        res.json(resp);
    })
});

router.delete('/delete/:id', function (req, res) {
    var id = req.params.id ;

    infoViagensController.delete(id, function (resp) {
        res.json(resp);
    })
});

module.exports = router;