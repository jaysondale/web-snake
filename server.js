const express = require('express');

const app = express();

app.set('view engine', 'pug');
app.use(express.static(__dirname + '/node_modules/bootstrap/dist'));
app.use(express.static(__dirname + '/node_modules/jquery/dist'));
app.use(express.static( __dirname + '/static'));

app.get('/', (req, res) => {
    res.render('main');
});

app.listen(2000, () => {
    console.log('Server listening on port 2000');
});