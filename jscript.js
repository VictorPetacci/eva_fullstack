const CLAVE_CARRITO = 'carritoTienda';

function obtenerCarrito() {
  return JSON.parse(localStorage.getItem(CLAVE_CARRITO) || '[]');
}

function guardarCarrito(carrito) {
  localStorage.setItem(CLAVE_CARRITO, JSON.stringify(carrito));
}

function actualizarContadorCarrito() {
  const contadores = document.querySelectorAll('.contador-carrito');
  const cantidadTotal = obtenerCarrito().reduce(
    (total, producto) => total + producto.cantidad,
    0
  );

  contadores.forEach((contador) => {
    contador.textContent = cantidadTotal;
  });
}

const comunasPorRegion = {
  "Arica y Parinacota": ["Arica", "Camarones", "General Lagos", "Putre"],
  "Tarapaca": ["Alto Hospicio", "Camiña", "Colchane", "Huara", "Iquique", "Pica", "Pozo Almonte"],
  "Antofagasta": ["Antofagasta", "Calama", "María Elena", "Mejillones", "Ollagüe", "San Pedro de Atacama", "Sierra Gorda", "Taltal", "Tocopilla"],
  "Atacama": ["Alto del Carmen", "Caldera", "Chañaral", "Copiapó", "Diego de Almagro", "Freirina", "Huasco", "Tierra Amarilla", "Vallenar"],
  "Coquimbo": ["Andacollo", "Canela", "Combarbalá", "Coquimbo", "Illapel", "La Higuera", "La Serena", "Los Vilos", "Monte Patria", "Ovalle", "Paihuano", "Punitaqui", "Río Hurtado", "Salamanca", "Vicuña"],
  "Valparaíso": ["Algarrobo", "Cabildo", "Calera", "Calle Larga", "Cartagena", "Casablanca", "Catemu", "Concón", "El Quisco", "El Tabo", "Hijuelas", "Isla de Pascua", "Juan Fernández", "La Cruz", "La Ligua", "Limache", "Llay-Llay", "Los Andes", "Marga Marga", "Nogales", "Olmué", "Panquehue", "Papudo", "Petorca", "Puchuncaví", "Putaendo", "Quillota", "Quilpué", "Quintero", "Rinconada", "San Antonio", "San Esteban", "San Felipe", "Santa María", "Santo Domingo", "Valparaíso", "Villa Alemana", "Viña del Mar", "Zapallar"],
  "Metropolitana de Santiago": ["Alhué", "Buin", "Calera de Tango", "Cerrillos", "Cerro Navia", "Colina", "Conchalí", "Curacaví", "El Bosque", "El Monte", "Estación Central", "Huechuraba", "Independencia", "Isla de Maipo", "La Cisterna", "La Florida", "La Granja", "La Pintana", "La Reina", "Lampa", "Las Condes", "Lo Barnechea", "Lo Espejo", "Lo Prado", "Macul", "Maipú", "María Pinto", "Melipilla", "Ñuñoa", "Padre Hurtado", "Paine", "Pedro Aguirre Cerda", "Peñaflor", "Peñalolén", "Pirque", "Providencia", "Pudahuel", "Puente Alto", "Quilicura", "Quinta Normal", "Recoleta", "Renca", "San Bernardo", "San Joaquín", "San José de Maipo", "San Miguel", "San Pedro", "San Ramón", "Santiago", "Talagante", "Tiltil", "Vitacura"],
  "O'Higgins": ["Chépica", "Chimbarongo", "Codegua", "Coinco", "Coltauco", "Doñihue", "Graneros", "La Estrella", "Las Cabras", "Litueche", "Lolol", "Machalí", "Malloa", "Marchigüe", "Mostazal", "Nancagua", "Navidad", "Olivar", "Palmilla", "Paredones", "Peralillo", "Peumo", "Pichidegua", "Pichilemu", "Placilla", "Pumanque", "Quinta de Tilcoco", "Rancagua", "Rengo", "Requínoa", "San Fernando", "San Vicente", "Santa Cruz"],
  "Maule": ["Cauquenes", "Chanco", "Colbún", "Constitución", "Curepto", "Curicó", "Empedrado", "Hualañé", "Licantén", "Linares", "Longaví", "Maule", "Molina", "Parral", "Pelarco", "Pelluhue", "Pencahue", "Rauco", "Retiro", "Río Claro", "Romeral", "Sagrada Familia", "San Clemente", "San Javier", "San Rafael", "Talca", "Teno", "Vichuquén", "Villa Alegre", "Yerbas Buenas"],
  "Ñuble": ["Bulnes", "Chillán", "Chillán Viejo", "Cobquecura", "Coelemu", "Coihueco", "El Carmen", "Ninhue", "Ñiquén", "Pemuco", "Pinto", "Portezuelo", "Quillón", "Quirihue", "Ránquil", "San Carlos", "San Fabián", "San Ignacio", "San Nicolás", "Treguaco", "Yungay"],
  "Biobío": ["Alto Biobío", "Antuco", "Arauco", "Cabrero", "Cañete", "Chiguayante", "Concepción", "Contulmo", "Coronel", "Curanilahue", "Florida", "Hualpén", "Hualqui", "Laja", "Lebu", "Los Álamos", "Los Ángeles", "Lota", "Mulchén", "Nacimiento", "Negrete", "Ninhue", "Penco", "Quilaco", "Quilleco", "San Pedro de la Paz", "San Rosendo", "Santa Bárbara", "Santa Juana", "Talcahuano", "Tirúa", "Tomé", "Tucapel", "Yumbel"],
  "La Araucanía": ["Angol", "Carahue", "Cholchol", "Collipulli", "Cunco", "Curacautín", "Curarrehue", "Ercilla", "Freire", "Galvarino", "Gorbea", "Lautaro", "Loncoche", "Lonquimay", "Los Sauces", "Lumaco", "Melipeuco", "Nueva Imperial", "Padre Las Casas", "Perquenco", "Pitrufquén", "Pucón", "Purén", "Renaico", "Saavedra", "Temuco", "Teodoro Schmidt", "Toltén", "Traiguén", "Victoria", "Vilcún", "Villarrica"],
  "Los Ríos": ["Corral", "Futrono", "La Unión", "Lago Ranco", "Lanco", "Los Lagos", "Máfil", "Mariquina", "Paillaco", "Panguipulli", "Río Bueno", "Valdivia"],
  "Los Lagos": ["Ancud", "Calbuco", "Castro", "Chaitén", "Chonchi", "Cochamó", "Curaco de Vélez", "Dalcahue", "Frutillar", "Fresia", "Hualaihué", "Llanquihue", "Los Muermos", "Maullín", "Osorno", "Palena", "Puerto Montt", "Puerto Octay", "Purranque", "Puyehue", "Queilén", "Quellón", "Quemchi", "Quinchao", "Río Negro", "San Juan de la Costa", "San Pablo"],
  "Aysén del General Carlos Ibáñez del Campo": ["Aysén", "Chile Chico", "Cisnes", "Cochrane", "Coyhaique", "Guaitecas", "Lago Verde", "O'Higgins", "Río Ibáñez", "Tortel"],
  "Magallanes y de la Antártica Chilena": ["Antártica", "Cabo de Hornos", "Laguna Blanca", "Porvenir", "Primavera", "Puerto Natales", "Punta Arenas", "Río Verde", "San Gregorio", "Timaukel", "Torres del Paine"]
};

