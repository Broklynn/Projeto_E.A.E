const logado = localStorage.getItem('usuarioLogado');

if (logado !== 'true') {
  
  window.location.href = '/html/usuario.html';
}
