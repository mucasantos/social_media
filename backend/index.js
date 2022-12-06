const express = require('express')

const app = express();

app.get('/', (req, res, next) => {
    res.end("<html><h1>No inicio...</h1></html>")
})

app.get('/tudo', (req,res, next)=>{

    res.end("<html><h1>Tudo certo aqui...</h1></html>")
})

app.get('/test', (req,res, next)=>{

    res.end("<html><h1>Teste...</h1></html>")
})


app.listen(3030, () => {
    console.log('Server online')
});