function cargarRegionesYComunas() {
  const region = document.getElementById('regionRegistro');
  const comuna = document.getElementById('comunaRegistro');
  if (!region || !comuna) {
    return;
  }

  for (const nombreRegion in comunasPorRegion) {
    region.innerHTML += `
      <option value="${nombreRegion}">${nombreRegion}</option>
    `;
  }

  region.addEventListener('change', function () {
    comuna.innerHTML = '<option value="">Selecciona una comuna</option>';
    const comunas = comunasPorRegion[region.value] || [];

    comunas.forEach(function (nombreComuna) {
      comuna.innerHTML += `
        <option value="${nombreComuna}">${nombreComuna}</option>
      `;
    });
  });
}

function runValido(valor) {
  return /^\d{7,8}[0-9Kk]$/.test(valor.trim());
}

function correoPermitido(valor) {
  const correo = valor.trim().toLowerCase();
  return /^[^\s@]+@([a-z0-9-]+\.)?duoc\.cl$|^[^\s@]+@gmail\.com$/.test(correo);
}

function correoDuocValido(valor) {
  return /^[^\s@]+@([a-z0-9-]+\.)?duoc\.cl$/i.test(valor.trim());
}

function mostrarVentanaProducto() {
  const ventana = document.createElement('div');
  ventana.className = 'ventana-emergente';
  ventana.innerHTML = '<div class="contenido-emergente"><span class="icono-exito">&#10003;</span><h2>Producto agregado</h2><p>El producto se agregó al carrito.</p></div>';
  document.body.appendChild(ventana);
  setTimeout(() => ventana.remove(), 1000);
}

