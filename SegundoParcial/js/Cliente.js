import Persona from './Persona.js';

class Cliente extends Persona{
    
    constructor (id,nombre, apellido,sexo,edad){
        super(id,nombre, apellido);
        this.sexo = sexo || "N/C"; 
        this.edad = edad || "N/C";
    }

    get sexo(){ 
        return this.sexo;
    }

    set sexo(valor){
        this.sexo = valor;
    }

    get edad(){ 
        return this.edad;
    }

    set edad(valor){
        this.edad = valor;
    }


    imprimirNombre(){
        console.log("Cliente: " + this.nombre + " Apellido: " + this.apellido);   
    }


}

export default Cliente;

