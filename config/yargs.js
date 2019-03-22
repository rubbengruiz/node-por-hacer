const description = {
    demand: true,
    alias: 'd'
};

const completado = {
    alias: 'c',
    default: true
}

const argv = require('yargs')
    .command('crear', 'Crear una tarea por hacer', {
        description
    })
    .command('actualizar', 'Actualiza el estado compleado de una tarea', {
        description,
        completado
    })
    .command('borrar', 'Elimina una tarea de la BD', {
        description
    })
    .help()
    .argv;

module.exports = {
    argv
}