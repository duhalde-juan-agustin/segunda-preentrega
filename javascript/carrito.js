window.addEventListener('load', () => {
    const productosGuardados = JSON.parse(localStorage.getItem('productos')) || [];
    const totalGuardado = parseFloat(localStorage.getItem('total')) || 0;

    const listaCarrito = document.getElementById('lista-carrito');
    productosGuardados.forEach(producto => {
        const itemCarrito = document.createElement('li');
        itemCarrito.innerHTML = `
            <img src="${producto.imagen}">
            <div>
                <h3>${producto.nombre}</h3>
                <p>$${producto.precio.toFixed(2)}</p>
            </div>
            <button class="borrar-item">Eliminar</button>
        `;
        listaCarrito.appendChild(itemCarrito);

        const botonEliminar = itemCarrito.querySelector('.borrar-item');
        botonEliminar.addEventListener('click', borrarProducto);
    });


    const cantidadProductos = productosGuardados.length;
    const contador = document.getElementById('contador-carrito');
    contador.textContent = cantidadProductos;

    const total = document.getElementById('total');
    total.textContent = totalGuardado.toFixed(2);
});

function agregarProducto(evento) {
    const boton = evento.target;
    const producto = boton.parentElement;
    const imagen = producto.querySelector('img').src;
    const nombre = producto.querySelector('h3').textContent;
    const precio = parseFloat(producto.querySelector('p').textContent.replace('$', ''));
    const itemCarrito = document.createElement('li');
    itemCarrito.innerHTML = `
        <img src="${imagen}">
        <div>
            <h3>${nombre}</h3>
            <p>$${precio.toFixed(2)}</p>
        </div>
        <button class="borrar-item">Eliminar</button>
    `;
    const listaCarrito = document.getElementById('lista-carrito');
    listaCarrito.appendChild(itemCarrito);

    let totalActual = parseFloat(document.getElementById('total').textContent);
    totalActual += precio;
    document.getElementById('total').textContent = totalActual.toFixed(2);
    localStorage.setItem('total', totalActual);

    actualizarContador();
    guardarProductos();
    const botonEliminar = itemCarrito.querySelector('.borrar-item');
    botonEliminar.addEventListener('click', borrarProducto);
}

function borrarProducto(evento) {
    const botonEliminar = evento.target;
    const producto = botonEliminar.parentElement;
    const precio = parseFloat(producto.querySelector('p').textContent.replace('$', ''));
    producto.remove();

    let totalActual = parseFloat(document.getElementById('total').textContent);
    totalActual -= precio;
    document.getElementById('total').textContent = totalActual.toFixed(2);
    localStorage.setItem('total', totalActual);

    actualizarContador();
    guardarProductos();
}

function actualizarContador() {
    const contador = document.getElementById('contador-carrito');
    const cantidadProductos = document.querySelectorAll('#lista-carrito li').length;
    contador.textContent = cantidadProductos;
    localStorage.setItem('cantidadProductos', cantidadProductos);
}

function guardarProductos() {
    const productos = [];
    document.querySelectorAll('#lista-carrito li').forEach(item => {
        const imagen = item.querySelector('img').src;
        const nombre = item.querySelector('h3').textContent;
        const precio = parseFloat(item.querySelector('p').textContent.replace('$', ''));
        productos.push({ imagen, nombre, precio });
    });
    localStorage.setItem('productos', JSON.stringify(productos));
}

const botones = document.querySelectorAll('.boton-comprar');
botones.forEach(boton => {
    boton.addEventListener('click', agregarProducto);
});

const carritoIcono = document.getElementById('carrito-icono');
carritoIcono.addEventListener('click', toggleCarrito);

function toggleCarrito() {
    const carrito = document.getElementById('carrito');
    carrito.classList.toggle('visible');
}

const cerrarCarrito = document.getElementById('cerrar-carrito');
cerrarCarrito.addEventListener('click', () => {
    const carrito = document.getElementById('carrito');
    carrito.classList.remove('visible');
});

const comprarBtn = document.getElementById('comprar-btn');
comprarBtn.addEventListener('click', () => {
    window.location.href = 'comprar.html';
});


