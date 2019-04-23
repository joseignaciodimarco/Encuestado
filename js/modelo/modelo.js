/*
 * Modelo
 */
var Modelo = function() {
  this.preguntas = [];
  this.ultimoId = 0;

  //inicializacion de eventos
  this.preguntaAgregada = new Evento(this);
  this.preguntaEliminada = new Evento(this);
  this.borraPreguntas = new Evento(this);
  this.editaPregunta = new Evento(this);
};

Modelo.prototype = {
  //se obtiene el id más grande asignado a una pregunta
  obtenerUltimoId: function() {
      if(this.preguntas.length ===0){
        return 0;
      }else{
        return this.preguntas[this.preguntas.length-1].id
      }
  },

  //se agrega una pregunta dado un nombre y sus respuestas
  agregarPregunta: function(nombre, respuestas) {
    var id = this.obtenerUltimoId();
    id++;
    var nuevaPregunta = {'textoPregunta': nombre, 'id': id, 'cantidadPorRespuesta': respuestas};
    this.preguntas.push(nuevaPregunta);
    this.guardar();
    this.preguntaAgregada.notificar();
  },

  //se guardan las preguntas
  guardar: function(){
    localStorage.setItem("preguntas", JSON.stringify(this.preguntas));
  },

  borrarPregunta: function(id){
    this.preguntas.splice(id-1, 1);
    this.preguntaEliminada.notificar();
    this.guardar();
  },

  borrarTodo: function(){
    this.preguntas = [];
    this.borraPreguntas.notificar();
    this.guardar();
  },

  editarPregunta: function(id){
    let nuevoTexto = prompt('Ingrese el nuevo texto de pregunta');
    this.preguntas[id-1].textoPregunta = nuevoTexto;
    this.editaPregunta.notificar();
    this.guardar();
  },

  sumarVoto: function(idPregunta, idRespuesta){
    //console.log('pregunta ->',  this.preguntas[id-1].cantidadPorRespuesta[0]);
  }
};
