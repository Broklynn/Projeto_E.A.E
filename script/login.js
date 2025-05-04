async function fazerLogin() {
  const usuario = document.getElementById('username').value;
  const senha = document.getElementById('password').value;

  try {
    const response = await fetch('http://localhost:3000/login', { 
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ usuario, senha })
    });

    const data = await response.json();

    if (response.ok && data.sucesso) {
      localStorage.setItem('usuarioLogado', 'true'); 
      window.location.href = '/html/dashboard.html'; 
    } else {
      document.getElementById('mensagem').textContent = data.mensagem || 'Erro no login';
    }

  } catch (error) {
    console.error('Erro ao tentar logar:', error);
    document.getElementById('mensagem').textContent = 'Erro de conexão com o servidor';
  }
}

function logout() {
  localStorage.removeItem('usuarioLogado');
  window.location.href = '/index.html';
}
