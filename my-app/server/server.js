const express = require('express');
const BD = require('../model/calculadoraDB')
const bodyParser = require('body-parser');
const mongoose = require('mongoose')
const cors = require('cors');
const app = express();
const routes = require('../routes/index')
  
 
  
  
//let resultado=0;
//let formula ='';
 
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
 
      

//app.post('/operacion', (req, res) => {
    //console.log('calculo')
    /*console.log(eval(req.body.formula))*/
    //resultado=eval(req.body.formula)
    //formula = req.body.formula
    //console.log(formula)
    //console.log(resultado)
    //res.json({resultado: resultado, formula : formula})
    //res.json(formula) 
    //let bd = new BD({formula,resultado})    
    //bd.save() 
//});  
let resultado=0
let formula =''


app.post('/operacion/:id',(req,res)=>{
  console.log('id') 
  resultado = eval(req.body.formula)
  formula = req.body.formula  
  res.json({formula: formula , resultado: resultado})
})   
      
app.use("/",routes());       
app.listen(3000);  
    
        
             