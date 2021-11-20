
function $(valorId) {
    return document.getElementById(valorId);
}

//Variables
let personas;


function construirTabla(persona) {

    let tabla = $("tabla");

    let fila = document.createElement("tr");
    fila.setAttribute("id", persona.id);
    fila.setAttribute("class", "nombre");
    let celda = document.createElement("td");
    celda.appendChild(document.createTextNode(persona.nombre))
    fila.appendChild(celda);
    fila.setAttribute("class", "apellido");
    celda = document.createElement("td");
    celda.appendChild(document.createTextNode(persona.apellido))
    fila.appendChild(celda);
    fila.setAttribute("class", "sexo");
    celda = document.createElement("td");
    celda.appendChild(document.createTextNode(persona.sexo));
    fila.appendChild(celda);
    fila.setAttribute("class", "edad");
    celda = document.createElement("td");
    celda.appendChild(document.createTextNode(persona.edad));
    fila.appendChild(celda);
    celda = document.createElement("td");
    fila.addEventListener("dblclick", cargaFormulario);

    tabla.appendChild(fila);

}

async function GetMaterias() {
    try {
        let respuesta = await fetch("http://localhost:3001/clientes", { method: 'GET', headers: { 'Content-Type': 'application/json' } });

        if (respuesta.status == 200 && respuesta.ok) {
            respuesta.json().then(elemento => {
                personas = elemento;
                CargarTabla(personas);
            });
        }
    } catch (error) {
        console.log("Con Error:" + error);

    }
}

function CargarTabla(personas) {

    personas.forEach((item) => {
        construirTabla(item);
    })

}


function cargaFormulario(e) {

    let formulario = $("formulario");
    let id = e.currentTarget.id;
    formulario.style.visibility = "visible";
    cargarPersonasPorId(id);

}

function cargarPersonasPorId(id) {

    personas.forEach((persona) => {

        if (persona.id.toString() == id) {
            $("txtId").value = persona.id;
            $("txtNombre").value = persona.nombre;
            $("txtApellido").value = persona.apellido;
            $("sexo").value = persona.sexo;
            $("txtEdad").value = persona.edad;

            $("txtNombre").setAttribute("user", persona.id);

            $("txtNombre").style.borderColor = "white";
            $("txtApellido").style.borderColor = "white";

        };
    })

}

function mayorId() {

    return personas.reduce((idMax, item) => {
        if (item.id > idMax.edad) {
            idMax.id = item.id;
            return idMax;
        } else {
            return idMax;
        }
    })
};


function agregarPersonasPorId(id) {

    let nombre = $("txtNombre").value;
    let apellido = $("txtApellido").value;
    let edad = $("txtEdad").value;
    let sexo = $("sexo").value;

    let persona = new Cliente(id, nombre, apellido, sexo, edad);
    personas.push(persona);

}

function ValidarCampos() {

    let retorno = true;

    if ($("txtNombre").value.length <= 6) {

        $("txtNombre").style.borderColor = "red";
        retorno = false;
    } else {
        $("txtNombre").style.borderColor = "green";
    }

    if ($("txtApellido").value.length <= 6) {

        $("txtApellido").style.borderColor = "red";
        retorno = false;
    } else {
        $("txtApellido").style.borderColor = "green";
    }

    return retorno;

}


function generarJson(id) {

    let nombre = $("txtNombre").value;
    let apellido = $("txtApellido").value;
    let sexo = $("sexo").value;
    let edad = $("txtEdad").value;

    if (ValidarCampos()) {

        let jsonPersona = { "id": id, "nombre": nombre, "apellido": apellido, "sexo": sexo, "edad": edad };
        return jsonPersona;

    }

}



function EliminarFila() {

    let persona = jsonEliminar();
    RemoverDelListado(persona.id);
    eliminarElemento();
}

function actualizarListado(object) {

    for (let i = 0; i < materias.length; i++) {
        if (object.id == materias[i].id) {
            materias[i].nombre = object.nombre;
            materias[i].fechaFinal = object.fechaFinal;
            materias[i].turno = object.turno;
        }
    };

}

function RemoverDelListado(object) {

    for (let i = 0; i < personas.length; i++) {
        if (object.id == personas[i].id) {
            personas.splice(i, 1);
        }
    }
}

function jsonEliminar() {

    let id = $("txtNombre").getAttribute("user");

    let jsonMateria = { "id": id };

    return jsonMateria;

}

function eliminarElemento() {
    let id = $("txtNombre").getAttribute("user");
    let fila = $(id);
    let tabla = $("tabla");
    tabla.removeChild(fila);
}


function Filtrado(dato) {

    return personas.filter(function (item) {
        return item.sexo == dato;
    })

};

function FallaPeticion(mensaje) {
    console.log(mensaje);
}

function limpiarTabla() {

    let tabla = $('tabla');
    let filasCount = tabla.rows.length;
    for (var i = 1; i < filasCount; i++) {
        tabla.deleteRow(1);
    }

}

function PromedioEdad() {

    return (personas.reduce(function (total, item) {
        return total += item.edad;
    }, 0) / personas.length).toFixed(2);

};

window.addEventListener("load", () => {

    GetMaterias(); //async funcion + fetch 

    $("btnAgregar").addEventListener("click", (e) => {

        let id = mayorId();
        id++;
        let persona = generarJson(id);
        personas.push(persona);
        limpiarTabla();
        CargarTabla(personas);

    });

    $("btnEliminar").addEventListener("click", (e) => {

        EliminarFila();//async funcion + fetch 
    });

    $("btnLimpiar").addEventListener("click", () => {
        limpiarTabla();
    });

    $("btnPromedio").addEventListener("click", () => {
        $("promEdad").value = PromedioEdad();
    });

    $("filtros").addEventListener("click", () => {

            limpiarTabla();
            let listaAuxiliar;
            listaAuxiliar = Filtrado($("filtros").value);
            limpiarTabla();
            if (listaAuxiliar != 0) {
                CargarTabla(listaAuxiliar);
            } else {
                CargarTabla(personas);
            }

    });

});

