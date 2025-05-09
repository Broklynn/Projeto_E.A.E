const logado = localStorage.getItem('usuarioLogado');

if (logado !== 'true' && window.location.pathname !== '/html/usuario.html') {
  window.location.href = '/html/usuario.html';
} else {
  const nomeUsuario = localStorage.getItem('usuarioNome') || 'Usuário';
  const nomeElemento = document.getElementById('nomeUsuario');
  if (nomeElemento) {
    nomeElemento.innerText = `Olá, ${nomeUsuario}`;
  }
}
