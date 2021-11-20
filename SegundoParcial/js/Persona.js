export default class Persona{
    
    constructor (id,p_nombre, p_apellido){
        this.id = id||"N/C";
        this.nombre = p_nombre||"N/C";
        this.apellido = p_apellido||"N/C";
    }

    get id(){ 
        return this.id;
    }

    set id(valor){
        this.id = valor;
    }

    get nombre(){ 
        return this.nombre;
    }

    set nombre(valor){
        this.nombre = valor;
    }

    get apellido(){ 
        return this.apellido;
    }

    set apellido(valor){
        this.apellido = valor;
    }

}
