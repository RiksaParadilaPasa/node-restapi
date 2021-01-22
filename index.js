const express= require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql');

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

const conn = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'db_node'
});


conn.connect((err) =>{
    if(err) throw err;
    console.log('Mysql Connected...');
});



app.get('/api/produk',(req,res) => {
    let sql = "SELECT  * FROM produk";
    let query = conn.query(sql,(err,results) => {
        if(err) throw err;
        res.send(JSON.stringify({
            "status": 200,
            "error": err,
            "response": results
        }));
    });
});

app.get('/api/produk/:id',(req,res) => {
    let sql = "SELECT  * FROM produk WHERE id = '"+req.params.id+"' ";
    let query = conn.query(sql,(err,results) => {
        if(err) throw err;
        res.send(JSON.stringify({
            "status": 200,
            "error": err,
            "response": results
        }));
    });
});

app.post('/api/produk',(req,res) => {
    let data = {name: req.body.name, price:req.body.price}
    let sql = "INSERT INTO produk SET ? ";
    let query = conn.query(sql,data,(err,results) => {
        if(err) throw err;
        res.send(JSON.stringify({
            "status": 200,
            "error": err,
            "response": results
        }));
    });
});

app.put('/api/produk/:id',(req,res) => {
    let sql = "UPDATE produk SET name = '"+req.body.name+"' , price = '"
            +req.body.price+"' WHERE id = '"+req.params.id+"' ";
    let query = conn.query(sql,(err,results) => {
        if(err) throw err;
        res.send(JSON.stringify({
            "status": 200,
            "error": err,
            "response": results
        }));
    });
});

app.delete('/api/produk/:id',(req,res) => {
    let sql = "DELETE FROM produk WHERE id = '"+req.params.id+"' ";
    let query = conn.query(sql,(err,results) => {
        if(err) throw err;
        res.send(JSON.stringify({
            "status": 200,
            "error": err,
            "response": results
        }));
    });
});

app.listen(3000,() => {
    console.log('Server is running at port 3000');
});