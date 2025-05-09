
if (localStorage.getItem('usuarioLogado') !== 'true') {
    window.location.href = 'usuario.html';
  }
async function atualizarSensores() {
    try {
        const resposta = await fetch('http://localhost:3000/api/sensores/ultimos');
        const dados = await resposta.json();

        const solo = dados.umidade_solo;
        const ar = dados.umidade_ar;
        const agua = dados.temperatura_agua;

        document.getElementById('umidade-solo').textContent = `${solo} %`;
        document.getElementById('umidade-ar').textContent = `${ar} %`;
        document.getElementById('temperatura-agua').textContent = `${agua} °C`;

        document.getElementById('grafico-solo').style.background = `conic-gradient(#4caf50 ${solo}%, #ccc ${solo}%)`;
        document.getElementById('grafico-ar').style.background = `conic-gradient(#2196f3 ${ar}%, #ccc ${ar}%)`;

        const tempPercent = Math.min((agua / 40) * 100, 100);
        document.getElementById('grafico-agua').style.background = `conic-gradient(#e91e63 ${tempPercent}%, #ccc ${tempPercent}%)`;

    } catch (erro) {
        console.error('Erro ao carregar dados dos sensores:', erro);
    }
}

setInterval(atualizarSensores, 1000);
atualizarSensores();



