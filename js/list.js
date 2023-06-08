class List {
    constructor(usuario, fecha, productos){
        this.usuario = usuario;
        this.fecha = fecha;
        this.productos = productos;  // Array bidimensional: [["producto1", cantidad1], ["producto2", cantidad2], ...]
    }
  
    getUsuario() {
        return this.usuario;
    }
  
    getFecha() {
        return this.fecha;
    }
  
    getProductos() {
        return this.productos;
    }
  
    setUsuario(usuario) {
        this.usuario = usuario;
    }
  
    setFecha(fecha) {
        this.fecha = fecha;
    }
  
    setProductos(productos) {
        this.productos = productos;
    }
  
    agregarProducto(producto, cantidad) {
        this.productos.push([producto, cantidad]);
    }
}


document.addEventListener("DOMContentLoaded", function() {
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


function getUltimaLista() {
    // Obtén todas las claves de localStorage
    let keys = Object.keys(localStorage);

    // Filtrar solo las claves que tienen formato de fecha ISO
    let listKeys = keys.filter(key => {
        return /\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}.\d{3}Z/.test(key);
    });

    // Si no hay ninguna lista guardada
    if (listKeys.length === 0) {
        console.log('No hay ninguna lista guardada.');
        return null;
    }

    // Ordenar las claves en orden descendente
    listKeys.sort().reverse();

    // Obtener la última lista de la compra
    let ultimaListaCompra = JSON.parse(localStorage.getItem(listKeys[0]));

    return ultimaListaCompra;
}

function mostrarLista(lista) {
    let contenedorLista = document.getElementById('listaCompras');
    contenedorLista.innerHTML = '';

    // Agrega un título a la lista
    let tituloElemento = document.createElement('h1');
    tituloElemento.textContent = "¡Tu lista de la compra, para que no se te olvide nada!";
    contenedorLista.appendChild(tituloElemento);

    // Agrega la fecha a la lista
    let fechaElemento = document.createElement('p');
    let fechaLista = new Date(lista.fecha);
    fechaElemento.textContent = `Fecha: ${fechaLista.getFullYear()}-${(fechaLista.getMonth()+1).toString().padStart(2, '0')}-${fechaLista.getDate().toString().padStart(2, '0')} ${fechaLista.getHours().toString().padStart(2, '0')}:${fechaLista.getMinutes().toString().padStart(2, '0')}`;
    contenedorLista.appendChild(fechaElemento);

    // Agrega los productos a la lista
    lista.productos.forEach(producto => {
        let elementoProducto = document.createElement('p');
        elementoProducto.textContent = producto.producto + ': ' + producto.cantidad;
        contenedorLista.appendChild(elementoProducto);
    });
}



document.addEventListener("DOMContentLoaded", function() {
    // Código para obtener la última lista...
    let ultimaListaCompra = getUltimaLista();

    // Mostrar la última lista
    if(ultimaListaCompra) {
        mostrarLista(ultimaListaCompra);
    } else {
        console.log('No hay ninguna lista guardada.');
    }
});


// Evento para el boton de imprimir lista
document.addEventListener("DOMContentLoaded", function() {

    document.getElementById("printButton").addEventListener("click", function() {
        window.print();
    });
});













  

  