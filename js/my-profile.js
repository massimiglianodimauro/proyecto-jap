let nombre = document.getElementById("inputNombre")
let apellido = document.getElementById("inputApellido")
let email = document.getElementById("inputEmail")
let nacimiento = document.getElementById("inputEdad")
let telefono = document.getElementById("inputTelefono")
let archivoImagen = document.getElementById("inputArchivoImagen")
let imagen = document.getElementById("imagenPerfil")

let datos = {}
let datosGuardados = JSON.parse(localStorage.getItem("infoPerfil"))

function guardarCambios() {
    datos.nombre = nombre.value;
    datos.apellido = apellido.value;
    datos.email = email.value;
    datos.nacimiento = nacimiento.value;
    datos.telefono = telefono.value;
    datos.imagen = imagen.src;

    localStorage.setItem("infoPerfil",JSON.stringify(datos));
}


let nombreGuardado = document.getElementById("spanNombre")
let apellidoGuardado = document.getElementById("spanApellido")
let emailGuardado = document.getElementById("spanEmail")
let nacimientoGuardado = document.getElementById("spanNacimiento")
let telefonoGuardado = document.getElementById("spanTelefono")
let imagenGuardada = document.getElementById("imagenPerfil")


function corroborar() {
   
    if ( datosGuardados != undefined) {
        nombreGuardado.innerHTML = "<strong>Nombre: </strong>" + datosGuardados.nombre;
        apellidoGuardado.innerHTML = "<strong>Apellido: </strong>" + datosGuardados.apellido;
        emailGuardado.innerHTML = "<strong>Email: </strong>" + datosGuardados.email;
        nacimientoGuardado.innerHTML = "<strong>Fecha de nacimiento: </strong>" + datosGuardados.nacimiento;
        telefonoGuardado.innerHTML = "<strong>Teléfono: </strong>" + datosGuardados.telefono;
        imagenGuardada.src = datosGuardados.imagen;

    } else {
        nombreGuardado.innerHTML = "<strong>Nombre: </strong>";
        apellidoGuardado.innerHTML = "<strong>Apellido: </strong>";
        emailGuardado.innerHTML = "<strong>Email: </strong>";
        nacimientoGuardado.innerHTML = "<strong>Fecha de nacimiento: </strong>";
        telefonoGuardado.innerHTML = "<strong>Teléfono: </strong>";
        imagenGuardada.src = "./img/iconouser.png";
    }
}

//Read image as URL
const previewFile = () => {
    let reader = new FileReader();

    reader.onloadend = function() {
        imagen.src = reader.result;
    }

    if (archivoImagen.files[0]) {
        reader.readAsDataURL(archivoImagen.files[0]);
    } else {
        imagen.src = './img/iconouser.png';
    }


}
document.addEventListener("DOMContentLoaded", function (e) {
    corroborar();
});

