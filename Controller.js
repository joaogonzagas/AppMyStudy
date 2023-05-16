const express = require('express');
const cors=require('cors');
const bodyParser=require('body-parser');
const models=require('./models')

const app=express();
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json())
let user=models.User;

app.post('/Login', async (req,res)=>{
    let response=await user.findOne({
    where:{email:req.body.email, password:req.body.password}
})
if(response===null) {
    res.send(JSON.stringify('error'))
} else {
    res.send(response)
 }
})
app.post('/CadastroUsuarios', async (req,res)=>{
    let response=await user.findOne({
    where:{email:req.body.email,}
})
if(response===null) {
    res.send(JSON.stringify('error'))
} else {
    res.send(response)
 }
})




//criação do usuário no BD
app.post('/create', async (req,res)=> {
console.log(req.body)
await user.create({
email: req.body.email,
password: req.body.password,
 })
})

//atualização do usuário no BD
app.post('/update', async (req,res)=> {
    
    let response=await user.findOne({
    where: {email: req.body.email},
    include: [{all:true}]    
     })
     response.password=req.body.password
     response.updatedAt = new Date()
     response.save()
    })


let port=process.env.PORT || 3000;
app.listen(port,(req,res)=> {
console.log('Servidor Rodando')

})