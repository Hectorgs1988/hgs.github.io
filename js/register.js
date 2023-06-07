//VER QUE HACER CON ESTO
// Poblaciones y códigos postales
var poblacionesCodigosPostales = {
    "Burgos": "09007",
    "Soria": "09001",
    "Barcelona": "09002"
    // etc.
};

// Rellenar el select de poblaciones
var selectPoblacion = document.getElementById('poblacion');
for (var poblacion in poblacionesCodigosPostales) {
    var option = document.createElement('option');
    option.text = poblacion;
    option.value = poblacion;
    selectPoblacion.add(option);
}


document.getElementById("registerButton").addEventListener("click", function(event){
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
    // let usuario = document.getElementById('username').value;


    // Crea un objeto de usuario con los datos ingresados
  let user = new Usuario(nombre, apellidos, direccion, poblacion, codigoPostal, telefono, correoElectronico, u, contraseña);

  // Guarda el objeto de usuario en el localStorage
  // Los objetos deben ser convertidos a formato JSON para poder ser guardados en el localStorage
  localStorage.setItem(u, JSON.stringify(user));



    // Validaciones
    if (nombre === '' || apellidos === '' || direccion === '' || u === '') {
        alert('Nombre, Apellidos, Dirección y Usuario son campos obligatorios');
        return;
    }

    if (poblacionesCodigosPostales[poblacion] !== codigoPostal) {
        alert('La población y el código postal no coinciden.');
        return;
    }

    if (!/^[\+]?[(]?[0-9]{1,4}[)]?[-\s\.]?[0-9]{1,4}[-\s\.]?[0-9]{4,6}$/.test(telefono)) {
        alert('El teléfono proporcionado no es válido.');
        return;
    }

    if (!/\S+@\S+\.\S+/.test(correoElectronico)) {
        alert('El correo electrónico proporcionado no es válido.');
        return;
    }

    var usuariosExistentes = Usuario.deserialize();

    if (usuariosExistentes !== null) {
        if (usuariosExistentes.some(user => user.usuario === usuario)) {
            alert('El nombre de usuario ya está en uso.');
            return;
        }
    }
    

    if (!/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/.test(contraseña)) {
        alert('La contraseña debe contener mínimo 8 caracteres, letras, números y al menos dos caracteres especiales.');
        return;
    }

    // Redireccionar a la página de login
    window.location.href = "index.html";
});


