
//Poblaciones y códigos postales
var poblacionesCodigosPostales = {
    "Seleccione una población": "",
    "Burgos": "09007",
    "Soria": "09001",
    "Barcelona": "09002",
    "Vitoria": "09003",
    "Zaragoza": "09004",
    "Susinos del Paramo": "09133",
    "Sevilla": "09006",
    "Malaga": "09010",
    "Caceres": "09008",
    "Teruel": "09009",
};

//Rellenar el select de poblaciones
var selectPoblacion = document.getElementById('poblacion');
for (var poblacion in poblacionesCodigosPostales) {
    var option = document.createElement('option');
    option.text = poblacion;
    option.value = poblacion;
    selectPoblacion.add(option);
}

// Guardo "codigoPostal" en la variable inputCodigoPostal
var inputCodigoPostal = document.getElementById('codigoPostal');

// Controlador de eventos para cuando se cambia la selección en el select de poblaciones
selectPoblacion.addEventListener('change', function () {

    // Buscar el código postal para la población seleccionada
    var codigoPostal = poblacionesCodigosPostales[this.value];

    // Actualizar el valor del elemento input del código postal
    inputCodigoPostal.value = codigoPostal;
});


//Recoger los valores introducidos por el usuario en el formulario de registro
document.getElementById("registerButton").addEventListener("click", function (event) {
    event.preventDefault();

    let u = document.getElementById("Usuario").value;
    let contraseña = document.getElementById("contraseña").value;
    let nombre = document.getElementById("nombre").value;
    let apellidos = document.getElementById("apellidos").value;
    let direccion = document.getElementById("direccion").value;
    let poblacion = document.getElementById("poblacion").value;
    let codigoPostal = document.getElementById("codigoPostal").value;
    let telefono = document.getElementById("telefono").value;
    let correoElectronico = document.getElementById("correoElectronico").value;



    // Crea un objeto de usuario con los datos ingresados
    let user = new Usuario(nombre, apellidos, direccion, poblacion, codigoPostal, telefono, correoElectronico, u, contraseña);

    // Guarda el objeto de usuario en el localStorage
    // Los objetos deben ser convertidos a formato JSON para poder ser guardados en el localStorage
    localStorage.setItem(u, JSON.stringify(user));



    // Validaciones de los campos de el formulario de registro

    // Campos que son obligatorios, si alguno de ellos esta vacio se muestra un mensaje.
    if (nombre === '' || apellidos === '' || direccion === '' || u === '') {
        alert('Nombre, Apellidos, Dirección y Usuario son campos obligatorios');
        return;
    }

    //Comprobar que la poblacion coincide con su codigo postal (CP simulados, no son reales)
    if (poblacionesCodigosPostales[poblacion] !== codigoPostal) {
        alert('La población y el código postal no coinciden.');
        return;
    }

    //Expresion regular que comprueba si el formato del numero de telefono es correcto.
    //Estos son los formatos soportados: 
    // +1-800-123-4567
    // (1) 800 123 4567
    // 18001234567
    // 800.123.4567
    if (!/^[\+]?[(]?[0-9]{1,4}[)]?[-\s\.]?[0-9]{1,4}[-\s\.]?[0-9]{4,6}$/.test(telefono)) {
        alert('El teléfono proporcionado no es válido.');
        return;
    }

    //Expresion regular que comprueba si el formato del email introducido es correcto
    if (!/\S+@\S+\.\S+/.test(correoElectronico)) {
        alert('El correo electrónico proporcionado no es válido.');
        return;
    }

    //Comprobar si el usuario ya existe en el localStorage
    let usuariosExistentes = Usuario.deserialize();

    if (usuariosExistentes.some(user => user.usuario === u)) {
        alert('El nombre de usuario ya está en uso.');
        return;
    }

    // Agrega el nuevo usuario a la lista
    usuariosExistentes.push(user);

    // Guarda la lista actualizada en localStorage
    Usuario.serialize(usuariosExistentes);


    //Expresion regular que comprueba si la contraseña introducida cumple con las condiciones
    if (!/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/.test(contraseña)) {
        alert('La contraseña debe contener mínimo 8 caracteres, letras, números y al menos dos caracteres especiales.');
        return;
    }

    // Redireccionar a la página de login
    window.location.href = "index.html";
});


