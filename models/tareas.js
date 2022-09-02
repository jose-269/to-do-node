
/**
 * _listado: 
 *      {  'uuid-123712-123123-2: { id:12, desc:asd,completadoEn:92231 } }
 *      {  'uuid-123712-123123-2: { id:12, desc:asd,completadoEn:92231 } }
 *      {  'uuid-123712-123123-2: { id:12, desc:asd,completadoEn:92231 } }
 */
 require('colors');

const Tarea = require('./tarea');


class Tareas {

  _listado = {};

  get listadoArr() {
    const listado = [];
    Object.keys(this._listado).forEach( key => {
      const tarea = this._listado[key];
      listado.push(tarea);
    })

    return listado;
  }

  constructor() {
    this._listado = {};
  };

  cargarTareasFromArray(tareas = []) {
    tareas.forEach(tarea => {
      this._listado[tarea.id] = tarea;
    });
  };

  crearTarea( desc= '') {
    const tarea = new Tarea(desc);
    this._listado[tarea.id] = tarea;
  };

  listadoCompleto() {
    // console.log(this._listado);
    // 1: en verde
    // Completada: rojo
    // 1. Alma :: Completada | Pendiente

    // 1. Alma :: Completada | Pendiente
    // 2. Alma :: Completada | Pendiente
    // 3. Alma :: Completada | Pendiente
    console.log();
    this.listadoArr.forEach((tarea, i) => {
      const indx = `${i + 1}`.green;
      let { desc, completadoEn } = tarea;
      const estado = (completadoEn) ? completadoEn = 'Completado'.green : completadoEn = 'Pendiente'.red
      
      console.log(
        `${indx} ${desc} :: ${estado}`

      );
    })



  }

};

module.exports = Tareas;