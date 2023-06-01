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
    let divListas = document.getElementById('listas');
    // Utiliza la clave 'listaCompra' para recuperar la última lista guardada
    let listaGuardada = JSON.parse(localStorage.getItem('listaCompra'));

    // Comprueba si hay una lista guardada
    if (listaGuardada && listaGuardada.productos) {
        let pFecha = document.createElement('p');
        pFecha.textContent = `Fecha: ${listaGuardada.fecha}`;
        divListas.appendChild(pFecha);

        listaGuardada.productos.forEach(item => {
            let pItem = document.createElement('p');
            pItem.textContent = `Producto: ${item.producto}, Cantidad: ${item.cantidad}`;
            divListas.appendChild(pItem);
        });
    } else {
        console.log("No hay listas guardadas");
    }
});







  

  