const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const crypto = require('crypto');

function randomToken(){
    var current_date = (new Date()).valueOf().toString();
    var random = Math.random().toString();
    var token = crypto.createHash('sha1').update(current_date + random).digest('hex');
    return token;
}

const users = [];
const userTokens = {};

app.use(bodyParser.json());

app.post('/user', function(req, res){
    console.log('Запрос пришел!', req.body);
    if (!req.body.email) {
        res.send({
            message: 'Введите email'
        });
        return;
    }
    if (!req.body.password) {
        res.send({
            message: 'Введите password'
        });
        return;
    }
    
    var user = users.find(user => user.email == req.body.email)
    if (user){
        res.send({
            message: 'Пользователь с таким email уже существует'
        });
        return;
    }

    user = {
        email: req.body.email,
        password: req.body.password 
    };
    users.push(user);
    res.send(user);
});



app.post('/login', function(req, res){
    console.log('Запрос на авторизацию', req.body);
    var user = users.find(user => user.email == req.body.email)
    if (user === undefined){
        res.send({
            message: 'Такого пользователя нет'
        })
        return;
    } 
    if (req.body.password !== user.password){
        res.send({
            message: 'Пароль неверный'
        })
        return;
    }

    var token = randomToken();
    userTokens[token] = user.email
    res.send({
        token: token
    })  
}) 

app.get('/user/me', function (req, res){
    console.log('Запрос на получения данных пользователя')
    userTokens[req.body]
})






app.listen(8000, function(){
    console.log('Сервер запущен!');
});