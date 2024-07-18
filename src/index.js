const express = require('express');

const app = express();

const PORT = process.env.PORT || 3000;

const mockUsers = [
    {id:1,username:"yuran",displayname:"Yuran"},
    {id:2,username:"Oscar",displayname:"Oscar"},
    {id:3,username:"Nhassengo",displayname:"Nhassengo"}

];

app.get("/", (req,res) =>{
    res.status(201).send({msg:"Hello"});
});

app.get('/api/users',(req,res) =>{
    res.send(mockUsers);
});

app.get('/api/users/:id', (req,res) =>{
    console.log(req.params);
    const parseId = parseInt(req.params.id);
    if(isNaN(parseId)) res.status(400).send({msg:'Bad Request. Invalid ID.'});

    const findUser = mockUsers.find((user) => user.id === parseId);
    if(!findUser) return res.sendStatus(404);
    return res.send(findUser);
})

app.get('/api/product', (req,res) =>{
    res.send([
        {id:123,name:'chicken breast',price:12.9}
    ]);
});

app.listen(PORT,() =>{
    console.log(`Running on Port ${PORT}`)
})