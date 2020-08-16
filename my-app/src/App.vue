<template>
  <div id="app">
  <div class='calculadora' onselectstart='return false'>
    <div class='display'>{{this.formula || '0'}}</div>
    <div class='display'>{{this.resultado || '0'}}</div>
    <div @click='limpiar' class='button darker'>C</div>
    <div @click="masmenos" class='button darker'>+/-</div>
    <div @click="limpiarResultado" class='button darker'>CE</div>
    <div @click="operacion('/')" class='button operator'>÷</div>
    <div @click="operacion(7)" class='button'>7</div>
    <div @click="operacion(8)" class='button'>8</div>
    <div @click="operacion(9)" class='button'>9</div>
    <div @click="operacion('*')" class='button operator'>x</div>
    <div @click="operacion(4)" class='button'>4</div>
    <div @click="operacion(5)" class='button'>5</div>
    <div @click="operacion(6)" class='button'>6</div>
    <div @click="operacion('-')" class='button operator'>-</div>
    <div @click="operacion(1)" class='button'>1</div>
    <div @click="operacion(2)" class='button'>2</div>
    <div @click="operacion(3)" class='button'>3</div>
    <div @click="operacion('+')" class='button operator'>+</div>
    <div @click="operacion(0)" class='button zero button-bottom'>0</div>
    <div @click="punto" class='button darker button-bottom'>.</div>
    <div @click="igual" class='button operator button-bottom'>=</div>
  </div>
 
  <div>
    <!--<button class="button operator" @click="guardar"> Guardar</button>-->
    <template>
      <button @click="verMas(formula,resultado,nombre)" class="button operator" style="width:150px;"  title="Ver Mas">DETALLES</button>
    </template>
    <transition v-if="showModal" class="animation fadeInLeft" name="modal">
      <div class="modal-mask">
        <div class="modal-wrapper">
          <div class="modal-container  animated fadeInLeft">
            <div class="modal-header" style="background-color:#424242; border-top-radius:5px;">
              <slot name="header">
                <h2 style="color:white; text-align:left;">
                  <i class="far fa-list-alt"></i>
                  Detalles
                </h2>
                <button class="modal-default-button" @click="cerrar()">
                 <i class="far fa-times-circle"></i>
                </button> 
              </slot>
            </div>
            <div class="modal-body" style="background-color:#f1f8e9;">
              <slot name="body">
                <b-row class="mb-1">
                  <p>formula</p>
                  <b-col cols="3">formula:</b-col>
                  <b-col>{{formula}}</b-col>
                </b-row>
                <hr>
                <b-row class="mb-1">
                  <b-col cols="3">resultado:</b-col>
                  <b-col>{{resultado}}</b-col>
                </b-row>
                <hr>
                <b-row class="mb-1">
                  <b-col cols="3">nombre:</b-col>
                  <input v-model="nombre">
                  <b-col>{{nombre}}</b-col>
                </b-row>
                <button class="button operator" @click="guardar"> Guardar</button>
              </slot>
            </div>
           </div>
          </div>
        </div>
    </transition>
  </div>
</div>
</template>

<script>

import axios from 'axios'
import BootstrapVue from 'bootstrap-vue'


export default {
  data() {
    return {
     formula:'',
     resultado:0,
     nombre:'',
     showModal: false
    }
  },
  methods: {
      operacion(elemento){
      console.log('operacion')
      this.formula+=elemento
    },

    limpiar(){
      this.formula=''
    },

    limpiarResultado(){
      this.resultado=0
    },

     verMas(formula,resultado,nombre) {
        this.showModal = true;
        formula = this.formula
        resultado = this.resultado
        nombre = this.nombre
     },

    masmenos(){
      this.formula=this.formula.charAt(0) === '-' ?
      this.formula.slice(1) : `-${this.formula}`;
    },

    guardar(){
      this.showModal=true
      this.resultado = eval(this.formula)
      console.log('guardar aqui')
      let _this=this;
       axios.post('http://localhost:3000/operacion',
                        {
                        formula:this.formula,
                        resultado:this.resultado,
                        nombre:this.nombre},
                        { headers: {
                          'Content-Type': 'application/json'
                        },
                        }).then(function(response){
                            console.log(response);
                            _this.resultado= response.data.resultado
                            _this.nombre = response.data.nombre
                            
                        }).catch(error=>{
                          console.log(error)
                        });

                
    },

    cerrar(){
      this.showModal=false
    },

    
    punto(){
      if(this.formula.indexOf('.')===-1){
        this.operacion('.')
      }
    },

    obtenercalculo(){
      let respuesta=''
      let _this=this;
       axios.get('http://localhost:3000/operacion/',
                        {
                        formula:this.formula},
                        { headers: {
                          'Content-Type': 'application/json'
                        },
                        }).then(function(response){
                            console.log(response);
                            respuesta=response.data
                            
                        }).catch(error=>{
                          console.log(error)
                        });
    },
  

     igual(){
      console.log("igual:");
      this.resultado = eval(this.formula)
       console.log("this.formula:");
       console.log(this.formula);
       console.log(this.resultado)
       /*let _this=this;
       axios.post('http://localhost:3000/operacion',
                        {
                        formula:this.formula},
                        { headers: {
                          'Content-Type': 'application/json'
                        },
                        }).then(function(response){
                            console.log(response);
                            _this.resultado=response.data.resultado
                            
                        }).catch(error=>{
                          console.log(error)
                        });*/


 
    }
  }
};
</script>

