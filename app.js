const express = require('express');
const bodyParser = require('body-parser');
const app = express();

let users = [];

app.use(bodyParser.json());

app.post('/users', function(req, res){
    console.log('Запрос пришел!', req.body);
    res.send({
        message: 'Привет ' + req.body.name 
    });
});

app.post('/form', (req, res) => {
    console.log('Пришел запрос пососать!', req.body)
    if (!req.body.name){
        res.send({
            message: 'Напиши своё имя, хуйло! Ща как уебу!'
        });
        return;
    }
    
    res.send({
        message: 'Пасаси, ' + req.body.name
    });
});



app.listen(8000, function(){
    console.log('Сервер запущен!');
});