function renderizarCarrito() {
  const lista = document.getElementById('lista-carrito');
  const total = document.getElementById('total-carrito');
  if (!lista || !total) return;

  const carrito = obtenerCarrito();
  if (carrito.length === 0) {
    lista.innerHTML = '<p>Tu carrito está vacío.</p>';
    total.textContent = '0';
    return;
  }

  lista.innerHTML = carrito.map((producto, indice) => `
    <article class="producto-carrito">
      <strong>${producto.nombre}</strong>
      <span>$${producto.precio.toLocaleString('es-CL')}</span>
      <label>Cantidad
        <input class="cantidad-carrito" type="number" min="1" value="${producto.cantidad}" data-indice="${indice}" />
      </label>
      <button type="button" class="eliminar-carrito" data-indice="${indice}">Eliminar</button>
    </article>
  `).join('');

  const actualizar = () => {
    const nuevoCarrito = obtenerCarrito();
    total.textContent = nuevoCarrito.reduce((suma, producto) => suma + producto.precio * producto.cantidad, 0).toLocaleString('es-CL');
  };

  lista.querySelectorAll('.cantidad-carrito').forEach((input) => {
    input.addEventListener('change', () => {
      const carritoActual = obtenerCarrito();
      carritoActual[input.dataset.indice].cantidad = Math.max(1, Number(input.value));
      guardarCarrito(carritoActual);
      renderizarCarrito();
    });
  });

  lista.querySelectorAll('.eliminar-carrito').forEach((boton) => {
    boton.addEventListener('click', () => {
      const carritoActual = obtenerCarrito();
      carritoActual.splice(boton.dataset.indice, 1);
      guardarCarrito(carritoActual);
      renderizarCarrito();
    });
  });
  actualizar();
}

