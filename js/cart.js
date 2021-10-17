let infoCart = [];
let monedaMostrada = true
let cantidadArticulos = [];

function showCart() {
    let htmlContentToAppend = "";
    let subtotal = 0;
    for (let i = 0; i < infoCart.length; i++) {
        let carrito = infoCart[i];
        if (monedaMostrada === true) {
            conversionADolares();
            subtotal += cantidadArticulos[i] * parseFloat(carrito.unitCost);
            htmlContentToAppend +=
                `         
    <tr class="alturaFila">
      <td class="imagenArticulo"> <img src="${carrito.src}" class="img-thumbnail" id="imagenCarrito"></td>
      <td class="nombreProducto">${carrito.name}</td>
      <td class="precioUnit">${carrito.currency} ${carrito.unitCost}</td>
      <td class="cantidadArt"><input min="1" type="number" name="cantidad" value="${cantidadArticulos[i]}" onchange="cantidadPorArticulos(); subtotal(); "></td>
      <td class="subTotal">${carrito.currency} ${cantidadArticulos[i]*parseFloat(carrito.unitCost)}</td>
    </tr>
 `;
        } else {
            conversionAPesos();

            subtotal += cantidadArticulos[i] * parseFloat(carrito.unitCost);
            htmlContentToAppend +=
                `         
    <tr class="alturaFila">
      <td class="imagenArticulo"> <img src="${carrito.src}" class="img-thumbnail" id="imagenCarrito"></td>
      <td class="nombreProducto">${carrito.name}</td>
      <td class="precioUnit">${carrito.currency} ${parseFloat(carrito.unitCost)}</td>
      <td class="cantidadArt"><input min="1" type="number" name="cantidad" value="${cantidadArticulos[i]}" onchange="cantidadPorArticulos(); subtotal(); "></td>
      <td class="subTotal">${carrito.currency} ${cantidadArticulos[i]*parseFloat(carrito.unitCost)}</td>
    </tr>
 `;
        }

        document.getElementById("carrito").innerHTML = htmlContentToAppend;

    }
    document.getElementById('totalAPagar').innerHTML = `Total a pagar: ${infoCart[0].currency} ${subtotal}`;
    document.getElementById('subtotalAPagar').innerHTML = `Subtotal: ${infoCart[0].currency} ${subtotal}`;
}


document.addEventListener("DOMContentLoaded", function(e) {
    getJSONData(CART_INFO2_URL).then(function(resultObj) {
        if (resultObj.status === "ok") {
            infoCart = resultObj.data.articles;
            cantidadInicialArticulo();
            showCart();
            subtotal();
        }
    });
    document.getElementById("pesos").addEventListener("click", function() {
        pesos();
    })
    document.getElementById("dolares").addEventListener("click", function() {
        dolares();
    })

});

function pesos() {
    monedaMostrada = false;
    showCart();
}

function dolares() {
    monedaMostrada = true;
    showCart();
}

function cantidadPorArticulos() {
    let valores = document.getElementsByName("cantidad");
    for (let i = 0; i < valores.length; i++) {
        let cantidad = valores[i];
        cantidadArticulos[i] = cantidad.value;
    }
    showCart();
}

function cantidadInicialArticulo() {
    infoCart.forEach(i => {
        cantidadArticulos.push(i.count);
    });
}

function subtotal() {
    for (let i = 0; i < infoCart.length; i++) {
        let articulos = infoCart[i];
        let subtotalArticulo = parseFloat(articulos.unitCost) * cantidadArticulos[i];

        document.getElementsByClassName("subTotal")[i].innerHTML = `${articulos.currency} ${subtotalArticulo}`;
    }

}

function conversionAPesos() {
    for (let i = 0; i < infoCart.length; i++) {
        let articulos = infoCart[i];
        if (articulos.currency === "USD") {
            articulos.currency = "UYU";
            articulos.unitCost = articulos.unitCost * 40;
        }

    }
}

function conversionADolares() {
    for (let i = 0; i < infoCart.length; i++) {
        let articulos = infoCart[i];
        if (articulos.currency === "UYU") {
            articulos.currency = "USD";
            articulos.unitCost = articulos.unitCost / 40;
        }

    }
}



