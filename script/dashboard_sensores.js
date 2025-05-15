if (localStorage.getItem('usuarioLogado') !== 'true') {
    window.location.href = 'usuario.html';
}

function atualizarSensores() {
  const dados = {
    temperatura: 24.5,
    umidade: 80,
    status: 'ÚMIDO'
  };

  console.log('Dados simulados:', dados);

  // Atualize os elementos com os dados
  document.getElementById("temperatura").textContent = dados.temperatura.toFixed(1) + " °C";
  document.getElementById("umidade").textContent = dados.umidade + " %";
  document.getElementById("status").textContent = dados.status;
}

atualizarSensores();
setInterval(atualizarSensores, 10000); // Atualiza a cada 10s
