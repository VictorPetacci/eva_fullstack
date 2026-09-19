document.addEventListener('DOMContentLoaded', () => {
  const contenedorDetalle = document.getElementById('contenedor-detalle');
  const nombreRuta = document.getElementById('ruta-nombre-producto');

  const productos = {
    teclado: {
      nombre: 'Teclado Mecánico RGB',
      imagen:
        'https://images.unsplash.com/photo-1541140532154-b024d705b90a?auto=format&fit=crop&w=800&q=80',
      descripcion: 'Teclado mecánico con iluminación RGB y respuesta rápida para jugar y trabajar.',
      precio: '$49.990',
      detalles: ['Switches mecánicos', 'Iluminación RGB', 'Conexión USB']
    },
    mouse: {
      nombre: 'Mouse Gamer Pro',
      imagen:
        'https://images.unsplash.com/photo-1527814050087-3793815479db?auto=format&fit=crop&w=800&q=80',
      descripcion: 'Mouse ergonómico diseñado para entregar precisión y control durante cada partida.',
      precio: '$29.990',
      detalles: ['Diseño ergonómico', 'Sensor de alta precisión', 'Botones programables']
    },
    audifonos: {
      nombre: 'Audífonos Inalámbricos',
      imagen:
        'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=800&q=80',
      descripcion: 'Audífonos inalámbricos con sonido envolvente para disfrutar cada movimiento.',
      precio: '$39.990',
      detalles: ['Conexión inalámbrica', 'Sonido envolvente', 'Micrófono incorporado']
    }
  };

  if (contenedorDetalle) {
    const productoSeleccionado = new URLSearchParams(window.location.search).get('producto');
    const producto = productos[productoSeleccionado] || productos.teclado;

    nombreRuta.textContent = producto.nombre;
    contenedorDetalle.innerHTML = `
      <div class="detalle-contenido">
        <div class="detalle-imagen">
          <img src="${producto.imagen}" alt="${producto.nombre}" />
        </div>
        <div class="detalle-informacion">
          <h1>${producto.nombre}</h1>
          <p>${producto.descripcion}</p>
          <p class="precio-producto">${producto.precio}</p>
          <h2>Características</h2>
          <ul class="lista-detalles">
            ${producto.detalles.map((detalle) => `<li>${detalle}</li>`).join('')}
          </ul>
          <button type="button">Agregar al carrito</button>
        </div>
      </div>
    `;

    const contenedorRelacionados = document.getElementById('contenedor-relacionados');
    const productosRelacionados = Object.entries(productos).filter(
      ([identificador]) => identificador !== (productoSeleccionado || 'teclado')
    );

    contenedorRelacionados.innerHTML = productosRelacionados
      .map(
        ([identificador, productoRelacionado]) => `
          <a class="enlace-relacionado" href="detalle-producto.html?producto=${identificador}">
            <article class="tarjeta-relacionada">
              <img src="${productoRelacionado.imagen}" alt="${productoRelacionado.nombre}" />
              <h3>${productoRelacionado.nombre}</h3>
              <p>${productoRelacionado.precio}</p>
            </article>
          </a>
        `
      )
      .join('');
  }

  const formulario = document.getElementById('formularioRegistro');
  const nombre = document.getElementById('nombre');
  const correo = document.getElementById('correo');

  const errorNombre = document.getElementById('errorNombre');
  const errorCorreo = document.getElementById('errorCorreo');

  if (!formulario) {
    return;
  }

  formulario.addEventListener('submit', (evento) => {
    let formularioValido = true;

    if (nombre.value.trim().length < 3) {
      errorNombre.textContent =
        'El nombre debe tener al menos 3 caracteres.';
      formularioValido = false;
    } else {
      errorNombre.textContent = '';
    }

    const expresionCorreo = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!expresionCorreo.test(correo.value)) {
      errorCorreo.textContent = 'Ingrese un correo electrónico válido.';
      formularioValido = false;
    } else {
      errorCorreo.textContent = '';
    }

    if (!formularioValido) {
      evento.preventDefault();
    } else {
      alert('Formulario enviado con éxito');
    }
  });
});