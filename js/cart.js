let infoCart = [];
let monedaMostrada = true
let cantidadArticulos = [];
let subtotalSinEnvio = 0;

function showCart() {
    let htmlContentToAppend = "";
    let subtotal = 0;
    subtotalSinEnvio = 0;
    for (let i = 0; i < infoCart.length; i++) {
        let carrito = infoCart[i];
        if (monedaMostrada === true) {
            conversionADolares();
            subtotal += cantidadArticulos[i] * parseFloat(carrito.unitCost);
            subtotalSinEnvio = subtotal;
            htmlContentToAppend +=
                `         
    <tr class="alturaFila">
      <td class="imagenArticulo"> <img src="${carrito.src}" class="img-thumbnail" id="imagenCarrito"></td>
      <td class="nombreProducto">${carrito.name}</td>
      <td class="precioUnit">${carrito.currency} ${carrito.unitCost}</td>
      <td class="cantidadArt"><input min="1" type="number" name="cantidad" value="${cantidadArticulos[i]}" onchange="cantidadPorArticulos(); subtotal(); "></td>
      <td class="subTotal">${carrito.currency} ${cantidadArticulos[i]*parseFloat(carrito.unitCost)}</td>
      <td> <button class="removeCartItem" onclick="deleteCartItem(${i});">algo</button></td>
    </tr>
 `;
    document.getElementById('totalAPagar').innerHTML = `Total a pagar: USD ${subtotal}`;
    document.getElementById('subtotalAPagar').innerHTML = `Subtotal: USD ${subtotal}`;

        } else {
            conversionAPesos();

            subtotal += cantidadArticulos[i] * parseFloat(carrito.unitCost);
            subtotalSinEnvio = subtotal;
            htmlContentToAppend +=
                `         
    <tr class="alturaFila">
      <td class="imagenArticulo"> <img src="${carrito.src}" class="img-thumbnail" id="imagenCarrito"></td>
      <td class="nombreProducto">${carrito.name}</td>
      <td class="precioUnit">${carrito.currency} ${parseFloat(carrito.unitCost)}</td>
      <td class="cantidadArt"><input min="1" type="number" name="cantidad" value="${cantidadArticulos[i]}" onchange="cantidadPorArticulos(); subtotal(); "></td>
      <td class="subTotal">${carrito.currency} ${cantidadArticulos[i]*parseFloat(carrito.unitCost)}</td>
      <td> <div class="removeCartItem" onclick="deleteCartItem(${i});"><i class="fa fas-trash"></i></div></td>
    </tr>
 `;
    document.getElementById('totalAPagar').innerHTML = `Total a pagar: UYU ${subtotal}`;
    document.getElementById('subtotalAPagar').innerHTML = `Subtotal: UYU ${subtotal}`;
        }

        document.getElementById("carrito").innerHTML = htmlContentToAppend;

    }
    calcularEnvio();
    
}


document.addEventListener("DOMContentLoaded", function(e) {
    getJSONData(CART_INFO2_URL).then(function(resultObj) {
        if (resultObj.status === "ok") {
            infoCart = resultObj.data.articles;
            cantidadInicialArticulo();
            showCart();
            subtotal();
            calcularEnvio();
        }
    });
    document.getElementById("pesos").addEventListener("click", function() {
        pesos();
    })
    document.getElementById("dolares").addEventListener("click", function() {
        dolares();
    })
    document.getElementsByName("optEnvio").forEach(i=>{i.addEventListener("change", function() {
        calcularEnvio();
    })})
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
        subtotalSinEnvio += subtotalArticulo;

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

/*Metodo de pago*/
let metodoDePagoInfo = {};


function validarTarjeta() {
    let formularioTarjeta = document.getElementById("tarjetaCredito");
    formularioTarjeta.classList.add("was-validated");
    if (formularioTarjeta.checkValidity()) {
        metodoDePagoInfo.opcion = "Tarjeta credito";
        metodoDePagoInfo.titularTarjeta = document.getElementById("nombreTitularTarjeta");
        metodoDePagoInfo.numeroTarjeta = document.getElementById("numeroTarjeta");
        metodoDePagoInfo.vencimientoTarjeta = document.getElementById("vencimientoTarjeta");
        metodoDePagoInfo.cvvTarjeta = document.getElementById("cvvTarjeta");
        document.getElementById("formaSeleccionada").innerHTML = "Forma de pago seleccionado " + metodoDePagoInfo.opcion;

        }
}
function validarTransferencia() {
    let formularioTransferencia = document.getElementById("transferenciaBancaria");
    formularioTransferencia.classList.add("was-validated");
    if (formularioTransferencia.checkValidity()) {
        metodoDePagoInfo.opcion = "Transferencia bancaria";
        metodoDePagoInfo.nombreBanco = document.getElementById("nombreBanco");
        metodoDePagoInfo.nombreTitularCuenta = document.getElementById("nombreTitularCuenta");
        metodoDePagoInfo.numeroCuenta = document.getElementById("numeroCuenta");
        
        document.getElementById("formaSeleccionada").innerHTML = "Forma de pago seleccionado " + metodoDePagoInfo.opcion;
        
        }
}

/*Opciones de envio*/
let costoEnvio = 0;

function calcularEnvio() {
    let tiposDeEnvios = document.getElementsByName("optEnvio");
    for (let i = 0; i < tiposDeEnvios.length; i++) {
        const opcionEnvio = tiposDeEnvios[i];
     if (opcionEnvio.checked) {
         let porcentajeEnvio = parseFloat(opcionEnvio.value);
        costoEnvio = (porcentajeEnvio*subtotalSinEnvio).toFixed(2);
     }   
    } if (monedaMostrada) {
        document.getElementById("costoEnvio").innerHTML = "Costo de envio: USD " + costoEnvio;
    } else {
       document.getElementById("costoEnvio").innerHTML = "Costo de envio: UYU " + costoEnvio; 
    }
     
}

/*Borrar item de carrito*/
const deleteCartItem = (e) => {

    infoCart.splice(e, 1);
    cantidadArticulos.splice(e, 1);
    showCart();
}
