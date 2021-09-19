let infoAuto = {};
let infoComents = [];
let products = [];
let nombreAuto = undefined;
let descripcionAuto = undefined;
let precioAuto = undefined;
let monedaAuto = undefined;
let cantidadVentas = undefined;
let categoriasAuto = undefined;
let imagenesAuto = [];
let productosRelacionados = undefined;

function showInfoProduct() {
  let htmlContentToAppend = `<div class="list-group-item list-group-item-action">
  <div class="row">
  <div class="col-3">
  
  <div id="carouselImages" class="carousel slide bd-placeholder-img card-img-top" data-ride="carousel">
   <div class="carousel-inner" style="margin: auto;">
         <div class="carousel-item active">
             <img class="d-block w-100" src="${imagenesAuto[0]}" alt="First slide">
            </div>
             <div class="carousel-item">
             <img class="d-block w-100" src="${imagenesAuto[1]}" alt="Second slide">
             </div>
             <div class="carousel-item">
              <img class="d-block w-100" src="${imagenesAuto[2]}" alt="Second slide">
             </div>
             <div class="carousel-item">
             <img class="d-block w-100" src="${imagenesAuto[3]}" alt="Second slide">
             </div>
           </div>
    <a class="carousel-control-prev" href="#carouselImages" role="button" data-slide="prev">
      <span class="carousel-control-prev-icon" aria-hidden="true"></span>
      <span class="sr-only">Previous</span>
    </a>
    <a class="carousel-control-next" href="#carouselImages" role="button" data-slide="next">
      <span class="carousel-control-next-icon" aria-hidden="true"></span>
      <span class="sr-only">Next</span>
    </a>
    </div>
    </div>
    
              
                  
              
        <div class="col">
                  <div class="d-flex w-100 justify-content-between">
                      <h4 class="mb-1">${nombreAuto}</h4>
                      <small> Categoria:${categoriasAuto}</small>
                      
    
                      <small class="text-muted">${cantidadVentas} ventas</small>
                  </div>
                <p class="mb-1">${descripcionAuto}</p>
                <p class="font-weight-bold">${precioAuto} ${monedaAuto}</p>
    
        </div>
              
        </div>
    </div>`;

  document.getElementById("productInfo").innerHTML = htmlContentToAppend;
}
function showComents() {
  let htmlContentToAppend = "";
  for (let i = 0; i < infoComents.length; i++) {
    let coments = infoComents[i];

    htmlContentToAppend +=
      `
        <div class="col ml-4 mb-4 border pt-4 pb-3 pl-4 pr-4 " id="comentsusers">
          <div class="mb-2 d-flex w-100 justify-content-between border-bottom">
            <p class="ml-3 mb-2"><b><i class="fas fa-user-circle"></i>` +
      " " +
      coments.user +
      `</b></p>
            <small class="text-muted">` +
      califico(coments.score) +
      `</small>
          </div>
            <p class="mb-3">` +
      coments.description +
      `</p>
            <p class="mb-1">` +
      coments.dateTime +
      `</p>
        </div>
     `;
    document.getElementById("comentarios").innerHTML = htmlContentToAppend;
  }
}

document.addEventListener("DOMContentLoaded", function (e) {
  getJSONData(PRODUCT_INFO_URL).then(function (resultObj) {
    if (resultObj.status === "ok") {
      infoAuto = resultObj.data;
      nombreAuto = infoAuto.name;
      descripcionAuto = infoAuto.description;
      precioAuto = infoAuto.cost;
      monedaAuto = infoAuto.currency;
      cantidadVentas = infoAuto.soldCount;
      categoriasAuto = infoAuto.category;
      imagenesAuto = infoAuto.images;
      productosRelacionados = infoAuto.relatedProducts;
      showInfoProduct();
      mostrarNombreUsuario();
    }
  });
  getJSONData(PRODUCT_INFO_COMMENTS_URL).then(function (resultObj) {
    if (resultObj.status === "ok") {
      infoComents = resultObj.data;
      showComents();
    }
  });
  getJSONData(PRODUCTS_URL).then(function (resultObj) {
    if (resultObj.status === "ok") {
      products = resultObj.data;
    }
  });
  document.getElementById("botonComentario").addEventListener("click", () => {
    comentar();
    showComents();
    document.getElementById("publicarComentario").value = "";
  });
});

function comentar() {
  let nombreUsuario = JSON.parse(localStorage.getItem("usuario")); //tomo el nombre del usuario del local storage
  let comentarioUsuario = document.getElementById("publicarComentario").value; //tomo valor del text area
  let dejarComentario = {};
  let puntuacionUsuario = document.getElementById("valor").innerHTML;
  let fechaComentario = new Date();
  let fechaFormateada = formatoFecha(fechaComentario);

  dejarComentario.user = nombreUsuario.nombre;
  dejarComentario.description = comentarioUsuario;
  dejarComentario.score = puntuacionUsuario;
  dejarComentario.dateTime = fechaFormateada;
  infoComents.push(dejarComentario);
}

function mostrarNombreUsuario() {
  let nombreUsuario = JSON.parse(localStorage.getItem("usuario"));
  document.getElementById("nombreMiUsuario").innerHTML = nombreUsuario.nombre;
}

function califico(num) {
  let estrellas = "";
  for (let i = 1; i <= 5; i++) {
    if (i <= num) {
      estrellas += '<i id="colorEstrella" class="fas fa-star"></i>';
    } else {
      estrellas += '<i id="colorEstrella" class="far fa-star"></i>';
    }
  }

  return estrellas;
}

function formatoFecha(fecha) {
  let year = fecha.getFullYear();
  let month = fecha.getMonth() + 1;
  let day = fecha.getDate();
  let hour = fecha.getHours();
  let minute = fecha.getMinutes();
  let second = fecha.getSeconds();
  if (month < 10) {
    month = "0" + month;
  }

  if (hour < 10) {
    hour = "0" + hour;
  }
  if (minute < 10) {
    minute = "0" + minute;
  }
  if (second < 10) {
    second = "0" + second;
  }
  return (
    year + "-" + month + "-" + day + " " + hour + ":" + minute + ":" + second
  );
}
