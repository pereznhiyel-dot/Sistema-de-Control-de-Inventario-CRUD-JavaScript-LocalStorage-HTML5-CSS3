// ==========================================
// 1. CAPTURA DE ELEMENTOS DE LA PÁGINA (DOM)
// ==========================================
// Asignamos variables a los elementos del HTML para leer sus valores y modificar el contenido
const formulario = document.getElementById('formularioInventario');
const inputNombre = document.getElementById('nombre');
const inputPrecio = document.getElementById('precio');
const inputCantidad = document.getElementById('cantidad');
const tablaProductos = document.getElementById('tablaProductos');

// ==========================================
// 2. MANEJO DEL ESTADO Y LOCALSTORAGE
// ==========================================
// Intentamos obtener los productos guardados previamente en la memoria del navegador.
// Si no hay ningún registro ('null'), inicializamos la variable como un arreglo vacío [].
let productos = JSON.parse(localStorage.getItem('inventarioColegio')) || [];

// ==========================================
// 3. FUNCIÓN PARA PINTAR LOS DATOS EN LA TABLA
// ==========================================
function renderizarProductos() {
    // Vaciamos la tabla antes de volver a dibujar los datos para evitar registros duplicados
    tablaProductos.innerHTML = '';

    // Si la lista está vacía, mostramos un mensaje informativo dentro de la tabla
    if (productos.length === 0) {
        tablaProductos.innerHTML = `
            <tr>
                <td colspan="4" style="text-align: center; color: #888;">
                    No hay productos registrados en el inventario.
                </td>
            </tr>
        `;
        return;
    }

    // Recorremos el arreglo de productos utilizando forEach
    // 'producto' representa el objeto actual y 'indice' su posición en la lista (0, 1, 2...)
    productos.forEach((producto, indice) => {
        // Creamos una etiqueta de fila (<tr>)
        const fila = document.createElement('tr');

        // Formateamos el contenido HTML interno de la fila usando Template Literals (``)
        fila.innerHTML = `
            <td><strong>${producto.nombre}</strong></td>
            <td>₡${producto.precio.toLocaleString()}</td>
            <td>${producto.cantidad}</td>
            <td>
                <!-- Asignamos el índice correspondiente a la función de eliminación -->
                <button class="btn-eliminar" onclick="eliminarProducto(${indice})">
                    Eliminar
                </button>
            </td>
        `;

        // Insertamos la fila dentro del <tbody> de nuestra tabla
        tablaProductos.appendChild(fila);
    });

    // Guardamos el estado actual del arreglo en localStorage cada vez que la tabla se actualiza
    guardarDatosEnStorage();
}

// ==========================================
// 4. EVENTO AL ENVIAR EL FORMULARIO
// ==========================================
formulario.addEventListener('submit', function(evento) {
    // Prevenimos la acción por defecto del formulario (recargar la página completa)
    evento.preventDefault();

    // Extraemos y estructuramos los valores del formulario en un objeto JS
    const nuevoProducto = {
        nombre: inputNombre.value.trim(),
        precio: parseFloat(inputPrecio.value), // Convertimos la cadena de texto a número flotante
        cantidad: parseInt(inputCantidad.value) // Convertimos la cadena de texto a número entero
    };

    // Insertamos el nuevo objeto en nuestro arreglo global
    productos.push(nuevoProducto);

    // Actualizamos la tabla en pantalla
    renderizarProductos();

    // Limpiamos los campos del formulario para facilitar el siguiente ingreso
    formulario.reset();
    
    // Devolvemos el cursor automáticamente al primer campo del formulario
    inputNombre.focus();
});

// ==========================================
// 5. FUNCIÓN PARA ELIMINAR UN REGISTRO
// ==========================================
function eliminarProducto(posicion) {
    // Método splice: remueve 1 elemento a partir del índice numérico especificado
    productos.splice(posicion, 1);

    // Re-renderizamos la tabla para reflejar el cambio
    renderizarProductos();
}

// ==========================================
// 6. GUARDAR EN LA MEMORIA DEL NAVEGADOR
// ==========================================
function guardarDatosEnStorage() {
    // Convierte el arreglo de objetos JavaScript a formato texto (JSON string) para almacenarlo
    localStorage.setItem('inventarioColegio', JSON.stringify(productos));
}

// ==========================================
// 7. INICIALIZACIÓN
// ==========================================
// Ejecutamos el renderizado inicial al cargar la página para mostrar datos previos si existen
renderizarProductos();