//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
document.addEventListener("DOMContentLoaded", function (e) {});

function verificar() {
  let dato = document.getElementById("nombre");
  let password = document.getElementById("contraseña");
  var usuario = {};
  if (dato.value.trim() === "" || password.value.trim() === "") {
    alert("Faltan datos");
  } else {
    location.href = "principal.html";
    usuario.nombre = dato.value;
    usuario.estado = "conectado";
    usuario.password = password.value;

    localStorage.setItem("usuario", JSON.stringify(usuario));
  }
}

