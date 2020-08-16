const express = require("express");
const router = express.Router();

const calculoController = require('../controllers/calculoController')

module.exports = function(){
    router.post("/operacion",calculoController.insertarCalculo);

    router.get("/operacion", calculoController.obtenerCalculos);

    router.get("/operacion/:id", calculoController.obtenerCalculoId)

    return router
} 