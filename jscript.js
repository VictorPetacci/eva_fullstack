const productos = [
  {
    id: 1,
    nombre: "Teclado Mecánico DreamsGamers",
    descripcion: "Respuesta rápida y switches red, ideal para el strafe en CS 1.6.",
    precio: 45000,
    imagen: "https://images.unsplash.com/photo-1541140532154-b024d705b90a?auto=format&fit=crop&w=600&q=80"
  },
  {
    id: 2,
    nombre: "Mouse Stax Pro Edition",
    descripcion: "Sensor óptico de alta precisión para headshots perfectos.",
    precio: 25000,
    imagen: "https://images.unsplash.com/photo-1527814050087-3793815479db?auto=format&fit=crop&w=600&q=80"
  },
  {
    id: 3,
    nombre: "Audífonos Neo Z-Survival",
    descripcion: "Sonido espacial inmersivo. Escucha los pasos antes de que te vean.",
    precio: 55000,
    imagen: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=600&q=80"
  }
];

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

function agregarAlCarrito(idProducto) {
  console.log('Preparando para añadir el producto con ID:', idProducto);
}

// Solo se ejecuta cuando esta correctamente caregado el dom
document.addEventListener('DOMContentLoaded', () => {
  renderizarProductos();

  // Formulario de contacto
  const formulario = document.getElementById('formularioRegistro');
  const nombre = document.getElementById('nombre');
  const correo = document.getElementById('correo');
  const errorNombre = document.getElementById('errorNombre');
  const errorCorreo = document.getElementById('errorCorreo');

  if(formulario) {
    formulario.addEventListener('submit', (evento) => {
      let formularioValido = true;

      if (nombre.value.trim().length < 3) {
        errorNombre.textContent = 'El nombre debe tener al menos 3 caracteres';
        formularioValido = false;
      } else {
        errorNombre.textContent = '';
      }

      // para darle mas "realismo" prohibimos ciertos caracteres
      const expresionCorreo = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!expresionCorreo.test(correo.value)) {
        errorCorreo.textContent = 'Ingrese un correo electronico valido';
        formularioValido = false;
      } else {
        errorCorreo.textContent = '';
      }

      if (!formularioValido) {
        evento.preventDefault();
      } else {
        evento.preventDefault(); // Con esto evitamos la recarga
        alert('Formulario enviado con éxito');
      }
    });
  }
});