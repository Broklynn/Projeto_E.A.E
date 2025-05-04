document.getElementById('cadastroForm').addEventListener('submit', async function (e) {
  e.preventDefault();

  const nome = document.getElementById('nome').value;
  const usuario = document.getElementById('usuario').value;
  const email = document.getElementById('email').value;
  const senha = document.getElementById('senha').value;
  const confirmarSenha = document.getElementById('confirmarSenha').value;
  const telefone = document.getElementById('telefone').value;
  const dataNascimento = document.getElementById('dataNascimento').value;

  console.log({ nome, usuario, email, senha, telefone, dataNascimento });
  if (senha !== confirmarSenha) {
    alert('As senhas não coincidem!');
    return;
  }

  try {
    const response = await fetch('http://localhost:3000/api/cadastrar', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ nome, usuario, email, senha, telefone, dataNascimento })
    });

    const resultado = await response.json();

    if (response.ok) {
      alert(resultado.mensagem);
      document.getElementById('cadastroForm').reset();
    } else {
      alert(resultado.erro || 'Erro ao cadastrar');
    }
  } catch (err) {
    alert('Erro ao conectar com o servidor.');
    console.error(err);
  }
});
