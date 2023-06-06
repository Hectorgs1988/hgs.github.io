let listaCompra = [];

class Producto {
    constructor(nombre, tipo, enlace){
        this.nombre = nombre;
        this.tipo = tipo;
        this.enlace = enlace;
    }
    
    // Métodos getter
    getNombre() {
        return this.nombre;
    }

    getTipo(){
        return this.tipo;
    }

    getEnlace(){
        return this.enlace;
    }

    // Metodos setter
    setNombre(nombre){
        this.nombre = nombre;
    }

    setTipo(tipo){
        this.tipo = tipo;
    }

    setEnlace(enlace){
        this.enlace = enlace;
    }
}

// Crea un array de productos
let productos = [
    //Categoria Frutas y vegetales
    new Producto("Manzana", "Frutas y vegetales", "img/manzana.jpg"),
    new Producto("Naranja", "Frutas y vegetales", "img/naranja.jpg"),
    new Producto("Pera", "Frutas y vegetales", "img/pera.jpg"),
    new Producto("Sandia", "Frutas y vegetales", "img/sandia.jpg"),


    // Categoria Panes y pastas
    new Producto("Barra", "Panes y pastas", "img/barra.jpg"),
    new Producto("Hogaza", "Panes y pastas", "img/hogaza.jpg"),
    new Producto("Pastas de te", "Panes y pastas", "img/pastasTe.jpg"),
    new Producto("Croissant", "Panes y pastas", "img/croissant.jpg"),

    // Categoria Leche y quesos
    new Producto("Leche", "Leche y quesos", "img/leche.jpg"),
    new Producto("Rulo de queso de cabra", "Leche y quesos", "img/quesoCabra.jpg"),
    new Producto("Cuajada", "Leche y quesos", "img/cuajada.jpg"),

    // Categoria Carne y pescado
    new Producto("Filete", "Carne y pescado", "img/leche.jpg"),

    // Categoria Cereales y pastas
    new Producto("Cereales", "Cereales y pastas", "img/espagueti.jpg"),


];

// Obtén una referencia al div de categorías
let divCategorias = document.getElementById("categorias");

// Crea un array para almacenar las categorías de productos únicas
let categorias = [];

// Llena el array de categorías con las categorías de productos únicas
productos.forEach(producto => {
    if (!categorias.includes(producto.getTipo())) {
        categorias.push(producto.getTipo());
    }
});

// Crea un botón para cada categoría y añádelo al div de categorías
categorias.forEach(categoria => {
    let botonCategoria = document.createElement("button");
    botonCategoria.innerText = categoria;

    // Añade un evento de clic al botón
    botonCategoria.addEventListener("click", function() {
        mostrarProductos(categoria);
    });

    divCategorias.appendChild(botonCategoria);
});


function mostrarProductos(categoria) {
    // Obtén una referencia al div de productos
    let divProductos = document.getElementById("productos");

    // Limpia el div de productos
    divProductos.innerHTML = "";

    // Muestra los productos de la categoría seleccionada
    productos.filter(producto => producto.getTipo() === categoria).forEach(producto => {
        let imgProducto = document.createElement("img");
        imgProducto.src = producto.getEnlace();
        imgProducto.alt = producto.getNombre();

        // Añade un evento de clic a la imagen del producto
        imgProducto.addEventListener("click", function() {
            let cantidad = prompt("¿Cuántas unidades de este producto quieres?", "1");

            // Aquí puedes añadir el producto y la cantidad seleccionada a la lista de la compra del usuario
            if (cantidad !== null) {
                let productoCompra = { producto: producto.getNombre(), cantidad: cantidad };
                listaCompra.push(productoCompra);
                localStorage.setItem('listaCompra', JSON.stringify(listaCompra));
            }
        });

        divProductos.appendChild(imgProducto);
    });
}



// Asegúrate de que tu DOM está completamente cargado antes de intentar seleccionar elementos o añadir manejadores de eventos
document.addEventListener("DOMContentLoaded", function() {

    document.getElementById("guardar").addEventListener("click", function() {
        let now = new Date();
        let formattedDate = now.toISOString();
        let listaCompraConFecha = {fecha: formattedDate, productos: listaCompra};
        localStorage.setItem(formattedDate, JSON.stringify(listaCompraConFecha));
        listaCompra = [];
        console.log('Lista de la compra guardada');
        console.log(localStorage);
    });
    


    document.getElementById("mostrar").addEventListener("click", function() {
        // Obtener todas las claves de localStorage
        let keys = Object.keys(localStorage);
    
        // Filtrar solo las claves que tienen formato de fecha ISO
        let listKeys = keys.filter(key => {
            return /\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}.\d{3}Z/.test(key);
        });
    
        // Si no hay ninguna lista guardada
        if (listKeys.length === 0) {
            console.log('No hay ninguna lista guardada.');
            return;
        }
    
        // Ordenar las claves en orden descendente
        listKeys.sort().reverse();
    
        // Obtener la última lista de la compra
        let ultimaListaCompra = JSON.parse(localStorage.getItem(listKeys[0]));
    
        console.log(ultimaListaCompra);
    });

    

    document.getElementById("listasBoton").addEventListener("click", function() {
        let divListas = document.getElementById('displayListas');
        divListas.innerHTML = "";  // Limpia el div antes de agregar nuevas listas

        let listas = Object.keys(localStorage).sort().reverse(); // Ordena las claves (fechas) en orden descendente

        listas.forEach(lista => {
            let listaCompra = JSON.parse(localStorage.getItem(lista));

            // Comprueba si hay una lista guardada y si tiene productos
            if (listaCompra && listaCompra.productos) {
                let pFecha = document.createElement('p');
                let fecha = new Date(listaCompra.fecha);
                pFecha.textContent = `Fecha: ${fecha.getFullYear()}-${(fecha.getMonth()+1).toString().padStart(2, '0')}-${fecha.getDate().toString().padStart(2, '0')} ${fecha.getHours().toString().padStart(2, '0')}:${fecha.getMinutes().toString().padStart(2, '0')}`;
                divListas.appendChild(pFecha);

                listaCompra.productos.forEach(item => {
                    let pItem = document.createElement('p');
                    pItem.textContent = `Producto: ${item.producto}, Cantidad: ${item.cantidad}`; // Corregido item[0] y item[1] por item.producto y item.cantidad
                    divListas.appendChild(pItem);
                });

                let separator = document.createElement('hr'); // Agrega una línea horizontal entre las listas
                divListas.appendChild(separator);
            } else {
                console.log("No hay listas guardadas");
            }
        });
    });


    


});






