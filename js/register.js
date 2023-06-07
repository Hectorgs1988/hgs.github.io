// //REGISTRO camniar ids a camelCase
// document.getElementById("registerButton").addEventListener("click", function(event){
//   event.preventDefault();

//   // Obtiene los datos ingresados por el usuario
//   let u = document.getElementById("Usuario").value;
//   let Contraseña = document.getElementById("Contraseña").value;
//   let nombre = document.getElementById("nombre").value;
//   let Apellidos = document.getElementById("Apellidos").value;
//   let Direccion = document.getElementById("Direccion").value;
//   let Poblacion = document.getElementById("Poblacion").value;
//   let postal = document.getElementById("postal").value;
//   let Telefono = document.getElementById("Telefono").value;
//   let Email = document.getElementById("Email").value;

//   // Crea un objeto de usuario con los datos ingresados
//   let user = new Usuario(nombre, Apellidos, Direccion, Poblacion, postal, Telefono, Email, u, Contraseña);

//   // Guarda el objeto de usuario en el localStorage
//   // Los objetos deben ser convertidos a formato JSON para poder ser guardados en el localStorage
//   localStorage.setItem(u, JSON.stringify(user));

//   // Redirige al usuario a la página de inicio de sesión después de registrarse con éxito
//   window.location.href="index.html";
// });

// Simulación de comprobación de nombre de usuario existente
// En la práctica, tendrás que consultar tu base de datos o alguna API de servidor para verificar esto
var usuariosExistentes = ["usuario1", "usuario2", "usuario3"];  // Cambia esto por la lógica real de verificación

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

document.getElementById('registroFormulario').addEventListener('submit', function(event) {
    event.preventDefault();

    var nombre = document.getElementById('nombre').value;
    var apellidos = document.getElementById('apellidos').value;
    var direccion = document.getElementById('direccion').value;
    var poblacion = document.getElementById('poblacion').value;
    var postalCode = document.getElementById('postalCode').value;
    var telefono = document.getElementById('telefono').value;
    var email = document.getElementById('email').value;
    var username = document.getElementById('username').value;
    var password = document.getElementById('password').value;
    var confirmPassword = document.getElementById('confirmPassword').value;

    // Validaciones
    if (nombre === '' || apellidos === '' || direccion === '' || username === '' || password === '' || confirmPassword === '') {
        alert('Todos los campos son obligatorios.');
        return;
    }

    if (poblacionesCodigosPostales[poblacion] !== postalCode) {
        alert('La población y el código postal no coinciden.');
        return;
    }

    if (!/^[\+]?[(]?[0-9]{1,4}[)]?[-\s\.]?[0-9]{1,4}[-\s\.]?[0-9]{4,6}$/.test(telefono)) {
        alert('El teléfono proporcionado no es válido.');
        return;
    }

    if (!/\S+@\S+\.\S+/.test(email)) {
        alert('El correo electrónico proporcionado no es válido.');
        return;
    }

    if (usuariosExistentes.indexOf(username) !== -1) {
        alert('El nombre de usuario ya está en uso.');
        return;
    }

    if (password !== confirmPassword) {
        alert('Las contraseñas no coinciden.');
        return;
    }

    if (!/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/.test(password)) {
        alert('La contraseña debe contener mínimo 8 caracteres, letras, números y al menos dos caracteres especiales.');
        return;
    }

    // Guardar en localStorage
    var user = {
        nombre: nombre,
        apellidos: apellidos,
        direccion: direccion,
        poblacion: poblacion,
        postalCode: postalCode,
        telefono: telefono,
        email: email,
        username: username,
        password: password
    };
    localStorage.setItem('user', JSON.stringify(user));

    // Redireccionar a la página de login
    window.location.href = "index.html";
});

