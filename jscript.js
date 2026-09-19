const productos = [
  {
    id: 1,
    nombre: "Teclado Mecanico",
    descripcion: "Respuesta rapida",
    precio: 45000,
    imagen: "https://images.unsplash.com/photo-1541140532154-b024d705b90a?auto=format&fit=crop&w=600&q=80"
  },
  {
    id: 2,
    nombre: "Mouse Stax Pro Edition",
     descripcion: "Sensor óptico de alta precisión",
    precio: 25000,
    imagen: "https://images.unsplash.com/photo-1527814050087-3793815479db?auto=format&fit=crop&w=600&q=80"
  },
  {
    id: 3,
    nombre: "Audífonos Neo",
    descripcion: "Sonido espacial inmersivo",
    precio: 55000,
    imagen: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=600&q=80"
  }
];

const CARRITO_STORAGE_KEY = 'carritoCompras';

function obtenerCarrito() {
  const datos = localStorage.getItem(CARRITO_STORAGE_KEY);
  return datos ? JSON.parse(datos) : [];
}

function guardarCarrito(carrito) {
  localStorage.setItem(CARRITO_STORAGE_KEY, JSON.stringify(carrito));
}

function actualizarContadorCarrito() {
  const contador = document.getElementById('contador-carrito');
  if (!contador) return;
  const carrito = obtenerCarrito();
  const totalItems = carrito.reduce((total, item) => total + item.cantidad, 0);
  contador.textContent = totalItems;
}

function agregarAlCarrito(idProducto, cantidad = 1) {
  const carrito = obtenerCarrito();
  const itemExistente = carrito.find((item) => item.id === idProducto);

  if (itemExistente) {
    itemExistente.cantidad += cantidad;
  } else {
    carrito.push({ id: idProducto, cantidad });
  }

  guardarCarrito(carrito);
  actualizarContadorCarrito();
}

function crearTarjetaProducto(producto) {
  return `
    <article class="tarjeta-producto">
      <a href="detalle-producto.html?id=${producto.id}" class="enlace-producto">
        <img src="${producto.imagen}" alt="${producto.nombre}" loading="lazy" />
        <h3>${producto.nombre}</h3>
        <p>${producto.descripcion}</p>
        <p class="precio-producto">$${producto.precio.toLocaleString('es-CL')}</p>
      </a>
      <button type="button" onclick="agregarAlCarrito(${producto.id})">Añadir al carrito</button>
    </article>
  `;
}

function renderizarProductos() {
  const contenedor = document.getElementById('contenedor-productos');
  if (!contenedor) return;

  contenedor.innerHTML = productos.map(crearTarjetaProducto).join('');
}

function obtenerIdProductoDesdeUrl() {
  const parametros = new URLSearchParams(window.location.search);
  const id = parseInt(parametros.get('id'), 10);
  return Number.isNaN(id) ? null : id;
}

function renderizarDetalleProducto() {
  const contenedor = document.getElementById('contenedor-detalle');
  if (!contenedor) return;

  const idProducto = obtenerIdProductoDesdeUrl();
  const producto = productos.find((item) => item.id === idProducto);

  if (!producto) {
    contenedor.innerHTML = '<p>Producto no encontrado.</p>';
    return;
  }

  document.getElementById('ruta-nombre-producto').textContent = producto.nombre;
  document.title = `${producto.nombre} - Tienda en Línea DSY1104`;

  contenedor.innerHTML = `
    <div class="detalle-producto-grid">
      <div class="detalle-producto-imagen">
        <img src="${producto.imagen}" alt="${producto.nombre}" loading="lazy" />
      </div>
      <div class="detalle-producto-info">
        <h2>${producto.nombre}</h2>
        <p>${producto.descripcion}</p>
        <p class="detalle-producto-precio">$${producto.precio.toLocaleString('es-CL')}</p>

        <div class="selector-cantidad">
          <label for="cantidadProducto">Cantidad:</label>
          <input type="number" id="cantidadProducto" name="cantidadProducto" min="1" value="1" />
        </div>

        <button type="button" id="botonAgregarDetalle">Añadir al carrito</button>
      </div>
    </div>
  `;

  document.getElementById('botonAgregarDetalle').addEventListener('click', () => {
    const inputCantidad = document.getElementById('cantidadProducto');
    let cantidad = parseInt(inputCantidad.value, 10);
    if (Number.isNaN(cantidad) || cantidad < 1) {
      cantidad = 1;
      inputCantidad.value = 1;
    }
    agregarAlCarrito(producto.id, cantidad);
    alert(`${producto.nombre} fue añadido al carrito (${cantidad}).`);
  });

  renderizarRelacionados(producto.id);
}

function renderizarRelacionados(idProductoActual) {
  const contenedor = document.getElementById('contenedor-relacionados');
  if (!contenedor) return;

  const relacionados = productos.filter((producto) => producto.id !== idProductoActual);
  contenedor.innerHTML = relacionados.map(crearTarjetaProducto).join('');
}

document.addEventListener('DOMContentLoaded', () => {
  renderizarProductos();
  renderizarDetalleProducto();
  actualizarContadorCarrito();
});