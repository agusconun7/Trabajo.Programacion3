
const btnContinuar = document.getElementById("btnContinuar");

if (btnContinuar) {
    btnContinuar.addEventListener("click", continuar);
}

function continuar() {
    const nombre = document.getElementById("nombre").value;

    if (nombre.trim() === "") {
        alert("Debe ingresar un nombre");
        return;
    }

    localStorage.setItem("cliente", nombre);

    window.location.href = "teclados.html";
}

const productos = [
    {
        id: 1,
        nombre: "HyperX Alloy",
        precio: 120000
    },
    {
        id: 2,
        nombre: "Steelseries Apex",
        precio: 180000
    },
    {
        id: 3,
        nombre: "Razer BlackWidow",
        precio: 150000
    },
    {
        id: 4,
        nombre: "Redragon Cobra",
        precio: 45000
    },
    {
        id: 5,
        nombre: "Logitech G Pro",
        precio: 90000
    },
    {
        id: 6,
        nombre: "Corsair Harpoon",
        precio: 55000
    },
    {
        id: 7,
        nombre: "AOC AGON",
        precio: 380000
    },
    {
        id: 8,
        nombre: "ASUS OLED",
        precio: 950000
    },
    {
        id: 9,
        nombre: "Samsung Odyssey G3",
        precio: 420000
    },
    {
        id: 10,
        nombre: "HyperX Cloud",
        precio: 95000
    },
    {
        id: 11,
        nombre: "Logitech G435",
        precio: 110000
    },
    {
        id: 12,
        nombre: "Redragon Zeus",
        precio: 80000
    }
];

function agregarCarrito(id) {

    let carrito = JSON.parse(localStorage.getItem("carrito"));

    if (carrito === null) {
        carrito = [];
    }

    let encontrado = false;

    for (let i = 0; i < carrito.length; i++) {

        if (carrito[i].id === id) {
            carrito[i].cantidad++;
            encontrado = true;
        }
    }

    if (!encontrado) {

        for (let i = 0; i < productos.length; i++) {

            if (productos[i].id === id) {

                carrito.push({
                    id: productos[i].id,
                    nombre: productos[i].nombre,
                    precio: productos[i].precio,
                    cantidad: 1
                });
            }
        }
    }

    localStorage.setItem("carrito", JSON.stringify(carrito));

    alert("Producto agregado al carrito");
}

if (window.location.pathname.includes("carrito.html")) {
    mostrarCarrito();
}

function mostrarCarrito() {

    const contenedor = document.getElementById("contenedor-carrito");

    if (!contenedor) {
        return;
    }

    let carrito = JSON.parse(localStorage.getItem("carrito"));

    if (!carrito || carrito.length === 0) {

        contenedor.innerHTML = "<h3>El carrito está vacío</h3>";

        document.getElementById("total-carrito").innerHTML =
            "TOTAL: $0";

        return;
    }
    let html = "";
    let total = 0;

    for (let i = 0; i < carrito.length; i++) {

        const subtotal = carrito[i].precio * carrito[i].cantidad;

        total += subtotal;


        html += `
        <div class="item-carrito">

            <div>
                <h3>${carrito[i].nombre}</h3>

                <p>
                    Precio:
                    $${carrito[i].precio.toLocaleString("es-AR")}
                </p>

                <div class="cantidad-container">

                    <button onclick="restarCantidad(${carrito[i].id})">
                        -
                    </button>

                    <span>${carrito[i].cantidad}</span>

                    <button onclick="sumarCantidad(${carrito[i].id})">
                        +
                    </button>

                </div>

                <p>
                    Subtotal:
                    $${subtotal.toLocaleString("es-AR")}
                </p>
            </div>

            <button onclick="eliminarProducto(${carrito[i].id})">
                Eliminar
            </button>

        </div>
        `;
    }

    contenedor.innerHTML = html;

    document.getElementById("total-carrito").innerHTML =
    "TOTAL: $" + total.toLocaleString("es-AR");
}

function eliminarProducto(id) {

    let carrito = JSON.parse(localStorage.getItem("carrito"));

    carrito = carrito.filter(producto => producto.id !== id);

    localStorage.setItem("carrito", JSON.stringify(carrito));

    mostrarCarrito();
}

function vaciarCarrito() {

    localStorage.removeItem("carrito");

    mostrarCarrito();
}

function finalizarCompra() {

    let carrito = JSON.parse(localStorage.getItem("carrito"));

    if (!carrito || carrito.length === 0) {

        alert("El carrito está vacío");
        return;
    }

    const confirmar = confirm(
        "¿Desea confirmar la compra?"
    );

    if(confirmar){
        window.location.href = "ticket.html";
    }
}

if (window.location.pathname.includes("ticket.html")) {
    mostrarTicket();
}

function mostrarTicket() {

    const carrito = JSON.parse(localStorage.getItem("carrito"));
    const cliente = localStorage.getItem("cliente");

    if (!carrito || carrito.length === 0) {
        window.location.href = "teclados.html";
        return;
    }

    const fecha = new Date();

    document.getElementById("cliente-ticket").innerHTML =
        "Cliente: " + cliente;

    document.getElementById("fecha-ticket").innerHTML =
        "Fecha: " + fecha.toLocaleDateString("es-AR");

    let html = "";
    let total = 0;

    for(let i = 0; i < carrito.length; i++){

        const subtotal =
            carrito[i].precio * carrito[i].cantidad;

        total += subtotal;

        html += `
        <div class="producto-ticket">

            <span>
                ${carrito[i].nombre}
                x${carrito[i].cantidad}
            </span>

            <span>
                $${subtotal.toLocaleString("es-AR")}
            </span>

        </div>
        `;
    }

    document.getElementById("productos-ticket").innerHTML =
        html;

    document.getElementById("total-ticket").innerHTML =
        "TOTAL: $" + total.toLocaleString("es-AR");
}

function nuevaCompra(){

    localStorage.removeItem("carrito");

    window.location.href = "index.html";
}

function sumarCantidad(id){

    let carrito =
        JSON.parse(localStorage.getItem("carrito"));

    for(let i = 0; i < carrito.length; i++){

        if(carrito[i].id === id){
            carrito[i].cantidad++;
        }
    }

    localStorage.setItem(
        "carrito",
        JSON.stringify(carrito)
    );

    mostrarCarrito();
}

function restarCantidad(id){

    let carrito =
        JSON.parse(localStorage.getItem("carrito"));

    for(let i = 0; i < carrito.length; i++){

        if(carrito[i].id === id){

            carrito[i].cantidad--;

            if(carrito[i].cantidad <= 0){

                carrito.splice(i, 1);
            }
        }
    }

    localStorage.setItem(
        "carrito",
        JSON.stringify(carrito)
    );

    mostrarCarrito();
}



cargarTema();

function cambiarTema(){

    document.body.classList.toggle("dark");

    if(document.body.classList.contains("dark")){

        localStorage.setItem("tema","dark");

        const boton = document.getElementById("btnTema");

        if(boton){
            boton.innerHTML = "☀️ Modo Claro";
        }

    }else{

        localStorage.setItem("tema","light");

        const boton = document.getElementById("btnTema");

        if(boton){
            boton.innerHTML = "🌙 Modo Oscuro";
        }
    }
}

function cargarTema(){

    const tema = localStorage.getItem("tema");

    if(tema === "dark"){

        document.body.classList.add("dark");

        const boton = document.getElementById("btnTema");

        if(boton){
            boton.innerHTML = "☀️ Modo Claro";
        }
    }
}

