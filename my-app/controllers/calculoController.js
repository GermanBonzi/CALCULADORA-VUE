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
 

exports.obtenerCalculos = async function(req,res,next){
    try{
        calculoConsulta = await calculadora.find({})
        res.json(calculoConsulta)
    
    }catch(error){
        console.log(error)
        next()
    }
}
 

exports.obtenerCalculoId = async function(req,res){
    try{
        const calculoId = await calculadora.findById(req.params.id)
        res.json(calculoId)
        console.log(calculoId.nombre)
    }catch(error){
        console.log(error)
    }
}