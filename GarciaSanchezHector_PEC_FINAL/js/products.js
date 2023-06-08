let listaCompra = [];

class Producto {
    constructor(nombre, tipo, enlace) {
        this.nombre = nombre;
        this.tipo = tipo;
        this.enlace = enlace;
    }

    // Métodos getter
    getNombre() {
        return this.nombre;
    }

    getTipo() {
        return this.tipo;
    }

    getEnlace() {
        return this.enlace;
    }

    // Metodos setter
    setNombre(nombre) {
        this.nombre = nombre;
    }

    setTipo(tipo) {
        this.tipo = tipo;
    }

    setEnlace(enlace) {
        this.enlace = enlace;
    }
}

// Crea un array de productos
let productos = [
    //Categoria Frutas y vegetales
    new Producto("Manzana", "Frutas y vegetales", "img/manzana.jpg"),
    new Producto("Naranja", "Frutas y vegetales", "img/naranja.jpg"),
    new Producto("Pimiento rojo", "Frutas y vegetales", "img/pimiento.jpg"),
    new Producto("Calabacin", "Frutas y vegetales", "img/calabacin.jpg"),


    // Categoria Panes y pastas
    new Producto("Barra", "Panes y pastas", "img/barra.jpg"),
    new Producto("Hogaza", "Panes y pastas", "img/hogaza.jpg"),
    new Producto("Pastas de te", "Panes y pastas", "img/pastasTe.jpg"),
    new Producto("Croissant", "Panes y pastas", "img/croissant.jpg"),

    // Categoria Leche y quesos
    new Producto("Leche", "Leche y quesos", "img/leche.jpg"),
    new Producto("Rulo de queso de cabra", "Leche y quesos", "img/quesoCabra.jpg"),
    new Producto("Queso tierno", "Leche y quesos", "img/quesoTierno.jpg"),
    new Producto("Cuajada", "Leche y quesos", "img/cuajada.jpg"),

    // Categoria Carne y pescado
    new Producto("Filete de ternera", "Carne y pescado", "img/filete.jpg"),
    new Producto("Pollo", "Carne y pescado", "img/pollo.jpg"),
    new Producto("Lubina", "Carne y pescado", "img/lubina.jpg"),
    new Producto("Pulpo", "Carne y pescado", "img/pulpo.jpg"),

    // Categoria Cereales y pastas
    new Producto("Arroz", "Cereales y pastas", "img/arroz.jpg"),
    new Producto("Pasta fresca", "Cereales y pastas", "img/pastaFresca.jpg"),
    new Producto("Avena", "Cereales y pastas", "img/avena.jpg"),
    new Producto("Quinoa", "Cereales y pastas", "img/quinoa.jpg"),
];

// Obtiene una referencia al div de categorías
let divCategorias = document.getElementById("categorias");

// Crea un array para almacenar las categorías de productos únicas
let categorias = [];

// Llena el array de categorías con las categorías de productos únicas
productos.forEach(producto => {
    if (!categorias.includes(producto.getTipo())) {
        categorias.push(producto.getTipo());
    }
});


// Crea una variable para almacenar la última categoría que se mostró
let ultimaCategoriaMostrada = null;

// Crea un botón para cada categoría y lo añádelo al div de categorías
categorias.forEach(categoria => {
    let divCategoria = document.createElement("div");
    divCategoria.className = "categoria";

    let botonCategoria = document.createElement("button");
    botonCategoria.innerText = categoria;

    let divProductosCategoria = document.createElement("div");
    divProductosCategoria.className = "productosCategoria";

    botonCategoria.addEventListener("click", function () {
        if (categoria === ultimaCategoriaMostrada) {
            // Si la categoría que se hizo clic es la misma que la última que se mostró, limpia el div de los productos y establece la última categoría mostrada a null
            divProductosCategoria.innerHTML = "";
            ultimaCategoriaMostrada = null;
        } else {
            // Si no, muestra los productos como normalmente y actualiza la última categoría mostrada
            mostrarProductos(categoria, divProductosCategoria);
            ultimaCategoriaMostrada = categoria;
        }
    });

    divCategoria.appendChild(botonCategoria);
    divCategoria.appendChild(divProductosCategoria);
    divCategorias.appendChild(divCategoria);
});

