const express = require('express');

const app = express();

const PORT = process.env.PORT || 3000;

app.get("/", (req,res) =>{
    res.status(201).send({msg:"Hello"});
});

app.get('/api/users',(req,res) =>{
    res.send([
        {id:1,username:"yuran",displayname:"Yuran"},
        {id:2,username:"Oscar",displayname:"Oscar"},
        {id:3,username:"Nhassengo",displayname:"Nhassengo"}

    ]);
});

app.get('/api/product', (req,res) =>{
    res.send([
        {id:123,name:'chicken breast',price:12.9}
    ]);
});

app.listen(PORT,() =>{
    console.log(`Running on Port ${PORT}`)
})