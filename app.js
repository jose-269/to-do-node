const { guardarDB, leerDB } = require('./helpers/guardarArchivo');
const { 
  inquirerMenu, 
  pausa, 
  leerInput ,
  listadoTareasBorrar,
  confirmar,
  mostrarListadoChecklist
} = require('./helpers/inquirer');

const Tareas = require('./models/tareas');

require('colors');



const main = async () => {

  let opt = '';
  const tareas = new Tareas();

  const tareasDB = leerDB();

  if(tareasDB) {
    tareas.cargarTareasFromArray(tareasDB);
  }

   do {
    // Imprimir el menu
    opt = await inquirerMenu(); 
    // console.log({ opt });

    switch (opt) {
      case '1':
        const desc = await leerInput('Descripcion: ');
        tareas.crearTarea(desc);
        // console.log(desc);
      break;
      case '2':
        tareas.listadoCompleto();
      break;
      case '3':
        tareas.listarPendientesCompletadas(true);
      break;
      case '4':
        tareas.listarPendientesCompletadas(false);
      break;
      case '5': //completado o pendiente
        const ids = await mostrarListadoChecklist(tareas.listadoArr);
        tareas.toggleCompletadas( ids )
      break;

      case '6': //borrar
        const id = await listadoTareasBorrar( tareas.listadoArr );
        if(id !== '0') {
          const ok = await confirmar('¿Está seguro?');
          if ( ok ) {
            tareas.borrarTarea( id );
            console.log('Tarea Borrada');
          }
        }
      break;
    };

    guardarDB(tareas.listadoArr);
    await pausa();
    
   } while ( opt !== '0');



 

};

main()