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
    new Producto("Manzana", "Frutas y vegetales", "img/manzana.jpg"),
    new Producto("Espagueti", "Panes y pastas", "img/espagueti.jpg"),
    new Producto("Leche", "Leche y quesos", "img/leche.jpg"),
    // Añade más productos aquí
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
    let formattedDate = now.getFullYear() + "-" +
                        ("0" + (now.getMonth() + 1)).slice(-2) + "-" +
                        ("0" + now.getDate()).slice(-2) + " " +
                        ("0" + now.getHours()).slice(-2) + ":" +
                        ("0" + now.getMinutes()).slice(-2);
    let listaCompraConFecha = {fecha: formattedDate, productos: listaCompra};
    localStorage.setItem('listaCompra', JSON.stringify(listaCompraConFecha));
    listaCompra = []; // Vacía la lista de la compra para la próxima compra
    console.log('Lista de la compra guardada');
});


    document.getElementById("mostrar").addEventListener("click", function() {
        let listaCompra = JSON.parse(localStorage.getItem('listaCompra'));
        if (listaCompra !== null) {
            // alert(JSON.stringify(listaCompra));
        } else {
            alert('No hay ninguna lista guardada.');
        }
    });

    document.getElementById("listas").addEventListener("click", function() {
      let listas = Object.keys(localStorage).sort().reverse(); // Ordena las claves (fechas) en orden descendente
  
      listas.forEach(lista => {
          let divListas = document.getElementById('listas');
          let listaCompra = JSON.parse(localStorage.getItem(lista));
  
          // Comprueba si hay una lista guardada y si tiene productos
          if (listaCompra && listaCompra.productos) {
              divListas.innerHTML = "";  // Limpia el div antes de agregar una nueva lista
  
              let pFecha = document.createElement('p');
              let fecha = new Date(listaCompra.fecha);
              pFecha.textContent = `Fecha: ${fecha.getFullYear()}-${(fecha.getMonth()+1).toString().padStart(2, '0')}-${fecha.getDate().toString().padStart(2, '0')} ${fecha.getHours().toString().padStart(2, '0')}:${fecha.getMinutes().toString().padStart(2, '0')}`;
              divListas.appendChild(pFecha);
  
              listaCompra.productos.forEach(item => {
                  let pItem = document.createElement('p');
                  pItem.textContent = `Producto: ${item[0]}, Cantidad: ${item[1]}`;
                  divListas.appendChild(pItem);
              });
          } else {
              console.log("No hay listas guardadas");
          }
      });
  });
  
});






