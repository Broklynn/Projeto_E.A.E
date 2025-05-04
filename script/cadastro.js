document.getElementById('formCadastro').addEventListener('submit', async function (e) {
    e.preventDefault();
  
    const usuario = document.getElementById('novoUsuario').value;
    const senha = document.getElementById('novaSenha').value;
    const mensagem = document.getElementById('mensagemCadastro');
  
    try {
      const response = await fetch('http://localhost:3000/api/cadastrar', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ usuario, senha })
      });
  
      const resultado = await response.json();
  
      if (response.ok) {
        mensagem.style.color = 'green';
        mensagem.innerText = resultado.mensagem;
        document.getElementById('formCadastro').reset();
      } else {
        mensagem.style.color = 'red';
        mensagem.innerText = resultado.erro || 'Erro ao cadastrar';
      }
    } catch (err) {
      mensagem.style.color = 'red';
      mensagem.innerText = 'Erro ao conectar com o servidor.';
      console.error(err);
    }
  });
  