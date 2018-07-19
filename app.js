var app = require('./config/app_config');
var db = require('./config/db_config');
var vacinas = require('./app/router/vacinaRouter');
var usuarios = require('./app/router/usuarioRouter');
var notifications = require('./app/router/notificationsRouter');

app.get('/', function (req, res) {
    res.end('Bem vindo ao eCard da Saúde');
});

app.use('/vacinas', vacinas);
app.use('/usuarios', usuarios);
app.use('/notifications', notifications);