document.addEventListener('DOMContentLoaded', () => {
  cargarRegionesYComunas();
  renderizarCarrito();
  actualizarContadorCarrito();
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


  const formulario = document.getElementById('formularioRegistro');
  const formularioInicio = document.getElementById('formularioInicio');
  const nombre = document.getElementById('nombre');
  const correo = document.getElementById('correo');
  const contrasena = document.getElementById('contrasena');
  const contrasenaInicio = document.getElementById('contrasenaInicio');
  const runRegistro = document.getElementById('runRegistro');
  const direccionRegistro = document.getElementById('direccionRegistro');
  const regionRegistro = document.getElementById('regionRegistro');
  const comunaRegistro = document.getElementById('comunaRegistro');

  const errorNombre = document.getElementById('errorNombre');
  const errorCorreo = document.getElementById('errorCorreo');
  const correoInicio = document.getElementById('correoInicio');
  const errorCorreoInicio = document.getElementById('errorCorreoInicio');
  const errorContrasena = document.getElementById('errorContrasena');
  const errorContrasenaInicio = document.getElementById('errorContrasenaInicio');
  const errorRunRegistro = document.getElementById('errorRunRegistro');
  const errorDireccionRegistro = document.getElementById('errorDireccionRegistro');
  const errorRegionRegistro = document.getElementById('errorRegionRegistro');
  const errorComunaRegistro = document.getElementById('errorComunaRegistro');
  const mensajeRegistroExitoso = document.getElementById('mensajeRegistroExitoso');
  const mensajeInicioExitoso = document.getElementById('mensajeInicioExitoso');

  const botonesAgregar = document.querySelectorAll('.boton-agregar');

  botonesAgregar.forEach((boton) => {
    boton.addEventListener('click', () => {
      const campoCantidad = boton.parentElement.querySelector('.cantidad-producto');
      const cantidad = Math.max(1, Number(campoCantidad?.value) || 1);
      const carrito = obtenerCarrito();
      const productoExistente = carrito.find((producto) => producto.nombre === boton.dataset.nombre);
      if (productoExistente) {
        productoExistente.cantidad += cantidad;
      } else {
        carrito.push({
          nombre: boton.dataset.nombre,
          precio: Number(boton.dataset.precio),
          cantidad
        });
      }
      guardarCarrito(carrito);
      actualizarContadorCarrito();
      mostrarVentanaProducto();
    });
  });

  const botonComprar = document.getElementById('boton-comprar');
  if (botonComprar) {
    botonComprar.addEventListener('click', () => {
      const mensaje = document.getElementById('mensaje-compra');
      const carrito = obtenerCarrito();
      if (carrito.length === 0) {
        mensaje.textContent = 'Agrega productos antes de comprar.';
        return;
      }
      localStorage.removeItem(CLAVE_CARRITO);
      mensaje.textContent = 'Compra simulada realizada correctamente.';
      renderizarCarrito();
    });
  }

  const formularioContacto = document.getElementById('formularioContacto');
  if (formularioContacto) {
    formularioContacto.addEventListener('submit', (evento) => {
      evento.preventDefault();
      const nombreContacto = document.getElementById('nombreContacto');
      const correoContacto = document.getElementById('correoContacto');
      const mensajeContacto = document.getElementById('mensajeContacto');
      const errores = {
        nombre: document.getElementById('errorNombreContacto'),
        correo: document.getElementById('errorCorreoContacto'),
        mensaje: document.getElementById('errorMensajeContacto')
      };
      let valido = true;
      const correoPermitido = /^[^\s@]+@(duoc\.cl|profesor\.duoc\.cl|gmail\.com)$/i;

      errores.nombre.textContent = '';
      errores.correo.textContent = '';
      errores.mensaje.textContent = '';

      if (!nombreContacto.value.trim() || nombreContacto.value.trim().length > 100) {
        errores.nombre.textContent = 'El nombre es obligatorio y debe tener máximo 100 caracteres.';
        valido = false;
      }
      if (!correoPermitido.test(correoContacto.value.trim())) {
        errores.correo.textContent = 'Usa un correo @duoc.cl, @profesor.duoc.cl o @gmail.com.';
        valido = false;
      }
      if (!mensajeContacto.value.trim() || mensajeContacto.value.trim().length > 500) {
        errores.mensaje.textContent = 'El mensaje es obligatorio y debe tener máximo 500 caracteres.';
        valido = false;
      }
      if (valido) {
        document.getElementById('mensajeContactoExitoso').textContent = 'Mensaje enviado correctamente.';
        formularioContacto.reset();
      }
    });
  }

  ['formularioProducto', 'formularioUsuario'].forEach((idFormulario) => {
    const formularioAdmin = document.getElementById(idFormulario);
    if (!formularioAdmin) return;

    formularioAdmin.addEventListener('submit', (evento) => {
      evento.preventDefault();
      const mensaje = formularioAdmin.querySelector('.mensaje-administrador');
      formularioAdmin.querySelectorAll('.mensaje-error').forEach((error) => {
        error.textContent = '';
      });

      let formularioValido = true;

      if (idFormulario === 'formularioProducto') {
        const codigo = document.getElementById('codigoProducto');
        const nombreProducto = document.getElementById('nombreProducto');
        const precio = document.getElementById('precioProducto');
        const stock = document.getElementById('stockProducto');
        const stockCritico = document.getElementById('stockCritico');
        const categoria = document.getElementById('categoriaProducto');

        if (!codigo.value.trim()) {
          document.getElementById('errorCodigoProducto').textContent = 'Ingresa un código.';
          formularioValido = false;
        }
        if (!nombreProducto.value.trim()) {
          document.getElementById('errorNombreProducto').textContent = 'Ingresa un nombre.';
          formularioValido = false;
        }
        if (precio.value === '' || Number(precio.value) < 0) {
          document.getElementById('errorPrecioProducto').textContent = 'Ingresa un precio válido.';
          formularioValido = false;
        }
        if (stock.value === '' || Number(stock.value) < 0) {
          document.getElementById('errorStockProducto').textContent = 'Ingresa un stock válido.';
          formularioValido = false;
        }
        if (stockCritico.value === '' || Number(stockCritico.value) < 0 || Number(stockCritico.value) > Number(stock.value)) {
          document.getElementById('errorStockCritico').textContent = 'Debe ser menor o igual al stock.';
          formularioValido = false;
        }
        if (!categoria.value) {
          document.getElementById('errorCategoriaProducto').textContent = 'Selecciona una categoría.';
          formularioValido = false;
        }
      } else {
        const run = document.getElementById('runUsuario');
        const nombreUsuario = document.getElementById('nombreUsuario');
        const correoUsuario = document.getElementById('correoUsuario');
        const rol = document.getElementById('rolUsuario');

        if (!runValido(run.value)) {
          document.getElementById('errorRunUsuario').textContent = 'Ingresa un RUN válido, sin puntos ni guion.';
          formularioValido = false;
        }
        if (!nombreUsuario.value.trim()) {
          document.getElementById('errorNombreUsuario').textContent = 'Ingresa un nombre.';
          formularioValido = false;
        }
        if (!correoPermitido(correoUsuario.value)) {
          document.getElementById('errorCorreoUsuario').textContent = 'Usa un correo @duoc.cl, @profesor.duoc.cl o @gmail.com.';
          formularioValido = false;
        }
        if (!rol.value) {
          document.getElementById('errorRolUsuario').textContent = 'Selecciona un rol.';
          formularioValido = false;
        }
      }

      if (formularioValido) {
        mensaje.textContent = 'Datos guardados correctamente.';
        formularioAdmin.reset();
      } else {
        mensaje.textContent = '';
      }
    });
  });

  const contrasenaValida = (valor) =>
    valor.length >= 8 &&
    /[A-Z]/.test(valor) &&
    /[a-z]/.test(valor) &&
    /[0-9]/.test(valor);

  const validarContrasena = (valor, mensaje) => {
    if (!contrasenaValida(valor)) {
      mensaje.textContent =
        'La contraseña debe tener 8 caracteres, una mayúscula, una minúscula y un número.';
      return false;
    }

    mensaje.textContent = '';
    return true;
  };

  if (formulario) {
    formulario.addEventListener('submit', (evento) => {
    let formularioValido = true;

    if (nombre.value.trim().length < 4) {
      errorNombre.textContent =
        'El nombre debe tener al menos 4 caracteres.';
      formularioValido = false;
    } else {
      errorNombre.textContent = '';
    }

    if (!runValido(runRegistro.value)) {
      errorRunRegistro.textContent = 'Ingresa un RUN válido, sin puntos ni guion.';
      formularioValido = false;
    } else {
      errorRunRegistro.textContent = '';
    }

    if (!direccionRegistro.value.trim()) {
      errorDireccionRegistro.textContent = 'La dirección es obligatoria.';
      formularioValido = false;
    } else {
      errorDireccionRegistro.textContent = '';
    }

    if (!regionRegistro.value) {
      errorRegionRegistro.textContent = 'Selecciona una región.';
      formularioValido = false;
    } else {
      errorRegionRegistro.textContent = '';
    }

    if (!comunaRegistro.value) {
      errorComunaRegistro.textContent = 'Selecciona una comuna.';
      formularioValido = false;
    } else {
      errorComunaRegistro.textContent = '';
    }

    const expresionCorreo = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!correoDuocValido(correo.value) || !expresionCorreo.test(correo.value)) {
      errorCorreo.textContent = 'Usa un correo institucional Duoc.';
      formularioValido = false;
    } else {
      errorCorreo.textContent = '';
    }

    if (!validarContrasena(contrasena.value, errorContrasena)) {
      formularioValido = false;
    }

    if (!formularioValido) {
      evento.preventDefault();
    } else {
      evento.preventDefault();
      mensajeRegistroExitoso.textContent = 'Registro realizado exitosamente.';
      setTimeout(() => {
        window.location.href = 'index.html';
      }, 1500);
    }
    });
  }

  if (formularioInicio) {
    formularioInicio.addEventListener('submit', (evento) => {
      if (!correoDuocValido(correoInicio.value)) {
        errorCorreoInicio.textContent = 'Usa un correo institucional Duoc.';
        evento.preventDefault();
        return;
      }

      errorCorreoInicio.textContent = '';
      if (!validarContrasena(contrasenaInicio.value, errorContrasenaInicio)) {
        evento.preventDefault();
        return;
      }

      evento.preventDefault();
      mensajeInicioExitoso.textContent = 'Inicio de sesión exitoso.';
      setTimeout(() => {
        window.location.href = 'index.html';
      }, 1500);
    });
  }
});