document.getElementById('novaSenhaForm').addEventListener('submit', async function (e) {
    e.preventDefault();
  
    const novaSenha = document.getElementById('novaSenha').value;
    const login = localStorage.getItem('usuarioTemporario');
  
    try {
      const response = await fetch('http://localhost:3000/api/nova-senha', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ login, novaSenha })
      });
  
      const resultado = await response.json();
  
      if (response.ok) {
        alert('Senha atualizada com sucesso!');
        localStorage.removeItem('usuarioTemporario');
        localStorage.setItem('usuarioLogado', 'true');
        window.location.href = '/html/dashboard.html';
      } else {
        document.getElementById('mensagem').textContent = resultado.erro;
      }
  
    } catch (err) {
      console.error(err);
      alert('Erro ao conectar com o servidor.');
    }
  });
  