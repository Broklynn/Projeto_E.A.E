document.getElementById('login-btn').addEventListener('click', () => {
    const logado = localStorage.getItem('usuarioLogado');
    if (logado === 'true') {
      window.location.href = '/html/dashboard.html';
    } else {
      if (window.location.pathname !== '/html/usuario.html') {
        window.location.href = '/html/usuario.html';
      }
    }
  });
  