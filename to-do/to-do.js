const fs = require('fs');
const colors = require('colors/safe');

let listadoPorHacer = [];

const cargarDB = () => {
    try {
        listadoPorHacer = require('../db/data.json');
    } catch (error) {
        listadoPorHacer = [];
    }
}

const guardarDB = () => {
    return new Promise((resolve, reject) => {

        let data = JSON.stringify(listadoPorHacer);

        fs.writeFile(`./db/data.json`, data, (err) => {
            if (err)
                reject(err)
            else
                resolve(`data.json`);
        });
    });
}

const crear = (description) => {
    cargarDB();

    let porHacer = {
        description,
        completado: false
    };

    listadoPorHacer.push(porHacer);

    guardarDB()
        .then(archivo => console.log(`Archivo creado: `, colors.green(archivo)))
        .catch(e => console.log(e));
}

const getListado = () => {
    cargarDB();
    return listadoPorHacer;
}

const actualizar = (descripcion, completado = true) => {
    cargarDB();

    let index = listadoPorHacer.findIndex(tarea => tarea.description === descripcion);

    if (index >= 0) {
        listadoPorHacer[index].completado = completado;
        guardarDB()
            .then(archivo => console.log(`Tarea actualizada: ${colors.green(descripcion)}`))
            .catch(e => console.log(e));
    }
}

const borrar = (descripcion) => {
    cargarDB();

    let index = listadoPorHacer.findIndex(tarea => tarea.description === descripcion);

    if (index >= 0) {
        listadoPorHacer.splice(index, 1);
        guardarDB()
            .then(archivo => console.log(`Tarea eliminada: ${colors.green(descripcion)}`))
            .catch(e => console.log(e));
    } else
        console.log(`Error al eliminar la tarea: ${descripcion}`);
}

module.exports = {
    crear,
    getListado,
    actualizar,
    borrar
}