//Muestra los productos de una categoria, permite hacer clic para añadir cantidad y agregarlo a la lista
function mostrarProductos(categoria, divProductosCategoria) {
    divProductosCategoria.innerHTML = "";

    productos.filter(producto => producto.getTipo() === categoria).forEach(producto => {
        let divProducto = document.createElement("div");
        divProducto.className = "producto";

        let imgProducto = document.createElement("img");
        imgProducto.src = producto.getEnlace();
        imgProducto.alt = producto.getNombre();

        let pNombre = document.createElement('p');
        pNombre.textContent = producto.getNombre();

        imgProducto.addEventListener("click", function () {
            let cantidad = prompt("¿Cuántas unidades de este producto quieres?", "1");

            if (cantidad !== null) {
                let productoCompra = { producto: producto.getNombre(), cantidad: cantidad };
                listaCompra.push(productoCompra);
                localStorage.setItem('listaCompra', JSON.stringify(listaCompra));

                // Crear el elemento de mensaje y añadirlo al body
                let message = document.createElement('div');
                message.id = 'message';
                message.textContent = 'Producto añadido correctamente';
                document.body.appendChild(message);

                // Mostrar el mensaje y luego ocultarlo después de 2 segundos
                message.classList.add('show');
                setTimeout(function () {
                    message.classList.remove('show');

                    // Borrar el mensaje
                    setTimeout(function () {
                        document.body.removeChild(message);
                    }, 500);
                }, 2000);
            }
        });

        divProducto.appendChild(pNombre);
        divProducto.appendChild(imgProducto);
        divProductosCategoria.appendChild(divProducto);
    });
}



// Desde aqui controlo el guardado, la visualización de la ultima lista, visualización de todas las listas guardadas en el localStorage
document.addEventListener("DOMContentLoaded", function () {

    document.getElementById("guardar").addEventListener("click", function () {
        let now = new Date();
        let formattedDate = now.toISOString();
        let listaCompraConFecha = { fecha: formattedDate, productos: listaCompra };
        localStorage.setItem(formattedDate, JSON.stringify(listaCompraConFecha));
        listaCompra = [];
        console.log('Lista de la compra guardada');

        // Crear el elemento de mensaje y añadirlo al body
        let message = document.createElement('div');
        message.id = 'message';
        message.textContent = 'Lista guardada correctamente';
        document.body.appendChild(message);

        // Mostrar el mensaje y luego ocultarlo después de 2 segundos
        message.classList.add('show');
        setTimeout(function () {
            message.classList.remove('show');

            // Eliminar el elemento de mensaje después de que se haya desvanecido
            setTimeout(function () {
                document.body.removeChild(message);
            }, 500);
        }, 2000);
    });




    document.getElementById("mostrar").addEventListener("click", function () {
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



    document.getElementById("listasBoton").addEventListener("click", function () {
        let divListas = document.getElementById('displayListas');

        // Limpia el div antes de agregar nuevas listas
        divListas.innerHTML = "";

        // Ordena las claves (fechas) en orden descendente
        let listas = Object.keys(localStorage).sort().reverse();

        listas.forEach(lista => {
            let listaCompra = JSON.parse(localStorage.getItem(lista));

            // Comprueba si hay una lista guardada y si tiene productos
            if (listaCompra && listaCompra.productos) {
                let pFecha = document.createElement('p');
                let fecha = new Date(listaCompra.fecha);
                pFecha.textContent = `Fecha: ${fecha.getFullYear()}-${(fecha.getMonth() + 1).toString().padStart(2, '0')}-${fecha.getDate().toString().padStart(2, '0')} ${fecha.getHours().toString().padStart(2, '0')}:${fecha.getMinutes().toString().padStart(2, '0')}`;
                divListas.appendChild(pFecha);

                listaCompra.productos.forEach(item => {
                    let pItem = document.createElement('p');
                    pItem.textContent = `Producto: ${item.producto}, Cantidad: ${item.cantidad}`;
                    divListas.appendChild(pItem);
                });

                //Linea horizontal
                let separator = document.createElement('hr');
                divListas.appendChild(separator);
            } else {

            }
        });
    });
});








