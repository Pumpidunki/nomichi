

// Variables para almacenar la posición del ratón y el elemento seleccionado
let newX = 0, newY = 0, startX = 0, startY = 0;
let elementoSeleccionado = null;
let estadoCajas = {
    caja1: false,
    caja2: false,
    caja3: false,
    caja4: false,
    caja5: false,
    caja6: false,
    caja7: false,
    caja8: false,
    caja9: false,
    caja10: false
};

// Función para iniciar el arrastre
function mouseDown(e) {
    // Establecer el elemento seleccionado y la posición inicial del ratón
    elementoSeleccionado = e.target;
    const idElemento = elementoSeleccionado.id;

        // Establecer el z-index según el ID del elemento
    switch (idElemento) {
        case 'celeste':
            elementoSeleccionado.style.zIndex = 1;
            break;
        case 'rosa':
            elementoSeleccionado.style.zIndex = 2;
            break;
        case 'rojo':
            elementoSeleccionado.style.zIndex = 3;
            break;
        case 'naranja':
            elementoSeleccionado.style.zIndex = 4;
            break;
        case 'amarillo':
            elementoSeleccionado.style.zIndex = 5;
            break;
        case 'verde':
            elementoSeleccionado.style.zIndex = 6;
            break;
        case 'azulclaro':
            elementoSeleccionado.style.zIndex = 7;
            break;
        case 'violeta':
            elementoSeleccionado.style.zIndex = 8;
            break;
        case 'michi':
            elementoSeleccionado.style.zIndex = 9;
            break;
        case 'nothing':
            elementoSeleccionado.style.zIndex = 10;
            break;
        case 'special':
            elementoSeleccionado.style.zIndex = 11;
            break;
            // Añadir más casos si hay más IDs
        }

    startX = e.clientX;
    startY = e.clientY;


    // Añadir los eventos de movimiento y finalización del arrastre
    document.addEventListener('mousemove', mouseMove);
    document.addEventListener('mouseup', mouseUp);
}

// Función para manejar el movimiento del ratón
function mouseMove(e) {
    // Calcular la nueva posición del ratón
    newX = startX - e.clientX;
    newY = startY - e.clientY;

    // Actualizar la posición inicial del ratón
    startX = e.clientX;
    startY = e.clientY;

    // Mover el elemento seleccionado a la nueva posición
    elementoSeleccionado.style.top = (elementoSeleccionado.offsetTop - newY) + 'px';
    elementoSeleccionado.style.left = (elementoSeleccionado.offsetLeft - newX) + 'px';
}

// Función para finalizar el arrastre
function mouseUp(e) {
    // Eliminar los eventos de movimiento y finalización del arrastre
    document.removeEventListener('mousemove', mouseMove);
    elementoSeleccionado = e.target;
    const cajas = document.querySelectorAll('.caja');
    
    // Iterar sobre todas las cajas para verificar si el elemento arrastrable está dentro de alguna
    cajas.forEach(caja => {
        const idCaja = caja.id; // Usar el ID de la caja
        const rectCaja = caja.getBoundingClientRect();
        const rectArrastrable = elementoSeleccionado.getBoundingClientRect();

        // Verificar si el elemento arrastrable está dentro de los límites de la caja
        if (
            rectArrastrable.left >= rectCaja.left &&
            rectArrastrable.right <= rectCaja.right &&
            rectArrastrable.top >= rectCaja.top &&
            rectArrastrable.bottom <= rectCaja.bottom
        ) {
            // Si el elemento está dentro de una caja, actualizamos la variable correspondiente a true
            estadoCajas[idCaja] = true;
        }
    });

    // Llamar a la función que verifica si todas las cajas tienen un elemento y muestra la div especial
    verificarCajas();
}

// Función para verificar si todas las cajas están en true y mostrar la div especial
function verificarCajas() {
    const todasEnCaja = Object.values(estadoCajas).every(estado => estado);
    const divEspecial = document.getElementById('special');

    if (todasEnCaja) {
        divEspecial.style.display = 'block';
    } else {
        divEspecial.style.display = 'none';
    }
    console.log(estadoCajas)
}
// Añadir el evento mousedown a todos los elementos con la clase 'arrastrable'
document.querySelectorAll('.arrastrable').forEach(el => {
    el.addEventListener('mousedown', mouseDown);
});