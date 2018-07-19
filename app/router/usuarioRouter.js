var express = require('express');
var router = express.Router();
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

router.post('/register', function (req, res) {
    var nome = req.body.nome;
    var email = req.body.email;
    var nascimento = req.body.nascimento;
    var genero = req.body.genero;
    var tipo_sanguineo = req.body.tipo_sanguineo;
    var senha = req.body.senha;

    usuarioController.save(nome, email, nascimento, genero, tipo_sanguineo, senha, function (resp) {
        res.json(resp);
    })
});

router.put('/update/:id', getToken, function (req, res) {
    var id = req.params.id;
    var token = req.token;

    usuarioController.update(id, req.body, token, function (resp) {
        res.json(resp);
    })
});

router.post('/update/senha', getToken, function (req, res) {
    var senhaAtual = req.body.senhaAtual;
    var novasenha = req.body.novaSenha;
    var token = req.token;

    usuarioController.changePassword(senhaAtual, novasenha, token, function (resp) {
        res.json(resp);
    })
});

router.post('/register/foto', getToken, function (req, res) {
    var foto = req.body.foto.data;
    var token = req.token;

    usuarioController.saveFoto(foto, token, function (resp) {
        res.json(resp);
    })

});

router.post('/register/reg_vacina', getToken, function (req, res) {

    var data = req.body.data;
    var vacina = req.body.vacina;
    var local = req.body.local;
    var agente = req.body.agente;
    var rede = req.body.rede;
    var lote = req.body.lote;
    var fabricante = req.body.fabricante;
    var origem = req.body.origem;
    var token = req.token;

    console.log(token);

    console.log(req.body);

    usuarioController.registerVacine(data, vacina, local, agente, rede, lote, fabricante, origem, token, function (resp) {
        res.json(resp);
    })
});

router.post('/update/reg_vacina', getToken, function (req, res) {
    var _id = req.body._id;
    var data = req.body.data;
    var vacina = req.body.vacina;
    var local = req.body.local;
    var agente = req.body.agente;
    var rede = req.body.rede;
    var token = req.token;

    usuarioController.updateRegisterVacine(_id, data, vacina, local, agente, rede, token, function (resp) {
        res.json(resp);
    })
});

router.post('/delete/reg_vacina', getToken, function (req, res) {
    var _id = req.body._id;
    var token = req.token;
    usuarioController.deleteRegisterVacine(_id, token, function (resp) {
        res.json(resp);
    })
});

router.post('/register/familiar', getToken, function (req, res) {
    var nome = req.body.nome;
    var parentesco = req.body.parentesco;
    var tipo_sanguineo = req.body.tipo_sanguineo;
    var nascimento = req.body.nascimento;
    var genero = req.body.genero;
    var token = req.token;

    usuarioController.saveFamiliar(nome, parentesco, tipo_sanguineo, nascimento, genero, token, function (resp) {
        res.json(resp);
    })
});

router.post('/update/familiar', getToken, function (req, res) {
    var _id = req.body._id;
    var nome = req.body.nome;
    var parentesco = req.body.parentesco;
    var tipo_sanguineo = req.body.tipo_sanguineo;
    var nascimento = req.body.nascimento;
    var genero = req.body.genero;
    var token = req.token;

    usuarioController.updateFamiliar(_id, nome, parentesco, tipo_sanguineo, nascimento, genero, token, function (resp) {
        res.json(resp);
    })
});

router.post('/delete/familiar', getToken, function (req, res) {
    var _id = req.body._id;
    var token = req.token;
    usuarioController.deleteFamiliar(_id, token, function (resp) {
        res.json(resp);
    })
});

router.post('/register/familiar/reg_vacina', getToken, function (req, res) {
    var id = req.body.id;
    var data = req.body.data;
    var vacina = req.body.vacina;
    var local = req.body.local;
    var agente = req.body.agente;
    var rede = req.body.rede;
    var token = req.token;

    usuarioController.registerVacineFamiliar(id, data, vacina, local, agente, rede, token, function (resp) {
        res.json(resp);
    })
});

router.post('/register/pet', getToken, function (req, res) {
    var nome = req.body.nome;
    var especie = req.body.especie;
    var raca = req.body.raca;
    var nascimento = req.body.nascimento;
    var token = req.token;

    usuarioController.savePets(nome, especie, raca, nascimento, token, function (resp) {
        res.json(resp);
    })
});

router.post('/update/pet', getToken, function (req, res) {
    var _id = req.body._id;
    var nome = req.body.nome;
    var especie = req.body.especie;
    var raca = req.body.raca;
    var nascimento = req.body.nascimento;
    var token = req.token;

    usuarioController.updatePet(_id, nome, especie, raca, nascimento, token, function (resp) {
        res.json(resp);
    })
});

router.post('/delete/pet', getToken, function (req, res) {
    var _id = req.body._id;
    var token = req.token;
    usuarioController.deletePet(_id, token, function (resp) {
        res.json(resp);
    })
});

router.post('/login', function (req, res) {
    var email = req.body.email;
    var senha = req.body.senha;

    usuarioController.login(email, senha, function (resp) {
        res.json(resp);
    })
});

router.get('/usuario', getToken, function (req, res) {
    var token = req.token;
    usuarioController.get(token, function (resp) {
        res.json(resp);
    })
});

router.post('/recuperar', function (req, res) {
    var email = req.body.email;
    var nascimento = req.body.nascimento;
    var tipo_sanguineo = req.body.tipo_sanguineo;

    usuarioController.recuperar(email, nascimento, tipo_sanguineo, function (resp) {
        res.json(resp);
    })
});

router.post('/desativar', function (req, res) {
    var id = req.body._id;

    usuarioController.desactive(id, function (resp) {
        res.json(resp);
    })
});

router.post('/ativar', function (req, res) {
    var email = req.body.email;
    var senha = req.body.senha;

    usuarioController.active(email, senha, function (resp) {
        res.json(resp);
    })
});

module.exports = router;