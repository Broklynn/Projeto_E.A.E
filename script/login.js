document.getElementById('loginForm').addEventListener('submit', async function (e) {
  e.preventDefault();

  const login = document.getElementById('username').value;
  const senha = document.getElementById('senha').value;

  try {
    const response = await fetch('http://localhost:3000/api/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ login, senha })
    });

    const resultado = await response.json();

    if (response.ok) {
      alert('Login realizado com sucesso!');
      // Redirecionar para a página do usuário ou dashboard, por exemplo:
      window.location.href = '/html/dashboard.html';
    } else {
      alert(resultado.erro || 'Credenciais inválidas');
    }
  } catch (err) {
    console.error(err);
    alert('Erro ao conectar com o servidor.');
  }
});


function logout() {
  localStorage.removeItem('usuarioLogado');
  window.location.href = '/index.html';
}
