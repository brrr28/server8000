const express = require('express');
const bodyParser = require('body-parser');
const app = express();

const users = [];

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

    const user = {
        email: req.body.email,
        password: req.body.password 
    };
    users.push(user);
    res.send(user);
});

app.post('/login', function(req, res){
    console.log('Запрос на авторизацию', req.body);
    if (req.body.email !== users.find())

// app.post('/form', (req, res) => {
//     console.log('Пришел запрос пососать!', req.body)
//     if (!req.body.name){
//         res.send({
//             message: 'Напиши своё имя, хуйло! Ща как уебу!'
//         });
//         return;
//     }
    
//     res.send({
//         message: 'Пасаси, ' + req.body.name
//     });
// });



app.listen(8000, function(){
    console.log('Сервер запущен!');
});