const express = require('express');
const BD = require('../model/calculadoraDB')
const bodyParser = require('body-parser');
const mongoose = require('mongoose')
const cors = require('cors');
const app = express();
const routes = require('../routes/index');

  
 
 
 // bd

 mongoose.Promise = global.Promise;
 mongoose.connect("mongodb://localhost/calculosdb", {
   useNewUrlParser: true,
   useUnifiedTopology: true,
   useFindAndModify: false,
 }).then(db => console.log('db conectada')).catch(err => console.log(err));
 
   
app.use(bodyParser.json());
app.use(cors());
app.use(express.urlencoded({ extended: true }));
 
 /* 
let resultado=0
let formula =''
*/
 /*    
app.post('/operacion/:id',(req,res)=>{
  console.log('id') 
  resultado = eval(req.body.formula)
  formula = req.body.formula  
  res.json({formula: formula , resultado: resultado})
  console.log('aqui desde post id')
})   
    */  
app.use("/",routes());       
app.listen(3000);  
    
          
             