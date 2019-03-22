const argv = require('./config/yargs').argv;
const porHacer = require('./to-do/to-do');
const colors = require('colors');

let comando = argv._[0];

switch (comando) {
    case 'crear':
        porHacer.crear(argv.description);
        break;

    case 'listar':
        let listado = porHacer.getListado();

        for (let tarea of listado) {
            console.log("=========== TO DO ============".green);
            console.log("Tarea: ", tarea.description);
            console.log("Estado: ", tarea.completado);
            console.log("==============================".green);
        }
        break;

    case 'actualizar':
        let actualizado = porHacer.actualizar(argv.description, argv.completado);
        break;

    case 'borrar':
        let borrado = porHacer.borrar(argv.description);
        break;

    default:
        console.log('Comando no es reconocido');
        break;
}