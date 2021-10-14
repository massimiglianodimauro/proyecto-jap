let carrito = [];

function showCart() {
  let htmlContentToAppend = "";
  for (let i = 0; i < infoCart.articles.length; i++) {
    let carrito = infoCart.articles[i];

    htmlContentToAppend +=
      `     
    <div class="row">
      <div class="imagenArticulo col-4">
        <img src="${carrito.src}" class="img-thumbnail" id="imagenCarrito">
      </div>
      <div class="infoArticulo col-8">
        <table class="table table-bordered miTabla">
        <thead>
        <tr>
        
          <th scope="col">Articulo</th>
          <th scope="col">Precio unitario</th>
          <th scope="col">Cantidad</th>
          <th scope="col">Subtotal</th>
        </thead>
        <tbody>
        <tr>
          <td class="nombreProducto">${carrito.name}</td>
          <td class="precioUnit">${pesosADolares(carrito.unitCost)}</td>
          <td class="cantidadArt">${carrito.count}</td>
          <td class="subTotal">${subtotal(pesosADolares(carrito.unitCost),carrito.count)}</td>
        </tr>
        </tbody>
        </div>
    </div>`;

    document.getElementById("carrito").innerHTML = htmlContentToAppend;
  }
}


document.addEventListener("DOMContentLoaded", function (e) {
  getJSONData(CART_INFO2_URL).then(function (resultObj) {
    if (resultObj.status === "ok") {
      infoCart = resultObj.data;

      showCart();
    }
  });
});
function pesosADolares(moneda) {
  precioEnDolares = moneda / 40;
  return precioEnDolares;
}
function subtotal(unitCost,cant) {
  precioFinal = unitCost * cant;
  return precioFinal;
}
