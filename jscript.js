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

function agregarAlCarrito(idProducto) {
  const carrito = obtenerCarrito();
  const itemExistente = carrito.find((item) => item.id === idProducto);

  if (itemExistente) {
    itemExistente.cantidad += 1;
  } else {
    carrito.push({ id: idProducto, cantidad: 1 });
  }

  guardarCarrito(carrito);
  actualizarContadorCarrito();
}

function renderizarProductos() {
  const contenedor = document.getElementById('contenedor-productos');
  if (!contenedor) return;

  let html = '';

  productos.forEach(producto => {
    html += `
      <article class="tarjeta-producto">
        <img src="${producto.imagen}" alt="${producto.nombre}" loading="lazy" />
        <h3>${producto.nombre}</h3>
        <p>${producto.descripcion}</p>
        <p class="precio-producto">$${producto.precio.toLocaleString('es-CL')}</p>
        <button type="button" onclick="agregarAlCarrito(${producto.id})">Añadir al carrito</button>
      </article>
    `;
  });

  contenedor.innerHTML = html;
}

document.addEventListener('DOMContentLoaded', () => {
  renderizarProductos();
  actualizarContadorCarrito();
});