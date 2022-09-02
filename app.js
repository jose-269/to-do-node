const { guardarDB, leerDB } = require('./helpers/guardarArchivo');
const { 
  inquirerMenu, 
  pausa, 
  leerInput ,
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
        // console.log( tareas.listadoArr );
      break;
    };

    guardarDB(tareas.listadoArr);
    await pausa();
    
   } while ( opt !== '0');



 

};

main()