<style scoped>

.modal{
  margin: 50px;

}
.calculadora {
  margin: 0 auto;
  width: 80vw;
  font-size: 2rem;
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-auto-rows: minmax(10vh, auto);
  border: 5px solid #111;
  box-shadow: -3px 3px 15px rgba(17,17,17,0.4);
  line-height: 10vh;
}
.display {
  grid-column: 1 / 5;
  background: #ddd;
  border: 1px solid #111;
  border-top: 0;
  font-size: 2.5rem;
  cursor: default;
  overflow: hidden;
  text-overflow: ellipsis;
  padding: 0 1rem;
}
.zero {
  grid-column: 1 / 3;
}
.button {
  background: hsl(0, 0%, 80%);
  background: linear-gradient(15deg,hsl(0, 0%, 70%) 0%, hsl(0, 0%, 80%) 100%);
  border: 1px solid #111;
  cursor: pointer;
}
.button:active {
  outline:none;
  border: 1px solid #000000BF; 
  box-shadow: inset 0px 0px 5px #00000080; 
  -moz-box-shadow: inset 0px 0px 5px #00000080;
  -webkit-box-shadow: inset 0px 0px 5px #00000080;
}
.button-bottom {
  border-bottom: 0;
}
.operator {
  background: hsl(153, 48%, 49%);
  background: linear-gradient(15deg,hsl(153, 48%, 39%) 0%, hsl(153, 48%, 49%) 100%);
}
.darker {
  background: hsl(0, 0%, 70%);
  background: linear-gradient(15deg, hsl(0, 0%, 60%) 0%, hsl(0, 0%, 70%) 100%);
}
@media only screen and (min-width: 768px) {
  .calculator {
    width: 50vw;
    grid-auto-rows: minmax(7.5vh, auto);
    line-height: 7.5vh;
  }
}
@media only screen and (min-width: 1024px) {
  .calculator {
    width: 30vw;
  }
}
@media only screen and (min-width: 1280px) {
  .calculator {
    width: 20vw;
  }
}
@media only screen and (min-width: 1600px) {
  .calculator {
    width: 15vw;
  }
}


.modal-mask {
  position: fixed;
  z-index: 9998;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, .5);
  display: table;
  transition: opacity .3s ease;
}

.modal-wrapper {
  display: table-cell;
  vertical-align: middle;
}

.modal-container {
  width: 300px;
  margin: 0px auto;
  padding: 20px 30px;
  background-color: #fff;
  border-radius: 2px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, .33);
  transition: all .3s ease;
  font-family: Helvetica, Arial, sans-serif;
}

.modal-header h3 {
  margin-top: 0;
  color: #42b983;
}

.modal-body {
  margin: 20px 0;
}

.modal-default-button {
  float: right;
}

/*
 * The following styles are auto-applied to elements with
 * transition="modal" when their visibility is toggled
 * by Vue.js.
 *
 * You can easily play with the modal transition by editing
 * these styles.
 */

.modal-enter {
  opacity: 0;
}

.modal-leave-active {
  opacity: 0;
}

.modal-enter .modal-container,
.modal-leave-active .modal-container {
  -webkit-transform: scale(1.1);
  transform: scale(1.1);
}
</style>