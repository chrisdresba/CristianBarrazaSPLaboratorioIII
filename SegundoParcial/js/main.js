function $(valorId) {
    return document.getElementById(valorId);
}

class Persona {

    constructor(id, p_nombre, p_apellido) {
        this.id = id || "N/C";
        this.nombre = p_nombre || "N/C";
        this.apellido = p_apellido || "N/C";
    }
}

class Cliente extends Persona {

    constructor(id, nombre, apellido, sexo, edad) {
        super(id, nombre, apellido);
        this.sexo = sexo || "N/C";
        this.edad = edad || "N/C";
    }
}

//Variables
let personas;


function CargarTabla(personas) {

    removerListado($("listado"));
    let tabla = $("tabla");

    if (tabla == null) {
        tabla = document.createElement("table");
        tabla.setAttribute("id", "tabla");
        tabla.setAttribute("class", "grilla");
        let contenedor = $("listado");
        contenedor.appendChild(tabla);

        let fila = document.createElement("tr");
        fila.setAttribute("id", "cabecera");

        if ($("chk_nombre").checked == true) {
            let auxNombre = document.createElement("th");
            let txt = document.createTextNode("Nombre");
            auxNombre.appendChild(txt);
            fila.appendChild(auxNombre);
        }

        if ($("chk_apellido").checked == true) {
            let auxApellido = document.createElement("th");
            let txt = document.createTextNode("Apellido");
            auxApellido.appendChild(txt);
            fila.appendChild(auxApellido);
        }

        if ($("chk_sexo").checked == true) {
            let auxSexo = document.createElement("th");
            let txt = document.createTextNode("Sexo");
            auxSexo.appendChild(txt);
            fila.appendChild(auxSexo);
        }

        if ($("chk_edad").checked == true) {
            let auxEdad = document.createElement("th");
            let txt = document.createTextNode("Edad");
            auxEdad.appendChild(txt);
            fila.appendChild(auxEdad);
        }

        tabla.appendChild(fila);

    }

    personas.forEach((persona) => {
        let fila = document.createElement("tr");
        fila.setAttribute("id", persona.id);

        if ($("chk_nombre").checked == true) {
            let celda = document.createElement("td");
            celda.appendChild(document.createTextNode(persona.nombre))
            fila.appendChild(celda);
        }

        if ($("chk_apellido").checked == true) {
            let celda = document.createElement("td");
            celda.appendChild(document.createTextNode(persona.apellido))
            fila.appendChild(celda);
        }

        if ($("chk_sexo").checked == true) {
            let celda = document.createElement("td");
            celda.appendChild(document.createTextNode(persona.sexo));
            fila.appendChild(celda);
        }

        if ($("chk_edad").checked == true) {
            let celda = document.createElement("td");
            celda.appendChild(document.createTextNode(persona.edad));
            fila.appendChild(celda);
        }

        fila.addEventListener("dblclick", cargaFormulario);

        tabla.appendChild(fila);
    });

    $("listado").appendChild(tabla);

}

async function GetPersonas() {
    try {
        let respuesta = await fetch("http://localhost:3001/clientes", { method: 'GET', headers: { 'Content-Type': 'application/json' } });

        if (respuesta.status == 200 && respuesta.ok) {
            respuesta.json().then(elementos => {
                personas = new Array();
                TraerPersonas(elementos);
                CargarTabla(personas);
            });
        }
    } catch (error) {
        console.log("Con Error:" + error);

    }
}

function TraerPersonas(elementos) {

    elementos.forEach(item => {
        let p = new Cliente(item.id, item.nombre, item.apellido, item.sexo, item.edad);
        personas.push(p);
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
        if (item.id > idMax) {
            //  idMax = item.id;
            return item.id;;
        } else {
            return idMax;
        }
    }, 0);

};



function agregarPersonasPorId(id) {

    if (ValidarCampos()) {
        let nombre = $("txtNombre").value;
        let apellido = $("txtApellido").value;
        let edad = $("txtEdad").value;
        let sexo = $("sexo").value;

        let persona = new Cliente(id, nombre, apellido, sexo, edad);
        personas.push(persona);
    }

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

function crearPersonaPorId(id) {

    let nombre = $("txtNombre").value;
    let apellido = $("txtApellido").value;
    let sexo = $("sexo").value;
    let edad = $("txtEdad").value;

    if (ValidarCampos()) {

        let persona = new Cliente(id, nombre, apellido, sexo, edad);
        return persona;
    }

}

function EliminarFila() {

    let persona = jsonEliminar();
    RemoverDelListado(persona);
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

    let json = { "id": id };

    return json;

}

function eliminarElemento() {
    let id = $("txtNombre").getAttribute("user");
    let fila = $(id);
    let tabla = $("tabla");
    tabla.removeChild(fila);
}


function FiltrarClientes() {

    if ($("filtros").value == "0") {
        return personas;
    }

    if ($("filtros").value == "1") {

        return personas.filter(e => {
            return e.sexo == "Male";
        })
    }

    if ($("filtros").value == "2") {
        return personas.filter(e => {
            return e.sexo == "Female";
        })
    }

};

function filtrarListado() {
    let listado = FiltrarClientes();
    CargarTabla(listado);
}

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

function removerListado(nodo) {

    while (nodo.firstChild) {
        nodo.removeChild(nodo.firstChild);
    }
}


function PromedioEdad() {

    let p = FiltrarClientes();
    return (p.reduce(function (total, item) {
        return total += item.edad;
    }, 0) / p.length).toFixed(2);

};

window.addEventListener("load", () => {

    GetPersonas(); //async funcion + fetch 

    $("btnAgregar").addEventListener("click", (e) => {

        if (ValidarCampos()) {
            let id = mayorId();
            console.log(id);
            id++;
            let persona = crearPersonaPorId(id);
            personas.push(persona);
            CargarTabla(personas);
        }

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

        let listaAuxiliar;
        listaAuxiliar = FiltrarClientes();
        limpiarTabla();
        CargarTabla(listaAuxiliar);
    });

    $("chk_nombre").addEventListener("change", filtrarListado);
    $("chk_apellido").addEventListener("change", filtrarListado);
    $("chk_edad").addEventListener("change", filtrarListado);
    $("chk_sexo").addEventListener("change", filtrarListado);

});