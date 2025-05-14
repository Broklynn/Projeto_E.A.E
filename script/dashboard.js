document.addEventListener('DOMContentLoaded', () => {
  const logado = localStorage.getItem('usuarioLogado');
  if (logado !== 'true') {
    window.location.href = '/html/usuario.html';
    return;
  }

  const logoutBtn = document.getElementById('logoutBtn');
  if (logoutBtn) {
    logoutBtn.addEventListener('click', () => {
      localStorage.clear();
      window.location.href = '/html/usuario.html';
    });
  }

  const umidadeSolo = document.getElementById('umidade-solo');
  const umidadeAr = document.getElementById('umidade-ar');
  const temperaturaAgua = document.getElementById('temperatura-agua');
  let atual = {
    solo: 0,
    ar: 0,
    agua: 0,
  };

  function animateValue(element, start, end, suffix = '', duration = 1000) {
    const startTime = performance.now();

    function update(currentTime) {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const value = start + (end - start) * progress;
      element.textContent = value.toFixed(2) + ' ' + suffix;

      if (progress < 1) {
        requestAnimationFrame(update);
      } else {
        element.textContent = end.toFixed(2) + ' ' + suffix;
      }
    }

    requestAnimationFrame(update);
  }

  function atualizarProgresso(id, valor) {
    const circle = document.getElementById(id);
    const raio = 40;
    const circunferencia = 2 * Math.PI * raio;
    const porcentagem = Math.min(Math.max(valor, 0), 100);
    const offset = circunferencia - (porcentagem / 100) * circunferencia;

    if (circle) {
      circle.style.strokeDashoffset = offset;
    }
  }

  async function atualizarDashboard() {
    try {
      const response = await fetch('http://localhost:3000/api/sensores/ultimos');
      if (!response.ok) {
        throw new Error('Erro ao buscar dados dos sensores');
      }
      const dados = await response.json();

      const novoSolo = dados.umidade_solo;
      const novoAr = dados.umidade_ar;
      const novaTemp = dados.temperatura_agua;

      animateValue(umidadeSolo, atual.solo, novoSolo, '%');
      animateValue(umidadeAr, atual.ar, novoAr, '%');
      animateValue(temperaturaAgua, atual.agua, novaTemp, 'ºC');
      atualizarProgresso('progress-solo', novoSolo);
      atualizarProgresso('progress-ar', novoAr);
      atualizarProgresso('progress-agua', novaTemp);

      aplicarAnimacao(umidadeSolo);
      aplicarAnimacao(umidadeAr);
      aplicarAnimacao(temperaturaAgua);

      atual = {
        solo: novoSolo,
        ar: novoAr,
        agua: novaTemp,
      };
    } catch (error) {
      console.error('Erro ao atualizar dados:', error);
    }
  }

  function aplicarAnimacao(elemento) {
    const grafico = elemento.closest('.grafico');
    if (grafico) {
      grafico.classList.add('animate');
      setTimeout(() => grafico.classList.remove('animate'), 600); 
    }
  }

  atualizarDashboard();
  setInterval(atualizarDashboard, 5000);
});
