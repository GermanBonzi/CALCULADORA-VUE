const calculadora = require('../model/calculadoraDB')

let resultado=''
let formula=''
let nombre =''

exports.insertarCalculo = async function(req,res){
    console.log(req.body.resultado)
    resultado=eval(req.body.formula)
    formula = req.body.formula
    nombre = req.body.nombre
    const calculo = new calculadora({formula: formula, resultado: resultado, nombre: nombre})
    try{
        await calculo.save()
        res.json({mensaje:'el calculo se agrego correctamente'})
    }catch(error){
        console.log(error)
        
    } 
}
 

exports.obtenerCalculos = async function(req,res){
   
    let buscado = req.params.nombre
    try{
        const calculoConsulta = await calculadora.find({})
        for(let i=0; i<calculoConsulta.length;i++){
            if (buscado===calculoConsulta[i].nombre){
              console.log('encontrado')
              res.json(calculoConsulta[i])
              console.log('buscado:')
              console.log(buscado)
              console.log(calculoConsulta[i].formula+'='+calculoConsulta[i].resultado)
            }  
          }
    
    }catch(error){
        console.log(error)
        
    }
}
 

exports.obtenerCalculoId = async function(req,res){
    try{
        const calculoId = await calculadora.find(req.body.nombre)
        res.json(calculoId)
        console.log(calculoId.nombre)
    }catch(error){
        console.log(error)
    }
} 