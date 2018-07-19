var express = require('express');
var router = express.Router();
var vacinaController = require('../controller/vacinasController');

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
    vacinaController.list(function (resp) {
        res.json(resp);
    })
});

router.get('/vacina/:id', getToken, function (req, res) {
    var id = req.params.id;
    vacinaController.get(id, function (resp) {
        res.json(resp);
    })
});

router.post('/register', function (req, res) {

    var vacina = req.body.vacina;
    var descricao = req.body.descricao;
    var dose = req.body.dose;
    var idadeInicialAno = req.body.idadeInicialAno;
    var idadeInicialMes = req.body.idadeInicialMes;
    var idadeFinalAno = req.body.idadeFinalAno;
    var idadeFinalMes = req.body.idadeFinalMes;
    var grupoAlvo = req.body.grupoAlvo;
    var contraIndicacao = req.body.contraIndicacao;
    var possiveisReacoes = req.body.possiveisReacoes;
    var publica = req.body.publica;
    var privada = req.body.privada;
    var observacoes = req.body.observacoes;

    vacinaController.save(vacina, descricao, dose, idadeInicialAno, idadeInicialMes, idadeFinalAno, idadeFinalMes, grupoAlvo,
        contraIndicacao, possiveisReacoes, publica, privada, observacoes, function (resp) {
        res.json(resp);
    })
});

router.put('/update/:id', function (req, res) {
    var id = req.params.id;

    vacinaController.update(id, req.body, function (resp) {
        res.json(resp);
    })
});

router.delete('/delete/:id', function (req, res) {
    var id = req.params.id ;

    vacinaController.delete(id, function (resp) {
        res.json(resp);
    })
});

module.exports = router;