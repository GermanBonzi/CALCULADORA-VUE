<template>
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
</template>

<script>

import axios from 'axios'

export default {
  data() {
    return {
     formula:'',
     resultado:0
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

    masmenos(){
      this.formula=this.formula.charAt(0) === '-' ?
      this.formula.slice(1) : `-${this.formula}`;
    },

    
    punto(){
      if(this.formula.indexOf('.')===-1){
        this.operacion('.')
      }
    },

     igual(){
      console.log("equal..");
      /*this.resultado = eval(this.formula);*/
      /* console.log("this.formula:");
       console.log(this.formula);
       console.log(this.resultado)*/
       let _this=this;
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
                        });


 
/*llave del methods */
    }
  }
};
</script>

<style scoped>
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
</style>