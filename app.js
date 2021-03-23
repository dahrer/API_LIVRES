const express=require('express');
const bodyParser = require('body-parser');
const app = express();
const port =3000;
const { body , validationResult } = require('express-validator');
app.use(bodyParser.json());
const utilities = require('./utilities/MysqlUtilities');
const MysqlUtilities = require('./utilities/MysqlUtilities');

app.get('/auteur',
       (req,res)=>{
           console.log("tous les auteurs")
           MysqlUtilities.getUsers((result,error)=>{
               if(!error){
                   res.send(result)
               }else{
                   res.status(500).send(error)
               }
           })

       })



       
app.listen(port,()=>{
    console.log('http://localhost:${port}')
})
    

