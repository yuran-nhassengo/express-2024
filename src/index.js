const express = require('express');

const app = express();

app.use(express.json())

const loggingMiddleware = (req,res,next) =>{
    console.log(`${req.method} - ${req.url}`);
    next();
};



const PORT = process.env.PORT || 3000;

let mockUsers = [
    {id:1,username:"yuran",displayname:"Yuran"},
    {id:2,username:"Oscar",displayname:"Oscar"},
    {id:3,username:"Nhassengo",displayname:"Nhassengo"},
    {id:4,username:"Adam",displayname:"Adam"},
    {id:5,username:"Pander",displayname:"Pander"},
    {id:6,username:"Wil",displayname:"Wil"},
    {id:7,username:"John",displayname:"John"},
];

app.get("/", loggingMiddleware,(req,res) =>{
    res.status(201).send({msg:"Hello"});
});

app.get('/api/users',(req,res) =>{
    console.log(req.query);
    const {query:{filter,value}} = req;


    if(filter && value) return res.send(
        mockUsers.filter((user) => user[filter].includes(value))
    );

    return res.send(mockUsers);
    
});

app.post('/api/users',(req,res)=>{
    console.log(req.body);
    const {body} = req;
    const newUser = {id:mockUsers[mockUsers.length-1].id+1,...body};
    mockUsers = [...mockUsers,newUser];
    return res.status(201).send(newUser);
})

app.get('/api/users/:id', (req,res) =>{
    console.log(req.params);
    const parseId = parseInt(req.params.id);
    if(isNaN(parseId)) res.status(400).send({msg:'Bad Request. Invalid ID.'});

    const findUser = mockUsers.find((user) => user.id === parseId);
    if(!findUser) return res.sendStatus(404);
    return res.send(findUser);
});

app.get('/api/product', (req,res) =>{
    res.send([
        {id:123,name:'chicken breast',price:12.9}
    ]);
});

app.put('/api/users/:id',(req,res) =>{
    const {body,params:{id}} = req;
    const parsedId = parseInt(id);
    if(isNaN(parsedId)) return res.sendStatus(400);

    const findUserIndex = mockUsers.findIndex((user) => user.id === parsedId);

    if(findUserIndex === -1) return res.sendStatus(404);

    mockUsers[findUserIndex] = {id:parsedId,...body};
    return res.sendStatus(200);
});

app.patch('/api/users/:id',(req,res) =>{
    const {
        body,
        params:{id},
    } = req;

    const parsedId = parseInt(id);

    if(isNaN(parsedId)) return res.sendStatus(400);
    const findUserIndex = mockUsers.findIndex((user) => user.id === parsedId);

    if(findUserIndex === -1) return res.sendStatus(404);

    mockUsers[findUserIndex] ={...mockUsers[findUserIndex],...body};
    return res.sendStatus(200);

});

app.delete('/api/users/:id',(req,res) =>{
    const {params:{id}} =req;

    const parsedId = parseInt(id);

    if(isNaN(parsedId)) return res.sendStatus(400);

    const findUserIndex = mockUsers.findIndex((user) => user.id === parsedId);

    if(findUserIndex === -1) return res.sendStatus(404);


    mockUsers.splice(parsedId,1);

    return res.sendStatus(200);
})


app.listen(PORT,() =>{
    console.log(`Running on Port ${PORT}`)
})