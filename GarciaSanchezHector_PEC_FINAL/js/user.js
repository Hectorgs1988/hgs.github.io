//Clase usuario
class Usuario {
  constructor(nombre, apellidos, direccion, poblacion, codigoPostal, telefono, correoElectronico, usuario, contraseña) {
    this.nombre = nombre;
    this.apellidos = apellidos;
    this.direccion = direccion;
    this.poblacion = poblacion;
    this.codigoPostal = codigoPostal;
    this.telefono = telefono;
    this.correoElectronico = correoElectronico;
    this.usuario = usuario;
    this.contraseña = contraseña;
  }

  //Coge una matriz de usuarios y la almacena en el localStorage. Convierte en una cadena JSON
  static serialize(usersArray) {
    localStorage.setItem('users', JSON.stringify(usersArray));
  }

  //Recupera la cadena JSON de usuarios, la convierte de nuevo en una matriz de objetos y mapea cada objeto a una 
  //nueva instancia de Usuario
  static deserialize() {
    let usersArray = JSON.parse(localStorage.getItem('users'));
    if (usersArray) {
      return usersArray.map(userObj => new Usuario(userObj.nombre, userObj.apellidos, userObj.direccion, userObj.poblacion, userObj.codigoPostal, userObj.telefono, userObj.correoElectronico, userObj.usuario, userObj.contraseña));
    }
    return [];
  }

  //Llama a deserialize
  static retrieveUser() {
    return Usuario.deserialize();
  }


  // Métodos getter
  getNombre() {
    return this.nombre;
  }

  getApellidos() {
    return this.apellidos;
  }

  getDireccion() {
    return this.direccion;
  }

  getPoblacion() {
    return this.poblacion;
  }

  getCodigoPostal() {
    return this.codigoPostal;
  }

  getTelefono() {
    return this.telefono;
  }

  getCorreoElectronico() {
    return this.correoElectronico;
  }

  getUsuario() {
    return this.usuario;
  }

  getContraseña() {
    return this.contraseña;
  }


  // Métodos setter
  setNombre(nombre) {
    this.nombre = nombre;
  }

  setApellidos(apellidos) {
    this.apellidos = apellidos;
  }


  setDireccion(direccion) {
    this.direccion = direccion;
  }

  setPoblacion(poblacion) {
    this.poblacion = poblacion;
  }

  setCodigoPostal(codigoPostal) {
    this.codigoPostal = codigoPostal;
  }

  setTelefono(telefono) {
    this.telefono = telefono;
  }

  setCorreoElectronico(correoElectronico) {
    this.correoElectronico = correoElectronico;
  }

  setUsuario(usuario) {
    this.usuario = usuario;
  }

  setContraseña(contraseña) {
    this.contraseña = contraseña;
  }


  //Guardar una instancia especifica del Usuario en el localStorage
  guardarUsuario() {
    Usuario.serialize(this);
  }

  //recupera los datos de un usuario
  recuperarUsuario() {
    let usuarioGuardado = localStorage.getItem(this.usuario);
    if (usuarioGuardado) {
      let usuario = JSON.parse(usuarioGuardado);
      this.nombre = usuario.nombre;
      this.apellidos = usuario.apellidos;
      this.direccion = usuario.direccion;
      this.poblacion = usuario.poblacion;
      this.codigoPostal = usuario.codigoPostal;
      this.telefono = usuario.telefono;
      this.correoElectronico = usuario.correoElectronico;
      this.usuario = usuario.usuario;
      this.contraseña = usuario.contraseña;
    }
  }
}





