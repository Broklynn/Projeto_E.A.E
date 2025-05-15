document.addEventListener('DOMContentLoaded', () => {
  if (localStorage.getItem('usuarioLogado') !== 'true') {
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

  let atual = { solo: 0, ar: 0, agua: 0 };

  function gerarDadosSimulados() {
    return {
      solo: +(Math.random() * 60 + 20).toFixed(2),    // 20% - 80%
      ar: +(Math.random() * 40 + 30).toFixed(2),      // 30% - 70%
      agua: +(Math.random() * 10 + 20).toFixed(2)     // 20°C - 30°C
    };
  }

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
      circle.style.strokeDasharray = `${circunferencia}`;
      circle.style.strokeDashoffset = offset;
    }
  }

  function aplicarAnimacao(elemento) {
    const grafico = elemento.closest('.grafico');
    if (grafico) {
      grafico.classList.add('animate');
      setTimeout(() => grafico.classList.remove('animate'), 600); 
    }
  }

  function atualizarDashboard() {
    const dados = gerarDadosSimulados();

    animateValue(umidadeSolo, atual.solo, dados.solo, '%');
    animateValue(umidadeAr, atual.ar, dados.ar, '%');
    animateValue(temperaturaAgua, atual.agua, dados.agua, 'ºC');

    atualizarProgresso('progress-solo', dados.solo);
    atualizarProgresso('progress-ar', dados.ar);
    atualizarProgresso('progress-agua', dados.agua);

    aplicarAnimacao(umidadeSolo);
    aplicarAnimacao(umidadeAr);
    aplicarAnimacao(temperaturaAgua);

    atual = { ...dados };
  }

  atualizarDashboard();
  setInterval(atualizarDashboard, 5000);
});
