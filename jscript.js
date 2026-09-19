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


  const formulario = document.getElementById('formularioRegistro');
  const formularioInicio = document.getElementById('formularioInicio');
  const nombre = document.getElementById('nombre');
  const correo = document.getElementById('correo');
  const contrasena = document.getElementById('contrasena');
  const contrasenaInicio = document.getElementById('contrasenaInicio');

  const errorNombre = document.getElementById('errorNombre');
  const errorCorreo = document.getElementById('errorCorreo');
  const errorContrasena = document.getElementById('errorContrasena');
  const errorContrasenaInicio = document.getElementById('errorContrasenaInicio');
  const mensajeRegistroExitoso = document.getElementById('mensajeRegistroExitoso');
  const mensajeInicioExitoso = document.getElementById('mensajeInicioExitoso');

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

    const expresionCorreo = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!expresionCorreo.test(correo.value)) {
      errorCorreo.textContent = 'Ingrese un correo electrónico válido.';
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