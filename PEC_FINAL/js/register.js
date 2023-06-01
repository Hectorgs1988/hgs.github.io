//REGISTRO camniar ids a camelCase
document.getElementById("registerButton").addEventListener("click", function(event){
  event.preventDefault();

  // Obtiene los datos ingresados por el usuario
  let u = document.getElementById("Usuario").value;
  let Contraseña = document.getElementById("Contraseña").value;
  let nombre = document.getElementById("nombre").value;
  let Apellidos = document.getElementById("Apellidos").value;
  let Direccion = document.getElementById("Direccion").value;
  let Poblacion = document.getElementById("Poblacion").value;
  let postal = document.getElementById("postal").value;
  let Telefono = document.getElementById("Telefono").value;
  let Email = document.getElementById("Email").value;

  // Crea un objeto de usuario con los datos ingresados
  let user = new Usuario(nombre, Apellidos, Direccion, Poblacion, postal, Telefono, Email, u, Contraseña);

  // Guarda el objeto de usuario en el localStorage
  // Los objetos deben ser convertidos a formato JSON para poder ser guardados en el localStorage
  localStorage.setItem(u, JSON.stringify(user));

  // Redirige al usuario a la página de inicio de sesión después de registrarse con éxito
  window.location.href="login.html";
});
