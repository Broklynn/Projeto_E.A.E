document.getElementById('recuperarForm').addEventListener('submit', async function (e) {
    e.preventDefault();
    
    const login = document.getElementById('recuperar').value;
  
    try {
      const response = await fetch('http://localhost:3000/api/esqueceu-senha', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ login })
      });
  
      const resultado = await response.json();
      document.getElementById('mensagem').textContent = resultado.mensagem || resultado.erro;
  
    } catch (err) {
      console.error(err);
      alert('Erro ao conectar com o servidor.');
    }
  });
  