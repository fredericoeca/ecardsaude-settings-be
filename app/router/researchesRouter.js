var express = require('express');
var router = express.Router();
var researchesController = require('../controller/searchNewsController');
var usuarioController = require('../controller/usuariosController');
var request = require('request'),
    cheerio = require('cheerio');

function search() {

    var start = 200;

    while(start >= 0){

        var URL = 'http://portalms.saude.gov.br/noticias?start=' + start;

        request(URL, function (err, res, body) {
            if (err) {
                console.log(err);
            } else {

                var $ = cheerio.load(body);
                const noticias = [];

                $('.tileItem').each(function (i, link) {

                    const noticia = {
                        'titulo': $(link).find('h2.tileHeadline a').text(),
                        'tipo': 'Notícia',
                        'descricao': $(link).find('.description p').text().trim(),
                        'link' : 'http://portalms.saude.gov.br' + $(link).find('h2 a').attr('href'),
                        'data': $(link).find('li').text().replace('publicado ','').replace('h',':').substring(0, 14),
                        'status' : true,
                        'fonte' : 'Portal do Ministério da Saúde',
                        'new' : true
                    };

                    if (noticia.titulo !== "") {
                        if (noticia.titulo.indexOf('vacin') !== -1 || noticia.titulo.indexOf('campanha') !== -1) {

                            noticia.data = noticia.data.substring(3,5) + '-' + noticia.data.substring(0,2) +
                                '-20' + noticia.data.substring(6,8) + ' ' + noticia.data.substring(9,14);

                            saveNews(noticia);
                        }
                    }
                });
            }
        });

        start = start - 10;
    }
}

function getToken(req, res, next) {
    var header = req.headers['authorization'];

    if(typeof header !== 'undefined'){
        req.token = header;
        next();
    }else {
        res.sendStatus(403);
    }
}

function saveNews(noticia){

    researchesController.save(noticia, function (resp) {
        console.log(resp);

        if(resp.cod === 402){
            researchesController.updateNew(resp.id, function (r) {
                console.log(r);
            })
        }
    });
}

router.get('/', getToken, function (req, res) {

    var token = req.token;

    usuarioController.authorize(token, function (resp) {
        if(resp === true) {
            researchesController.list(function (resp) {
                res.json(resp);
            });
        } else {
            res.sendStatus(403);
        }
    });
});

router.get('/refresh', getToken, function (req, res) {

    var token = req.token;

    usuarioController.authorize(token, function (resp) {
        if(resp === true) {
            search();
        } else {
            res.sendStatus(403);
        }
    });
});

router.put('/delete/:id',getToken, function (req, res) {

    var id = req.params.id;
    var token = req.token;


    usuarioController.authorize(token, function (resp) {
        if(resp === true) {

            researchesController.delete(id, req.body, function (r) {
                res.json(r);
            })

        } else {
            res.sendStatus(403);
        }
    });
});

module.exports = router;