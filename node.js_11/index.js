const express = require('express');
const app = express(); //-- http szervert tudunk vele inditani
const bodyParser = require('body-parser');
const mysql = require('mysql');
// params application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({extended: false }));

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'tagdij'
})
db.connect ((err) => {
if(err) throw err;
console.log('Connected!');
});

app.use(bodyParser.json());

app.get('/',(req, res) => {
    res.send("Hello world");
});

app.get('/bela', (req, res) => {
    res.send("Ez Béla lapja");
});

app.get('/bela/:id/:nev', (req, res) => {
    let id = req.params.id;
    let nev = req.params.nev;
    res.send(`Ez Béla lapja id: ${id}, nev: ${nev}`);
});

app.post('/bela', (req, res) => {
    let id = req.body.id;
    let name = req.body.name;
    res.send(`Ez Béla POST lapja id: ${id}, nev: ${name}`);
});

app.get('/tagok', (req, res) => {
    let sqlcommand = 'SELECT * FROM `ugyfel`';
    db.query(sqlcommand, (err, rows) => {
        if (err) throw err;
        res.send(rows);
    });
});

app.get('/tagok/:id', (req, res) => {
    let id = req.params.id;
    let sqlcommand = `SELECT * FROM ugyfel WHERE azon=${req.params.id}`;
    db.query(sqlcommand, (err, rows) => {
        if (err) throw err;
        res.send(rows);
    });
});


app.listen(3000, () => {
    console.log('listening on port 3000');
});