
  document.addEventListener('DOMContentLoaded', () => {
    const iconeUsuario = document.getElementById('iconeUsuario');
    if (localStorage.getItem('usuarioLogado') === 'true') {
      iconeUsuario.href = '/html/dashboard.html';
    } else {
      iconeUsuario.href = '/html/usuario.html';
    }
  });
