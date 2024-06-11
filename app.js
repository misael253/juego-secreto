let numeroSecreto = 0;
let intentos = 0;
let listaNumerosSorteados =[];
let numeroMaximo = 10;
condicionesIniciales();
console.log(numeroSecreto);

function asignarTextoElemento(elemento, texto){
    let elementoHTML = document.querySelector(elemento);
    elementoHTML.innerHTML = texto;
}

function verificarIntento(){
    let numeroDeUsuario = parseInt(document.getElementById('valorUsuario').value);
    if (numeroDeUsuario === numeroSecreto){
        asignarTextoElemento('p', `Acertaste el número secreto y lo hiciste en ${(intentos == 1) ? `${intentos} vez` : `${intentos} veces`}` );
        //Habilitamos el boton nuevo juego
        document.getElementById('reiniciar').removeAttribute('disabled');
        //desahabilitamos el boton intentar
        document.querySelector('#intentar').setAttribute('disabled', 'true');
    } else {
        //Cuando el usuario no acerta
        if (numeroDeUsuario > numeroSecreto){ 
            asignarTextoElemento('p','El numero secreto es menor');
        } else {
             asignarTextoElemento('p','El numero secreto es mayor');
            }   
        intentos++;  
        limpiarCaja();  
    }
    return;
}

function condicionesIniciales(){
    //desabilitamos el boton nuevo juego
    document.getElementById('reiniciar').setAttribute('disabled','true');
    asignarTextoElemento('h1', 'Juego del número secreto!');
    asignarTextoElemento('p', `Indica un número del 1 al ${numeroMaximo}`);
    numeroSecreto = generarNumeroSecreto();
    intentos = 1;
}

//Esta funcion realiza la tarea de reiniciar el juego
function reiniciarJuegos(){
    //habilitamos el boton intentar
    document.getElementById('intentar').removeAttribute('disabled');
    limpiarCaja();
    condicionesIniciales();
}

//Esta funcion se utiliza para limpiar la caja de texto
function limpiarCaja(){
    document.querySelector('#valorUsuario').value = '';  
}

//Esta funcion se utiliza para generar un numero aleatorio
function generarNumeroSecreto(){
    let numeroGenerado = Math.floor(Math.random() * numeroMaximo)+1;
    console.log(`numero generado ${numeroGenerado}`);
    console.log(`lista ${listaNumerosSorteados}`);
    //Si ya sorteamos todos los numeros, hacer que el usuario no pueda jugar
    if(listaNumerosSorteados.length == numeroMaximo){
        desabilitarJuego();
    } else { 
        //if el numero generado esta incluido en la lista
        if(listaNumerosSorteados.includes(numeroGenerado)){
            //recursividad
            return generarNumeroSecreto();
        } else {
            listaNumerosSorteados.push(numeroGenerado);
            return numeroGenerado; 
        }
    }

//Esta funcion desabilita todo el juego
function desabilitarJuego(){
    asignarTextoElemento('h1', 'JUEGO COMPLETADO');
    asignarTextoElemento('p',' Ya se sortearon todos los numeros posibles');
    document.getElementById('reiniciar').setAttribute('disabled', 'true');
    document.getElementById('intentar').setAttribute('disabled','true');
    document.getElementById('valorUsuario').setAttribute('disabled','true');
}


}