document.addEventListener('DOMContentLoaded', () => {
  const formulario = document.getElementById('formularioRegistro');
  const nombre = document.getElementById('nombre');
  const correo = document.getElementById('correo');

  const errorNombre = document.getElementById('errorNombre');
  const errorCorreo = document.getElementById('errorCorreo');

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